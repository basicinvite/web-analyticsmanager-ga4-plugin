import { AnalyticsEventData } from "web-analyticsmanager";
import GA4Event from "../GA4Event";

const gaFunction = function () {
  console.log("Testing");
}

//Tests to check getter and setter methods on base AnalyticsEvent.
describe("Test getter and setter methods of Analytics Event class.", () => {
  const EventData = new AnalyticsEventData('test', { message: 'This is my data.' })
  const testEvent = new GA4Event(EventData, gaFunction);

  //Getter test.
  test("Test getter method.", () => {
    const data = testEvent.getEventData();
    expect(data.eventType).toBe("test");
    expect(data.eventPayload).toStrictEqual({ message: "This is my data." });
  });

  //Setter test
  test("Test setter method.", () => {
    const newEventData = new AnalyticsEventData('new', { message: "New Event" });
    const testData = new GA4Event(newEventData, gaFunction);
    const data = testData.getEventData();
    expect(data.eventType).toBe("new");
    expect(data.eventPayload).toStrictEqual({ message: "New Event" });
  });
});

//Tests to check fire method on base AnalyticsEvent.
describe("Test fire method of Analytics Event class.", () => {

  const log = jest.spyOn(console, 'log');
  const EventData = new AnalyticsEventData('test', { message: 'This is my data.' })
  const testEvent = new GA4Event(EventData, gaFunction);

  //Fire method test.
  test("Test getter method.", () => {
    testEvent.fire();
    expect(log).toHaveBeenCalled();
  });
});