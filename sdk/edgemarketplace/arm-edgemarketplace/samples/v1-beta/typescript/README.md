# @azure/arm-edgemarketplace client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-edgemarketplace in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                      |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [offersGenerateAccessTokenSample.ts][offersgenerateaccesstokensample]       | a long-running resource action. x-ms-original-file: 2025-10-01-preview/GenerateAccessToken.json                      |
| [offersGetAccessTokenSample.ts][offersgetaccesstokensample]                 | get access token. x-ms-original-file: 2025-10-01-preview/GetAccessToken.json                                         |
| [offersGetSample.ts][offersgetsample]                                       | get a Offer x-ms-original-file: 2025-10-01-preview/GetOffer.json                                                     |
| [offersListBySubscriptionSample.ts][offerslistbysubscriptionsample]         | list Offer resources by subscription ID x-ms-original-file: 2025-10-01-preview/ListOffersBySubscription.json         |
| [offersListSample.ts][offerslistsample]                                     | list Offer resources by parent x-ms-original-file: 2025-10-01-preview/ListOffers.json                                |
| [operationsListSample.ts][operationslistsample]                             | list the operations for the provider x-ms-original-file: 2025-10-01-preview/ListOperations.json                      |
| [publishersGetSample.ts][publishersgetsample]                               | get a Publisher x-ms-original-file: 2025-10-01-preview/GetPublisher.json                                             |
| [publishersListBySubscriptionSample.ts][publisherslistbysubscriptionsample] | list Publisher resources by subscription ID x-ms-original-file: 2025-10-01-preview/ListPublishersBySubscription.json |
| [publishersListSample.ts][publisherslistsample]                             | list Publisher resources by parent x-ms-original-file: 2025-10-01-preview/ListPublishers.json                        |

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
node dist/offersGenerateAccessTokenSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/offersGenerateAccessTokenSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[offersgenerateaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/offersGenerateAccessTokenSample.ts
[offersgetaccesstokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/offersGetAccessTokenSample.ts
[offersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/offersGetSample.ts
[offerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/offersListBySubscriptionSample.ts
[offerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/offersListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/operationsListSample.ts
[publishersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/publishersGetSample.ts
[publisherslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/publishersListBySubscriptionSample.ts
[publisherslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgemarketplace/arm-edgemarketplace/samples/v1-beta/typescript/src/publishersListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-edgemarketplace?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgemarketplace/arm-edgemarketplace/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
