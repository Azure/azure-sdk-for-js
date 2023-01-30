# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [marketplaceAgreementsCancelSample.ts][marketplaceagreementscancelsample]             | Cancel marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/CancelMarketplaceTerms.json                      |
| [marketplaceAgreementsCreateSample.ts][marketplaceagreementscreatesample]             | Save marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/SetMarketplaceTerms.json                           |
| [marketplaceAgreementsGetAgreementSample.ts][marketplaceagreementsgetagreementsample] | Get marketplace agreement. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetAgreementMarketplaceTerms.json               |
| [marketplaceAgreementsGetSample.ts][marketplaceagreementsgetsample]                   | Get marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetMarketplaceTerms.json                            |
| [marketplaceAgreementsListSample.ts][marketplaceagreementslistsample]                 | List marketplace agreements in the subscription. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/ListMarketplaceTerms.json |
| [marketplaceAgreementsSignSample.ts][marketplaceagreementssignsample]                 | Sign marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/SignMarketplaceTerms.json                          |

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
node dist/marketplaceAgreementsCancelSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MARKETPLACEORDERING_SUBSCRIPTION_ID="<marketplaceordering subscription id>" node dist/marketplaceAgreementsCancelSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[marketplaceagreementscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/typescript/src/marketplaceAgreementsCancelSample.ts
[marketplaceagreementscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/typescript/src/marketplaceAgreementsCreateSample.ts
[marketplaceagreementsgetagreementsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/typescript/src/marketplaceAgreementsGetAgreementSample.ts
[marketplaceagreementsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/typescript/src/marketplaceAgreementsGetSample.ts
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/typescript/src/marketplaceAgreementsListSample.ts
[marketplaceagreementssignsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/typescript/src/marketplaceAgreementsSignSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-marketplaceordering?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/marketplaceordering/arm-marketplaceordering/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
