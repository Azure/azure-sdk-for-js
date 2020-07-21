// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */

import { assert } from "chai";

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, testEnv } from "./utils/recordedClient";

import {
  AzureKeyCredential,
  EventGridPublisherClient,
  EventGridSharedAccessSignatureCredential
} from "../src/index";

describe("EventGridPublisherClient", function() {
  let recorder: Recorder;
  let client: EventGridPublisherClient;

  this.timeout(10000);

  describe("#sendEvents", function() {
    beforeEach(function() {
      ({ client, recorder } = createRecordedClient(
        this,
        testEnv.EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT,
        new AzureKeyCredential(testEnv.EVENT_GRID_EVENT_GRID_SCHEMA_API_KEY)
      ));
    });

    afterEach(() => {
      recorder.stop();
    });

    it("sends a single event", async () => {
      const res = await client.sendEvents([
        {
          eventTime: recorder.newDate("singleEventDate"),
          id: recorder.getUniqueName("singleEventId"),
          eventType: "Azure.Sdk.TestEvent1",
          subject: "Single 1",
          dataVersion: "1.0",
          data: {
            hello: "world"
          }
        }
      ]);

      assert.equal(res._response.status, 200);
    });

    it("sends multiple events", async () => {
      const res = await client.sendEvents([
        {
          eventTime: recorder.newDate("multiEventDate1"),
          id: recorder.getUniqueName("multiEventId1"),
          eventType: "Azure.Sdk.TestEvent1",
          subject: "Multiple 1",
          dataVersion: "1.0",
          data: {
            hello: "world"
          }
        },
        {
          eventTime: recorder.newDate("multiEventDate2"),
          id: recorder.getUniqueName("multiEventId2"),
          eventType: "Azure.Sdk.TestEvent1",
          subject: "Multiple 2",
          dataVersion: "1.0",
          data: {
            hello: "world"
          }
        }
      ]);

      assert.equal(res._response.status, 200);
    });
  });

  describe("#sendCloudEventSchemaEvents", function() {
    beforeEach(function() {
      ({ client, recorder } = createRecordedClient(
        this,
        testEnv.EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT,
        new AzureKeyCredential(testEnv.EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY)
      ));
    });

    afterEach(() => {
      recorder.stop();
    });

    it("sends a single event", async () => {
      const res = await client.sendCloudEvents([
        {
          type: "Azure.Sdk.TestEvent1",
          id: recorder.getUniqueName("cloudSingleEventId"),
          time: recorder.newDate("cloudSingleEventDate"),
          source: "/earth/unitedstates/washington/kirkland/finnhill",
          data: {
            hello: "world"
          }
        }
      ]);

      assert.equal(res._response.status, 200);
    });

    it("sends multiple events", async () => {
      const res = await client.sendCloudEvents([
        {
          type: "Azure.Sdk.TestEvent1",
          id: recorder.getUniqueName("cloudMultiEventId1"),
          time: recorder.newDate("cloudMultiEventDate1"),
          source: "/earth/unitedstates/washington/kirkland/finnhill",
          subject: "Multiple 1",
          data: {
            hello: "world"
          }
        },
        {
          type: "Azure.Sdk.TestEvent1",
          id: recorder.getUniqueName("cloudMultiEventId2"),
          time: recorder.newDate("cloudMultiEventDate2"),
          source: "/earth/unitedstates/washington/kirkland/finnhill",
          subject: "Multiple 2",
          data: {
            hello: "world"
          }
        }
      ]);

      assert.equal(res._response.status, 200);
    });

    // TODO(matell): Write a test that ensures any cloud event extensions are serialized with
    // the event itself.
  });

  describe("#sendCustomSchemaEvents", function() {
    beforeEach(function() {
      ({ client, recorder } = createRecordedClient(
        this,
        testEnv.EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT,
        new AzureKeyCredential(testEnv.EVENT_GRID_CUSTOM_SCHEMA_API_KEY)
      ));
    });

    afterEach(() => {
      recorder.stop();
    });

    it("sends a single event", async () => {
      const res = await client.sendCustomSchemaEvents([
        {
          ver: "1.0",
          typ: "Azure.Sdk.TestEvent1",
          sub: "Single",
          payload: {
            hello: "world"
          }
        }
      ]);

      assert.equal(res._response.status, 200);
    });

    it("sends multiple events", async () => {
      const res = await client.sendCustomSchemaEvents([
        {
          ver: "1.0",
          typ: "Azure.Sdk.TestEvent1",
          sub: "Multiple 1",
          payload: {
            hello: "world"
          }
        },
        {
          ver: "1.0",
          typ: "Azure.Sdk.TestEvent1",
          sub: "Multiple 2",
          payload: {
            hello: "world"
          }
        }
      ]);

      assert.equal(res._response.status, 200);
    });
  });

  describe("#generateSharedAccessSigniture", () => {
    it("generates the correct signiture", async () => {
      // This is not a real key, it's the base64 encoding of "this is not a real EventGrid key", which happens to be the same
      // number of bytes as an actual EventGrid Access Key.
      const key = "dGhpcyBpcyBub3QgYSByZWFsIEV2ZW50R3JpZCBrZXk=";

      const client = new EventGridPublisherClient(
        "https://eg-topic.westus-2.eventgrid.azure.net/api/events",
        new AzureKeyCredential(key)
      );

      const sig = await client.generateSharedAccessSignature(
        new Date(Date.UTC(2020, 0, 1, 0, 0, 0))
      );
      assert.equal(
        sig,
        "r=https%3A%2F%2Feg-topic.westus-2.eventgrid.azure.net%2Fapi%2Fevents%3FapiVersion%3D2018-01-01&e=1%2F1%2F2020%2012%3A00%3A00%20AM&s=ZzvNAYRyvJwDrOJKYxbNAPNCoSqgOJVLFi4IMXOrW2Q%3D"
      );
    });

    it("fails when a signature credential was used", () => {
      const signature =
        "r=https%3A%2F%2Feg-topic.westus-2.eventgrid.azure.net%2Fapi%2Fevents%3FapiVersion%3D2018-01-01&e=1%2F1%2F2020%2012%3A00%3A00%20AM&s=ZzvNAYRyvJwDrOJKYxbNAPNCoSqgOJVLFi4IMXOrW2Q%3D";

      const client = new EventGridPublisherClient(
        "https://eg-topic.westus-2.eventgrid.azure.net/api/events",
        new EventGridSharedAccessSignatureCredential(signature)
      );

      assert.isRejected(
        client.generateSharedAccessSignature(new Date(Date.UTC(2020, 0, 1, 0, 0, 0))),
        /may only be called when the client is constructed with a key credential/
      );
    });
  });
});
