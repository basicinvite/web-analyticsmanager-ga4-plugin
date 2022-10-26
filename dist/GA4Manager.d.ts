import { ManagerPlugin, ManagerConfig } from 'web-analyticsmanager';
export default class GA4Manager extends ManagerPlugin {
    managerConfig: ManagerConfig;
    initialized: boolean;
    private _eventTypes;
    private GA4ErrorMsg;
    constructor();
    private _logError;
    private _setupConfig;
    init(trackingId: string): void;
    private _checkDefaultEvent;
    fireTrackingEvent(eventType: string, eventPayload: any, gaReference: any): void;
}
