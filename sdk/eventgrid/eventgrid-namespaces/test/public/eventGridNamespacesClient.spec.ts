// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Suite, Context } from "mocha";
import { assert } from "@azure-tools/test-utils";
import { Recorder, env } from "@azure-tools/test-recorder";
import {
  EventGridSenderClient,
  EventGridReceiverClient,
  CloudEvent,
  ReceiveResult,
  RejectResult,
  RenewLocksResult,
  EventGridDeserializer,
} from "../../src";
import { createRecordedClient } from "./utils/recordedClient";
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Buffer } from "buffer";
/* eslint no-constant-condition: "off" */
async function clearMessages(receiverClient: EventGridReceiverClient): Promise<void> {
  // Clear any messages that may be available in the topic.
  let receivedResult: ReceiveResult<any> = await receiverClient.receiveEvents();
  while (receivedResult && receivedResult.details.length > 0) {
    const lockToken = receivedResult.details[0].brokerProperties.lockToken;
    await receiverClient.acknowledgeEvents([lockToken]);
    receivedResult = await receiverClient.receiveEvents();
  }
}

describe("Event Grid Namespace Client", function (this: Suite) {
  let recorder: Recorder;
  let senderClient: EventGridSenderClient;
  let receiverClient: EventGridReceiverClient;
  let eventSubscriptionName: string;
  let topicName: string;
  let maxDeliveryCount: number;

  beforeEach(async function (this: Context) {
    eventSubscriptionName = env["EVENT_SUBSCRIPTION_NAME"] ?? "testsubscription1";
    topicName = env["TOPIC_NAME"] ?? "testtopic1";
    maxDeliveryCount = env["MAX_DELIVERY_COUNT"] ? parseInt(env["MAX_DELIVERY_COUNT"]) : 10;

    ({ senderClient, receiverClient, recorder } = await createRecordedClient(
      this.currentTest,
      "EVENT_GRID_NAMESPACES_ENDPOINT",
      topicName,
      eventSubscriptionName,
    ));

    await clearMessages(receiverClient);
  });

  afterEach(async function () {
    await clearMessages(receiverClient);
    await recorder.stop();
  });

  describe("Non Binary Mode Publishing", function () {
    it("publishes a single cloud event", async () => {
      const eventId: string = `singleEventIdV210001`;
      const cloudEvent: CloudEvent<any> = {
        type: "example",
        source: "https://example.com",
        id: recorder.variable("singleEventId", eventId),
        time: new Date(recorder.variable("singleEventDate", new Date().toString())),
        data: {
          resourceUri: "https://dummyurl.com",
        },
        specVersion: "1.0",
      };
      // Publish the Cloud Event
      await senderClient.sendEvents(cloudEvent);
      // Receive the Published Cloud Event
      const receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents();

      const deserializer: EventGridDeserializer = new EventGridDeserializer();
      const result: CloudEvent<any>[] = await deserializer.deserializeCloudEvents(
        JSON.stringify(receiveResult.details[0].event),
      );

      // The Received Cloud Event ID must be equal to the ID of the Event that was published.
      for (const event of result) {
        assert.equal(event.data?.resourceUri, "https://dummyurl.com");
      }
    });

    it("publishes multiple cloud events", async () => {
      const eventIds: string[] = ["https://dummyurl.com", "https://dummyurl.com"];

      const cloudEvents: CloudEvent<any>[] = [
        {
          type: "example",
          source: "https://example.com",
          id: recorder.variable("MulipleEventId1", eventIds[0]),
          time: new Date(recorder.variable("singleEventDate1", new Date().toString())),
          data: {
            resourceUri: "https://dummyurl.com",
          },
          specVersion: "1.0",
        },
        {
          type: "example",
          source: "https://example.com",
          id: recorder.variable("MulipleEventId2", eventIds[1]),
          time: new Date(recorder.variable("singleEventDate2", new Date().toString())),
          data: {
            resourceUri: "https://dummyurl.com",
          },
          specVersion: "1.0",
        },
      ];
      await senderClient.sendEvents(cloudEvents);

      const receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents({
        maxEvents: 2,
      });

      assert.equal(2, receiveResult.details.length);

      const deserializer: EventGridDeserializer = new EventGridDeserializer();
      for (const value of receiveResult.details) {
        const result: CloudEvent<any>[] = await deserializer.deserializeCloudEvents(
          JSON.stringify(value.event),
        );
        for (const event of result) {
          assert.equal(event.data?.resourceUri, "https://dummyurl.com");
        }
      }
    });

    it("releases a cloud event", async () => {
      const eventId: string = `singleEventIdV210004`;
      const cloudEvent: CloudEvent<any> = {
        type: "example",
        source: "https://example.com",
        id: recorder.variable("singleEventId", eventId),
        time: new Date(recorder.variable("singleEventDate", new Date().toString())),
        data: {
          resourceUri: "https://dummyurl.com",
        },
        specVersion: "1.0",
      };
      // Publish the Cloud Event
      await senderClient.sendEvents(cloudEvent);

      let counter: number = 0;
      while (true) {
        // Receive the Published Cloud Event
        counter++;
        const receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents();

        if (
          (counter > maxDeliveryCount && receiveResult.details.length !== 0) ||
          (counter < maxDeliveryCount && receiveResult.details.length === 0)
        ) {
          assert.fail("Max Delivery Count exceeded/has not reached");
        }

        if (counter > maxDeliveryCount && receiveResult.details.length === 0) {
          break;
        }

        const lockToken = receiveResult.details[0].brokerProperties.lockToken;
        await receiverClient.releaseEvents([lockToken]);
      }
    });

    it("rejects a cloud event", async () => {
      const eventId: string = `singleEventIdV210005`;
      const cloudEvent: CloudEvent<any> = {
        type: "example",
        source: "https://example.com",
        id: recorder.variable("singleEventId", eventId),
        time: new Date(recorder.variable("singleEventDate", new Date().toString())),
        data: {
          resourceUri: "https://dummyurl.com",
        },
        specVersion: "1.0",
      };
      // Publish the Cloud Event
      await senderClient.sendEvents(cloudEvent);
      // Receive the Published Cloud Event
      let receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents();
      const lockToken = receiveResult.details[0].brokerProperties.lockToken;
      const rejectResult: RejectResult = await receiverClient.rejectEvents([lockToken]);
      assert.equal(rejectResult.succeededLockTokens.length, 1);
      assert.equal(rejectResult.succeededLockTokens[0], lockToken);

      receiveResult = await receiverClient.receiveEvents();
      assert.equal(receiveResult.details.length, 0);
    });

    it("renews a cloud event", async () => {
      const eventId: string = `singleEventIdV210008`;
      const cloudEvent: CloudEvent<any> = {
        type: "example",
        source: "https://example.com",
        id: recorder.variable("singleEventId", eventId),
        time: new Date(recorder.variable("singleEventDate", new Date().toString())),
        data: {
          resourceUri: "https://dummyurl.com",
        },
        specVersion: "1.0",
      };
      // Publish the Cloud Event
      await senderClient.sendEvents(cloudEvent);
      // Receive the Published Cloud Event
      const receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents();
      const lockToken = receiveResult.details[0].brokerProperties.lockToken;
      const renewResult: RenewLocksResult = await receiverClient.renewEventLocks([lockToken]);
      assert.equal(renewResult.succeededLockTokens.length, 1);
      assert.equal(renewResult.succeededLockTokens[0], lockToken);
    });
  });

  describe("Binary Mode Publishing", function () {
    it("publishes a single cloud event - Binary Data", async () => {
      const eventId: string = `singleEventIdV210007`;
      const data = {
        resourceUri: "https://dummyurl.com",
      };
      const cloudEvent: CloudEvent<any> = {
        type: "example",
        source: "https://example.com",
        id: recorder.variable("singleEventId", eventId),
        time: new Date(recorder.variable("singleEventDate", new Date().toString())),
        data: Buffer.from(JSON.stringify(data), "base64"),
        dataContentType: "application/cloudevents+json; charset=utf-8",
        specVersion: "1.0",
      };
      // Publish the Cloud Event
      await senderClient.sendEvents(cloudEvent);
      // Receive the Published Cloud Event
      const receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents();

      for (const detail of receiveResult.details) {
        const event = detail.event;
        assert.equal(event.data, Buffer.from(cloudEvent.data).toString("base64"));
      }
    });
  });
});
