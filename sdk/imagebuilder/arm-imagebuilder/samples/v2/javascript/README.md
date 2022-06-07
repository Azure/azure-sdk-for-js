# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                   | Lists available operations for the Microsoft.VirtualMachineImages provider x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/OperationsList.json                          |
| [virtualMachineImageTemplatesCancelSample.js][virtualmachineimagetemplatescancelsample]                           | Cancel the long running image build based on the image template x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/CancelImageBuild.json                                   |
| [virtualMachineImageTemplatesCreateOrUpdateSample.js][virtualmachineimagetemplatescreateorupdatesample]           | Create or update a virtual machine image template x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/CreateImageTemplateLinux.json                                         |
| [virtualMachineImageTemplatesDeleteSample.js][virtualmachineimagetemplatesdeletesample]                           | Delete a virtual machine image template x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/DeleteImageTemplate.json                                                        |
| [virtualMachineImageTemplatesGetRunOutputSample.js][virtualmachineimagetemplatesgetrunoutputsample]               | Get the specified run output for the specified image template resource x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/GetRunOutput.json                                |
| [virtualMachineImageTemplatesGetSample.js][virtualmachineimagetemplatesgetsample]                                 | Get information about a virtual machine image template x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/GetImageTemplate.json                                            |
| [virtualMachineImageTemplatesListByResourceGroupSample.js][virtualmachineimagetemplateslistbyresourcegroupsample] | Gets information about the VM image templates associated with the specified resource group. x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/ListImageTemplatesByRg.json |
| [virtualMachineImageTemplatesListRunOutputsSample.js][virtualmachineimagetemplateslistrunoutputssample]           | List all run outputs for the specified Image Template resource x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/ListRunOutputs.json                                      |
| [virtualMachineImageTemplatesListSample.js][virtualmachineimagetemplateslistsample]                               | Gets information about the VM image templates associated with the subscription. x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/ListImageTemplates.json                 |
| [virtualMachineImageTemplatesRunSample.js][virtualmachineimagetemplatesrunsample]                                 | Create artifacts from a existing image template x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/RunImageTemplate.json                                                   |
| [virtualMachineImageTemplatesUpdateSample.js][virtualmachineimagetemplatesupdatesample]                           | Update the tags for this Virtual Machine Image Template x-ms-original-file: specification/imagebuilder/resource-manager/Microsoft.VirtualMachineImages/stable/2022-02-14/examples/UpdateImageTemplateToRemoveIdentities.json                      |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/operationsListSample.js
[virtualmachineimagetemplatescancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesCancelSample.js
[virtualmachineimagetemplatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesCreateOrUpdateSample.js
[virtualmachineimagetemplatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesDeleteSample.js
[virtualmachineimagetemplatesgetrunoutputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesGetRunOutputSample.js
[virtualmachineimagetemplatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesGetSample.js
[virtualmachineimagetemplateslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesListByResourceGroupSample.js
[virtualmachineimagetemplateslistrunoutputssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesListRunOutputsSample.js
[virtualmachineimagetemplateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesListSample.js
[virtualmachineimagetemplatesrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesRunSample.js
[virtualmachineimagetemplatesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/imagebuilder/arm-imagebuilder/samples/v2/javascript/virtualMachineImageTemplatesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-imagebuilder?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/imagebuilder/arm-imagebuilder/README.md
