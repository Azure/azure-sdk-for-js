# Azure Batch client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Batch client.

Azure Batch provides Cloud-scale job scheduling and compute management.

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/batch` package

Install the Azure Batch client library for JavaScript with `npm`:

```bash
npm install @azure/batch
```

### Upgrade from version 13

Version 14 uses Azure Batch service API version `2026-10-01` by default.
It removes `listPoolUsageMetrics`, its associated operation exports and models, and the
`"retaineddata"` node-deallocation option. Use `"requeue"`, `"terminate"`, or
`"taskcompletion"` for node deallocation. Stay on version 13 if you still require the
removed SDK APIs.

An explicit `apiVersion` client option can select an older service API version for
remaining operations, but it does not restore removed SDK members.

### Create and authenticate a `BatchClient`

To create a client object to access the Azure Batch API, you will need the `endpoint` of your Azure Batch resource and a `credential`. The Azure Batch client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure Batch resource in the [Azure Portal][azure_portal].

Azure batch supports authentication either via Microsoft Entra ID or Shared Key.

- [Microsoft Entra ID](#microsoft-entra-id)
- [Shared Key](#shared-key)

#### Microsoft Entra ID

You can authenticate with Azure Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure Batch** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create an Azure AD Application check out [this guide](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClient_Node_EntraID
import { BatchClient } from "@azure/batch";
import { DefaultAzureCredential } from "@azure/identity";

const client = new BatchClient("<endpoint>", new DefaultAzureCredential());
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { BatchClient } from "@azure/batch";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new BatchClient("<endpoint>", credential);
```

#### Shared Key

To use shared key to authenticate, you must first `npm` install [`@azure/core-auth`](https://www.npmjs.com/package/@azure/core-auth), then provide the account name and account key to construct the an `AzureNamedKeyCredential` credential from `@azure/core-auth`.

Noted that Share Key authentication is only supported in Node.js and Node-like environments.

```ts snippet:ReadmeSampleCreateClient_Node_SharedKey
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { BatchClient } from "@azure/batch";

const credential = new AzureNamedKeyCredential("<account name>", "<account key>");
const client = new BatchClient("<endpoint>", credential);
```

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### BatchClient

`BatchClient` is the primary interface for developers using the Azure Batch client library. Explore the methods on this client object to understand the different features of the Azure Batch service that you can access.

## Examples

### Create a pool with automatic availability-zone placement

The new API supports availability-zone placement and resiliency policies on the
virtual machine configuration. Choose a VM size and zone count supported by the
Batch account's region.

```ts snippet:ReadmeSampleCreatePool_Placement
import { BatchClient } from "@azure/batch";
import { DefaultAzureCredential } from "@azure/identity";

const client = new BatchClient("<endpoint>", new DefaultAzureCredential());
await client.createPool({
  id: "zone-balanced-pool",
  vmSize: "Standard_D2s_v5",
  targetDedicatedNodes: 3,
  virtualMachineConfiguration: {
    nodeAgentSkuId: "batch.node.ubuntu 22.04",
    imageReference: {
      publisher: "canonical",
      offer: "0001-com-ubuntu-server-jammy",
      sku: "22_04-lts",
      version: "latest",
    },
    placement: { zonePlacementPolicy: "Auto" },
    resiliencyPolicy: { zoneAllocationPolicy: { maxZoneCount: 3 } },
  },
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

### Running recorded tests

Run commands from this package directory. The test scripts use `TEST_MODE=playback`
by default and keep separate Node.js and browser recordings. To refresh browser
recordings, use `TEST_MODE=record` with `pnpm test:browser`; `pnpm test:node` only
refreshes Node.js recordings. After recording, set `TEST_MODE=playback` and run
`pnpm test` to verify both sets before publishing them.

Live and record modes require Azure authentication and `AZURE_SUBSCRIPTION_ID` in
the test process environment. In PowerShell, set `$env:AZURE_SUBSCRIPTION_ID` in
the same terminal used to start the tests. Check inheritance without printing
the value using `pnpm exec node -e "console.log(Boolean(process.env.AZURE_SUBSCRIPTION_ID))"`.
These modes create and delete Azure resources and can incur charges.

Shared provisioning helpers read configuration through `env` from
`@azure-tools/test-recorder` so Node.js setup and browser tests use the appropriate
runtime environment rather than reading `process.env` directly.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
