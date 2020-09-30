# Azure Communication Administration client library for JavaScript

The Azure Communication Administration library lets the developer create/delete users and issue tokens for Communication Services. Users and tokens can then be used when adding Chat or Calling to an app.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-administration
```

## Key concepts

### CommunicationIdentityClient

`CommunicationIdentityClient` provides methods to manage users and their tokens.

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you may authenticate with any of the following methods:

### Create `KeyCredential` with `AzureKeyCredential` before initializing CommunicationIdentityClient

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { CommunicationIdentityClient } from "@azure/communication-administration";

const credential = new AzureKeyCredential(KEY);
const client = new CommunicationIdentityClient(HOST, credential);
```

### Using a connection string

```typescript
import { CommunicationIdentityClient } from "@azure/communication-administration";

const connectionString = `endpoint=HOST;accessKey=KEY`;
const client = new CommunicationIdentityClient(connectionString);
```

## Usage

### Create a user and token

Here we create an instance of the `CommunicationIdentityClient` class, create a user, then issue a chat scoped token for the user.

```typescript
import { CommunicationIdentityClient } from "@azure/communication-administration";

const client = new CommunicationIdentityClient(CONNECTION_STRING);
const user = await client.createUser();
const { token } = await client.issueToken(user, ["chat"]);
```

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-administration/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-administration%2FREADME.png)
