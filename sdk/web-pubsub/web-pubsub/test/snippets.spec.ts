// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, WebPubSubServiceClient, odata } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new WebPubSubServiceClient("<endpoint>", new DefaultAzureCredential(), "<hubName>");
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new WebPubSubServiceClient("<endpoint>", credential, "<hubName>");
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const key = new AzureKeyCredential("<Key>");
    const serviceClient = new WebPubSubServiceClient("<Endpoint>", key, "<hubName>");
  });

  it("ReadmeSampleOdata", async () => {
    const userId = "vic's";
    const anonymous = null;
    const length = 3;
    const filter = odata`userId eq ${anonymous} or userId eq ${userId} or length(userId) > ${length}`;
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
