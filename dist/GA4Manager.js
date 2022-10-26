"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_analyticsmanager_1 = require("web-analyticsmanager");
const GA4Event_1 = __importDefault(require("./Objects/GA4Event"));
const GA4EventTypes_1 = __importDefault(require("./Objects/GA4EventTypes"));
class GA4Manager extends web_analyticsmanager_1.ManagerPlugin {
    constructor() {
        super();
        this.managerConfig = { trackingId: '' };
        this.initialized = false;
        this.GA4ErrorMsg = {
            initializationError: "GA4 Manager has not been initialized. Please initialize with the appropriate data."
        };
        this._eventTypes = new GA4EventTypes_1.default();
    }
    _logError(error) {
        if (error) {
            console.error(error);
        }
    }
    _setupConfig(trackingId) {
        this.managerConfig = new web_analyticsmanager_1.ManagerConfig({ trackingId: trackingId });
        this.initialized = true;
    }
    init(trackingId) {
        if (!this.initialized) {
            this._setupConfig(trackingId);
        }
    }
    _checkDefaultEvent(type) {
        var _a;
        return (_a = this._eventTypes) === null || _a === void 0 ? void 0 : _a.getEventTypeByName(type);
    }
    fireTrackingEvent(eventType, eventPayload, gaReference) {
        if (this.initialized) {
            if (eventType && eventPayload) {
                const required = this._checkDefaultEvent(eventType);
                const eventData = new web_analyticsmanager_1.AnalyticsEventData(eventType, eventPayload);
                if (required) {
                    const e = new GA4Event_1.default(eventData, gaReference, required);
                    e.fire();
                }
                else {
                    const e = new GA4Event_1.default(eventData, gaReference);
                    e.fire();
                }
            }
        }
        else {
            this._logError(this.GA4ErrorMsg.initializationError);
        }
    }
}
exports.default = GA4Manager;
