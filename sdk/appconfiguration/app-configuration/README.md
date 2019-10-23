# App Configuration client library for TypeScript/JavaScript

[Azure App Configuration][appconfig_concepts] is a managed service that helps developers centralize their application and feature settings simply and securely.

Use the client library for App Configuration to:
* Create flexible key representations and mappings
* Tag keys with labels
* Replay settings from any point in time

[Source](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/) | [NPM](https://www.npmjs.com/package/@azure/app-configuration) | [API Reference documentation](https://azure.github.io/azure-sdk-for-js/app-configuration/) | [Samples][samples]

## Getting started

### 1. Install the `@azure/app-configuration` package

```bash
npm install @azure/app-configuration
```

**Note**: This package supports Node.js 8.x.x (or higher).


### 2. Create an App Configuration resource

You can use the [Azure Portal][azure_portal] or the [Azure CLI][azure_cli] to create an Azure App Configuration resource.

Example (Azure CLI):
```
az appconfig create --name <app-configuration-resource-name> --resource-group <resource-group-name> --location eastus
```

**Prerequisites**: You must have an [Azure subscription][azure_sub] to create an App Configuration resource.

### 3. Create and authenticate an `AppConfigurationClient`

App Configuration uses connection strings for authentication. 

To get the Primary **connection string** for an App Configuration resource you can use this Azure CLI command:

```
az appconfig credential list -g <resource-group-name> -n <app-configuration-resource-name> --query "([?name=='Primary'].connectionString)[0]"
```

And in code you can now create your App Configuration client with the **connection string** you got from the Azure CLI:

```typescript
const client = new AppConfigurationClient("<connection string>");
```

## Key concepts

The [`AppConfigurationClient`](https://azure.github.io/azure-sdk-for-js/app-configuration/classes/appconfigurationclient.html) has some terminology changes from App Configuration in the portal. 

* Key/Value pairs are represented as [`ConfigurationSetting`](https://azure.github.io/azure-sdk-for-js/app-configuration/interfaces/configurationsetting.html) objects
* Locking and unlocking a setting is renamed to `readOnly`, which you can toggle using the `setReadOnly` and `clearReadOnly` methods.

The client follows a simple design methodology - [`ConfigurationSetting`](https://azure.github.io/azure-sdk-for-js/app-configuration/interfaces/configurationsetting.html) can be passed into any method that takes a [`ConfigurationSettingParam`](https://azure.github.io/azure-sdk-for-js/app-configuration/interfaces/configurationsettingparam.html) or [`ConfigurationSettingId`](https://azure.github.io/azure-sdk-for-js/app-configuration/interfaces/configurationsettingid.html). 

This means this pattern works:

```typescript
const setting = await client.getConfigurationSetting({
  key: "hello"
});

setting.value = "new value!";
await client.setConfigurationSetting(setting);

// fields unrelated to just identifying the setting are simply 
// ignored (for instance, the `value` field)
await client.setReadOnly(setting);

// delete just needs to identify the setting so other fields are
// just ignored
await client.deleteConfigurationSetting(setting);
```

or, for example, re-getting a setting:

```typescript
let setting = await client.getConfigurationSetting({
  key: "hello"
});

// re-get the setting
setting = await.getConfigurationSetting(setting); 
```

## Examples

#### nodejs - Create and get a setting in JavaScript

##### Sample code

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

More in-depth examples can be found in the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples) folder on GitHub.

## Samples

The following samples show you the various ways you can interact with App Configuration:

* [`helloworld.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworld.ts) - Get, set, and delete configuration values.
* [`helloworldWithLabels.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/helloworldWithLabels.ts) - Use labels to add additional dimensions to your settings for scenarios like beta vs production.
* [`optimisticConcurrencyViaEtag.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/optimisticConcurrencyViaEtag.ts) - Set values using etags to prevent accidental overwrites.
* [`setReadOnlySample.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/setReadOnlySample.ts) - Marking settings as read-only to prevent modification.
* [`getSettingOnlyIfChanged.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/getSettingOnlyIfChanged.ts) - Get a setting only if it changed from the last time you got it.
* [`listRevisions.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples/listRevisions.ts) - List the revisions of a key, allowing you to see previous values and when they were set.

View more samples on [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples)

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

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
- [Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/appconfiguration/app-config/README.png)

<!-- LINKS -->
[appconfig_docs]: https://docs.microsoft.com/en-us/azure/azure-app-configuration/
[appconfig_rest]: https://github.com/Azure/AppConfiguration#rest-api-reference
[appconfig_concepts]: https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[package]: https://www.npmjs.com/package/@azure/app-configuration
[nodejs]: https://nodejs.org/en/download/
[azure_portal]: https://portal.azure.com
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples

[style-guide-msft]: https://docs.microsoft.com/style-guide/capitalization
[style-guide-cloud]: https://worldready.cloudapp.net/Styleguide/Read?id=2696&topicid=25357