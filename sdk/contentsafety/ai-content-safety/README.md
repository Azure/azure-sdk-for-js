# Azure AI Content Safety client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for analyzing harmful content, evaluating Agent Control Specification policies, detecting content provenance, and managing text blocklists.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-content-safety)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/ai-content-safety)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/ai-content-safety` package

Install the Azure AI Content Safety client library for JavaScript with `npm`:

```bash
npm install @azure/ai-content-safety@next
```

### Create and authenticate clients

To create a client, you will need the `endpoint` of your Azure AI Content Safety resource and a credential. You can find the endpoint in the [Azure Portal][azure_portal].

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing Microsoft Entra token](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new Microsoft Entra application and grant access to Azure AI Content Safety** by assigning a suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create a Microsoft Entra application check out [this guide](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClients_Node
import { DefaultAzureCredential } from "@azure/identity";
import {
  ContentSafetyClient,
  ContentProvenanceClient,
  BlocklistClient,
} from "@azure/ai-content-safety";

const credential = new DefaultAzureCredential();
const contentSafetyClient = new ContentSafetyClient("<endpoint>", credential);
const contentProvenanceClient = new ContentProvenanceClient("<endpoint>", credential);
const blocklistClient = new BlocklistClient("<endpoint>", credential);
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateContentSafetyClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { ContentSafetyClient } from "@azure/ai-content-safety";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new ContentSafetyClient("<endpoint>", credential);
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### ContentSafetyClient

`ContentSafetyClient` analyzes text and images, detects protected material and prompt injection, and evaluates content against an Agent Control Specification policy.

```ts snippet:ReadmeSampleUnifiedModerate
import { ContentSafetyClient } from "@azure/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ContentSafetyClient("<endpoint>", new DefaultAzureCredential());
async function moderateInput(): Promise<void> {
  const result = await client.unifiedModerate({
    policyId: "<policy-id>",
    source: "input",
    content: "Text to evaluate",
  });
  console.log(result.verdict);
}
void moderateInput;
```

### ContentProvenanceClient

`ContentProvenanceClient` starts and monitors long-running detection operations for Microsoft-issued C2PA and watermark signals.

```ts snippet:ReadmeSampleDetectProvenance
import { ContentProvenanceClient } from "@azure/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ContentProvenanceClient("<endpoint>", new DefaultAzureCredential());
async function detectProvenance(): Promise<void> {
  const poller = client.detect({ content: { uri: "<media-blob-uri>" } });
  const result = await poller.pollUntilDone();
  console.log(result.outcome);
}
void detectProvenance;
```

Serialized poller state can be restored in another process:

```ts snippet:ReadmeSampleRestoreProvenancePoller
import { ContentProvenanceClient, restorePoller } from "@azure/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ContentProvenanceClient("<endpoint>", new DefaultAzureCredential());
async function resumeDetection(serializedState: string): Promise<void> {
  const poller = restorePoller(client, serializedState, client.detect.bind(client));
  const result = await poller.pollUntilDone();
  console.log(result.outcome);
}
void resumeDetection;
```

### BlocklistClient

`BlocklistClient` creates, updates, lists, and deletes text blocklists and their items.

```ts snippet:ReadmeSampleUpdateBlocklist
import { BlocklistClient } from "@azure/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";

const client = new BlocklistClient("<endpoint>", new DefaultAzureCredential());
async function updateBlocklist(): Promise<void> {
  const result = await client.createOrUpdateTextBlocklist("<blocklist-name>", {
    description: "Blocklist description",
  });
  console.log(result.blocklistName);
}
void updateBlocklist;
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

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
