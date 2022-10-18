import { ManagerPlugin } from '@web-analyticsmanager/main';
import { ManagerConfig } from '@web-analyticsmanager/main/dist/Configuration/ManagerConfig';
import { ManagerConfigInterface } from '@web-analyticsmanager/main/dist/Configuration/Interfaces/ManagerConfig.Interface';
export default class GA4Manager extends ManagerPlugin {
    managerConfig: ManagerConfig;
    initialized: boolean;
    private eventTypes;
    private GA4ErrorMsg;
    constructor();
    private _logError;
    private _setupConfig;
    init(config: ManagerConfigInterface): void;
    private _checkDefaultEvent;
    fireTrackingEvent(eventType: string, eventPayload: any, gaReference: any): void;
}
