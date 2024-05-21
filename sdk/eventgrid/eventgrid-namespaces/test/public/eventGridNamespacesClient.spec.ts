// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Suite, Context } from "mocha";
import { assert } from "@azure-tools/test-utils";
import { Recorder, env } from "@azure-tools/test-recorder";
import {
  EventGridClient as EventGridNamespacesClient,
  CloudEvent,
  ReceiveResult,
  RejectResult,
  RenewCloudEventLocksResult,
  EventGridDeserializer,
} from "../../src";
import { createRecordedClient } from "./utils/recordedClient";
import { expect } from "chai";
import { Buffer } from "buffer";

/* eslint no-constant-condition: "off" */
async function clearMessages(
  client: EventGridNamespacesClient,
  topicName: string,
  eventSubscripionName: string,
): Promise<void> {
  // Clear any messages that may be available in the topic.
  let receivedResult: ReceiveResult<any> = await client.receiveCloudEvents(
    topicName,
    eventSubscripionName,
  );
  while (receivedResult && receivedResult.details.length > 0) {
    const lockToken = receivedResult.details[0].brokerProperties.lockToken;
    await client.acknowledgeCloudEvents([lockToken], topicName, eventSubscripionName);
    receivedResult = await client.receiveCloudEvents(topicName, eventSubscripionName);
  }
}

