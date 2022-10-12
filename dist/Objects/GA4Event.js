"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnalyticsEvent_1 = require("@web-analyticsmanager/main/dist/Objects/AnalyticsEvent");
class GA4Event extends AnalyticsEvent_1.AnalyticsEvent {
    constructor(details, required) {
        const eventData = Object.assign({ eventType: '', eventPayload: {} }, details);
        super(eventData);
        this.data = {};
        this.requiredItems = [];
        //Set data and required items for event.
        if (required && required.length > 0) {
            this.requiredItems = required;
        }
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
            if (window.GoogleAnalytics4.ga) {
                const eventData = this.getEventData();
                window.GoogleAnalytics4.ga('event', eventData.eventType, eventData.eventPayload);
            }
        }
        else {
            this._logEventError(`Event data not valid: \n Payload ${this.getEventData()}`);
        }
    }
}
exports.default = GA4Event;
