# Azure App Configuration client library for JS

Azure App Configuration is a managed service that helps developers centralize their application configurations simply and securely.

Modern programs, especially programs running in a cloud, generally have many components that are distributed in nature. Spreading configuration settings across these components can lead to hard-to-troubleshoot errors during an application deployment. Use App Configuration to securely store all the settings for your application in one place.

Use the client library for App Configuration to:

* Create centrally stored application configuration settings
* Retrieve settings
* Update settings
* Delete settings

[NPM](https://www.npmjs.com/package/@azure/app-configuration) | [Product documentation](https://docs.microsoft.com/en-us/azure/azure-app-configuration/)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### How to Install

```bash
npm install @azure/app-configuration
```

## Key concepts

### Configuration Setting

A Configuration Setting is the fundamental resource within a Configuration Store.
In its simplest form, it is a key and a value. However, there are additional properties such as 
the modifiable content type and tags fields that allows the value to be interpreted or associated 
in different ways.

The `label` property of a Configuration Setting provides a way to separate configuration settings 
into different dimensions. These dimensions are user defined and can take any form. Some common 
examples of dimensions to use for a label include regions, semantic versions, or environments. 
Many applications have a required set of configuration keys that have varying values as the 
application exists across different dimensions.

For example, MaxRequests may be 100 in "NorthAmerica", and 200 in "WestEurope". By creating a 
Configuration Setting named MaxRequests with a label of "NorthAmerica" and another, only with 
a different value, in the "WestEurope" label, an application can seamlessly retrieve 
Configuration Settings as it runs in these two dimensions.

## Examples

#### nodejs - Authentication, client creation and listConfigurationSettings as an example written in TypeScript.

##### Sample code

```typescript
import { AppConfigurationClient } from "@azure/app-configuration";

const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;
const client = new AppConfigurationClient(connectionString);

let configurationSetting = await client.getConfigurationSetting("testkey");

console.log("The result is:");
console.log(configurationSetting.value);
```

More examples can be found in the samples folder on [github](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples)

## Next steps

Explore the samples to understand how to work with Azure App Configuration.

* [`helloworld.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworld.ts) - getting, setting and deleting configuration values 
* [`helloworldWithLabels.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworldWithLabels.ts) - using labels to add additional dimensions to your settings
* [`helloworldWithETag.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworldWithETag.ts) - setting values using etags to prevent accidental overwrites

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are live tests, which require you to have an Azure App Configuration instance. To execute the tests 
you'll need to run:
1. `rush update`
2. `rush build`
3. `npm run test`.

View our tests ([index.spec.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/test/index.spec.ts)) for more details.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/appconfiguration/app-config/README.png)
