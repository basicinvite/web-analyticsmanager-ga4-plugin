import { AnalyticsEvent } from "web-analyticsmanager";
import { AnalyticsEventDataInterface } from "web-analyticsmanager";
export default class GA4Event extends AnalyticsEvent {
    data: {};
    private requiredItems;
    private ga4;
    constructor(details: AnalyticsEventDataInterface, gaReference: any, required?: Array<string>);
    private _isValid;
    private _logEventError;
    fire(): void;
}
