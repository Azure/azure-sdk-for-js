# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availableGroundStationsGetSample.ts][availablegroundstationsgetsample]                           | Gets the specified available ground station x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/AvailableGroundStationGet.json                 |
| [availableGroundStationsListByCapabilitySample.ts][availablegroundstationslistbycapabilitysample] | Returns list of available ground stations x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/AvailableGroundStationsByCapabilityList.json     |
| [contactProfilesCreateOrUpdateSample.ts][contactprofilescreateorupdatesample]                     | Creates or updates a contact profile x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactProfileCreate.json                             |
| [contactProfilesDeleteSample.ts][contactprofilesdeletesample]                                     | Deletes a specified contact profile resource. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactProfileDelete.json                    |
| [contactProfilesGetSample.ts][contactprofilesgetsample]                                           | Gets the specified contact Profile in a specified resource group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactProfileGet.json    |
| [contactProfilesListBySubscriptionSample.ts][contactprofileslistbysubscriptionsample]             | Returns list of contact profiles by Subscription x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactProfilesBySubscriptionList.json    |
| [contactProfilesListSample.ts][contactprofileslistsample]                                         | Returns list of contact profiles by Resource Group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactProfilesByResourceGroupList.json |
| [contactProfilesUpdateTagsSample.ts][contactprofilesupdatetagssample]                             | Updates the specified contact profile tags. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactProfileUpdateTag.json                   |
| [contactsCreateSample.ts][contactscreatesample]                                                   | Creates a contact. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactCreate.json                                                      |
| [contactsDeleteSample.ts][contactsdeletesample]                                                   | Deletes a specified contact x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactDelete.json                                             |
| [contactsGetSample.ts][contactsgetsample]                                                         | Gets the specified contact in a specified resource group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactGet.json                   |
| [contactsListSample.ts][contactslistsample]                                                       | Returns list of contacts by spacecraftName x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/ContactsBySpacecraftNameList.json               |
| [operationsListSample.ts][operationslistsample]                                                   | Lists all of the available Orbital Rest API operations. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/OperationsList.json                |
| [operationsResultsGetSample.ts][operationsresultsgetsample]                                       | Returns operation results. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/OperationResultsGet.json                                        |
| [spacecraftsCreateOrUpdateSample.ts][spacecraftscreateorupdatesample]                             | Creates or updates a spacecraft resource x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/SpacecraftCreate.json                             |
| [spacecraftsDeleteSample.ts][spacecraftsdeletesample]                                             | Deletes a specified spacecraft resource. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/SpacecraftDelete.json                             |
| [spacecraftsGetSample.ts][spacecraftsgetsample]                                                   | Gets the specified spacecraft in a specified resource group x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/SpacecraftGet.json             |
| [spacecraftsListAvailableContactsSample.ts][spacecraftslistavailablecontactssample]               | Return list of available contacts x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/AvailableContactsList.json                               |
| [spacecraftsListBySubscriptionSample.ts][spacecraftslistbysubscriptionsample]                     | Return list of spacecrafts x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/SpacecraftsBySubscriptionList.json                              |
| [spacecraftsListSample.ts][spacecraftslistsample]                                                 | Return list of spacecrafts x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/SpacecraftsByResourceGroupList.json                             |
| [spacecraftsUpdateTagsSample.ts][spacecraftsupdatetagssample]                                     | Updates the specified spacecraft tags. x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/SpacecraftUpdateTags.json                           |

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
node dist/availableGroundStationsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/availableGroundStationsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availablegroundstationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/availableGroundStationsGetSample.ts
[availablegroundstationslistbycapabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/availableGroundStationsListByCapabilitySample.ts
[contactprofilescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactProfilesCreateOrUpdateSample.ts
[contactprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactProfilesDeleteSample.ts
[contactprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactProfilesGetSample.ts
[contactprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactProfilesListBySubscriptionSample.ts
[contactprofileslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactProfilesListSample.ts
[contactprofilesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactProfilesUpdateTagsSample.ts
[contactscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactsCreateSample.ts
[contactsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactsDeleteSample.ts
[contactsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactsGetSample.ts
[contactslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/contactsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/operationsListSample.ts
[operationsresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/operationsResultsGetSample.ts
[spacecraftscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsCreateOrUpdateSample.ts
[spacecraftsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsDeleteSample.ts
[spacecraftsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsGetSample.ts
[spacecraftslistavailablecontactssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsListAvailableContactsSample.ts
[spacecraftslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsListBySubscriptionSample.ts
[spacecraftslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsListSample.ts
[spacecraftsupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/orbital/arm-orbital/samples/v1/typescript/src/spacecraftsUpdateTagsSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-orbital?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/orbital/arm-orbital/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
