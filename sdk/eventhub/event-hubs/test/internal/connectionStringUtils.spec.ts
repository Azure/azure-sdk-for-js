// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseEventHubConnectionString } from "@azure/event-hubs";
import { describe, it } from "vitest";
import { assert } from "../utils/chai.js";

describe("parseEventHubConnectionString", () => {
  const namespace = "my.servicebus.windows.net";
  const sharedAccessKey = "shared-access-key";
  const sharedAccessKeyName = "shared-access-key-name";
  const sharedAccessSignature = "shared-access-signature";
  const endpoint = "sb://my.servicebus.windows.net";
  const eventHubName = "event-hub-name";

  describe("with valid data", () => {
    it("parses a full connection string correctly", async () => {
      const expected = {
        fullyQualifiedNamespace: namespace,
        endpoint: endpoint,
        eventHubName: eventHubName,
        sharedAccessKeyName: sharedAccessKeyName,
        sharedAccessKey: sharedAccessKey,
      };

      const connectionString = `Endpoint=${endpoint};EntityPath=${eventHubName};SharedAccessKeyName=${sharedAccessKeyName};SharedAccessKey=${sharedAccessKey}`;

      assert.deepEqual(parseEventHubConnectionString(connectionString), expected);
    });

    it("parses a minimal connection string correctly", async () => {
      const expected = {
        fullyQualifiedNamespace: namespace,
        endpoint: endpoint,
        sharedAccessSignature: sharedAccessSignature,
      };

      const connectionString = `Endpoint=${endpoint};SharedAccessSignature=${sharedAccessSignature}`;

      assert.deepEqual(parseEventHubConnectionString(connectionString), expected);
    });
  });

  describe("with invalid data", () => {
    it("throws when Endpoint is missing", async () => {
      const connectionString = `SharedAccessSignature=${sharedAccessSignature}`;
      assert.throws(() => {
        parseEventHubConnectionString(connectionString);
      }, /Connection string/);
    });

    it("throws when both SharedAccessSignature and SharedAccessKey are provided", async () => {
      const connectionString = `Endpoint=${endpoint};SharedAccessSignature=${sharedAccessSignature};SharedAccessKey=${sharedAccessKey}`;
      assert.throws(() => {
        parseEventHubConnectionString(connectionString);
      }, /Connection string/);
    });

    it("throws when both SharedAccessSignature and SharedAccessKeyName are provided", async () => {
      const connectionString = `Endpoint=${endpoint};SharedAccessSignature=${sharedAccessSignature};SharedAccessKeyName=${sharedAccessKeyName}`;
      assert.throws(() => {
        parseEventHubConnectionString(connectionString);
      }, /Connection string/);
    });

    it("throws when SharedAccessKey is provided without SharedAccessKeyName", async () => {
      const connectionString = `Endpoint=${endpoint};SharedAccessKey=${sharedAccessKey}`;
      assert.throws(() => {
        parseEventHubConnectionString(connectionString);
      }, /Connection string/);
    });

    it("throws when SharedAccessKeyName is provided without SharedAccessKey", async () => {
      const connectionString = `Endpoint=${endpoint};SharedAccessKeyName=${sharedAccessKeyName}`;
      assert.throws(() => {
        parseEventHubConnectionString(connectionString);
      }, /Connection string/);
    });
  });
});
