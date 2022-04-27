# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getMarketplaceTerms.js][getmarketplaceterms]                                         | Get marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetMarketplaceTerms.json                            |
| [marketplaceAgreementsCancelSample.js][marketplaceagreementscancelsample]             | Cancel marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/CancelMarketplaceTerms.json                      |
| [marketplaceAgreementsCreateSample.js][marketplaceagreementscreatesample]             | Save marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/SetMarketplaceTerms.json                           |
| [marketplaceAgreementsGetAgreementSample.js][marketplaceagreementsgetagreementsample] | Get marketplace agreement. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetAgreementMarketplaceTerms.json               |
| [marketplaceAgreementsGetSample.js][marketplaceagreementsgetsample]                   | Get marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/GetMarketplaceTerms.json                            |
| [marketplaceAgreementsListSample.js][marketplaceagreementslistsample]                 | List marketplace agreements in the subscription. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/ListMarketplaceTerms.json |
| [marketplaceAgreementsSignSample.js][marketplaceagreementssignsample]                 | Sign marketplace terms. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/SignMarketplaceTerms.json                          |
| [setMarketplaceTerms.js][setmarketplaceterms]                                         | List marketplace agreements in the subscription. x-ms-original-file: specification/marketplaceordering/resource-manager/Microsoft.MarketplaceOrdering/stable/2021-01-01/examples/ListMarketplaceTerms.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node getMarketplaceTerms.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node getMarketplaceTerms.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getmarketplaceterms]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/getMarketplaceTerms.js
[marketplaceagreementscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/marketplaceAgreementsCancelSample.js
[marketplaceagreementscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/marketplaceAgreementsCreateSample.js
[marketplaceagreementsgetagreementsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/marketplaceAgreementsGetAgreementSample.js
[marketplaceagreementsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/marketplaceAgreementsGetSample.js
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/marketplaceAgreementsListSample.js
[marketplaceagreementssignsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/marketplaceAgreementsSignSample.js
[setmarketplaceterms]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/marketplaceordering/arm-marketplaceordering/samples/v3/javascript/setMarketplaceTerms.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-marketplaceordering?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/marketplaceordering/arm-marketplaceordering/README.md
