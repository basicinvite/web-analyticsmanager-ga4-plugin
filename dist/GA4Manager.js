"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("@web-analyticsmanager/main");
const ManagerConfig_1 = require("@web-analyticsmanager/main/dist/Configuration/ManagerConfig");
const AnalyticsEventData_1 = require("@web-analyticsmanager/main/dist/Objects/AnalyticsEventData");
const GA4Event_1 = __importDefault(require("./Objects/GA4Event"));
const GA4EventTypes_1 = __importDefault(require("Objects/GA4EventTypes"));
class GA4Manager extends main_1.ManagerPlugin {
    constructor() {
        super();
        this.managerConfig = { trackingId: '' };
        this.initialized = false;
        this.GA4ErrorMsg = {
            initializationError: "GA4 Manager has not been initialized. Please initialize with the appropriate data."
        };
        this.eventTypes = new GA4EventTypes_1.default();
    }
    _logError(error) {
        if (error) {
            console.error(error);
        }
    }
    _getBodyElement() {
        return document.querySelector("body");
    }
    addTrackingCode(trackingHtml) {
        if (this.initialized) {
            let script = document.createElement('script');
            script.append(trackingHtml);
            let body = this._getBodyElement();
            if (body) {
                body.appendChild(script);
            }
        }
    }
    getTrackingCodeHTML() {
        let trackingNode = '';
        if (this.initialized) {
            trackingNode = `window.dataLayer = window.dataLayer || [];
      <script async src="https://www.googletagmanager.com/gtag/js?id=${this.managerConfig.trackingId}"></script>
      function ga4() {
        dataLayer.push(arguments);
      }

      ga4('js', new Date());
      ga4('config', ${this.managerConfig.trackingId})
    `;
        }
        else {
            this._logError(this.GA4ErrorMsg.initializationError);
        }
        return trackingNode;
    }
    _setupConfig(trackingId) {
        this.managerConfig = new ManagerConfig_1.ManagerConfig({ trackingId: trackingId });
        this.initialized = false;
    }
    init(config) {
        if (!this.initialized) {
            this._setupConfig(config.trackingId);
            const trackingHtml = this.getTrackingCodeHTML();
            if (trackingHtml) {
                this.addTrackingCode(trackingHtml);
            }
        }
    }
    _checkDefaultEvent(type) {
        return this.eventTypes.getEventTypeByName(type);
    }
    fireTrackingEvent(eventType, eventPayload) {
        if (eventType && eventPayload) {
            const required = this._checkDefaultEvent(eventType);
            const eventData = new AnalyticsEventData_1.AnalyticsEventData(eventType, eventPayload);
            if (required) {
                const event = new GA4Event_1.default(eventData, required);
                event.fire();
            }
            else {
                const event = new GA4Event_1.default(eventData);
                event.fire();
            }
        }
    }
}
exports.default = GA4Manager;
