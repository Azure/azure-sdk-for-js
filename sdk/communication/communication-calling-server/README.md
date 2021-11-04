# Azure Communication CallingServer client library for JavaScript

This package contains a JavaScript SDK for Azure Communication Services for CallingServer.
Read more about Azure Communication Services [here](https://docs.microsoft.com/azure/communication-services/overview)

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-calling-server)

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

- A deployed Communication Services resource. You can use the [Azure Portal](https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp) or the [Azure PowerShell](https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice) to set it up.
- You must have a phone number configured that is associated with an Azure subscription

### Installing

```bash
npm install @azure/communication-calling-server
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).
In `rollup.config.js`, add following customized name exports in `cjs` plugin.

```JavaScript

cjs({
  namedExports: {
    events: ["EventEmitter"],
    "@azure/communication-signaling": ["CommunicationSignalingClient", "SignalingClient"],
    "@opentelemetry/api": ["CanonicalCode", "SpanKind", "TraceFlags"]
  }
})

```

## Key concepts

`CallingServerClient` provides the functionality to make call connection, join call connection or initialize a server call.

## Examples

The following section provides several code snippets covering some of the most common Azure Communication Services tasks, including:

- [Client Initialization](#client-initialization)
- [Make a call to a phone number recipient](#make-a-call-to-a-phone-number-recipient)

### Client Initialization

To initialize the CallingServer Client, the connection string can be used to instantiate.

```typescript
import { CallingServerClient } from "@azure/communication-calling-server";

const connectionString = `endpoint=https://<resource-name>.communication.azure.com/;accessKey=<Base64-Encoded-Key>`;
const client = new CallingServerClient(connectionString);
```

### Make a call to a phone number recipient

Once the client is initialized, the `createCallConnection` method can be invoked:

```typescript
import { CreateCallOptions } from "@azure/communication-calling-server";

const createCallResponse = callingserver_client.createCallConnection(
  (source = "<from-phone-number>"),
  (targets = "<to-phone-number-1>"),
  (createCallOptions = Something)
);
```

- `from_`: Something.
- `to`: Something.
- `createCallOptions`: Something.

## Troubleshooting

Running into issues? This section should contain details as to what to do there.

## Next steps

More sample code should go [here](https://github.com/Azure/azure-sdk-for-js), along with links out to the appropriate example tests.

## Provide Feedback

If you encounter any bugs or have suggestions, please file an issue in the [Issues](https://github.com/Azure/azure-sdk-for-js/issues) section of the project

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the
PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

<!-- LINKS -->
