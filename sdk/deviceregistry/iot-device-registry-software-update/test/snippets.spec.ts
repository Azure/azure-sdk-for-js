// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistrySoftwareUpdateClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new DeviceRegistrySoftwareUpdateClient(
      "contoso.api.adu.microsoft.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new DeviceRegistrySoftwareUpdateClient(
      "contoso.api.adu.microsoft.com",
      credential,
    );
  });

  it("ReadmeSampleListProviders", async () => {
    const client = new DeviceRegistrySoftwareUpdateClient(
      "contoso.api.adu.microsoft.com",
      new DefaultAzureCredential(),
    );

    for await (const provider of client.softwareUpdate.listProviders()) {
      console.log(provider);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
