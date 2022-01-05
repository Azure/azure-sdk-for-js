// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class TestCase {
  public expected: any;
  public encodedEvent: string;

  constructor(expected: unknown, encodedEvent?: string) {
    this.expected = expected;
    this.encodedEvent = encodedEvent ?? JSON.stringify(expected);
  }
}

export interface TestEventInfo {
  /**
   * A test case of an event in the Event Grid Schema
   */
  eventGridSchema: TestCase;
  /**
   * A test case of an event in the Cloud Event Schema.
   */
  cloudEventSchema: TestCase;
}

export const customTestEvent1: TestEventInfo = {
  eventGridSchema: new TestCase({
    id: "5bc888aa-c2f4-11ea-b3de-0242ac130004",
    subject: "",
    data: {
      hello: "world",
    },
    eventType: "Azure.Sdk.TestEvent1",
    dataVersion: "1.0",
    metadataVersion: "1",
    eventTime: new Date("2020-07-10T21:27:12.925Z"),
    topic:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic",
  }),
  cloudEventSchema: new TestCase({
    id: "5bc888aa-c2f4-11ea-b3de-0242ac130004",
    source:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic",
    specversion: "1.0",
    type: "Azure.Sdk.TestEvent1",
    subject: "",
    time: new Date("2020-07-10T21:27:12.925Z"),
    data: {
      hello: "world",
    },
  }),
};

export const customTestEvent2: TestEventInfo = {
  eventGridSchema: new TestCase({
    id: "ddf773ae-c2f4-11ea-b3de-0242ac130004",
    subject: "",
    data: {
      goodbye: "everyone",
    },
    eventType: "Azure.Sdk.TestEvent2",
    dataVersion: "1.0",
    metadataVersion: "1",
    eventTime: new Date("2020-07-10T21:27:12.925Z"),
    topic:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic",
  }),
  cloudEventSchema: new TestCase({
    id: "ddf773ae-c2f4-11ea-b3de-0242ac130004",
    source:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic",
    specversion: "1.0",
    type: "Azure.Sdk.TestEvent2",
    subject: "",
    time: new Date("2020-07-10T21:27:12.925Z"),
    data: {
      goodbye: "everyone",
    },
  }),
};
