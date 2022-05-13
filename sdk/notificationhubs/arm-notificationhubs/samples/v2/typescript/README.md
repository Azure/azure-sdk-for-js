# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [namespacesCheckAvailabilitySample.ts][namespacescheckavailabilitysample]                                           | Checks the availability of the given service namespace across all Azure subscriptions. This is useful because the domain name is created based on the service namespace name. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceCheckNameAvailability.json |
| [namespacesCreateOrUpdateAuthorizationRuleSample.ts][namespacescreateorupdateauthorizationrulesample]               | Creates an authorization rule for a namespace x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceAuthorizationRuleCreate.json                                                                                                                               |
| [namespacesCreateOrUpdateSample.ts][namespacescreateorupdatesample]                                                 | Creates/Updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceCreate.json                                                            |
| [namespacesDeleteAuthorizationRuleSample.ts][namespacesdeleteauthorizationrulesample]                               | Deletes a namespace authorization rule x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceAuthorizationRuleDelete.json                                                                                                                                      |
| [namespacesDeleteSample.ts][namespacesdeletesample]                                                                 | Deletes an existing namespace. This operation also removes all associated notificationHubs under the namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceDelete.json                                                                              |
| [namespacesGetAuthorizationRuleSample.ts][namespacesgetauthorizationrulesample]                                     | Gets an authorization rule for a namespace by name. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceAuthorizationRuleGet.json                                                                                                                            |
| [namespacesGetSample.ts][namespacesgetsample]                                                                       | Returns the description for the specified namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceGet.json                                                                                                                                            |
| [namespacesListAllSample.ts][namespaceslistallsample]                                                               | Lists all the available namespaces within the subscription irrespective of the resourceGroups. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceList.json                                                                                                 |
| [namespacesListAuthorizationRulesSample.ts][namespaceslistauthorizationrulessample]                                 | Gets the authorization rules for a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceAuthorizationRuleListAll.json                                                                                                                              |
| [namespacesListKeysSample.ts][namespaceslistkeyssample]                                                             | Gets the Primary and Secondary ConnectionStrings to the namespace x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceAuthorizationRuleListKey.json                                                                                                          |
| [namespacesListSample.ts][namespaceslistsample]                                                                     | Lists the available namespaces within a resourceGroup. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceListByResourceGroup.json                                                                                                                          |
| [namespacesPatchSample.ts][namespacespatchsample]                                                                   | Patches the existing namespace x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceUpdate.json                                                                                                                                                               |
| [namespacesRegenerateKeysSample.ts][namespacesregeneratekeyssample]                                                 | Regenerates the Primary/Secondary Keys to the Namespace Authorization Rule x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/Namespaces/NHNameSpaceAuthorizationRuleRegenrateKey.json                                                                                            |
| [notificationHubsCheckNotificationHubAvailabilitySample.ts][notificationhubschecknotificationhubavailabilitysample] | Checks the availability of the given notificationHub in a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubCheckNameAvailability.json                                                                                                |
| [notificationHubsCreateOrUpdateAuthorizationRuleSample.ts][notificationhubscreateorupdateauthorizationrulesample]   | Creates/Updates an authorization rule for a NotificationHub x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubAuthorizationRuleCreate.json                                                                                                       |
| [notificationHubsCreateOrUpdateSample.ts][notificationhubscreateorupdatesample]                                     | Creates/Update a NotificationHub in a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubCreate.json                                                                                                                                   |
| [notificationHubsDebugSendSample.ts][notificationhubsdebugsendsample]                                               | test send a push notification x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubDebugSend.json                                                                                                                                                   |
| [notificationHubsDeleteAuthorizationRuleSample.ts][notificationhubsdeleteauthorizationrulesample]                   | Deletes a notificationHub authorization rule x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubAuthorizationRuleDelete.json                                                                                                                      |
| [notificationHubsDeleteSample.ts][notificationhubsdeletesample]                                                     | Deletes a notification hub associated with a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubDelete.json                                                                                                                            |
| [notificationHubsGetAuthorizationRuleSample.ts][notificationhubsgetauthorizationrulesample]                         | Gets an authorization rule for a NotificationHub by name. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubAuthorizationRuleGet.json                                                                                                            |
| [notificationHubsGetPnsCredentialsSample.ts][notificationhubsgetpnscredentialssample]                               | Lists the PNS Credentials associated with a notification hub . x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubPnsCredentials.json                                                                                                             |
| [notificationHubsGetSample.ts][notificationhubsgetsample]                                                           | Lists the notification hubs associated with a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubGet.json                                                                                                                              |
| [notificationHubsListAuthorizationRulesSample.ts][notificationhubslistauthorizationrulessample]                     | Gets the authorization rules for a NotificationHub. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubAuthorizationRuleListAll.json                                                                                                              |
| [notificationHubsListKeysSample.ts][notificationhubslistkeyssample]                                                 | Gets the Primary and Secondary ConnectionStrings to the NotificationHub x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubAuthorizationRuleListKey.json                                                                                          |
| [notificationHubsListSample.ts][notificationhubslistsample]                                                         | Lists the notification hubs associated with a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubListByNameSpace.json                                                                                                                  |
| [notificationHubsPatchSample.ts][notificationhubspatchsample]                                                       | Patch a NotificationHub in a namespace. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubPatch.json                                                                                                                                             |
| [notificationHubsRegenerateKeysSample.ts][notificationhubsregeneratekeyssample]                                     | Regenerates the Primary/Secondary Keys to the NotificationHub Authorization Rule x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NotificationHubs/NotificationHubAuthorizationRuleRegenrateKey.json                                                                            |
| [operationsListSample.ts][operationslistsample]                                                                     | Lists all of the available NotificationHubs REST API operations. x-ms-original-file: specification/notificationhubs/resource-manager/Microsoft.NotificationHubs/stable/2017-04-01/examples/NHOperationsList.json                                                                                                                                         |

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
node dist/namespacesCheckAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/namespacesCheckAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[namespacescheckavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesCheckAvailabilitySample.ts
[namespacescreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesCreateOrUpdateAuthorizationRuleSample.ts
[namespacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesCreateOrUpdateSample.ts
[namespacesdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesDeleteAuthorizationRuleSample.ts
[namespacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesDeleteSample.ts
[namespacesgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesGetAuthorizationRuleSample.ts
[namespacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesGetSample.ts
[namespaceslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesListAllSample.ts
[namespaceslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesListAuthorizationRulesSample.ts
[namespaceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesListKeysSample.ts
[namespaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesListSample.ts
[namespacespatchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesPatchSample.ts
[namespacesregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/namespacesRegenerateKeysSample.ts
[notificationhubschecknotificationhubavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsCheckNotificationHubAvailabilitySample.ts
[notificationhubscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsCreateOrUpdateAuthorizationRuleSample.ts
[notificationhubscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsCreateOrUpdateSample.ts
[notificationhubsdebugsendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsDebugSendSample.ts
[notificationhubsdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsDeleteAuthorizationRuleSample.ts
[notificationhubsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsDeleteSample.ts
[notificationhubsgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsGetAuthorizationRuleSample.ts
[notificationhubsgetpnscredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsGetPnsCredentialsSample.ts
[notificationhubsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsGetSample.ts
[notificationhubslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsListAuthorizationRulesSample.ts
[notificationhubslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsListKeysSample.ts
[notificationhubslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsListSample.ts
[notificationhubspatchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsPatchSample.ts
[notificationhubsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/notificationHubsRegenerateKeysSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/arm-notificationhubs/samples/v2/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-notificationhubs?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/arm-notificationhubs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
