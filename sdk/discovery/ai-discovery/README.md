# Azure AI Discovery client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for the Azure AI Discovery service.

The library exposes two clients:

- `WorkspaceClient` — work with conversations, investigations, tasks, and tools in a Discovery workspace.
- `BookshelfClient` — manage and query knowledge bases in a Discovery bookshelf.

Each client targets its own service endpoint.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/discovery/ai-discovery)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-discovery)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/ai-discovery)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/ai-discovery` package

Install the Discovery client library for JavaScript with `npm`:

```bash
npm install @azure/ai-discovery
```

### Create and authenticate the clients

To create a client object, you will need the service `endpoint` and a `credential`. The Azure AI Discovery clients use Microsoft Entra credentials to authenticate. `WorkspaceClient` and `BookshelfClient` each target their own endpoint, so create the client(s) you need with the corresponding endpoint. You can find the endpoints for your Discovery resources in the [Azure Portal][azure_portal].

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing Microsoft Entra token](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new Microsoft Entra application and grant access to Azure AI Discovery** by assigning a suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create a Microsoft Entra application check out [this guide](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the clients.

```ts snippet:ReadmeSampleCreateClients_Node
import { DefaultAzureCredential } from "@azure/identity";
import { WorkspaceClient, BookshelfClient } from "@azure/ai-discovery";

const credential = new DefaultAzureCredential();
// WorkspaceClient exposes conversations, investigations, tasks, and tools.
const workspaceClient = new WorkspaceClient("<workspace-endpoint>", credential);
// BookshelfClient exposes knowledge bases.
const bookshelfClient = new BookshelfClient("<bookshelf-endpoint>", credential);
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClients_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { WorkspaceClient, BookshelfClient } from "@azure/ai-discovery";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const workspaceClient = new WorkspaceClient("<workspace-endpoint>", credential);
const bookshelfClient = new BookshelfClient("<bookshelf-endpoint>", credential);
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### WorkspaceClient

`WorkspaceClient` provides access to Discovery workspace features: conversations, investigations, tasks, and tools. Explore the methods on this client to work with resources in a Discovery workspace.

### BookshelfClient

`BookshelfClient` provides access to Discovery bookshelf features: managing and querying knowledge bases. Explore the methods on this client to work with knowledge bases in a Discovery bookshelf.

## Examples

### List knowledge bases

List the knowledge bases in a Discovery Bookshelf resource with `BookshelfClient`.

```ts snippet:ReadmeSampleListKnowledgeBases
import { BookshelfClient } from "@azure/ai-discovery";
import { DefaultAzureCredential } from "@azure/identity";

const client = new BookshelfClient("<bookshelf-endpoint>", new DefaultAzureCredential());
for await (const knowledgeBase of client.knowledgeBases.list()) {
  console.log(knowledgeBase.name);
}
```

### List tasks in an investigation

List the tasks that belong to an investigation with `WorkspaceClient`.

```ts snippet:ReadmeSampleListTasks
import { WorkspaceClient } from "@azure/ai-discovery";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WorkspaceClient("<workspace-endpoint>", new DefaultAzureCredential());
for await (const task of client.tasks.list("<project-name>", "<investigation-name>")) {
  console.log(task.name);
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).


## Next steps

Have a look at the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/discovery/ai-discovery/samples) folder, containing fully runnable code.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
