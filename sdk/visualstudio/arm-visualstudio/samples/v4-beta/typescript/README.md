# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkAvailabilityOfAnAccountName.ts][checkavailabilityofanaccountname]                                     | Checks if the specified Visual Studio Team Services account name is available. Resource name can be either an account name or an account name and PUID. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CheckNameAvailability.json                                                                                                                                                                                                                                                                                            |
| [createAProjectResource.ts][createaprojectresource]                                                         | Creates a Team Services project in the collection with the specified name. 'VersionControlOption' and 'ProcessTemplateId' must be specified in the resource properties. Valid values for VersionControlOption: Git, Tfvc. Valid values for ProcessTemplateId: 6B724908-EF14-45CF-84F8-768B5384DA45, ADCC42AB-9882-485E-A3ED-7678F01F66BC, 27450541-8E31-4150-9947-DC59F998FC01 (these IDs correspond to Scrum, Agile, and CMMI process templates). x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CreateProjectResource.json |
| [createAnAccountResource.ts][createanaccountresource]                                                       | Updates tags for Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateTags.json                                                                                                                                                                                                                                                                                                                                                                                                |
| [createAnExtensionResource.ts][createanextensionresource]                                                   | Registers the extension with a Visual Studio Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/CreateExtensionResource.json                                                                                                                                                                                                                                                                                                                                                                              |
| [deleteAnAccountResource.ts][deleteanaccountresource]                                                       | Deletes a Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/DeleteResource.json                                                                                                                                                                                                                                                                                                                                                                                                   |
| [deleteAnExtensionResource.ts][deleteanextensionresource]                                                   | Removes an extension resource registration for a Visual Studio Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/DeleteExtensionResource.json                                                                                                                                                                                                                                                                                                                                                            |
| [getAListOfAccountResourcesInTheResourceGroup.ts][getalistofaccountresourcesintheresourcegroup]             | Gets all Visual Studio Team Services account resources under the resource group linked to the specified Azure subscription. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetResources_List.json                                                                                                                                                                                                                                                                                                                            |
| [getAListOfExtensionResourcesWithinTheResourceGroup.ts][getalistofextensionresourceswithintheresourcegroup] | Gets the details of the extension resources created within the resource group. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetExtensionResources_List.json                                                                                                                                                                                                                                                                                                                                                                |
| [getAListOfOperationsForThisResourceProvider.ts][getalistofoperationsforthisresourceprovider]               | Gets the details of all operations possible on the Microsoft.VisualStudio resource provider. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetOperations.json                                                                                                                                                                                                                                                                                                                                                               |
| [getAListOfProjectResourcesInTheTeamServicesAccount.ts][getalistofprojectresourcesintheteamservicesaccount] | Gets all Visual Studio Team Services project resources created in the specified Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectResources_List.json                                                                                                                                                                                                                                                                                                                                          |
| [getAProjectResource.ts][getaprojectresource]                                                               | Gets the details of a Team Services project resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectResource.json                                                                                                                                                                                                                                                                                                                                                                                                 |
| [getAnAccountResource.ts][getanaccountresource]                                                             | Gets the Visual Studio Team Services account resource details. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetResource.json                                                                                                                                                                                                                                                                                                                                                                                               |
| [getAnExtensionResource.ts][getanextensionresource]                                                         | Gets the details of an extension associated with a Visual Studio Team Services account resource. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetExtensionResource.json                                                                                                                                                                                                                                                                                                                                                    |
| [getTheStatusOfTheProjectCreationJob.ts][getthestatusoftheprojectcreationjob]                               | Gets the status of the project resource creation job. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectJobStatus.json                                                                                                                                                                                                                                                                                                                                                                                                |
| [updateAProjectResource.ts][updateaprojectresource]                                                         | Updates the tags of the specified Team Services project. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateProjectResource.json                                                                                                                                                                                                                                                                                                                                                                                           |
| [updateAnExtensionResource.ts][updateanextensionresource]                                                   | Updates an existing extension registration for the Visual Studio Team Services account. x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateExtensionResource.json                                                                                                                                                                                                                                                                                                                                                          |

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
node dist/checkAvailabilityOfAnAccountName.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/checkAvailabilityOfAnAccountName.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checkavailabilityofanaccountname]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/checkAvailabilityOfAnAccountName.ts
[createaprojectresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/createAProjectResource.ts
[createanaccountresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/createAnAccountResource.ts
[createanextensionresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/createAnExtensionResource.ts
[deleteanaccountresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/deleteAnAccountResource.ts
[deleteanextensionresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/deleteAnExtensionResource.ts
[getalistofaccountresourcesintheresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAListOfAccountResourcesInTheResourceGroup.ts
[getalistofextensionresourceswithintheresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAListOfExtensionResourcesWithinTheResourceGroup.ts
[getalistofoperationsforthisresourceprovider]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAListOfOperationsForThisResourceProvider.ts
[getalistofprojectresourcesintheteamservicesaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAListOfProjectResourcesInTheTeamServicesAccount.ts
[getaprojectresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAProjectResource.ts
[getanaccountresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAnAccountResource.ts
[getanextensionresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getAnExtensionResource.ts
[getthestatusoftheprojectcreationjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/getTheStatusOfTheProjectCreationJob.ts
[updateaprojectresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/updateAProjectResource.ts
[updateanextensionresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/visualstudio/arm-visualstudio/samples/v4-beta/typescript/src/updateAnExtensionResource.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-visualstudio?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/visualstudio/arm-visualstudio/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
