# Azure IoT Resolver library for Javascript

This package contains an isomorphic Client Library for Azure IoT Models Repository in Javascript. Use the Azure IoT Resolver library for Javascript to pull DTDL files from remote endpoints.

## Key concepts

The Azure IoT Resolver library for Javascript is written to interact with the Azure IoT PlugAndPlay Models Repository, for those developers who wish to write applications in Javascript to do so.

### Currently supported environments

- Node.js version 10.x.x or higher
- Browser JavaScript

### How to Install

```
npm install @azure/iot-modelsrepository-client
```

### How to use

#### nodejs - Authentication, client creation and get ioTSpaces as an example written in TypeScript.

##### Sample code

```ts
import { ModelsRepositoryClient } from "@azure/iot-modelsrepository-client";

const client = new ModelsRepositoryClient("https://devicemodels.azure.com");
const result = await client.getModels("dtmi:azure:DeviceManagement:DeviceInformation;1");
console.log(result);
```

#### browser - Authentication, client creation and get ioTSpaces as an example written in JavaScript.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/iot-modelsrepository-client sample</title>
    <script src="node_modules/@azure/iot-modelsrepository-client/dist/client.browser.js"></script>
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

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

## Contributing

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
