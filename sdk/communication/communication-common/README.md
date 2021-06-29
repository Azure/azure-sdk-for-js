# Azure Communication Common client library for JavaScript

This package contains common code for Azure Communication Service libraries.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-common
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### CommunicationTokenCredential and AzureCommunicationTokenCredential

A `CommunicationTokenCredential` authenticates a user with Communication Services, such as Chat or Calling. It optionally provides an auto-refresh mechanism to ensure a continuously stable authentication state during communications.

It is up to you the developer to first create valid user tokens with the Azure Communication Administration library. Then you use these tokens to create a `AzureCommunicationTokenCredential`.

`CommunicationTokenCredential` is only the interface, please always use the `AzureCommunicationTokenCredential` constructor to create a credential and take advantage of the built-in refresh logic.

## Examples

### Create a credential with a static token

```typescript
const tokenCredential = new AzureCommunicationTokenCredential(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDB9.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs"
);
```

### Create a credential with a callback

Here we assume that we have a function `fetchTokenFromMyServerForUser` that makes a network request to retrieve a token string for a user. We pass it into the credential to fetch a token for Bob from our own server. Our server would use the Azure Communication Administration library to issue tokens.

```typescript
const tokenCredential = new AzureCommunicationTokenCredential({
  tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com")
});
```

### Create a credential with proactive refreshing

Setting `refreshProactively` to true will call your `tokenRefresher` function when the token is close to expiry.

```typescript
const tokenCredential = new AzureCommunicationTokenCredential({
  tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
  refreshProactively: true
});
```

### Create a credential with proactive refreshing and an initial token

Passing `initialToken` is an optional optimization to skip the first call to `tokenRefresher`. You can use this to separate the boot from your application from subsequent token refresh cycles.

```typescript
const tokenCredential = new AzureCommunicationTokenCredential({
  tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
  refreshProactively: true,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDB9.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs"
});
```

## Troubleshooting

## Next steps

- [Read more about Communication user access tokens](https://docs.microsoft.com/azure/communication-services/concepts/authentication?tabs=javascript)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-sms%2FREADME.png)
