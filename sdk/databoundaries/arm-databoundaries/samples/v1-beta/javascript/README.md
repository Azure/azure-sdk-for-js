# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                                                             |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dataBoundariesGetScopeSample.js][databoundariesgetscopesample]   | Get data boundary at specified scope x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-08-01/examples/GetScopedDataBoundary.json |
| [dataBoundariesGetTenantSample.js][databoundariesgettenantsample] | Get data boundary of tenant. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-08-01/examples/GetTenantDataBoundary.json         |
| [dataBoundariesPutSample.js][databoundariesputsample]             | Opt-in tenant to data boundary. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-08-01/examples/PutDataBoundary.json            |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

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
node dataBoundariesGetScopeSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dataBoundariesGetScopeSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[databoundariesgetscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databoundaries/arm-databoundaries/samples/v1-beta/javascript/dataBoundariesGetScopeSample.js
[databoundariesgettenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databoundaries/arm-databoundaries/samples/v1-beta/javascript/dataBoundariesGetTenantSample.js
[databoundariesputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databoundaries/arm-databoundaries/samples/v1-beta/javascript/dataBoundariesPutSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databoundaries?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databoundaries/arm-databoundaries/README.md
