# Azure Maps Route client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Maps Route in some common scenarios.

| **File Name**               | **Description**                                                  |
| --------------------------- | ---------------------------------------------------------------- |
| [directions.js][directions] | Demonstrates the use of a MapsRoute to calculate routes.         |
| [lro.js][lro]               | Demonstrates how to manipulate a long running request.           |
| [matrix.js][matrix]         | Demonstrates the use of a MapsRoute to retrieve a setting value. |
| [range.js][range]           | Demonstrates the use of a MapsRoute to retrieve a route range.   |
| [resumeLro.js][resumelro]   | Demonstrates how to resume a long running request.               |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Maps Resource][createinstance_azuremapsresource]

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
node directions.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node directions.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[directions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/javascript/directions.js
[lro]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/javascript/lro.js
[matrix]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/javascript/matrix.js
[range]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/javascript/range.js
[resumelro]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/javascript/resumeLro.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/maps-route
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://learn.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest/README.md
