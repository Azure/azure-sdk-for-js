// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { ServiceBusAdministrationClient } from "@azure/service-bus";

describe("ServiceBusAtomAdminClient", () => {
  it("use HTTPS by default", () => {
    const connectionString = "Endpoint=sb://mynamespace.servicebus.windows.net;";
    const adminClient = new ServiceBusAdministrationClient(connectionString);
    assert.equal(adminClient["useTls"], true);
  });

  it("use HTTP when connect to emulator", () => {
    const connectionString = "Endpoint=sb://192.168.y.z;UseDevelopmentEmulator=true;";
    const adminClient = new ServiceBusAdministrationClient(connectionString);
    assert.equal(adminClient["useTls"], false);
  });
});
