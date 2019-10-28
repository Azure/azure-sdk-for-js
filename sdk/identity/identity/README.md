## Azure Identity client library for JS

This library simplifies authentication against Azure Active Directory for Azure SDK libraries.
It provides a set of `TokenCredential` implementations which can be passed into SDK libraries
to authenticate API requests. It supports token authentication using an Azure Active Directory [service principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli) or [managed identity](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview).

## Getting started

### Prerequisites

- an Azure subscription
  - if you don't have one, you can sign up for a [free account](https://azure.microsoft.com/free/)
- Node.js 8 LTS or higher

**NOTE:** The credential implementations in this library are not yet supported in the browser. We will provide browser-supported implementations for some in a future preview release.

### Install the package

Install Azure Identity with `npm`:

```sh
npm install --save @azure/identity
```

## Key concepts

### Credentials

Azure Identity offers a variety of credential classes that are accepted by Azure SDK data plane clients. Each client library documents its Azure Identity integration in its README and samples. Azure SDK management plane libraries (those starting with `@azure/arm-*`)
do not accept these credentials.

Credentials differ mostly in configuration:

| credential class                   | identity                              | configuration                                                                                    |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`DefaultAzureCredential`][1]      | service principal or managed identity | none for managed identity; [environment variables](#environment-variables) for service principal |
| [`ManagedIdentityCredential`][2]   | managed identity                      | none                                                                                             |
| [`EnvironmentCredential`][3]       | service principal                     | [environment variables](#environment-variables)                                                  |
| [`ClientSecretCredential`][4]      | service principal                     | constructor parameters                                                                           |
| [`ClientCertificateCredential`][5] | service principal                     | constructor parameters                                                                           |
| [`DeviceCodeCredential`][6]        | app registration details              | constructor parameters                                                                           |
| [`AuthorizationCodeCredential`][7] | app registration details              | constructor parameters                                                                           |
| [`InteractiveBrowserCredential`][8]| app registration details              | constructor parameters                                                                           |
| [`UsernamePasswordCredential`][9]  | user principal                        | constructor parameters                                                                           |

Credentials can be chained and tried in turn until one succeeds; see [chaining credentials](#chaining-credentials) for details.

### DefaultAzureCredential

`DefaultAzureCredential` is appropriate for most scenarios. It supports authenticating as a service principal or managed identity. To authenticate as a service principal, provide configuration in environment variables as described in the next section. Currently this credential attempts to use the `EnvironmentCredential` and `ManagedIdentityCredential`, in that order.

Authenticating as a managed identity requires no configuration, but does require platform support. See the [managed identity documentation](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities) for more information.

### Environment variables

`DefaultAzureCredential` and `EnvironmentCredential` are configured for service principal authentication with these environment variables:

| variable name         | value                                               |
| --------------------- | --------------------------------------------------- |
| `AZURE_CLIENT_ID`     | service principal's app id                          |
| `AZURE_TENANT_ID`     | id of the principal's Azure Active Directory tenant |
| `AZURE_CLIENT_SECRET` | one of the service principal's client secrets       |

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

The `AuthorizationCodeCredential` takes more up-front work to use than the other credential types at this time.  A full sample demonstrating how to use this credential can be found in [`samples/authorizationCodeSample.ts`](samples/authorizationCodeSample.ts).

### Chaining credentials

```javascript
const { ClientSecretCredential, ChainedTokenCredential } = require("@azure/identity");

// When an access token is requested, the chain will try each
// credential in order, stopping when one provides a token
const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);

// The chain can be used anywhere a credential is required
const { KeysClient } = require("@azure/keyvault-keys");
const client = new KeysClient(vaultUrl, credentialChain);
```

## Troubleshooting

### General

Credentials raise `AuthenticationError` when they fail to authenticate. This class has a `message` field which describes why authentication failed. An `AggregateAuthenticationError` will be raised by `ChainedTokenCredential` with an `errors` field containing an array of errors from each credential in the chain.

## Next steps

### Read the documentation

API documentation for this library can be found on our [documentation site](https://azure.github.io/azure-sdk-for-js/identity/index.html).

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [https://cla.microsoft.com](https://cla.microsoft.com).

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

[1]: https://azure.github.io/azure-sdk-for-js/identity/classes/defaultazurecredential.html
[2]: https://azure.github.io/azure-sdk-for-js/identity/classes/managedidentitycredential.html
[3]: https://azure.github.io/azure-sdk-for-js/identity/classes/environmentcredential.html
[4]: https://azure.github.io/azure-sdk-for-js/identity/classes/clientsecretcredential.html
[5]: https://azure.github.io/azure-sdk-for-js/identity/classes/clientcertificatecredential.html
[6]: https://azure.github.io/azure-sdk-for-js/identity/classes/devicecodecredential.html
[7]: https://azure.github.io/azure-sdk-for-js/identity/classes/authorizationcodecredential.html
[8]: https://azure.github.io/azure-sdk-for-js/identity/classes/interactivebrowsercredential.html
[9]: https://azure.github.io/azure-sdk-for-js/identity/classes/usernamepasswordcredential.html
