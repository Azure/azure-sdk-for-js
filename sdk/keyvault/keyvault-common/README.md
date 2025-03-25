# Azure Key Vault Common client library for JavaScript

An internal support library for the various Azure Key Vault client libraries.

This package contains common code that needs to be shared among the other Azure Key Vault libraries. **It is not meant for usage by any other consumers**.

## Key Vault client libraries

The following client libraries use this package:

- [@azure/keyvault-admin](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/README.md)
- [@azure/keyvault-certificates](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/README.md)
- [@azure/keyvault-keys](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/README.md)
- [@azure/keyvault-secrets](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-secrets/README.md)

## Getting started

For information on getting started, please see our [Key Vault client libraries](#key-vault-client-libraries).

## Key concepts

For information on key concepts, please see our [Key Vault client libraries](#key-vault-client-libraries).

## Examples

For examples, please see our [Key Vault client libraries](#key-vault-client-libraries).

## Next steps

For information on next steps, please see our [Key Vault client libraries](#key-vault-client-libraries).

## Troubleshooting

If you run into issues while using this library, directly or indirectly, please feel free to [file an issue](https://github.com/Azure/azure-sdk-for-js/issues/new).

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
