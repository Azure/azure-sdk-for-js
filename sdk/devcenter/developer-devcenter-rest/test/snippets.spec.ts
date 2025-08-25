// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import AzureDeveloperDevCenter from "@azure-rest/developer-devcenter";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = process.env["DEVCENTER_ENDPOINT"] || "<endpoint>";
    const client = AzureDeveloperDevCenter(endpoint, new DefaultAzureCredential());
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
