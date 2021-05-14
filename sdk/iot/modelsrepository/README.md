# Azure IoT Models Repository client library for JavaScript

This package contains an isomorphic Client Library for Azure IoT Models Repository in Javascript. Use the Azure IoT Models Repository library for Javascript to pull DTDL files from remote endpoints.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/iot/modelsrepository) |
[Package (npm)](https://www.npmjs.com/package/@azure/iot-modelsrepository/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/iot-modelsrepository/samples) 

-------------------------------------

# Getting started

## Key concepts

The Azure IoT Models Repository library for Javascript is written to interact with the Azure IoT PlugAndPlay Models Repository, for those developers who wish to write applications in Javascript to do so.

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### How to Install

The preferred way to install the Azure IoT Models Repository client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```
npm install @azure/iot-modelsrepository
```

# Examples

## nodejs - Authentication, client creation and get ioTSpaces as an example written in TypeScript.

### Sample code

```ts
import { ModelsRepositoryClient } from "@azure/iot-modelsrepository";

const client = new ModelsRepositoryClient("https://devicemodels.azure.com");
const result = await client.getModels("dtmi:azure:DeviceManagement:DeviceInformation;1");
console.log(result);
```

## browser - Authentication, client creation and get ioTSpaces as an example written in JavaScript.

### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/iot-modelsrepository sample</title>
    <script src="node_modules/@azure/iot-modelsrepository/dist/client.browser.js"></script>
    <script type="text/javascript">
      const dtmi = "<Subscription_Id>";
      const repositoryLocation = "<Repository_Location>";
      // async / await OR chaining can be used.
      const client = new Azure.IotModelsrepositoryClient.ModelsRepositoryClient(repositoryLocation);
      client
        .getModels(dtmi)
        .then((result) => {
          console.log(`The result is: ${result}`);
        })
        .catch((err) => {
          console.log(`An error occured: ${err}`);
        });
    </script>
  </head>
  <body></body>
</html>
```

-----------------------------------------

# Troubleshooting

- If you run into an error, first make sure the model you are access exists at the location you are attempting to get it from.

# Next steps

- Review the [DTDL Spec](https://docs.microsoft.com/en-us/azure/iot-pnp/concepts-model-parser).
- Understand the [Device Models Repository](https://devicemodels.azure.com/).
- Code a IoT Plug and Play 'Device' using the [Azure IoT SDK for Node](https://github.com/Azure/azure-iot-sdk-node/tree/master/device/samples/pnp/readme.md).  

# Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

<!-- LINKS -->

[azure_portal]: https://portal.azure.com
[npm]: https://www.npmjs.com/
[iot_pnp_docs]: https://docs.microsoft.com/en-us/azure/iot-pnp/
