# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [webServicesCreateOrUpdateSample.ts][webservicescreateorupdatesample]                     | Create or update a web service. This call will overwrite an existing web service. Note that there is no warning or confirmation. This is a nonrecoverable operation. If your intent is to create a new web service, call the Get operation first to verify that it does not exist. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/putWebService.json                                                                                                                                   |
| [webServicesCreateRegionalPropertiesSample.ts][webservicescreateregionalpropertiessample] | Creates an encrypted credentials parameter blob for the specified region. To get the web service from a region other than the region in which it has been created, you must first call Create Regional Web Services Properties to create a copy of the encrypted credential parameter blob in that region. You only need to do this before the first time that you get the web service in the new region. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/createRegionalProperties.json |
| [webServicesGetSample.ts][webservicesgetsample]                                           | Gets the Web Service Definition as specified by a subscription, resource group, and name. Note that the storage credentials and web service keys are not returned by this call. To get the web service access keys, call List Keys. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/getWebService.json                                                                                                                                                                                  |
| [webServicesListByResourceGroupSample.ts][webserviceslistbyresourcegroupsample]           | Gets the web services in the specified resource group. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/getWebServicesByResourceGroup.json                                                                                                                                                                                                                                                                                                                                               |
| [webServicesListBySubscriptionIdSample.ts][webserviceslistbysubscriptionidsample]         | Gets the web services in the specified subscription. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/getWebServicesBySubscriptionId.json                                                                                                                                                                                                                                                                                                                                                |
| [webServicesListKeysSample.ts][webserviceslistkeyssample]                                 | Gets the access keys for the specified web service. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/getWebServiceKeys.json                                                                                                                                                                                                                                                                                                                                                              |
| [webServicesPatchSample.ts][webservicespatchsample]                                       | Modifies an existing web service resource. The PATCH API call is an asynchronous operation. To determine whether it has completed successfully, you must perform a Get operation. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/patchWebService.json                                                                                                                                                                                                                                  |
| [webServicesRemoveSample.ts][webservicesremovesample]                                     | Deletes the specified web service. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2017-01-01/examples/deleteWebService.json                                                                                                                                                                                                                                                                                                                                                                                |

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
node dist/webServicesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/webServicesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[webservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesCreateOrUpdateSample.ts
[webservicescreateregionalpropertiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesCreateRegionalPropertiesSample.ts
[webservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesGetSample.ts
[webserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesListByResourceGroupSample.ts
[webserviceslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesListBySubscriptionIdSample.ts
[webserviceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesListKeysSample.ts
[webservicespatchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesPatchSample.ts
[webservicesremovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-webservices/samples/v1/typescript/src/webServicesRemoveSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-webservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearning/arm-webservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
