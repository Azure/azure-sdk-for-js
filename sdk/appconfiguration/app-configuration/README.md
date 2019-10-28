# Azure App Configuration client library for JS

Azure App Configuration is a managed service that helps developers
centralize their application configurations, simply and securely.

Use the App Configuration client library to:

* create App Configuration settings
* retrieve the value of a setting for a given key
* update the value of a setting for a given key
* delete settings within an App Configuration

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/app-configuration) |
[API reference documentation](https://docs.microsoft.com/en-us/azure/azure-app-configuration/) |
[Product documentation](https://docs.microsoft.com/en-us/azure/azure-app-configuration/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Install the Package

**Prerequisites**: You must have an [Azure Subscription](https://azure.microsoft.com) and an [App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/) to use this package. This package currently
only supports NodeJS versions higher than 8.0.0.

```bash
npm install @azure/app-configuration
```

## Examples

#### Create and get a setting

```javascript
const appConfig = require("@azure/app-configuration");

const client = new appConfig.AppConfigurationClient("<App Configuration connection string goes here>");

async function run() {
  const newSetting = await client.setConfigurationSetting({
    key: "testkey", 
    value: "testvalue",
    // Labels allow you to create variants of a key tailored
    // for specific use-cases like supporting multiple environments.
    // https://docs.microsoft.com/en-us/azure/azure-app-configuration/concept-key-value#label-keys
    label: "optional-label"
  });

  let retrievedSetting = await client.getConfigurationSetting("testkey", { label: "optional-label" });

  console.log("Retrieved value:", retrievedSetting.value);
}

run().catch(err => console.log("ERROR:", err));
```

## Next steps

Use these samples for a more in-depth demonstration of Azure App Configuration.

* [`helloworld.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworld.ts) - Get, set, and delete configuration values 
* [`helloworldWithLabels.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworldWithLabels.ts) - using labels to add additional dimensions to your settings for scenarios like beta vs production
* [`optimisticConcurrencyViaEtag.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/optimisticConcurrencyViaEtag.ts) - setting values using etags to prevent accidental overwrites
* [`setReadOnlySample.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/setReadOnlySample.ts) - marking settings as read-only to prevent modification
* [`getSettingOnlyIfChanged.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/getSettingOnlyIfChanged.ts) - get a setting only if it changed from the last time you got it

View all samples in [the samples folder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure App Configuration instance. To execute the tests you'll need to run:
1. `rush update`
2. `rush build -t @azure/app-configuration`
3. Create a .env file with these contents in the `sdk\appconfiguration\app-configuration` folder:  
   `AZ_CONFIG_CONNECTION=connection string for your App Configuration instance`
4. `cd sdk\appconfiguration\app-configuration`
5. `npm run test`.

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/appconfiguration/app-config/README.png)
