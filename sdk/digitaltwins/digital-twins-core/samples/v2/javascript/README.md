---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-digital-twins
urlFragment: digital-twins-core-javascript
---

# Azure Digital Twins client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Digital Twins in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [dt_component_lifecycle.js][dt_component_lifecycle]                               | demonstrates the lifecycle (create, update, get, decommission, delete) of a component                                                 |
| [dt_create_digitaltwins_service_client.js][dt_create_digitaltwins_service_client] | Simple example of how to create a DigitalTwins Service Client using the DigitalTwinsClient constructor                                |
| [dt_digitaltwins_delete.js][dt_digitaltwins_delete]                               | Example of how to delete digital twin                                                                                                 |
| [dt_digitaltwins_get.js][dt_digitaltwins_get]                                     | Simple example of how to get digital twin                                                                                             |
| [dt_digitaltwins_lifecycle.js][dt_digitaltwins_lifecycle]                         | demonstrates the lifecycle (create, get, update, delete) of a digital twin                                                            |
| [dt_digitaltwins_query.js][dt_digitaltwins_query]                                 | Simple example of how to query digital twins                                                                                          |
| [dt_event_routes_get.js][dt_event_routes_get]                                     | Simple example of how to get an event route.                                                                                          |
| [dt_event_routes_list.js][dt_event_routes_list]                                   | Simple example of how to list all eventRoutes using the paginated API                                                                 |
| [dt_incoming_relationships_list.js][dt_incoming_relationships_list]               | Simple example of how to list all incoming relationships using the paginated API                                                      |
| [dt_models_delete.js][dt_models_delete]                                           | Scenario example of how to delete models                                                                                              |
| [dt_models_get.js][dt_models_get]                                                 | Simple example of how to list all models using the paginated API                                                                      |
| [dt_models_lifecycle.js][dt_models_lifecycle]                                     | demonstrates the lifecycle (create, get, list, decommission, delete) of a model                                                       |
| [dt_models_list.js][dt_models_list]                                               | Simple example of how to list all models using the paginated API                                                                      |
| [dt_publish_component_telemetry.js][dt_publish_component_telemetry]               | Simple example of how to publish a component telemetry message                                                                        |
| [dt_publish_telemetry.js][dt_publish_telemetry]                                   | Simple example of how to publish telemetry message                                                                                    |
| [dt_relationships_get.js][dt_relationships_get]                                   | Simple example of how to get relationship                                                                                             |
| [dt_relationships_list.js][dt_relationships_list]                                 | Simple example of how to list all relationships using the paginated API                                                               |
| [dt_scenario.js][dt_scenario]                                                     | Demonstrates a scenario with models, digital twins, event routes, and relationships using the DTDL examples found in the DTDL folder. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dt_component_lifecycle.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AZURE_DIGITALTWINS_URL="<azure digitaltwins url>" node dt_component_lifecycle.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dt_component_lifecycle]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_component_lifecycle.js
[dt_create_digitaltwins_service_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_create_digitaltwins_service_client.js
[dt_digitaltwins_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_digitaltwins_delete.js
[dt_digitaltwins_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_digitaltwins_get.js
[dt_digitaltwins_lifecycle]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_digitaltwins_lifecycle.js
[dt_digitaltwins_query]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_digitaltwins_query.js
[dt_event_routes_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_event_routes_get.js
[dt_event_routes_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_event_routes_list.js
[dt_incoming_relationships_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_incoming_relationships_list.js
[dt_models_delete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_models_delete.js
[dt_models_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_models_get.js
[dt_models_lifecycle]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_models_lifecycle.js
[dt_models_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_models_list.js
[dt_publish_component_telemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_publish_component_telemetry.js
[dt_publish_telemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_publish_telemetry.js
[dt_relationships_get]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_relationships_get.js
[dt_relationships_list]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_relationships_list.js
[dt_scenario]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/digital-twins-core/samples/v2/javascript/dt_scenario.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/digital-twins-core
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuredigitaltwinsinstance]: https://learn.microsoft.com/azure/digital-twins/how-to-set-up-instance-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/digital-twins-core/README.md
