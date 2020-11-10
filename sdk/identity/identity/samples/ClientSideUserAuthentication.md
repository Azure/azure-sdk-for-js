# Client side user authentication

Client side applications often need to authenticate users to interact with resources in Azure. Some examples of this might be a command line tool which fetches secrets a user has access to from a key vault to setup a local test environment, or a GUI based application which allows a user to browse storage blobs they have access to. This sample demonstrates authenticating users with the `@azure/identity` library.

## Interactive user authentication

Most often authenticating users requires some user interaction. Properly handling this user interaction for OAuth2 authorization code or device code authentication can be challenging. To simplify this for client side applications the `@azure/identity` library provides the `InteractiveBrowserCredential` and the `DeviceCodeCredential`. These credentials are designed to handle the user interactions needed to authenticate via these two client side authentication flows, so the application developer can simply create the credential and authenticate clients with it.

## Authenticating users with the InteractiveBrowserCredential

For clients which have a default browser available, the `InteractiveBrowserCredential` provides the most simple user authentication experience. In the sample below an application authenticates a `KeyClient` (from [@azure/keyvault-keys](https://www.npmjs.com/package/@azure/keyvault-keys)) using the `InteractiveBrowserCredential`.

```ts
const { InteractiveBrowserCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");

async function main() {
  const credential = new InteractiveBrowserCredential({
    // By default, tenantId will be "organizations". You might assign a specific tenant this way.
    tenantId: process.env.AZURE_TENANT_ID,
    // By default, clientId will be the same used by the Azure CLI. You might assign a specific client ID this way.
    clientId: process.env.AZURE_CLIENT_ID  
  });

  const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
  const client = new KeyClient(keyVaultUrl, credential);

  // Retrieving the properties of the existing keys in that specific Key Vault.
  console.log(await client.listPropertiesOfKeys().next());
}

main().then(console.log).catch((e) => console.error(e));
```

As code uses the `SecretClient` in the above sample, the `InteractiveBrowserCredential` will automatically authenticate the user by launching the default system browser prompting the user to login. Once the user successfully logs in, the user can then call into Azure services.

## Authenticating users with the DeviceCodeCredential

For terminal clients without an available web browser, or clients with limited UI capabilities the `DeviceCodeCredential` provides the ability to authenticate any client using a device code. The next sample shows authenticating a `BlobServiceClient` (from [@azure/storage-blob](https://www.npmjs.com/package/@azure/storage-blob)) using the `DeviceCodeCredential`.

```ts
const { DeviceCodeCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

async function main() {
  const credential = new DeviceCodeCredential(
    // By default, tenantId will be "organizations". You might assign a specific tenant this way.
    process.env.AZURE_TENANT_ID,
    // By default, clientId will be the same used by the Azure CLI. You might assign a specific client ID this way.
    process.env.AZURE_CLIENT_ID
  );
  const client = new BlobServiceClient("https://myaccount.blob.core.windows.net/mycontainer/myblob", credential);

  const containerClient = blobServiceClient.getContainerClient("<container-name>");
  const createContainerResponse = await containerClient.create();
  console.log(`Successfully created a container`, createContainerResponse.requestId);
}

main().then(console.log).catch((e) => console.error(e));
```

Similarly to the `InteractiveBrowserCredential` the `DeviceCodeCredential` will also initiate the user interaction automatically as needed. To instantiate the `DeviceCodeCredential` the application must provide a callback which is called to display the device code along with details on how to authenticate to the user. By default, a message with a URL and a code will be presented to the user through the device's console. Once the user loads the given URL and enters the code, the authentication will be complete, and the user will be able to call into Azure services.
