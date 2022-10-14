import { ManagerPlugin } from '@web-analyticsmanager/main';
import { ManagerConfig } from '@web-analyticsmanager/main/dist/Configuration/ManagerConfig';
import { AnalyticsEventData } from '@web-analyticsmanager/main/dist/Objects/AnalyticsEventData';
import GA4Event from "./Objects/GA4Event";
import GA4EventTypes from './Objects/GA4EventTypes';
import { ManagerConfigInterface } from '@web-analyticsmanager/main/dist/Configuration/Interfaces/ManagerConfig.Interface';

export default class GA4Manager extends ManagerPlugin {
  managerConfig: ManagerConfig = { trackingId: '' };
  initialized: boolean = false;

  private eventTypes: GA4EventTypes;

  private GA4ErrorMsg = {
    initializationError: "GA4 Manager has not been initialized. Please initialize with the appropriate data."
  }

  constructor() {
    super();
    this.eventTypes = new GA4EventTypes();
  }

  private _logError(error: string): void {
    if (error) {
      console.error(error);
    }
  }

  private _setupConfig(trackingId: string) {
    this.managerConfig = new ManagerConfig({ trackingId: trackingId });
    this.initialized = true;
  }

  init(config: ManagerConfigInterface): void {

    if (!this.initialized) {
      this._setupConfig(config.trackingId);
    }
  }

  private _checkDefaultEvent(type: string): any {
    return this.eventTypes.getEventTypeByName(type);
  }

  fireTrackingEvent(eventType: string, eventPayload: any) {
    if (eventType && eventPayload) {
      const required = this._checkDefaultEvent(eventType);
      const eventData = new AnalyticsEventData(eventType, eventPayload);
      if (required) {
        const event = new GA4Event(eventData, required);
        event.fire();
      } else {
        const event = new GA4Event(eventData);
        event.fire();
      }
    }

  }
}
