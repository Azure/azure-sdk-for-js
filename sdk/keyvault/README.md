# Azure Key Vault client libraries for for JavaScript

[Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/) is a Microsoft-managed service providing cloud keys, secrets, and certificate storage and utility that is highly available, secure, durable, scalable, and redundant.

## Libraries for resource management

To manage your Azure Key Vault resources via the Azure Resource Manager, you would use the below library.

| NPM Package | Reference |
|--------------------------------------|---------------------------------------------------------------|
|    [@azure/arm-keyvault](http://npmjs.com/package/@azure/arm-keyvault)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/arm-keyvault)    |

## Libraries for data access

There are three packages to work with Key Vault keys, secrets and certificates and a fourth package for administrative tasks on your Key Vault instance.

| NPM Package | Reference | Samples |
|--------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------|
|    [@azure/keyvault-keys](http://npmjs.com/package/@azure/keyvault-keys)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/keyvault-keys)    | [Samples for working with keys](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys/samples)
|    [@azure/keyvault-secrets](http://npmjs.com/package/@azure/keyvault-secrets)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/keyvault-secrets)    | [Samples for working with secrets](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/samples)
|    [@azure/keyvault-certificates](http://npmjs.com/package/@azure/keyvault-certificates)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/keyvault-certificates)    | [Samples for working with certificates](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)
|    [@azure/keyvault-admin](http://npmjs.com/package/@azure/keyvault-admin)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/keyvault-admin)    | [Samples for administrative tasks](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/samples)

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
