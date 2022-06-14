# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [featuresGetSample.js][featuresgetsample]                                                                                     | Gets the preview feature with the specified name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/getFeature.json                                                                                      |
| [featuresListAllSample.js][featureslistallsample]                                                                             | Gets all the preview features that are available through AFEC for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listSubscriptionFeatures.json                                      |
| [featuresListSample.js][featureslistsample]                                                                                   | Gets all the preview features in a provider namespace that are available through AFEC for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listProviderFeatures.json                  |
| [featuresRegisterSample.js][featuresregistersample]                                                                           | Registers the preview feature for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/registerFeature.json                                                                               |
| [featuresUnregisterSample.js][featuresunregistersample]                                                                       | Unregisters the preview feature for the subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/unregisterFeature.json                                                                           |
| [listOperationsSample.js][listoperationssample]                                                                               | Lists all of the available Microsoft.Features REST API operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/listFeaturesOperations.json                                                         |
| [subscriptionFeatureRegistrationsCreateOrUpdateSample.js][subscriptionfeatureregistrationscreateorupdatesample]               | Create or update a feature registration. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationPUT.json                                                   |
| [subscriptionFeatureRegistrationsDeleteSample.js][subscriptionfeatureregistrationsdeletesample]                               | Deletes a feature registration x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationDELETE.json                                                          |
| [subscriptionFeatureRegistrationsGetSample.js][subscriptionfeatureregistrationsgetsample]                                     | Returns a feature registration x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationGET.json                                                             |
| [subscriptionFeatureRegistrationsListAllBySubscriptionSample.js][subscriptionfeatureregistrationslistallbysubscriptionsample] | Returns subscription feature registrations for given subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationLISTALL.json                     |
| [subscriptionFeatureRegistrationsListBySubscriptionSample.js][subscriptionfeatureregistrationslistbysubscriptionsample]       | Returns subscription feature registrations for given subscription and provider namespace. x-ms-original-file: specification/resources/resource-manager/Microsoft.Features/stable/2021-07-01/examples/FeatureRegistration/SubscriptionFeatureRegistrationLIST.json |

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
node featuresGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node featuresGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[featuresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/featuresGetSample.js
[featureslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/featuresListAllSample.js
[featureslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/featuresListSample.js
[featuresregistersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/featuresRegisterSample.js
[featuresunregistersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/featuresUnregisterSample.js
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/listOperationsSample.js
[subscriptionfeatureregistrationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/subscriptionFeatureRegistrationsCreateOrUpdateSample.js
[subscriptionfeatureregistrationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/subscriptionFeatureRegistrationsDeleteSample.js
[subscriptionfeatureregistrationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/subscriptionFeatureRegistrationsGetSample.js
[subscriptionfeatureregistrationslistallbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/subscriptionFeatureRegistrationsListAllBySubscriptionSample.js
[subscriptionfeatureregistrationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/features/arm-features/samples/v3/javascript/subscriptionFeatureRegistrationsListBySubscriptionSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-features?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/features/arm-features/README.md
