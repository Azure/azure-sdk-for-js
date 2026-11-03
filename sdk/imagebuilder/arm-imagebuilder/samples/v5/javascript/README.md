# @azure/arm-imagebuilder client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-imagebuilder in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                                                                   | lists available operations for the Microsoft.VirtualMachineImages provider x-ms-original-file: 2025-10-01/OperationsList.json                          |
| [triggersCreateOrUpdateSample.js][triggerscreateorupdatesample]                                                   | create or update a trigger for the specified virtual machine image template x-ms-original-file: 2025-10-01/CreateSourceImageTrigger.json               |
| [triggersDeleteSample.js][triggersdeletesample]                                                                   | delete a trigger for the specified virtual machine image template x-ms-original-file: 2025-10-01/DeleteTrigger.json                                    |
| [triggersGetSample.js][triggersgetsample]                                                                         | get the specified trigger for the specified image template resource x-ms-original-file: 2025-10-01/GetTrigger.json                                     |
| [triggersListByImageTemplateSample.js][triggerslistbyimagetemplatesample]                                         | list all triggers for the specified Image Template resource x-ms-original-file: 2025-10-01/ListTriggers.json                                           |
| [virtualMachineImageTemplatesCancelSample.js][virtualmachineimagetemplatescancelsample]                           | cancel the long running image build based on the image template x-ms-original-file: 2025-10-01/CancelImageBuild.json                                   |
| [virtualMachineImageTemplatesCreateOrUpdateSample.js][virtualmachineimagetemplatescreateorupdatesample]           | create or update a virtual machine image template x-ms-original-file: 2025-10-01/CreateImageTemplateLinux.json                                         |
| [virtualMachineImageTemplatesDeleteSample.js][virtualmachineimagetemplatesdeletesample]                           | delete a virtual machine image template x-ms-original-file: 2025-10-01/DeleteImageTemplate.json                                                        |
| [virtualMachineImageTemplatesGetRunOutputSample.js][virtualmachineimagetemplatesgetrunoutputsample]               | get the specified run output for the specified image template resource x-ms-original-file: 2025-10-01/GetRunOutput.json                                |
| [virtualMachineImageTemplatesGetSample.js][virtualmachineimagetemplatesgetsample]                                 | get information about a virtual machine image template x-ms-original-file: 2025-10-01/GetImageTemplate.json                                            |
| [virtualMachineImageTemplatesListByResourceGroupSample.js][virtualmachineimagetemplateslistbyresourcegroupsample] | gets information about the VM image templates associated with the specified resource group. x-ms-original-file: 2025-10-01/ListImageTemplatesByRg.json |
| [virtualMachineImageTemplatesListRunOutputsSample.js][virtualmachineimagetemplateslistrunoutputssample]           | list all run outputs for the specified Image Template resource x-ms-original-file: 2025-10-01/ListRunOutputs.json                                      |
| [virtualMachineImageTemplatesListSample.js][virtualmachineimagetemplateslistsample]                               | gets information about the VM image templates associated with the subscription. x-ms-original-file: 2025-10-01/ListImageTemplates.json                 |
| [virtualMachineImageTemplatesRunSample.js][virtualmachineimagetemplatesrunsample]                                 | create artifacts from a existing image template x-ms-original-file: 2025-10-01/RunImageTemplate.json                                                   |
| [virtualMachineImageTemplatesUpdateSample.js][virtualmachineimagetemplatesupdatesample]                           | update the tags for this Virtual Machine Image Template x-ms-original-file: 2025-10-01/UpdateImageTemplateTags.json                                    |

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
node operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/operationsListSample.js
[triggerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/triggersCreateOrUpdateSample.js
[triggersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/triggersDeleteSample.js
[triggersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/triggersGetSample.js
[triggerslistbyimagetemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/triggersListByImageTemplateSample.js
[virtualmachineimagetemplatescancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesCancelSample.js
[virtualmachineimagetemplatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesCreateOrUpdateSample.js
[virtualmachineimagetemplatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesDeleteSample.js
[virtualmachineimagetemplatesgetrunoutputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesGetRunOutputSample.js
[virtualmachineimagetemplatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesGetSample.js
[virtualmachineimagetemplateslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesListByResourceGroupSample.js
[virtualmachineimagetemplateslistrunoutputssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesListRunOutputsSample.js
[virtualmachineimagetemplateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesListSample.js
[virtualmachineimagetemplatesrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesRunSample.js
[virtualmachineimagetemplatesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v5/javascript/virtualMachineImageTemplatesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-imagebuilder
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/imagebuilder/arm-imagebuilder/README.md
