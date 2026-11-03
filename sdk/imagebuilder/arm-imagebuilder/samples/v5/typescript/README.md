# @azure/arm-imagebuilder client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-imagebuilder in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.ts][operationslistsample]                                                                   | lists available operations for the Microsoft.VirtualMachineImages provider x-ms-original-file: 2025-10-01/OperationsList.json                          |
| [triggersCreateOrUpdateSample.ts][triggerscreateorupdatesample]                                                   | create or update a trigger for the specified virtual machine image template x-ms-original-file: 2025-10-01/CreateSourceImageTrigger.json               |
| [triggersDeleteSample.ts][triggersdeletesample]                                                                   | delete a trigger for the specified virtual machine image template x-ms-original-file: 2025-10-01/DeleteTrigger.json                                    |
| [triggersGetSample.ts][triggersgetsample]                                                                         | get the specified trigger for the specified image template resource x-ms-original-file: 2025-10-01/GetTrigger.json                                     |
| [triggersListByImageTemplateSample.ts][triggerslistbyimagetemplatesample]                                         | list all triggers for the specified Image Template resource x-ms-original-file: 2025-10-01/ListTriggers.json                                           |
| [virtualMachineImageTemplatesCancelSample.ts][virtualmachineimagetemplatescancelsample]                           | cancel the long running image build based on the image template x-ms-original-file: 2025-10-01/CancelImageBuild.json                                   |
| [virtualMachineImageTemplatesCreateOrUpdateSample.ts][virtualmachineimagetemplatescreateorupdatesample]           | create or update a virtual machine image template x-ms-original-file: 2025-10-01/CreateImageTemplateLinux.json                                         |
| [virtualMachineImageTemplatesDeleteSample.ts][virtualmachineimagetemplatesdeletesample]                           | delete a virtual machine image template x-ms-original-file: 2025-10-01/DeleteImageTemplate.json                                                        |
| [virtualMachineImageTemplatesGetRunOutputSample.ts][virtualmachineimagetemplatesgetrunoutputsample]               | get the specified run output for the specified image template resource x-ms-original-file: 2025-10-01/GetRunOutput.json                                |
| [virtualMachineImageTemplatesGetSample.ts][virtualmachineimagetemplatesgetsample]                                 | get information about a virtual machine image template x-ms-original-file: 2025-10-01/GetImageTemplate.json                                            |
| [virtualMachineImageTemplatesListByResourceGroupSample.ts][virtualmachineimagetemplateslistbyresourcegroupsample] | gets information about the VM image templates associated with the specified resource group. x-ms-original-file: 2025-10-01/ListImageTemplatesByRg.json |
| [virtualMachineImageTemplatesListRunOutputsSample.ts][virtualmachineimagetemplateslistrunoutputssample]           | list all run outputs for the specified Image Template resource x-ms-original-file: 2025-10-01/ListRunOutputs.json                                      |
| [virtualMachineImageTemplatesListSample.ts][virtualmachineimagetemplateslistsample]                               | gets information about the VM image templates associated with the subscription. x-ms-original-file: 2025-10-01/ListImageTemplates.json                 |
| [virtualMachineImageTemplatesRunSample.ts][virtualmachineimagetemplatesrunsample]                                 | create artifacts from a existing image template x-ms-original-file: 2025-10-01/RunImageTemplate.json                                                   |
| [virtualMachineImageTemplatesUpdateSample.ts][virtualmachineimagetemplatesupdatesample]                           | update the tags for this Virtual Machine Image Template x-ms-original-file: 2025-10-01/UpdateImageTemplateTags.json                                    |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/operationsListSample.ts
[triggerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/triggersCreateOrUpdateSample.ts
[triggersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/triggersDeleteSample.ts
[triggersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/triggersGetSample.ts
[triggerslistbyimagetemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/triggersListByImageTemplateSample.ts
[virtualmachineimagetemplatescancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesCancelSample.ts
[virtualmachineimagetemplatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesCreateOrUpdateSample.ts
[virtualmachineimagetemplatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesDeleteSample.ts
[virtualmachineimagetemplatesgetrunoutputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesGetRunOutputSample.ts
[virtualmachineimagetemplatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesGetSample.ts
[virtualmachineimagetemplateslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesListByResourceGroupSample.ts
[virtualmachineimagetemplateslistrunoutputssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesListRunOutputsSample.ts
[virtualmachineimagetemplateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesListSample.ts
[virtualmachineimagetemplatesrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesRunSample.ts
[virtualmachineimagetemplatesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/typescript/src/virtualMachineImageTemplatesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-imagebuilder
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/imagebuilder/arm-imagebuilder/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
