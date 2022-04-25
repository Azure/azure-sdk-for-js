# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [featuresGetSample.ts][featuresgetsample]                                                                                     | Gets the preview feature with the specified name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/getFeature.json                                                                                      |
| [featuresListAllSample.ts][featureslistallsample]                                                                             | Gets all the preview features that are available through AFEC for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listSubscriptionFeatures.json                                      |
| [featuresListSample.ts][featureslistsample]                                                                                   | Gets all the preview features in a provider namespace that are available through AFEC for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listProviderFeatures.json                  |
| [featuresRegisterSample.ts][featuresregistersample]                                                                           | Registers the preview feature for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/registerFeature.json                                                                               |
| [featuresUnregisterSample.ts][featuresunregistersample]                                                                       | Unregisters the preview feature for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/unregisterFeature.json                                                                           |
| [listOperationsSample.ts][listoperationssample]                                                                               | Lists all of the available Microsoft.Features REST API operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listFeaturesOperations.json                                                         |
| [subscriptionFeatureRegistrationsCreateOrUpdateSample.ts][subscriptionfeatureregistrationscreateorupdatesample]               | Create or update a feature registration. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationPUT.json                                                   |
| [subscriptionFeatureRegistrationsDeleteSample.ts][subscriptionfeatureregistrationsdeletesample]                               | Deletes a feature registration x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationDELETE.json                                                          |
| [subscriptionFeatureRegistrationsGetSample.ts][subscriptionfeatureregistrationsgetsample]                                     | Returns a feature registration x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationGET.json                                                             |
| [subscriptionFeatureRegistrationsListAllBySubscriptionSample.ts][subscriptionfeatureregistrationslistallbysubscriptionsample] | Returns subscription feature registrations for given subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationLISTALL.json                     |
| [subscriptionFeatureRegistrationsListBySubscriptionSample.ts][subscriptionfeatureregistrationslistbysubscriptionsample]       | Returns subscription feature registrations for given subscription and provider namespace. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationLIST.json |

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
node dist/featuresGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/featuresGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[featuresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/featuresGetSample.ts
[featureslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/featuresListAllSample.ts
[featureslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/featuresListSample.ts
[featuresregistersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/featuresRegisterSample.ts
[featuresunregistersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/featuresUnregisterSample.ts
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/listOperationsSample.ts
[subscriptionfeatureregistrationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/subscriptionFeatureRegistrationsCreateOrUpdateSample.ts
[subscriptionfeatureregistrationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/subscriptionFeatureRegistrationsDeleteSample.ts
[subscriptionfeatureregistrationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/subscriptionFeatureRegistrationsGetSample.ts
[subscriptionfeatureregistrationslistallbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/subscriptionFeatureRegistrationsListAllBySubscriptionSample.ts
[subscriptionfeatureregistrationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/typescript/src/subscriptionFeatureRegistrationsListBySubscriptionSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-features?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/features/arm-features/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
