# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                   | **Description**                                                                                                                                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [pricingsGetSample.ts][pricingsgetsample]       | Gets a provided Security Center pricing configuration in the subscription. x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2022-03-01/examples/Pricings/GetPricingByName_example.json    |
| [pricingsListSample.ts][pricingslistsample]     | Lists Security Center pricing configurations in the subscription. x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2022-03-01/examples/Pricings/ListPricings_example.json                 |
| [pricingsUpdateSample.ts][pricingsupdatesample] | Updates a provided Security Center pricing configuration in the subscription. x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2022-03-01/examples/Pricings/PutPricingByName_example.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/pricingsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/pricingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[pricingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/security/arm-security/samples/v5/typescript/src/pricingsGetSample.ts
[pricingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/security/arm-security/samples/v5/typescript/src/pricingsListSample.ts
[pricingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/security/arm-security/samples/v5/typescript/src/pricingsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-security?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/security/arm-security/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
