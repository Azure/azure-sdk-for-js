// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { parseNotificationHubsConnectionString } from "../../../src/auth/connectionStringUtils.js";

describe("parseNotificationHubsConnectionString", () => {
  it("should parse a well formed connection string", () => {
    const connectionString =
      "Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=XXX";
    const parsedConnection = parseNotificationHubsConnectionString(connectionString);

    assert.equal(parsedConnection.endpoint, "sb://xxx.servicebus.windows.net/");
    assert.equal(parsedConnection.sharedAccessKey, "XXX");
    assert.equal(parsedConnection.sharedAccessKeyName, "DefaultListenSharedAccessSignature");
  });

  it("should throw if there is no endpoint", () => {
    const connectionString =
      "SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=XXX";
    assert.throws(() => parseNotificationHubsConnectionString(connectionString));
  });

  it("should throw if there are no shared access keys or name", () => {
    const connectionString = "Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKey=XXX";
    assert.throws(() => parseNotificationHubsConnectionString(connectionString));
  });
});
