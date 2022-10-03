# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [templateSpecVersionsCreateOrUpdateSample.ts][templatespecversionscreateorupdatesample] | Creates or updates a Template Spec version. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecVersionsCreate.json                                                                          |
| [templateSpecVersionsDeleteSample.ts][templatespecversionsdeletesample]                 | Deletes a specific version from a Template Spec. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecVersionsDelete.json |
| [templateSpecVersionsGetSample.ts][templatespecversionsgetsample]                       | Gets a Template Spec version from a specific Template Spec. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecVersionsGet.json                                                             |
| [templateSpecVersionsListSample.ts][templatespecversionslistsample]                     | Lists all the Template Spec versions in the specified Template Spec. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecVersionsList.json                                                   |
| [templateSpecVersionsUpdateSample.ts][templatespecversionsupdatesample]                 | Updates Template Spec Version tags with specified values. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecVersionsPatch.json                                                             |
| [templateSpecsCreateOrUpdateSample.ts][templatespecscreateorupdatesample]               | Creates or updates a Template Spec. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsCreate.json                                                                                         |
| [templateSpecsDeleteSample.ts][templatespecsdeletesample]                               | Deletes a Template Spec by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsDelete.json                        |
| [templateSpecsGetSample.ts][templatespecsgetsample]                                     | Gets a Template Spec with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsGet.json                                                                                        |
| [templateSpecsListByResourceGroupSample.ts][templatespecslistbyresourcegroupsample]     | Lists all the Template Specs within the specified resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsListByResourceGroup.json                                              |
| [templateSpecsListBySubscriptionSample.ts][templatespecslistbysubscriptionsample]       | Lists all the Template Specs within the specified subscriptions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsListBySubscription.json                                                |
| [templateSpecsUpdateSample.ts][templatespecsupdatesample]                               | Updates Template Spec tags with specified values. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-05-01/examples/TemplateSpecsPatch.json                                                                            |

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
node dist/templateSpecVersionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/templateSpecVersionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[templatespecversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecVersionsCreateOrUpdateSample.ts
[templatespecversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecVersionsDeleteSample.ts
[templatespecversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecVersionsGetSample.ts
[templatespecversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecVersionsListSample.ts
[templatespecversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecVersionsUpdateSample.ts
[templatespecscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecsCreateOrUpdateSample.ts
[templatespecsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecsDeleteSample.ts
[templatespecsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecsGetSample.ts
[templatespecslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecsListByResourceGroupSample.ts
[templatespecslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecsListBySubscriptionSample.ts
[templatespecsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/templatespecs/arm-templatespecs/samples/v2/typescript/src/templateSpecsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-templatespecs?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/templatespecs/arm-templatespecs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
