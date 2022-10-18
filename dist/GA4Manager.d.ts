import { ManagerPlugin } from '@web-analyticsmanager/main';
import { ManagerConfig } from '@web-analyticsmanager/main/dist/Configuration/ManagerConfig';
import GA4Event from "./Objects/GA4Event";
import GA4EventTypes from './Objects/GA4EventTypes';
import { ManagerConfigInterface } from '@web-analyticsmanager/main/dist/Configuration/Interfaces/ManagerConfig.Interface';
export { GA4Event, GA4EventTypes };
export default class GA4Manager extends ManagerPlugin {
    managerConfig: ManagerConfig;
    initialized: boolean;
    private _eventTypes;
    private GA4ErrorMsg;
    constructor();
    private _logError;
    private _setupConfig;
    init(config: ManagerConfigInterface): void;
    private _checkDefaultEvent;
    fireTrackingEvent(eventType: string, eventPayload: any, gaReference: any): void;
}
