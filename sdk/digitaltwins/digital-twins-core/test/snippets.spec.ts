// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
  });

  it("ReadmeSampleCreateModels", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const myComponent = {
      "@id": "dtmi:my_component;1",
      "@type": "Interface",
      "@context": "dtmi:dtdl:context;2",
      displayName: "Component1",
      contents: [
        {
          "@type": "Property",
          name: "ComponentProp1",
          schema: "string",
        },
      ],
    };
    // @ts-preserve-whitespace
    const models = await serviceClient.createModels([myComponent]);
  });

  it("ReadmeSampleListModels", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const models = serviceClient.listModels();
    for await (const model of models) {
      console.log(`Model ID: ${model.id}`);
    }
  });

  it("ReadmeSampleGetModel", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const model = await serviceClient.getModel("<model ID>");
  });

  it("ReadmeSampleDecomissionModel", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    await serviceClient.decomissionModel("<model ID>");
  });

  it("ReadmeSampleDeleteModel", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    await serviceClient.deleteModel("<model ID>");
  });

  it("ReadmeSampleCreateDigitalTwin", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    const newTwin = "<JSON containing the digitalTwin object>";
    const createdTwin = await serviceClient.upsertDigitalTwin(digitalTwinId, newTwin);
  });

  it("ReadmeSampleGetDigitalTwin", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    const twin = await serviceClient.getDigitalTwin(digitalTwinId);
    console.log(`DigitalTwin's etag: ${twin.etag}`);
    console.log(`DigitalTwin: ${twin}`);
  });

  it("ReadmeSampleQueryDigitalTwins", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const query = "SELECT * FROM digitaltwins";
    const queryResult = serviceClient.queryTwins(query);
    for await (const item of queryResult) {
      console.log(`DigitalTwin: ${item}`);
    }
  });

  it("ReadmeSampleDeleteDigitalTwin", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    await serviceClient.deleteDigitalTwin(digitalTwinId);
  });

  it("ReadmeSampleGetComponent", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    const componentPath = "Component1";
    const component = await serviceClient.getComponent(digitalTwinId, componentPath);
    console.log(`Component: ${component}`);
  });

  it("ReadmeSampleUpdateComponent", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    const componentPath = "Component1";
    const patch = {
      op: "replace",
      path: "/ComponentProp1",
      value: "value2",
    };
    const updateComponentResponse = await serviceClient.updateComponent(
      digitalTwinId,
      componentPath,
      [patch],
    );
  });

  it("ReadmeSampleCreateRelationship", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const relationship = {
      $relationshipId: "BuildingHasFloor",
      $sourceId: "BuildingTwin",
      $relationshipName: "has",
      $targetId: "FloorTwin",
      isAccessRestricted: false,
    };
    // @ts-preserve-whitespace
    await serviceClient.upsertRelationship(
      relationship["$sourceId"],
      relationship["$relationshipId"],
      relationship,
    );
  });

  it("ReadmeSampleListRelationships", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    const relationships = serviceClient.listRelationships(digitalTwinId);
    for await (const relationship of relationships) {
      console.log(`Relationship: ${relationship}`);
    }
  });

  it("ReadmeSampleListIncomingRelationships", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "myTwin";
    const incomingRelationships = serviceClient.listIncomingRelationships(digitalTwinId);
    for await (const incomingRelationship of incomingRelationships) {
      console.log(`Relationship: ${incomingRelationship}`);
    }
  });

  it("ReadmeSampleCreateEventRoute", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const eventHubEndpointName = "myEventHubEndpointName";
    const eventRouteId = "myEventRouteId";
    const eventFilter =
      "$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'";
    await serviceClient.upsertEventRoute(eventRouteId, eventHubEndpointName, eventFilter);
  });

  it("ReadmeSampleGetEventRoute", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const eventRouteId = "myEventRouteId";
    const eventRoute = serviceClient.getEventRoute(eventRouteId);
    console.log(`EventRoute: ${eventRoute}`);
  });

  it("ReadmeSampleListEventRoutes", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const eventRoutes = serviceClient.listEventRoutes();
    for await (const eventRoute of eventRoutes) {
      console.log(`EventRoute: ${eventRoute}`);
    }
  });

  it("ReadmeSampleDeleteEventRoute", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const eventRouteId = "myEventRouteId";
    await serviceClient.deleteEventRoute(eventRouteId);
  });

  it("ReadmeSamplePublishTelemetry", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "<digital twin ID>";
    const telemetryPayload = { Telemetry1: 5 };
    const response = await serviceClient.publishTelemetry(
      digitalTwinId,
      telemetryPayload,
      "<unique message ID>",
    );
  });

  it("ReadmeSamplePublishComponentTelemetry", async () => {
    const url = "<URL to Azure Digital Twins instance>";
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);
    // @ts-preserve-whitespace
    const digitalTwinId = "<digital twin ID>";
    const componentPath = "<component path>";
    const telemetryPayload = { Telemetry1: 5 };
    const response = await serviceClient.publishComponentTelemetry(
      digitalTwinId,
      componentPath,
      telemetryPayload,
      "<unique message ID>",
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
