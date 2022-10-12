export default class GA4EventTypes {

  private types = {
    conversion: ['transaction_id', 'value', 'currency', 'items'],
    purchase: ['transaction_id', 'value', 'currency', 'items'],
    view_item: ['currency', 'value', 'items'],
    view_item_list: ['items']
  }

  constructor() { }

  get eventTypes() {
    return this.types;
  }

  public getEventTypeByName(type: string): Array<string> {
    let requiredItems: Array<string> = [];
    Object.entries(this.eventTypes).forEach(element => {
      if (type === element[0]) {
        requiredItems = element[1];
      }
    }, requiredItems);

    return requiredItems;
  }

}