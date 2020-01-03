# App Configuration client library for TypeScript/JavaScript

[Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview) is a managed service that helps developers centralize their application and feature settings simply and securely.

Use the client library for App Configuration to:

* Create flexible key representations and mappings
* Tag keys with labels
* Replay settings from any point in time

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/app-configuration) |
[API reference documentation](https://azure.github.io/azure-sdk-for-js/appconfiguration.html) |
[Product documentation](https://docs.microsoft.com/en-us/azure/azure-app-configuration/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

**Prerequisites**: You must have an [Azure Subscription](https://azure.microsoft.com) and an [App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/) resource to use this package.

### 1. Install the `@azure/app-configuration` package

```bash
npm install @azure/app-configuration
```

### 2. Create an App Configuration resource

You can use the [Azure Portal](https://portal.azure.com) or the [Azure CLI](https://docs.microsoft.com/cli/azure) to create an Azure App Configuration resource.

Example (Azure CLI):
```
az appconfig create --name <app-configuration-resource-name> --resource-group <resource-group-name> --location eastus
```

### 3. Copy samples

Copy the files from the [`samples` on GitHub](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/appconfiguration/app-configuration/samples) 
into the local **folder** you created above.

### 4. Make your sample a console application

Near the top of your sample file you will need to replace 
the old import with a proper package import.

Old:
```typescript
// NOTE: replace with import { AppConfigurationClient } from "@azure/app-configuration"
// in a standalone project
import { AppConfigurationClient } from "../src";
```

New:
```typescript
import { AppConfigurationClient } from "@azure/app-configuration";
```

Also, at the bottom these we'll need to uncomment some lines:

Old:
```typescript
// If you want to run this sample from a console
// uncomment these lines so run() will get called
// run().catch(err => {
//     console.log(`ERROR: ${err}`);
// });
```

New:
```typescript
run().catch(err => {
  console.log(`ERROR: ${err}`);
});
```

### 5. Set the App Configuration connection string in your environment

Set `AZ_CONFIG_CONNECTION` to the **connection string** for your App Configuration resource.

You can use this Azure CLI command to get the Primary **connection string**:
```
az appconfig credential list -g <resource-group-name> -n <app-configuration-resource-name> --query "([?name=='Primary'].connectionString)[0]"
```

### 6. Run the sample file

Now you can run each sample, by either compiling it to Javascript or using `ts-node`
which will compile and run the sample in a single step.

```
npx ts-node <name of sample file>
```

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
