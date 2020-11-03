# Introduction

Azure Digital Twins is a developer platform for next-generation IoT solutions that lets you create, run, and manage digital representations of your business environment, securely and efficiently in the cloud. With Azure Digital Twins, creating live operational state representations is quick and cost-effective, and digital representations stay current with real-time data from IoT and other data sources. If you are new to Azure Digital Twins and would like to learn more about the platform, please make sure you check out the Azure Digital Twins [official documentation page](https://docs.microsoft.com/azure/digital-twins/overview).

For an introduction on how to program against the Azure Digital Twins service, visit the [coding tutorial page](https://docs.microsoft.com/azure/digital-twins/tutorial-code) for an easy step-by-step guide. Visit [this tutorial](https://docs.microsoft.com/azure/digital-twins/tutorial-command-line-app) to learn how to interact with an Azure Digital Twin instance using a command-line client application. Finally, for a quick guide on how to build an end-to-end Azure Digital Twins solution that is driven by live data from your environment, make sure you check out [this helpful guide](https://docs.microsoft.com/azure/digital-twins/tutorial-end-to-end).

The guides mentioned above can help you get started with key elements of Azure Digital Twins, such as creating Azure Digital Twins instances, models, twin graphs, etc. Use this samples guide below to familiarize yourself with the various APIs that help you program against Azure Digital Twins.

# Digital Twins Samples

You can explore the digital twins APIs (using the client library) using the samples project.

The samples project demonstrates the following:

- Instantiate the client
- Create, get, and decommission models
- Create, query, and delete a digital twin
- Get and update components for a digital twin
- Create, get, and delete relationships between digital twins
- Create, get, and delete event routes for digital twin
- Publish telemetry messages to a digital twin and digital twin component

## Creating the digital twins client

To create a new digital twins client, you need the endpoint to an Azure Digital Twin instance and credentials.
For the samples below, the `AZURE_URL`, `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, and `AZURE_CLIENT_SECRET` environment variables have to be set.
The client requires an instance of [TokenCredential](https://docs.microsoft.com/dotnet/api/azure.core.tokencredential?view=azure-dotnet) or [ServiceClientCredentials](https://docs.microsoft.com/dotnet/api/microsoft.rest.serviceclientcredentials?view=azure-dotnet).
In this samples, we illustrate how to use one derived class: [DefaultAzureCredentials](https://docs.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet).

> Note: In order to access the data plane for the Digital Twins service, the entity must be given permissions.
> To do this, use the Azure CLI command: `az dt rbac assign-role --assignee '<user-email | application-id>' --role owner -n '<your-digital-twins-core-instance>'`

```JavaScript Snippet:dt_create_service_client_with_secret.js
// DefaultAzureCredential supports different authentication mechanisms and determines the appropriate credential type based of the environment it is executing in.
// It attempts to use multiple credential types in an order until it finds a working credential.

// - AZURE_URL: The tenant ID in Azure Active Directory
const url = process.env.AZURE_URL;

// DefaultAzureCredential expects the following three environment variables:
// - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// - AZURE_CLIENT_SECRET: The client secret for the registered application
const credential = new DefaultAzureCredential();
const serviceClient = new DigitalTwinsClient(url, credential);
```

Also, if you need to override pipeline behavior, such as provide your own HttpClient instance, you can do that via the other constructor that takes a client options.
It provides an opportunity to override default behavior including:

- Specifying API version
- Overriding [transport](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Pipeline.md)
- Enabling [diagnostics](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Diagnostics.md)
- Controlling [retry strategy](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/core/Azure.Core/samples/Configuration.md)

## Create, list, decommission, and delete models

### Create models

Let's create models using the code below. You need to pass in `any[]` containing list of json models.
Check out sample models [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/digitaltwins/digital-twins-core/samples/dtdl/models).
Note: The sample dtdls are using "ts" extension in the Typescript repository. If you want to use the dtdl samples with CLI tools please
change their extension to "json".

```JavaScript Snippet:dt_models_lifecycle.js
const newModels = [temporaryComponent, temporaryModel];
const models = await serviceClient.createModels(newModels);
console.log(models);
```

### List models

Using `listModels`, all created models are returned as `PagedAsyncIterableIterator`.

```JavaScript Snippet:dt_models_list
const models = await serviceClient.listModels();
for await (const model of models) {
  console.log(`Model Id: ${model.id}`);
}
```

### Get model

Use `getModel` with model's unique identifier to get a specific model.

```JavaScript Snippet:dt_models_lifecycle
const model = await serviceClient.getModel(modelId);
```

### Decommission models

To decommision a model, pass in a model Id for the model you want to decommision.

```JavaScript Snippet:dt_models_lifecycle
await serviceClient.decomissionModel(modelId);
```

### Delete models

To delete a model, pass in a model Id for the model you want to delete.

```JavaScript Snippet:dt_models_lifecycle
await serviceClient.deleteModel(modelId);
```

## Create and delete digital twins

### Create digital twins

For Creating Twin you will need to provide Id of a digital Twin such as `myTwin` and the application/json digital twin based on the model created earlier. You can look at sample application/json [here](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/samples/dtdl/digitalTwins "DigitalTwin").

```JavaScript Snippet:dt_digitaltwins_lifecycle
const digitalTwinId = "myTwin";
const newTwin = "<JSON containing the digitalTwin object>";
const createdTwin = await serviceClient.upsertDigitalTwin(
  digitalTwinId,
  newTwin
);
```

### Get a digital twin

Getting a digital twin is extremely easy.

```JavaScript Snippet:dt_digitaltwins_lifecycle
const digitalTwinId = "myTwin";
const twin = await serviceClient.getDigitalTwin(digitalTwinId);
console.log(`DigitalTwin's etag: ${twin.eTag}`);
console.log(`DigitalTwin: ${twin.body}`);
```

### Query digital twins

Query the Azure Digital Twins instance for digital twins using the [Azure Digital Twins Query Store lanaguage](https://review.docs.microsoft.com/azure/digital-twins/concepts-query-language). Query calls support paging. Here's an example of how to query for digital twins and how to iterate over the results.

Note that there may be a delay between before changes in your instance are reflected in queries.
For more details on query limitations, see ("https://docs.microsoft.com/en-us/azure/digital-twins/how-to-query-graph#query-limitations">Query)

```JavaScript Snippet:dt_digitaltwins_query
const query = "SELECT * FROM digitaltwins";
const queryResult = serviceClient.queryTwins(query);
for await (const item of queryResult) {
  console.log(`DigitalTwin: ${item}`);
}
```

### Delete digital twins

Delete a digital twin simply by providing Id of a digital twin as below.

```JavaScript Snippet:dt_digitaltwins_lifecycle
const digitalTwinId = "myTwin";
await serviceClient.deleteDigitalTwin(digitalTwinId);
```

## Get and update digital twin components

### Update digital twin components

To update a component or in other words to replace, remove and/or add a component property or subproperty within Digital Twin, you would need Id of a digital twin, component name and application/json-patch+json operations to be performed on the specified digital twin's component. Here is the sample code on how to do it.

```JavaScript Snippet:dt_component_lifecycle
// Update Component1 by replacing the property ComponentProp1 value
const digitalTwinId = "myTwin";
const componentPath = "Component1";
const jsonPatch = {
  ComponentProp1: "value2"
};
await serviceClient.updateComponent(digitalTwinId, componentPath, jsonPatch);
```

### Get digital twin components

Get a component by providing name of a component and Id of digital twin to which it belongs.

```JavaScript Snippet:DigitalTwinsSampleGetComponent
const digitalTwinId = "myTwin";
const componentPath = "Component1";
const component = await serviceClient.getComponent(digitalTwinId, componentPath);
console.log(`Updated component: ${component}`);
```

## Create and list digital twin relationships

### Create digital twin relationships

`upsertRelationship` creates a relationship on a digital twin provided with Id of a digital twin, name of relationship such as "contains", Id of an relationship such as "FloorContainsRoom" and an application/json relationship to be created. Must contain property with key "\$targetId" to specify the target of the relationship. Sample payloads for relationships can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/digitaltwins/digital-twins-core/samples/dtdl/relationships/hospitalRelationships.ts "RelationshipExamples").

```JavaScript Snippet:dt_scenario
const hospitalRelationships = [
  {
    $relationshipId: "BuildingHasFloor",
    $sourceId: "BuildingTwin",
    $relationshipName: "has",
    $targetId: "FloorTwin",
    isAccessRestricted: false
  }];
for (const relationship of hospitalRelationships) {
  await serviceClient.upsertRelationship(
    relationship["$sourceId"],
    relationship["$relationshipId"],
    relationship
  );
}
```

### List digital twin relationships

`listRelationships` and `listIncomingRelationships` lists all the relationships and all incoming relationships respectively of a digital twin.

```JavaScript Snippet:dt_relationships_list
const digitalTwinId = "myTwin";
const relationships = serviceClient.listRelationships(digitalTwinId);
for await (const relationship of relationships) {
  console.log(`EventRoute: ${relationship}`);
}
```

```JavaScript Snippet:dt_incoming_relationships_list
const digitalTwinId = "myTwin";
const incomingRelationships = serviceClient.listIncomingRelationships(digitalTwinId);
for await (const incomingRelationship of incomingRelationships) {
  console.log(`EventRoute: ${incomingRelationship}`);
}
```

## Create, list, and delete event routes of digital twins

### Create event routes

To create an event route, provide an Id of an event route such as "myEventRouteId" and event route data containing the endpoint and optional filter like the example shown below.

```JavaScript Snippet:dt_scenario
const eventHubEndpointName = "myEventHubEndpointName";
const eventRouteId = "myEventRouteId";
const eventFilter =
  "$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'";
await serviceClient.upsertEventRoute(
  eventRouteId,
  eventHubEndpointName,
  eventFilter
);
```

For more information on the event route filter language, see the "how to manage routes" [filter events documentation](https://github.com/Azure/azure-digital-twins/blob/private-preview/Documentation/how-to-manage-routes.md#filter-events).

### List event routes

List a specific event route given event route Id or all event routes setting options with `listEventRoutes`.

```JavaScript Snippet:dt_event_routes_list
const digitalTwinId = "myTwin";
const eventRoutes = serviceClient.listEventRoutes(digitalTwinId);
for await (const eventRoute of eventRoutes) {
  console.log(`EventRoute: ${eventRoute}`);
}
```

### Delete event routes

Delete an event route given event route Id.

```JavaScript Snippet:dt_scenario
const eventRouteId = "myEventRouteId";
await serviceClient.deleteEventRoute(eventRouteId);
```

### Publish telemetry messages for a digital twin

To publish a telemetry message for a digital twin, you need to provide the digital twin Id, along with the payload on which telemetry that needs the update.

```JavaScript Snippet:dt_publish_telemetry
const digitalTwinId = "<DIGITAL TWIN ID>";
const telemetryPayload = '{"Telemetry1": 5}';
await serviceClient.publishTelemetry(digitalTwinId, telemetryPayload);
```

You can also publish a telemetry message for a specific component in a digital twin. In addition to the digital twin Id and payload, you need to specify the target component Id.

```JavaScript Snippet:dt_publish_component_telemetry
  const digitalTwinId = "<DIGITAL TWIN ID>";
  const componentPath = "<COMPONENT_PATH>";
  const telemetryPayload = '{"Telemetry1": 5}';
  await serviceClient.publishComponentTelemetry(
    digitalTwinId,
    componentPath,
    telemetryPayload
  );
```
