# Microsoft Azure SDK for JavaScript - Key Vault

This project provides a JavaScript package for accessing keys, secrets and certificates on Azure Key Vault. Right now it supports:
- **Node.js version: 6.x.x or higher**
- **REST API version: 2016-10-01**

## Features

- Manage keys: create, import, update, delete, backup, restore, list and get.
- Key operations: sign, verify, encrypt, decrypt, wrap, unwrap.
- Secret operations: set, get, update and list.
- Certificate operations: create, get, update, import, list, and manage contacts and issuers.

## How to Install

```bash
npm install keyvault
```
## Detailed Samples
A sample that can be cloned and run can be found [here](https://github.com/Azure-Samples/key-vault-node-authentication).

Others you might want to take a look at:
[Soft delete, recovery, backup and restore](https://github.com/Azure-Samples/key-vault-node-recovery)
[Managed storage accounts](https://github.com/Azure-Samples/key-vault-node-storage-accounts)
[Deploying certificates to a VM](https://github.com/Azure-Samples/key-vault-node-deploy-certificates-to-vm)
[Fetching keyvault secret from a web-application during runtime with MSI](https://github.com/Azure-Samples/app-service-msi-keyvault-node)

## How to Use

The following are some examples on how to create and consume secrets, certificates and keys.
For a complete sample, please check one of the above links.

### Authentication

```typescript

import * as KeyVault from "keyvault";
import { AuthenticationContext } from "adal-node";

const clientId = "<to-be-filled>";
const clientSecret = "<to-be-filled>";
const vaultUri = "<to-be-filled>";

// Authenticator - retrieves the access token
const authenticator = (challenge, callback: (error: Error, authorizationValue: string) => void) => {

  // Create a new authentication context.
  const context = new AuthenticationContext(challenge.authorization);
  
  // Use the context to acquire an authentication token.
  return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret)
    .then((tokenResponse) => {
      // Calculate the value to be set in the request's Authorization header and resume the call.
      const authorizationValue: string = tokenResponse.tokenType + " " + tokenResponse.accessToken;

      return callback(null, authorizationValue);
  });

};
```

### Create the KeyVaultClient

```typescript

const credentials = new KeyVault.KeyVaultCredentials(authenticator);
const client = new KeyVault.KeyVaultClient(credentials);
```

### Create a key and use it

```typescript

client.createKey(vaultUri, "mykey", "RSA", options).then( (keyBundle) => {
    // Encrypt some plain text
    return client.encrypt(keyBundle.key.kid, "RSA-OAEP", "ciphertext");
});
```

### Create a certificate and delete it

```typescript

// Create a certificate
client.createCertificate(vaultUri, "mycertificate", options).then((certificateOperation) => {
  console.log(certificateOperation);
  const parsedId = KeyVault.parseCertificateOperationIdentifier(certificateOperation.id);
  
  // Poll the certificate status until it is created
  const interval = setInterval( () => {
    client.getCertificateOperation(parsedId.vault, parsedId.name).then( (pendingCertificate) => {
      if (pendingCertificate.status.toUpperCase() === "completed".toUpperCase()) {
        clearInterval(interval); // clear our polling function
        console.log(pendingCertificate);
        var parsedCertId = KeyVault.parseCertificateIdentifier(pendingCertificate.target);
        client.deleteCertificate(parsedCertId.vault, parsedCertId.name).then( (deleteResponse) => {
          console.log(deleteResponse);
        });
      }
    });
  });
});
```

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/azure/azure-sdk-for-js)
- [Microsoft Azure SDK for JavaScript - Key Vault Management](https://github.com/Azure/azure-sdk-for-js/tree/master/lib/services/arm-keyvault)
