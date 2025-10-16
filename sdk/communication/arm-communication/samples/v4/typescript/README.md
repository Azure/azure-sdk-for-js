# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [communicationServicesCheckNameAvailabilitySample.ts][communicationserviceschecknameavailabilitysample]         | Checks that the CommunicationService name is valid and is not already in use. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/checkNameAvailabilityAvailable.json                  |
| [communicationServicesCreateOrUpdateSample.ts][communicationservicescreateorupdatesample]                       | Create a new CommunicationService or update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/createOrUpdate.json                                  |
| [communicationServicesDeleteSample.ts][communicationservicesdeletesample]                                       | Operation to delete a CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/delete.json                                                                            |
| [communicationServicesGetSample.ts][communicationservicesgetsample]                                             | Get the CommunicationService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/get.json                                                                          |
| [communicationServicesLinkNotificationHubSample.ts][communicationserviceslinknotificationhubsample]             | Links an Azure Notification Hub to this communication service. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/linkNotificationHub.json                                            |
| [communicationServicesListByResourceGroupSample.ts][communicationserviceslistbyresourcegroupsample]             | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/listByResourceGroup.json                                               |
| [communicationServicesListBySubscriptionSample.ts][communicationserviceslistbysubscriptionsample]               | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/listBySubscription.json                                                  |
| [communicationServicesListKeysSample.ts][communicationserviceslistkeyssample]                                   | Get the access keys of the CommunicationService resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/listKeys.json                                                            |
| [communicationServicesRegenerateKeySample.ts][communicationservicesregeneratekeysample]                         | Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/regenerateKey.json |
| [communicationServicesUpdateSample.ts][communicationservicesupdatesample]                                       | Operation to update an existing CommunicationService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/update.json                                                                  |
| [domainsCancelVerificationSample.ts][domainscancelverificationsample]                                           | Cancel verification of DNS record. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/cancelVerification.json                                                                                       |
| [domainsCreateOrUpdateSample.ts][domainscreateorupdatesample]                                                   | Add a new Domains resource under the parent EmailService resource or update an existing Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/createOrUpdate.json                    |
| [domainsDeleteSample.ts][domainsdeletesample]                                                                   | Operation to delete a Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/delete.json                                                                                              |
| [domainsGetSample.ts][domainsgetsample]                                                                         | Get the Domains resource and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/get.json                                                                                            |
| [domainsInitiateVerificationSample.ts][domainsinitiateverificationsample]                                       | Initiate verification of DNS record. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/initiateVerification.json                                                                                   |
| [domainsListByEmailServiceResourceSample.ts][domainslistbyemailserviceresourcesample]                           | Handles requests to list all Domains resources under the parent EmailServices resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/listByEmailService.json                                  |
| [domainsUpdateSample.ts][domainsupdatesample]                                                                   | Operation to update an existing Domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/domains/update.json                                                                                    |
| [emailServicesCreateOrUpdateSample.ts][emailservicescreateorupdatesample]                                       | Create a new EmailService or update an existing EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/createOrUpdate.json                                                          |
| [emailServicesDeleteSample.ts][emailservicesdeletesample]                                                       | Operation to delete a EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/delete.json                                                                                            |
| [emailServicesGetSample.ts][emailservicesgetsample]                                                             | Get the EmailService and its properties. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/get.json                                                                                          |
| [emailServicesListByResourceGroupSample.ts][emailserviceslistbyresourcegroupsample]                             | Handles requests to list all resources in a resource group. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/listByResourceGroup.json                                                       |
| [emailServicesListBySubscriptionSample.ts][emailserviceslistbysubscriptionsample]                               | Handles requests to list all resources in a subscription. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/listBySubscription.json                                                          |
| [emailServicesListVerifiedExchangeOnlineDomainsSample.ts][emailserviceslistverifiedexchangeonlinedomainssample] | Get a list of domains that are fully verified in Exchange Online. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/getVerifiedExchangeOnlineDomains.json                                    |
| [emailServicesUpdateSample.ts][emailservicesupdatesample]                                                       | Operation to update an existing EmailService. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/emailServices/update.json                                                                                  |
| [operationsListSample.ts][operationslistsample]                                                                 | Lists all of the available REST API operations of the Microsoft.Communication provider. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/communicationServices/operationsList.json                        |
| [senderUsernamesCreateOrUpdateSample.ts][senderusernamescreateorupdatesample]                                   | Add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/senderUsernames/createOrUpdate.json   |
| [senderUsernamesDeleteSample.ts][senderusernamesdeletesample]                                                   | Operation to delete a SenderUsernames resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/senderUsernames/delete.json                                                                              |
| [senderUsernamesGetSample.ts][senderusernamesgetsample]                                                         | Get a valid sender username for a domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/senderUsernames/get.json                                                                             |
| [senderUsernamesListByDomainsSample.ts][senderusernameslistbydomainssample]                                     | List all valid sender usernames for a domains resource. x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/stable/2023-04-01/examples/senderUsernames/listByDomain.json                                                                |

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
node dist/communicationServicesCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_SUBSCRIPTION_ID="<communication subscription id>" node dist/communicationServicesCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[communicationserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesCheckNameAvailabilitySample.ts
[communicationservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesCreateOrUpdateSample.ts
[communicationservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesDeleteSample.ts
[communicationservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesGetSample.ts
[communicationserviceslinknotificationhubsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesLinkNotificationHubSample.ts
[communicationserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesListByResourceGroupSample.ts
[communicationserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesListBySubscriptionSample.ts
[communicationserviceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesListKeysSample.ts
[communicationservicesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesRegenerateKeySample.ts
[communicationservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/communicationServicesUpdateSample.ts
[domainscancelverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsCancelVerificationSample.ts
[domainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsCreateOrUpdateSample.ts
[domainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsDeleteSample.ts
[domainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsGetSample.ts
[domainsinitiateverificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsInitiateVerificationSample.ts
[domainslistbyemailserviceresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsListByEmailServiceResourceSample.ts
[domainsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/domainsUpdateSample.ts
[emailservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesCreateOrUpdateSample.ts
[emailservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesDeleteSample.ts
[emailservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesGetSample.ts
[emailserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesListByResourceGroupSample.ts
[emailserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesListBySubscriptionSample.ts
[emailserviceslistverifiedexchangeonlinedomainssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesListVerifiedExchangeOnlineDomainsSample.ts
[emailservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/emailServicesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/operationsListSample.ts
[senderusernamescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/senderUsernamesCreateOrUpdateSample.ts
[senderusernamesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/senderUsernamesDeleteSample.ts
[senderusernamesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/senderUsernamesGetSample.ts
[senderusernameslistbydomainssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/arm-communication/samples/v4/typescript/src/senderUsernamesListByDomainsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-communication?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/arm-communication/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
