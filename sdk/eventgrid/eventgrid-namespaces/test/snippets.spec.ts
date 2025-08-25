// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  EventGridReceiverClient,
  EventGridSenderClient,
} from "@azure/eventgrid-namespaces";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const eventGridSenderClient = new EventGridSenderClient(
      "<endpoint>",
      new AzureKeyCredential("<Access Key>"),
      "<topic-name>",
    );
    // @ts-preserve-whitespace
    const eventGridReceiverClient = new EventGridReceiverClient(
      "<endpoint>",
      new AzureKeyCredential("<Access Key>"),
      "<topic-name>",
      "<subscription-name>",
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const eventGridSenderClient = new EventGridSenderClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<topic-name>",
    );
    // @ts-preserve-whitespace
    const eventGridReceiverClient = new EventGridReceiverClient(
      "<endpoint>",
      new DefaultAzureCredential(),
      "<topic-name>",
      "<subscription-name>",
    );
  });

  it("ReadmeSample_SenderClient", async () => {
    const eventGridSenderClient = new EventGridSenderClient(
      "<endpoint>",
      new AzureKeyCredential("<API Key>"),
      "<topic-name>",
    );
  });

  it("ReadmeSample_ReceiverClient", async () => {
    const eventGridReceiverClient = new EventGridReceiverClient(
      "<endpoint>",
      new AzureKeyCredential("<API Key>"),
      "<topicName>",
      "<subscription-name>",
    );
  });

  it("ReadmeSamplePublishEvent", async () => {
    const client = new EventGridSenderClient(
      "<endpoint>",
      new AzureKeyCredential("<API key>"),
      "<subscription-name>",
    );
    // @ts-preserve-whitespace
    const cloudEvent = {
      type: "example",
      source: "https://example.com",
      id: `singleEventIdV210001`,
      time: new Date(),
      data: {
        resourceUri: "https://dummyurl.com",
      },
      specversion: "1.0",
    };
    // @ts-preserve-whitespace
    // Publish the Cloud Event
    await client.sendEvents(cloudEvent);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
