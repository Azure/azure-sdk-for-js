---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-digital-twins
urlFragment: digital-twins-core-typescript
---

# Azure Digital Twins client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Digital Twins in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [dt_component_lifecycle.ts][dt_component_lifecycle]                               | demonstrates the lifecycle (create, update, get, decommission, delete) of a component                                                 |
| [dt_create_digitaltwins_service_client.ts][dt_create_digitaltwins_service_client] | Simple example of how to create a DigitalTwins Service Client using the DigitalTwinsClient constructor                                |
| [dt_digitaltwins_delete.ts][dt_digitaltwins_delete]                               | Example of how to delete digital twin                                                                                                 |
| [dt_digitaltwins_get.ts][dt_digitaltwins_get]                                     | Simple example of how to get digital twin                                                                                             |
| [dt_digitaltwins_lifecycle.ts][dt_digitaltwins_lifecycle]                         | demonstrates the lifecycle (create, get, update, delete) of a digital twin                                                            |
| [dt_digitaltwins_query.ts][dt_digitaltwins_query]                                 | Simple example of how to query digital twins                                                                                          |
| [dt_event_routes_get.ts][dt_event_routes_get]                                     | Simple example of how to get an event route.                                                                                          |
| [dt_event_routes_list.ts][dt_event_routes_list]                                   | Simple example of how to list all eventRoutes using the paginated API                                                                 |
| [dt_incoming_relationships_list.ts][dt_incoming_relationships_list]               | Simple example of how to list all incoming relationships using the paginated API                                                      |
| [dt_models_delete.ts][dt_models_delete]                                           | Scenario example of how to delete models                                                                                              |
| [dt_models_get.ts][dt_models_get]                                                 | Simple example of how to list all models using the paginated API                                                                      |
| [dt_models_lifecycle.ts][dt_models_lifecycle]                                     | demonstrates the lifecycle (create, get, list, decommission, delete) of a model                                                       |
| [dt_models_list.ts][dt_models_list]                                               | Simple example of how to list all models using the paginated API                                                                      |
| [dt_publish_component_telemetry.ts][dt_publish_component_telemetry]               | Simple example of how to publish a component telemetry message                                                                        |
| [dt_publish_telemetry.ts][dt_publish_telemetry]                                   | Simple example of how to publish telemetry message                                                                                    |
| [dt_relationships_get.ts][dt_relationships_get]                                   | Simple example of how to get relationship                                                                                             |
| [dt_relationships_list.ts][dt_relationships_list]                                 | Simple example of how to list all relationships using the paginated API                                                               |
| [dt_scenario.ts][dt_scenario]                                                     | Demonstrates a scenario with models, digital twins, event routes, and relationships using the DTDL examples found in the DTDL folder. |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Digital Twins instance][createinstance_azuredigitaltwinsinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/dt_component_lifecycle.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AZURE_DIGITALTWINS_URL="<azure digitaltwins url>" node dist/dt_component_lifecycle.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dt_component_lifecycle]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_component_lifecycle.ts
[dt_create_digitaltwins_service_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_create_digitaltwins_service_client.ts
[dt_digitaltwins_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_digitaltwins_delete.ts
[dt_digitaltwins_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_digitaltwins_get.ts
[dt_digitaltwins_lifecycle]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_digitaltwins_lifecycle.ts
[dt_digitaltwins_query]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_digitaltwins_query.ts
[dt_event_routes_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_event_routes_get.ts
[dt_event_routes_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_event_routes_list.ts
[dt_incoming_relationships_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_incoming_relationships_list.ts
[dt_models_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_models_delete.ts
[dt_models_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_models_get.ts
[dt_models_lifecycle]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_models_lifecycle.ts
[dt_models_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_models_list.ts
[dt_publish_component_telemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_publish_component_telemetry.ts
[dt_publish_telemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_publish_telemetry.ts
[dt_relationships_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_relationships_get.ts
[dt_relationships_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_relationships_list.ts
[dt_scenario]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v1/typescript/src/dt_scenario.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/digital-twins-core
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuredigitaltwinsinstance]: https://learn.microsoft.com/azure/digital-twins/how-to-set-up-instance-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/digital-twins-core/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