describe("Event Grid Namespace Client", function (this: Suite) {
  let recorder: Recorder;
  let client: EventGridNamespacesClient;
  let eventSubscripionName: string;
  let topicName: string;
  let maxDeliveryCount: number;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(
      this.currentTest,
      "EVENT_GRID_NAMESPACES_ENDPOINT",
      "EVENT_GRID_NAMESPACES_KEY",
    ));

    eventSubscripionName = env["EVENT_SUBSCRIPTION_NAME"] ?? "testsubscription1";
    topicName = env["TOPIC_NAME"] ?? "testtopic1";
    maxDeliveryCount = env["MAX_DELIVERY_COUNT"] ? parseInt(env["MAX_DELIVERY_COUNT"]) : 10;
    await clearMessages(client, topicName, eventSubscripionName);
  });

  afterEach(async function () {
    await clearMessages(client, topicName, eventSubscripionName);
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
        specversion: "1.0",
      };
      // Publish the Cloud Event
      await client.sendCloudEvent(cloudEvent, topicName);
      // Receive the Published Cloud Event
      const receiveResult: ReceiveResult<any> = await client.receiveCloudEvents(
        topicName,
        eventSubscripionName,
      );

      const deserializer: EventGridDeserializer = new EventGridDeserializer();
      const result: CloudEvent<any>[] = await deserializer.deserializeCloudEvents(
        JSON.stringify(receiveResult.details[0].event),
      );

      // The Received Cloud Event ID must be equal to the ID of the Event that was published.
      for (const event of result) {
        assert.equal(event.data.resourceUri, "https://dummyurl.com");
      }
    });

    it("publishes multiple cloud events", async () => {
      const eventIds: string[] = [`MultipleEventId110002`, `MultipleEventId210003`];

      const cloudEvents: CloudEvent<any>[] = [
        {
          type: "example",
          source: "https://example.com",
          id: recorder.variable("MulipleEventId1", eventIds[0]),
          time: new Date(recorder.variable("singleEventDate1", new Date().toString())),
          data: {
            resourceUri: "https://dummyurl.com",
          },
          specversion: "1.0",
        },
        {
          type: "example",
          source: "https://example.com",
          id: recorder.variable("MulipleEventId2", eventIds[1]),
          time: new Date(recorder.variable("singleEventDate2", new Date().toString())),
          data: {
            resourceUri: "https://dummyurl.com",
          },
          specversion: "1.0",
        },
      ];
      await client.sendCloudEvents(cloudEvents, topicName);

      const receiveResult: ReceiveResult<any> = await client.receiveCloudEvents(
        topicName,
        eventSubscripionName,
        {
          maxEvents: 2,
        },
      );

      assert.equal(2, receiveResult.details.length);

      const receivedEventData: string[] = [
        receiveResult.details[0].event.data.resourceUri,
        receiveResult.details[1].event.data.resourceUri,
      ];
      expect(receivedEventData).to.have.members(["https://dummyurl.com", "https://dummyurl.com"]);
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
        specversion: "1.0",
      };
      // Publish the Cloud Event
      await client.sendCloudEvent(cloudEvent, topicName);

      let counter: number = 0;
      while (true) {
        // Receive the Published Cloud Event
        counter++;
        const receiveResult: ReceiveResult<any> = await client.receiveCloudEvents(
          topicName,
          eventSubscripionName,
        );

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
        await client.releaseCloudEvents([lockToken], topicName, eventSubscripionName);
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
        specversion: "1.0",
      };
      // Publish the Cloud Event
      await client.sendCloudEvent(cloudEvent, topicName);
      // Receive the Published Cloud Event
      let receiveResult: ReceiveResult<any> = await client.receiveCloudEvents(
        topicName,
        eventSubscripionName,
      );
      const lockToken = receiveResult.details[0].brokerProperties.lockToken;
      const rejectResult: RejectResult = await client.rejectCloudEvents(
        [lockToken],
        topicName,
        eventSubscripionName,
      );
      assert.equal(rejectResult.succeededLockTokens.length, 1);
      assert.equal(rejectResult.succeededLockTokens[0], lockToken);

      receiveResult = await client.receiveCloudEvents(topicName, eventSubscripionName);
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
        specversion: "1.0",
      };
      // Publish the Cloud Event
      await client.sendCloudEvent(cloudEvent, topicName);
      // Receive the Published Cloud Event
      const receiveResult: ReceiveResult<any> = await client.receiveCloudEvents(
        topicName,
        eventSubscripionName,
      );
      const lockToken = receiveResult.details[0].brokerProperties.lockToken;
      const renewResult: RenewCloudEventLocksResult = await client.renewCloudEventLocks(
        [lockToken],
        topicName,
        eventSubscripionName,
      );
      assert.equal(renewResult.succeededLockTokens.length, 1);
      assert.equal(renewResult.succeededLockTokens[0], lockToken);
    });
  });

  describe("Binary Mode Publishing", function () {
    it("errors a single cloud event - Non Binary Data", async () => {
      const eventId: string = `singleEventIdV210006`;
      const data = {
        resourceUri: "https://dummyurl.com",
      };
      const cloudEvent: CloudEvent<any> = {
        type: "example",
        source: "https://example.com",
        id: recorder.variable("singleEventId", eventId),
        time: new Date(recorder.variable("singleEventDate", new Date().toString())),
        data,
        specversion: "1.0",
      };

      try {
        await client.sendCloudEvent(cloudEvent, topicName, {
          binaryMode: true,
        });
        assert.fail("Code must error out for non binary data in binary mode.");
      } catch (ex: any) {
        assert.equal(ex.message, "CloudEvent data must be binary when in binary mode.");
      }
    });

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
        data: Buffer.from(JSON.stringify(data)),
        datacontenttype: "application/cloudevents+json; charset=utf-8",
        specversion: "1.0",
      };
      // Publish the Cloud Event
      await client.sendCloudEvent(cloudEvent, topicName, {
        binaryMode: true,
      });
      // Receive the Published Cloud Event
      const receiveResult: ReceiveResult<any> = await client.receiveCloudEvents(
        topicName,
        eventSubscripionName,
      );

      const deserializer: EventGridDeserializer = new EventGridDeserializer();
      const result: CloudEvent<any>[] = await deserializer.deserializeCloudEvents(
        JSON.stringify(receiveResult.details[0].event),
      );

      for (const event of result) {
        assert.equal(
          JSON.stringify(data),
          JSON.stringify(JSON.parse(Buffer.from(event.data).toString())),
        );
      }
    });
  });
});
