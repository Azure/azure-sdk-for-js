# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [offersGenerateAccessTokenSample.js][offersgenerateaccesstokensample]       | A long-running resource action. x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/GenerateAccessToken.json                   |
| [offersGetAccessTokenSample.js][offersgetaccesstokensample]                 | get access token. x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/GetAccessToken.json                                      |
| [offersGetSample.js][offersgetsample]                                       | Get a Offer x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/GetOffer.json                                                  |
| [offersListBySubscriptionSample.js][offerslistbysubscriptionsample]         | List Offer resources by subscription x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/ListOffersBySubscription.json         |
| [offersListSample.js][offerslistsample]                                     | List Offer resources by parent x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/ListOffers.json                             |
| [operationsListSample.js][operationslistsample]                             | List the operations for the provider x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/ListOperations.json                   |
| [publishersGetSample.js][publishersgetsample]                               | Get a Publisher x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/GetPublisher.json                                          |
| [publishersListBySubscriptionSample.js][publisherslistbysubscriptionsample] | List Publisher resources in subscription x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/ListPublishersBySubscription.json |
| [publishersListSample.js][publisherslistsample]                             | List Publisher resources by parent x-ms-original-file: specification/edgemarketplace/resource-manager/Microsoft.EdgeMarketplace/stable/2023-08-01/examples/ListPublishers.json                     |

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
node offersGenerateAccessTokenSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node offersGenerateAccessTokenSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[offersgenerateaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/offersGenerateAccessTokenSample.js
[offersgetaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/offersGetAccessTokenSample.js
[offersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/offersGetSample.js
[offerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/offersListBySubscriptionSample.js
[offerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/offersListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/operationsListSample.js
[publishersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/publishersGetSample.js
[publisherslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/publishersListBySubscriptionSample.js
[publisherslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/javascript/publishersListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-edgemarketplace?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgemarketplace/arm-edgemarketplace/README.md
