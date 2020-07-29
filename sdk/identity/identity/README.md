## Azure Identity client library for JavaScript

This library simplifies authentication against Azure Active Directory for Azure SDK libraries.
It provides a set of `TokenCredential` implementations which can be passed into SDK libraries
to authenticate API requests. It supports token authentication using an Azure Active Directory [service principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli) or [managed identity](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview).

## Getting started

### Prerequisites

- an Azure subscription
  - if you don't have one, you can sign up for a [free account](https://azure.microsoft.com/free/)
- Node.js 8 LTS or higher

### Install the package

Install Azure Identity with `npm`:

```sh
npm install --save @azure/identity
```

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Credentials

Azure Identity offers a variety of credential classes that are accepted by Azure SDK data plane clients. Each client library documents its Azure Identity integration in its README and samples. Azure SDK management plane libraries (those starting with `@azure/arm-*`) do not accept these credentials.

Credentials differ mostly in configuration:

| credential class                    | identity                              | configuration                                                                                    |
| ----------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`DefaultAzureCredential`][1]       | service principal or managed identity | none for managed identity; [environment variables](#environment-variables) for service principal |
| [`ManagedIdentityCredential`][2]    | managed identity                      | none                                                                                             |
| [`EnvironmentCredential`][3]        | service principal                     | [environment variables](#environment-variables)                                                  |
| [`ClientSecretCredential`][4]       | service principal                     | constructor parameters                                                                           |
| [`ClientCertificateCredential`][5]  | service principal                     | constructor parameters                                                                           |
| [`DeviceCodeCredential`][6]         | app registration details              | constructor parameters                                                                           |
| [`AuthorizationCodeCredential`][7]  | app registration details              | constructor parameters                                                                           |
| [`InteractiveBrowserCredential`][8] | app registration details              | constructor parameters                                                                           |
| [`UsernamePasswordCredential`][9]   | user principal                        | constructor parameters                                                                           |

Credentials can be chained and tried in turn until one succeeds; see [chaining credentials](#chaining-credentials) for details.

### DefaultAzureCredential

`DefaultAzureCredential` is appropriate for most scenarios. It supports authenticating as a service principal or managed identity. To authenticate as a service principal, provide configuration in environment variables as described in the next section. Currently this credential attempts to use the `EnvironmentCredential` and `ManagedIdentityCredential`, in that order.

Authenticating as a managed identity requires no configuration, but does require platform support. See the [managed identity documentation](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities) for more information.

### Environment variables

`DefaultAzureCredential` and `EnvironmentCredential` are configured for service principal authentication with these environment variables:

| variable name                   | value                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `AZURE_CLIENT_ID`               | service principal's app id                                                                           |
| `AZURE_TENANT_ID`               | id of the principal's Azure Active Directory tenant                                                  |
| `AZURE_CLIENT_SECRET`           | one of the service principal's client secrets (implies `ClientSecretCredential`)                     |
| `AZURE_CLIENT_CERTIFICATE_PATH` | path to a PEM-encoded certificate file including private key (implies `ClientCertificateCredential`) |
| `AZURE_USERNAME`                | the username of a user in the tenant (implies `UsernamePasswordCredential`)                          |
| `AZURE_PASSWORD`                | the password of the user specified in `AZURE_USERNAME`                                               |

## Examples

### `DefaultAzureCredential`

```javascript
// The default credential first checks environment variables for configuration as described above.
// If environment configuration is incomplete, it will try managed identity.
const { KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
const client = new KeyClient(vaultUrl, credential);
const getResult = await client.getKey("MyKeyName");
```

### Authenticating as a service principal

```javascript
// Using a client secret
const { ClientSecretCredential } = require("@azure/identity");
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Using a PEM-encoded certificate with a private key, not password protected
const { ClientCertificateCredential } = require("@azure/identity");
const credential = new ClientCertificateCredential(
  tenantId,
  clientId,
  "/app/certs/certificate.pem"
);

// Using environment variables (see "Environment variables" above for variable names)
const { EnvironmentCredential } = require("@azure/identity");
const credential = new EnvironmentCredential();
```

### Using the `AuthorizationCodeCredential`

The `AuthorizationCodeCredential` takes more up-front work to use than the other credential types at this time. A full sample demonstrating how to use this credential can be found in [`samples/authorizationCodeSample.ts`](samples/authorizationCodeSample.ts).

### Chaining credentials

```javascript
const { ClientSecretCredential, ChainedTokenCredential } = require("@azure/identity");

// When an access token is requested, the chain will try each
// credential in order, stopping when one provides a token
const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);

// The chain can be used anywhere a credential is required
const { KeyClient } = require("@azure/keyvault-keys");
const client = new KeyClient(vaultUrl, credentialChain);
```

## Troubleshooting

### General

Credentials raise `AuthenticationError` when they fail to authenticate. This class has a `message` field which describes why authentication failed. An `AggregateAuthenticationError` will be raised by `ChainedTokenCredential` with an `errors` field containing an array of errors from each credential in the chain.

## Next steps

### Read the documentation

API documentation for this library can be found on our [documentation site](https://docs.microsoft.com/javascript/api/@azure/identity).

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

[1]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/defaultazurecredential.html
[2]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/managedidentitycredential.html
[3]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/environmentcredential.html
[4]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/clientsecretcredential.html
[5]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/clientcertificatecredential.html
[6]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/devicecodecredential.html
[7]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/authorizationcodecredential.html
[8]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/interactivebrowsercredential.html
[9]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-identity/1.0.0/classes/usernamepasswordcredential.html

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
