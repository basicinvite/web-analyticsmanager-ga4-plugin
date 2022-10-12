"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GA4EventTypes {
    constructor() {
        this.types = {
            conversion: ['transaction_id', 'value', 'currency', 'items'],
            purchase: ['transaction_id', 'value', 'currency', 'items'],
            view_item: ['currency', 'value', 'items'],
            view_item_list: ['items']
        };
    }
    get eventTypes() {
        return this.types;
    }
    getEventTypeByName(type) {
        let requiredItems = [];
        Object.entries(this.eventTypes).forEach(element => {
            if (type === element[0]) {
                requiredItems = element[1];
            }
        }, requiredItems);
        return requiredItems;
    }
}
exports.default = GA4EventTypes;
