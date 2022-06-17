# Azure Key Vault client libraries for JavaScript

[Azure Key Vault](https://azure.microsoft.com/services/key-vault/) is a Microsoft-managed service providing cloud keys, secrets, and certificate storage and utility that is highly available, secure, durable, scalable, and redundant.

## Libraries for resource management

To manage your Azure Key Vault resources via the Azure Resource Manager, you would use the below package.

| NPM Package                                                          | Reference                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [@azure/arm-keyvault](https://npmjs.com/package/@azure/arm-keyvault) | [API Reference for @azure/arm-keyvault](https://docs.microsoft.com/javascript/api/@azure/arm-keyvault) |

## Libraries for data access

There are three packages to work with Key Vault keys, secrets and certificates respectively.
A fourth package, `@azure/keyvault-admin` is also available for administrative tasks on your Key Vault instance.

| NPM Package                                                                            | Reference                                                                                                                | Samples                                                                                                                                 |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [@azure/keyvault-keys](https://npmjs.com/package/@azure/keyvault-keys)                 | [API Reference for @azure/keyvault-keys](https://docs.microsoft.com/javascript/api/@azure/keyvault-keys)                 | [Samples for working with keys](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys/samples)                 |
| [@azure/keyvault-secrets](https://npmjs.com/package/@azure/keyvault-secrets)           | [API Reference for @azure/keyvault-secrets](https://docs.microsoft.com/javascript/api/@azure/keyvault-secrets)           | [Samples for working with secrets](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-secrets/samples)           |
| [@azure/keyvault-certificates](https://npmjs.com/package/@azure/keyvault-certificates) | [API Reference for @azure/keyvault-certificates](https://docs.microsoft.com/javascript/api/@azure/keyvault-certificates) | [Samples for working with certificates](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-certificates/samples) |
| [@azure/keyvault-admin](https://npmjs.com/package/@azure/keyvault-admin)               | [API Reference for @azure/keyvault-admin](https://docs.microsoft.com/javascript/api/@azure/keyvault-admin)               | [Samples for administrative tasks](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/samples)             |

### Features

- Key Vault Keys
  - Create keys using elliptic curve or RSA encryption, optionally backed by Hardware Security Modules (HSM).
  - Import, delete and update keys.
  - Get one or more keys and deleted keys.
  - Recover a deleted key and restore a backed up key.
  - Get the versions and the attributes of a key.
  - Encrypting, decrypting, signing, verifying, wrapping and unwrapping data with keys.
- Key Vault Secrets
  - Get, set and delete a secret.
  - Update a secret and it's attributes.
  - Backup and restore a secret.
  - Get, purge or recover a deleted secret.
  - Get all the versions of a secret, or secrets, or deleted secrets.
- Key Vault Certificates
  - Get, set and delete a certificate.
  - Update a certificate, its attributes, issuer, policy, operation and contacts.
  - Backup and restore a certificate.
  - Get, purge or recover a deleted certificate.
  - Get all the versions of a certificate, or certificates, or deleted certificates.
- Key Vault Admin
  - Get, set, list, and delete Key Vault RBAC (Role-Based Access Control) role assignments.
  - Get, set, list, and delete Key Vault RBAC (Role-Based Access Control) role definitions.
  - Backup and restore Azure Key Vault Managed HSM instances, including selective restore of specific keys.
