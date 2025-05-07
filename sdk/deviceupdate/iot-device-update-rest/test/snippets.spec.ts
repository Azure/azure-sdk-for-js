// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import DeviceUpdate from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = "https://<my-instance-id>.api.adu.microsoft.com";
    const client = DeviceUpdate(endpoint, new DefaultAzureCredential());
  });

  it("ReadmeSampleGetAllDevices", async () => {
    const endpoint = "https://<my-instance-id>.api.adu.microsoft.com";
    const client = DeviceUpdate(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const instanceId = "<my-instance-id>";
    const result = await client
      .path("/deviceupdate/{instanceId}/management/devices", instanceId)
      .get();
    // @ts-preserve-whitespace
    console.log(result);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
