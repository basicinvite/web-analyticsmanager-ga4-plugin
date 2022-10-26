export default class GA4EventTypes {
    types: {
        conversion: string[];
        purchase: string[];
        view_item: string[];
        view_item_list: string[];
    };
    constructor();
    get eventTypes(): {
        conversion: string[];
        purchase: string[];
        view_item: string[];
        view_item_list: string[];
    };
    getEventTypeByName(type: string): Array<string>;
}
