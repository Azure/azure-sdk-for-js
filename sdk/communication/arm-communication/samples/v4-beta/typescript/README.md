# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [communicationServicesCheckNameAvailabilitySample.ts][communicationserviceschecknameavailabilitysample]         | Checks that the CommunicationService name is valid and is not already in use. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/checkNameAvailabilityAvailable.json                  |
| [communicationServicesCreateOrUpdateSample.ts][communicationservicescreateorupdatesample]                       | Create a new CommunicationService or update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/createOrUpdate.json                                  |
| [communicationServicesDeleteSample.ts][communicationservicesdeletesample]                                       | Operation to delete a CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/delete.json                                                                            |
| [communicationServicesGetSample.ts][communicationservicesgetsample]                                             | Get the CommunicationService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/get.json                                                                          |
| [communicationServicesLinkNotificationHubSample.ts][communicationserviceslinknotificationhubsample]             | Links an Azure Notification Hub to this communication service. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/linkNotificationHub.json                                            |
| [communicationServicesListByResourceGroupSample.ts][communicationserviceslistbyresourcegroupsample]             | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/listByResourceGroup.json                                               |
| [communicationServicesListBySubscriptionSample.ts][communicationserviceslistbysubscriptionsample]               | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/listBySubscription.json                                                  |
| [communicationServicesListKeysSample.ts][communicationserviceslistkeyssample]                                   | Get the access keys of the CommunicationService resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/listKeys.json                                                            |
| [communicationServicesRegenerateKeySample.ts][communicationservicesregeneratekeysample]                         | Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/regenerateKey.json |
| [communicationServicesUpdateSample.ts][communicationservicesupdatesample]                                       | Operation to update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/update.json                                                                  |
| [domainsCancelVerificationSample.ts][domainscancelverificationsample]                                           | Cancel verification of DNS record. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/cancelVerification.json                                                                                       |
| [domainsCreateOrUpdateSample.ts][domainscreateorupdatesample]                                                   | Add a new Domains resource under the parent EmailService resource or update an existing Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/createOrUpdate.json                    |
| [domainsDeleteSample.ts][domainsdeletesample]                                                                   | Operation to delete a Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/delete.json                                                                                              |
| [domainsGetSample.ts][domainsgetsample]                                                                         | Get the Domains resource and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/get.json                                                                                            |
| [domainsInitiateVerificationSample.ts][domainsinitiateverificationsample]                                       | Initiate verification of DNS record. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/initiateVerification.json                                                                                   |
| [domainsListByEmailServiceResourceSample.ts][domainslistbyemailserviceresourcesample]                           | Handles requests to list all Domains resources under the parent EmailServices resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/listByEmailService.json                                  |
| [domainsUpdateSample.ts][domainsupdatesample]                                                                   | Operation to update an existing Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/domains/update.json                                                                                    |
| [emailServicesCreateOrUpdateSample.ts][emailservicescreateorupdatesample]                                       | Create a new EmailService or update an existing EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/createOrUpdate.json                                                          |
| [emailServicesDeleteSample.ts][emailservicesdeletesample]                                                       | Operation to delete a EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/delete.json                                                                                            |
| [emailServicesGetSample.ts][emailservicesgetsample]                                                             | Get the EmailService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/get.json                                                                                          |
| [emailServicesListByResourceGroupSample.ts][emailserviceslistbyresourcegroupsample]                             | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/listByResourceGroup.json                                                       |
| [emailServicesListBySubscriptionSample.ts][emailserviceslistbysubscriptionsample]                               | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/listBySubscription.json                                                          |
| [emailServicesListVerifiedExchangeOnlineDomainsSample.ts][emailserviceslistverifiedexchangeonlinedomainssample] | Get a list of domains that are fully verified in Exchange Online. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/getVerifiedExchangeOnlineDomains.json                                    |
| [emailServicesUpdateSample.ts][emailservicesupdatesample]                                                       | Operation to update an existing EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/emailServices/update.json                                                                                  |
| [operationsListSample.ts][operationslistsample]                                                                 | Lists all of the available REST API operations of the Microsoft.Communication provider. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2021-10-01-preview/examples/communicationServices/operationsList.json                        |

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
node dist/communicationServicesCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/communicationServicesCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesCheckNameAvailabilitySample.ts
[communicationservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesCreateOrUpdateSample.ts
[communicationservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesDeleteSample.ts
[communicationservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesGetSample.ts
[communicationserviceslinknotificationhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesLinkNotificationHubSample.ts
[communicationserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesListByResourceGroupSample.ts
[communicationserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesListBySubscriptionSample.ts
[communicationserviceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesListKeysSample.ts
[communicationservicesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesRegenerateKeySample.ts
[communicationservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/communicationServicesUpdateSample.ts
[domainscancelverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsCancelVerificationSample.ts
[domainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsCreateOrUpdateSample.ts
[domainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsDeleteSample.ts
[domainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsGetSample.ts
[domainsinitiateverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsInitiateVerificationSample.ts
[domainslistbyemailserviceresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsListByEmailServiceResourceSample.ts
[domainsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/domainsUpdateSample.ts
[emailservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesCreateOrUpdateSample.ts
[emailservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesDeleteSample.ts
[emailservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesGetSample.ts
[emailserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesListByResourceGroupSample.ts
[emailserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesListBySubscriptionSample.ts
[emailserviceslistverifiedexchangeonlinedomainssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesListVerifiedExchangeOnlineDomainsSample.ts
[emailservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/emailServicesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4-beta/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-communication?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/arm-communication/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
