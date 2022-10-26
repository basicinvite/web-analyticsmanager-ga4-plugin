"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_analyticsmanager_1 = require("web-analyticsmanager");
class GA4Event extends web_analyticsmanager_1.AnalyticsEvent {
    constructor(details, gaReference, required) {
        const eventData = Object.assign({ eventType: '', eventPayload: {} }, details);
        super(eventData);
        this.data = {};
        this.requiredItems = [];
        //Set data and required items for event.
        if (required && required.length > 0) {
            this.requiredItems = required;
        }
        this.ga4 = gaReference;
    }
    _isValid() {
        const payload = this.data;
        let valid = true;
        if (this.requiredItems) {
            valid = this.requiredItems.every(key => {
                if (!(key in payload)) {
                    return false;
                }
                return true;
            }, payload);
        }
        return valid;
    }
    _logEventError(error) {
        if (error) {
            console.error(error);
        }
    }
    fire() {
        if (this._isValid()) {
            if (this.ga4) {
                const eventData = this.getEventData();
                this.ga4('event', eventData.eventType, eventData.eventPayload);
            }
        }
        else {
            this._logEventError(`Event data not valid: \n Payload ${this.getEventData()}`);
        }
    }
}
exports.default = GA4Event;
