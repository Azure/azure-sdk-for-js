# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkResourceNameSample.ts][checkresourcenamesample]                     | A resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/examples/CheckResourceName.json |
| [subscriptionsCheckZonePeersSample.ts][subscriptionscheckzonepeerssample] | Compares a subscriptions logical zone mapping x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/examples/PostCheckZonePeers.json                                                                                   |

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
node dist/checkResourceNameSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/checkResourceNameSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checkresourcenamesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions-profile-2020-09-01-hybrid/samples/v2/typescript/src/checkResourceNameSample.ts
[subscriptionscheckzonepeerssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/subscription/arm-subscriptions-profile-2020-09-01-hybrid/samples/v2/typescript/src/subscriptionsCheckZonePeersSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-subscriptions-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/subscription/arm-subscriptions-profile-2020-09-01-hybrid/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
