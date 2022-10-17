import { AnalyticsEvent } from "@web-analyticsmanager/main/dist/Objects/AnalyticsEvent";
import { AnalyticsEventData } from "@web-analyticsmanager/main/dist/Objects/AnalyticsEventData";
import { AnalyticsEventDataInterface } from "@web-analyticsmanager/main/dist/Objects/Interfaces/AnalyticsEventData.Interface";

export default class GA4Event extends AnalyticsEvent {

  public data = {};
  private requiredItems: Array<string> = [];


  constructor(details: AnalyticsEventDataInterface, required?: Array<string>) {

    const eventData = {
      eventType: '',
      eventPayload: {},
      ...details
    }
    super(eventData);
    //Set data and required items for event.
    if (required && required.length > 0) {
      this.requiredItems = required;
    }
  }

  private _isValid() {
    const payload: Object = this.data;
    let valid = true;
    if (this.requiredItems) {
      valid = this.requiredItems.every(key => {
        if (!(key in payload)) {
          return false;
        }
        return true;
      }, payload)
    }

    return valid;
  }

  private _logEventError(error: string): void {
    if (error) {
      console.error(error);
    }
  }

  fire(): void {
    if (this._isValid()) {
      if (window.gtag) {
        const eventData = this.getEventData();
        window.gtag('event', eventData.eventType, eventData.eventPayload);
      }
    } else {
      this._logEventError(`Event data not valid: \n Payload ${this.getEventData()}`)
    }
  }
}
