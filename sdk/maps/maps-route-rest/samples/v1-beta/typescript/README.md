# Azure Maps Route client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Maps Route in some common scenarios.

| **File Name**               | **Description**                                                  |
| --------------------------- | ---------------------------------------------------------------- |
| [directions.ts][directions] | Demonstrates the use of a MapsRoute to calculate routes.         |
| [lro.ts][lro]               | Demonstrates how to manipulate a long running request.           |
| [matrix.ts][matrix]         | Demonstrates the use of a MapsRoute to retrieve a setting value. |
| [range.ts][range]           | Demonstrates the use of a MapsRoute to retrieve a route range.   |
| [resumeLro.ts][resumelro]   | Demonstrates how to resume a long running request.               |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/directions.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MAPS_RESOURCE_CLIENT_ID="<maps resource client id>" node dist/directions.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[directions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/typescript/src/directions.ts
[lro]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/typescript/src/lro.ts
[matrix]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/typescript/src/matrix.ts
[range]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/typescript/src/range.ts
[resumelro]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/samples/v1-beta/typescript/src/resumeLro.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/maps-route
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremapsresource]: https://learn.microsoft.com/azure/azure-maps/how-to-create-template
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
