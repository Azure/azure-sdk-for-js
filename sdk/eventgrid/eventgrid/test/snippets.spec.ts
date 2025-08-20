// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  AzureSASCredential,
  EventGridDeserializer,
  EventGridPublisherClient,
  generateSharedAccessSignature,
  isSystemEvent,
} from "@azure/eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "EventGrid",
      new AzureKeyCredential("<Access Key>"),
    );
  });

  it("ReadmeSampleCreateClient_SASCredential", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "EventGrid",
      new AzureSASCredential("<SAS Token>"),
    );
  });

  it("ReadmeSample_GenerateSasToken", async () => {
    // Create a SAS Token which expires on 2020-01-01 at Midnight.
    const token = generateSharedAccessSignature(
      "<endpoint>",
      new AzureKeyCredential("<API key>"),
      new Date("2020-01-01T00:00:00"),
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "CloudEvent",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleCreateClient_EventGrid", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "EventGrid",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleCreateClient_CloudEvent", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "CloudEvent",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleCreateClient_Custom", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "Custom",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSample_PublishCustomEvent", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "EventGrid",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    await client.send([
      {
        eventType: "Azure.Sdk.SampleEvent",
        subject: "Event Subject",
        dataVersion: "1.0",
        data: {
          hello: "world",
        },
      },
    ]);
  });

  it("ReadmeSample_PublishCustomEventToDomain", async () => {
    const client = new EventGridPublisherClient(
      "<endpoint>",
      "EventGrid",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    await client.send([
      {
        topic: "my-sample-topic",
        eventType: "Azure.Sdk.SampleEvent",
        subject: "Event Subject",
        dataVersion: "1.0",
        data: {
          hello: "world",
        },
      },
    ]);
  });

  it("ReadmeSample_DeserializeEvent", async () => {
    const deserializer = new EventGridDeserializer();
    const message = {
      id: "5bc888aa-c2f4-11ea-b3de-0242ac130004",
      source:
        "/subscriptions/<subscriptionid>/resourceGroups/dummy-rg/providers/Microsoft.EventGrid/topics/dummy-topic",
      specversion: "1.0",
      type: "Microsoft.ContainerRegistry.ImagePushed",
      subject: "Test Subject",
      time: "2020-07-10T21:27:12.925Z",
      data: {
        hello: "world",
      },
    };
    const deserializedMessage = await deserializer.deserializeCloudEvents(message);
    console.log(deserializedMessage);

    if (
      deserializedMessage != null &&
      deserializedMessage.length !== 0 &&
      isSystemEvent("Microsoft.ContainerRegistry.ImagePushed", deserializedMessage[0])
    ) {
      console.log("This is a Microsoft.ContainerRegistry.ImagePushed event");
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
