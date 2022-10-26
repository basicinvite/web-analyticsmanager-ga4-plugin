import { ManagerPlugin, ManagerConfig, AnalyticsEventData } from 'web-analyticsmanager';
import GA4Event from "./Objects/GA4Event";
import GA4EventTypes from './Objects/GA4EventTypes';

export default class GA4Manager extends ManagerPlugin {
  managerConfig: ManagerConfig = { trackingId: '' };
  initialized: boolean = false;
  private _eventTypes: GA4EventTypes;

  private GA4ErrorMsg = {
    initializationError: "GA4 Manager has not been initialized. Please initialize with the appropriate data."
  }

  constructor() {
    super();
    this._eventTypes = new GA4EventTypes();
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

  init(trackingId: string): void {

    if (!this.initialized) {
      this._setupConfig(trackingId);
    }
  }

  private _checkDefaultEvent(type: string): any {
    return this._eventTypes?.getEventTypeByName(type);
  }

  fireTrackingEvent(eventType: string, eventPayload: any, gaReference: any) {
    if (this.initialized) {
      if (eventType && eventPayload) {
        const required = this._checkDefaultEvent(eventType);
        const eventData = new AnalyticsEventData(eventType, eventPayload);
        if (required) {
          const e: GA4Event = new GA4Event(eventData, gaReference, required);
          e.fire();
        } else {
          const e: GA4Event = new GA4Event(eventData, gaReference);
          e.fire();
        }
      }
    } else {
      this._logError(this.GA4ErrorMsg.initializationError);
    }

  }
}
