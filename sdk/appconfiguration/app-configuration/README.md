# Azure App Configuration client library for JavaScript

[Azure App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/overview) is a managed service that helps developers centralize their application and feature settings simply and securely.

Use _@azure/app-configuration_ (this library) to:

- Manage configuration settings and snapshots in Azure App Configuration
- Perform granular reads that operate outside the realm of normal configuration consumption

Most applications should start with the [_@azure/app-configuration-provider_](https://www.npmjs.com/package/@azure/app-configuration-provider) library, which builds on this low-level client library and is the recommended way to consume configuration at runtime. It adds:

- Flexible access patterns using configuration as a key/value map or a structured JSON object
- Query mechanism to declaratively compose app configuration
- Configuration refresh during runtime
- High reliability with caching, replica discovery, failover, and load balancing
- Key vault reference resolution and auto-refresh
- Feature flag integration for [@microsoft/feature-management](https://www.npmjs.com/package/@microsoft/feature-management) library

For more information, please go to [configuration provider](https://learn.microsoft.com/azure/azure-app-configuration/configuration-provider-overview).

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/app-configuration)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/app-configuration)
- [Product documentation](https://learn.microsoft.com/azure/azure-app-configuration/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples)

## Getting started

### Install the package

```bash
npm install @azure/app-configuration
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An [App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/) resource

### Create an App Configuration resource

You can use the [Azure Portal](https://portal.azure.com) or the [Azure CLI](https://learn.microsoft.com/cli/azure) to create an Azure App Configuration resource.

Example (Azure CLI):

```
az appconfig create --name <app-configuration-resource-name> --resource-group <resource-group-name> --location eastus
```

### Authenticate the client

AppConfigurationClient can authenticate using a [service principal](#authenticating-with-a-service-principal) or using a [connection string](#authenticating-with-a-connection-string).

#### Authenticating with a service principal

Authentication via service principal is done by:

- Creating a credential using the `@azure/identity` package.
- Setting appropriate RBAC rules on your AppConfiguration resource.
  More information on App Configuration roles can be found [here](https://learn.microsoft.com/azure/azure-app-configuration/concept-enable-rbac#azure-built-in-roles-for-azure-app-configuration).

Using [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential)

```ts snippet:ReadmeSampleCreateClient_Node
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);
```

More information about `@azure/identity` can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md)

#### Sovereign Clouds

To authenticate with a resource in a [Sovereign Cloud](https://learn.microsoft.com/azure/active-directory/develop/authentication-national-cloud), you will need to set the `audience` in the `AppConfigurationClient` constructor options.

```ts snippet:AuthenticatingWithAzureSovereignCloud
import { AppConfigurationClient, KnownAppConfigAudience } from "@azure/app-configuration";
import { DefaultAzureCredential } from "@azure/identity";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.azure.cn";
// Create an AppConfigurationClient that will authenticate through AAD in the China cloud
const client = new AppConfigurationClient(endpoint, new DefaultAzureCredential(), {
  audience: KnownAppConfigAudience.AzureChina,
});
```

Note: When `audience` property is not defined, the SDK will default to Azure Public Cloud.

#### Authenticating with a connection string

To get the Primary **connection string** for an App Configuration resource you can use this Azure CLI command:

```
az appconfig credential list -g <resource-group-name> -n <app-configuration-resource-name> --query "([?name=='Primary'].connectionString)[0]"
```

And in code you can now create your App Configuration client with the **connection string** you got from the Azure CLI:

```ts snippet:ReadmeSampleCreateClientWithConnectionString
import { AppConfigurationClient } from "@azure/app-configuration";

const connectionString = "Endpoint=https://example.azconfig.io;XXX=YYYY;YYY=ZZZZ";
const client = new AppConfigurationClient(connectionString);
```

## Key concepts

The [`AppConfigurationClient`](https://learn.microsoft.com/javascript/api/@azure/app-configuration/appconfigurationclient) has some terminology changes from App Configuration in the portal.

- Key/Value pairs are represented as [`ConfigurationSetting`](https://learn.microsoft.com/javascript/api/@azure/app-configuration/configurationsetting) objects
- Locking and unlocking a setting is represented in the `isReadOnly` field, which you can toggle using `setReadOnly`.
- Snapshots are represented as `ConfigurationSnapshot` objects.

The client follows a simple design methodology - [`ConfigurationSetting`](https://learn.microsoft.com/javascript/api/@azure/app-configuration/configurationsetting) can be passed into any method that takes a [`ConfigurationSettingParam`](https://learn.microsoft.com/javascript/api/@azure/app-configuration/configurationsettingparam) or [`ConfigurationSettingId`](https://learn.microsoft.com/javascript/api/@azure/app-configuration/configurationsettingid).

This means this pattern works:

```ts snippet:ConfigurationSettingPattern
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

const setting = await client.getConfigurationSetting({
  key: "hello",
});

setting.value = "new value!";
await client.setConfigurationSetting(setting);

// fields unrelated to just identifying the setting are simply
// ignored (for instance, the `value` field)
await client.setReadOnly(setting, true);

// delete just needs to identify the setting so other fields are
// just ignored
await client.deleteConfigurationSetting(setting);
```

or, for example, re-getting a setting:

```ts snippet:ReGetSetting
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

let setting = await client.getConfigurationSetting({
  key: "hello",
});

// re-get the setting
setting = await client.getConfigurationSetting(setting);
```

The `2022-11-01-preview` API version supports configuration snapshots: immutable, point-in-time copies of a configuration store. Snapshots can be created with filters that determine which key-value pairs are contained within the snapshot, creating an immutable, composed view of the configuration store. This feature enables applications to hold a consistent view of configuration, ensuring that there are no version mismatches to individual settings due to reading as updates were made. For example, this feature can be used to create "release configuration snapshots" within an App Configuration. See [the _create and get a snapshot_ section](#create-and-get-a-setting) in the example below.

## Examples

### Create and get a setting

```ts snippet:CreateSetting
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

await client.setConfigurationSetting({
  key: "testkey",
  value: "testvalue",
  // Labels allow you to create variants of a key tailored
  // for specific use-cases like supporting multiple environments.
  // https://learn.microsoft.com/azure/azure-app-configuration/concept-key-value#label-keys
  label: "optional-label",
});

const retrievedSetting = await client.getConfigurationSetting({
  key: "testkey",
  label: "optional-label",
});

console.log("Retrieved value:", retrievedSetting.value);
```

### Create a snapshot

`beginCreateSnapshot` gives you the poller to poll for the snapshot creation.

```ts snippet:CreateSnapshot
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

const key = "testkey";
const value = "testvalue";
const label = "optional-label";

await client.addConfigurationSetting({
  key,
  value,
  label,
});

const poller = await client.beginCreateSnapshot({
  name: "testsnapshot",
  retentionPeriod: 2592000,
  filters: [{ keyFilter: key, labelFilter: label }],
});
const snapshot = await poller.pollUntilDone();
```

You can also use `beginCreateSnapshotAndWait` to have the result of the creation directly after the polling is done.

```ts snippet:CreateSnapshotAndWait
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

const key = "testkey";
const value = "testvalue";
const label = "optional-label";

const snapshot = await client.beginCreateSnapshotAndWait({
  name: "testsnapshot",
  retentionPeriod: 2592000,
  filters: [{ keyFilter: key, labelFilter: label }],
});
```

### Get a snapshot

```ts snippet:GetSnapshot
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

const retrievedSnapshot = await client.getSnapshot("testsnapshot");
console.log("Retrieved snapshot:", retrievedSnapshot);
```

### List the `ConfigurationSetting` in the snapshot

```ts snippet:ListSnapshotSettings
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

const retrievedSnapshotSettings = await client.listConfigurationSettingsForSnapshot("testsnapshot");

for await (const setting of retrievedSnapshotSettings) {
  console.log(`Found key: ${setting.key}, label: ${setting.label}`);
}
```

### List all snapshots from the service

```ts snippet:ListSnapshots
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

const snapshots = await client.listSnapshots();

for await (const snapshot of snapshots) {
  console.log(`Found snapshot: ${snapshot.name}`);
}
```

### Recover and archive the snapshot

```ts snippet:RecoverAndArchiveSnapshot
import { DefaultAzureCredential } from "@azure/identity";
import { AppConfigurationClient } from "@azure/app-configuration";

// The endpoint for your App Configuration resource
const endpoint = "https://example.azconfig.io";
const credential = new DefaultAzureCredential();
const client = new AppConfigurationClient(endpoint, credential);

// Snapshot is in ready status
const archivedSnapshot = await client.archiveSnapshot("testsnapshot");
console.log("Snapshot updated status is:", archivedSnapshot.status);

// Snapshot is in archive status
const recoverSnapshot = await client.recoverSnapshot("testsnapshot");
console.log("Snapshot updated status is:", recoverSnapshot.status);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### React Native support

React Native does not support some JavaScript API used by this SDK library so you need to provide polyfills for them. Please see our [React Native sample with Expo](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native/appconfigBasic/README.md#add-polyfills) for more details.

## Next steps

The following samples show you the various ways you can interact with App Configuration:

- [`helloworld.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/helloworld.ts) - Get, set, and delete configuration values.
- [`helloworldWithLabels.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/helloworldWithLabels.ts) - Use labels to add additional dimensions to your settings for scenarios like beta vs production.
- [`optimisticConcurrencyViaEtag.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/optimisticConcurrencyViaEtag.ts) - Set values using etags to prevent accidental overwrites.
- [`setReadOnlySample.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/setReadOnlySample.ts) - Marking settings as read-only to prevent modification.
- [`getSettingOnlyIfChanged.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/getSettingOnlyIfChanged.ts) - Get a setting only if it changed from the last time you got it.
- [`listRevisions.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/listRevisions.ts) - List the revisions of a key, allowing you to see previous values and when they were set.
- [`secretReference.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/secretReference.ts) - SecretReference represents a configuration setting that references as KeyVault secret.
- [`snapshot.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/snapshot.ts) - Create, list configuration settings, and archive snapshots.
- [`featureFlag.ts`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/typescript/src/featureFlag.ts) - Feature flags are settings that follow specific JSON schema for the value.

More in-depth examples can be found in the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration/samples/v1/) folder on GitHub.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure App Configuration instance. To execute the tests you'll need to run:

1. `pnpm install`
2. `pnpm build --filter @azure/app-configuration...`
3. Create a .env file with these contents in the `sdk\appconfiguration\app-configuration` folder:
   `APPCONFIG_CONNECTION_STRING=connection string for your App Configuration instance`
4. `cd sdk\appconfiguration\app-configuration`
5. `npm run test`.

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/overview)
