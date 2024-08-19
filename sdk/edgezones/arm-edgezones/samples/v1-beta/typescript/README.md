# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                         |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [extendedZonesGetSample.ts][extendedzonesgetsample]                               | gets an Azure Extended Zone for a subscription x-ms-original-file: 2024-04-01-preview/ExtendedZones_Get.json                            |
| [extendedZonesListBySubscriptionSample.ts][extendedzoneslistbysubscriptionsample] | lists the Azure Extended Zones available to a subscription x-ms-original-file: 2024-04-01-preview/ExtendedZones_ListBySubscription.json |
| [extendedZonesRegisterSample.ts][extendedzonesregistersample]                     | registers a subscription for an Extended Zone x-ms-original-file: 2024-04-01-preview/ExtendedZones_Register.json                        |
| [extendedZonesUnregisterSample.ts][extendedzonesunregistersample]                 | unregisters a subscription for an Extended Zone x-ms-original-file: 2024-04-01-preview/ExtendedZones_Unregister.json                    |
| [operationsListSample.ts][operationslistsample]                                   | list the operations for the provider x-ms-original-file: 2024-04-01-preview/Operations_List.json                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/extendedZonesGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/extendedZonesGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[extendedzonesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgezones/arm-edgezones/samples/v1-beta/typescript/src/extendedZonesGetSample.ts
[extendedzoneslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgezones/arm-edgezones/samples/v1-beta/typescript/src/extendedZonesListBySubscriptionSample.ts
[extendedzonesregistersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgezones/arm-edgezones/samples/v1-beta/typescript/src/extendedZonesRegisterSample.ts
[extendedzonesunregistersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgezones/arm-edgezones/samples/v1-beta/typescript/src/extendedZonesUnregisterSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgezones/arm-edgezones/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-edgezones?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgezones/arm-edgezones/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
