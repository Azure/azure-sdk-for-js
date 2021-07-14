# Azure Key Vault Certificates client library for JavaScript

Azure Key Vault is a cloud service that provides secure storage and automated management of certificates used throughout a cloud application. Multiple certificates, and multiple versions of the same certificate, can be kept in the Azure Key Vault. Each certificate in the vault has a policy associated with it which controls the issuance and lifetime of the certificate, along with actions to be taken as certificates near expiry.

If you would like to know more about Azure Key Vault, you may want to review: [What is Azure Key Vault?](https://docs.microsoft.com/azure/key-vault/key-vault-overview)

Use the client library for Azure Key Vault Certificates in your Node.js application to:

- Get, set and delete a certificate.
- Update a certificate, its attributes, issuer, policy, operation and contacts.
- Backup and restore a certificate.
- Get, purge or recover a deleted certificate.
- Get all the versions of a certificate.
- Get all certificates.
- Get all deleted certificates.

> Note: This package cannot be used in the browser due to Azure Key Vault service limitations, please refer to [this document](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/cors/ts/README.md) for guidance.

Key links:
- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-certificates)
- [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-certificates)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/keyvault-certificates)
- [Product documentation](https://azure.microsoft.com/services/key-vault/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Key Vault resource](https://docs.microsoft.com/azure/key-vault/quick-create-portal)

### Install the package

Install the Azure Key Vault Certificates client library using npm

`npm install @azure/keyvault-certificates`

### Install the identity library

Key Vault clients authenticate using the Azure Identity Library. Install it as well using npm

`npm install @azure/identity`

### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Configuring your Key Vault

Use the [Azure Cloud Shell](https://shell.azure.com/bash) snippet below to create/get client secret credentials.

- Create a service principal and configure its access to Azure resources:
  ```Bash
  az ad sp create-for-rbac -n <your-application-name> --skip-assignment
  ```
  Output:
  ```json
  {
    "appId": "generated-app-ID",
    "displayName": "dummy-app-name",
    "name": "http://dummy-app-name",
    "password": "random-password",
    "tenant": "tenant-ID"
  }
  ```
- Use the above returned credentials information to set **AZURE_CLIENT_ID**(appId), **AZURE_CLIENT_SECRET**(password) and **AZURE_TENANT_ID**(tenant) environment variables. The following example shows a way to do this in Bash:

  ```Bash
    export AZURE_CLIENT_ID="generated-app-ID"
    export AZURE_CLIENT_SECRET="random-password"
    export AZURE_TENANT_ID="tenant-ID"
  ```

- Grant the above mentioned application authorization to perform certificate operations on the keyvault:

  ```Bash
  az keyvault set-policy --name <your-key-vault-name> --spn $AZURE_CLIENT_ID --certificate-permissions backup create delete deleteissuers get getissuers import list listissuers managecontacts manageissuers purge recover restore setissuers update
  ```

  > --certificate-permissions:
  > Accepted values: backup, create, delete, deleteissuers, get, getissuers, import, list, listissuers, managecontacts, manageissuers, purge, recover, restore, setissuers, update

  If you have enabled role-based access control (RBAC) for Key Vault instead, you can find roles like "Key Vault Certificates Officer" in our [RBAC guide](https://docs.microsoft.com/azure/key-vault/general/rbac-guide).

- Use the above mentioned Key Vault name to retrieve details of your Vault which also contains your Key Vault URL:
  ```Bash
  az keyvault show --name <your-key-vault-name>
  ```

## Authenticating with Azure Active Directory

The Key Vault service relies on Azure Active Directory to authenticate requests to its APIs. The [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) provides more details and samples to get you started.

Here's a quick example. First, import `DefaultAzureCredential` and `CertificateClient`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
```

Once these are imported, we can next connect to the key vault service. To do this, we'll need to copy some settings from the key vault we are connecting to into our environment variables. Once they are in our environment, we can access them with the following code:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

// DefaultAzureCredential expects the following three environment variables:
// * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// * AZURE_CLIENT_SECRET: The client secret for the registered application
const credential = new DefaultAzureCredential();

// Build the URL to reach your key vault
const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

// Lastly, create our certificates client and connect to the service
const client = new CertificateClient(url, credential);
```

## Key concepts

- The **Certificates client** is the primary interface to interact with the API methods
  related to certificates in the Azure Key Vault API from a JavaScript application.
  Once initialized, it provides a basic set of methods that can be used to
  create, read, update and delete certificates.
- A **Certificate version** is a version of a certificate in the Key Vault.
  Each time a user assigns a value to a unique certificate name, a new **version**
  of that certificate is created. Retrieving a certificate by a name will always return
  the latest value assigned, unless a specific version is provided to the
  query.
- **Soft delete** allows Key Vaults to support deletion and purging as two
  separate steps, so deleted certificates are not immediately lost. This only happens if the Key Vault
  has [soft-delete](https://docs.microsoft.com/azure/key-vault/key-vault-ovw-soft-delete)
  enabled.
- A **Certificate backup** can be generated from any created certificate. These backups come as
  binary data, and can only be used to regenerate a previously deleted certificate.

## Specifying the Azure Key Vault service API version

By default, this package uses the latest Azure Key Vault service version which is `7.1`. The only other version that is supported is `7.0`. You can change the service version being used by setting the option `serviceVersion` in the client constructor as shown below:

```typescript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

// Change the Azure Key Vault service API version being used via the `serviceVersion` option
const client = new CertificateClient(url, credential, {
  serviceVersion: "7.0"
});
```

## Examples

The following sections provide code snippets that cover some of the common
tasks using Azure Key Vault Certificates. The scenarios that are covered here consist of:

- [Creating and setting a certificate](#creating-and-setting-a-certificate).
- [Getting a Key Vault certificate](#getting-a-key-vault-certificate).
- [Getting the full information of a certificate](#getting-the-full-information-of-a-certificate).
- [Certificates in PEM format](#certificates-in-pem-format).
- [List all certificates](#list-all-certificates).
- [Updating a certificate](#updating-a-certificate).
- [Deleting a certificate](#deleting-a-certificate).
- [Iterating lists of certificates](#iterating-lists-of-certificates).

### Creating and setting a certificate

`beginCreateCertificate` creates a certificate to be stored in the Azure Key Vault. If
a certificate with the same name already exists, a new version of the
certificate is created.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
  await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert"
  });
}

main();
```

Besides the name of the certificate and the policy, you can also pass the following properties in a third argument with optional values:

- `enabled`: A boolean value that determines whether the certificate can be used or not.
- `tags`: Any set of key-values that can be used to search and filter certificates.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

// Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
const certificatePolicy = {
  issuerName: "Self",
  subject: "cn=MyCert"
};
const enabled = true;
const tags = {
  myCustomTag: "myCustomTagsValue"
};

async function main() {
  await client.beginCreateCertificate(certificateName, certificatePolicy, {
    enabled,
    tags
  });
}

main();
```

Calling to `beginCreateCertificate` with the same name will create a new version of
the same certificate, which will have the latest provided attributes.

Since Certificates take some time to get fully created, `beginCreateCertificate`
returns a poller object that keeps track of the underlying Long Running
Operation according to our guidelines:
https://azure.github.io/azure-sdk/typescript_design.html#ts-lro

The received poller will allow you to get the created certificate by calling to `poller.getResult()`.
You can also wait until the deletion finishes, either by running individual service
calls until the certificate is created, or by waiting until the process is done:

```typescript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";
const certificatePolicy = {
  issuerName: "Self",
  subject: "cn=MyCert"
};

async function main() {
  const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);

  // You can use the pending certificate immediately:
  const pendingCertificate = poller.getResult();

  // Or you can wait until the certificate finishes being signed:
  const keyVaultCertificate = await poller.pollUntilDone();
  console.log(keyVaultCertificate);
}

main();
```

Another way to wait until the certificate is signed is to do individual calls, as follows:

```typescript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
const { delay } = require("@azure/core-http");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";
const certificatePolicy = {
  issuerName: "Self",
  subject: "cn=MyCert"
};

async function main() {
  const poller = await client.beginCreateCertificate(certificateName, certificatePolicy);

  while (!poller.isDone()) {
    await poller.poll();
    await delay(5000);
  }

  console.log(`The certificate ${certificateName} is fully created`);
}

main();
```

### Getting a Key Vault certificate

The simplest way to read certificates back from the vault is to get a
certificate by name. `getCertificate` will retrieve the most recent
version of the certificate, along with the certificate's policy. You can
optionally get a different version of the certificate by calling
`getCertificateVersion` if you specify the version. `getCertificateVersion` does not return
the certificate's policy.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  const latestCertificate = await client.getCertificate(certificateName);
  console.log(`Latest version of the certificate ${certificateName}: `, latestCertificate);
  const specificCertificate = await client.getCertificateVersion(
    certificateName,
    latestCertificate.properties.version
  );
  console.log(
    `The certificate ${certificateName} at the version ${latestCertificate.properties.version}: `,
    specificCertificate
  );
}

main();
```

### Getting the full information of a certificate

Azure's KeyVault's design makes sharp distinctions between Keys,
Secrets and Certificates. The Key Vault service's Certificates
features were designed making use of it's Keys and Secrets capabilities.
Let's evaluate the composition of a Key Vault Certificate:

> When a Key Vault certificate is created, an addressable key
> and secret are also created with the same name. The Key Vault
> key allows key operations and the Key Vault secret allows retrieval
> of the certificate value as a secret. A Key Vault certificate
> also contains public x509 certificate metadata.  
> _Source: [Composition of a Certificate][composition-of-a-certificate]._

Knowing that the private key is stored in a Key Vault Secret,
with the public certificate included, we can retrieve it
by using the [KeyVault Secrets client][keyvault-secrets-client].

```ts
// Using the same credential object we used before,
// and the same keyVaultUrl,
// let's create a SecretClient
const secretClient = new SecretClient(keyVaultUrl, credential);

// Assuming you've already created a Key Vault certificate,
// and that certificateName contains the name of your certificate
const certificateSecret = await secretClient.getSecret(certificateName);

// Here we can find both the private key and the public certificate, in PKCS 12 format:
const PKCS12Certificate = certificateSecret.value!;

// You can write this into a file:
fs.writeFileSync("myCertificate.p12", PKCS12Certificate);
```

Note that, by default, the content type of the certificates
is [PKCS 12][pkcs_12]. By specifying the content type
of your certificate, you'll be able to retrieve it in PEM format.
Before showing how to create PEM certificates,
let's first explore how to retrieve a PEM secret key
from a PKCS 12 certificate first.

Using `openssl`, you can retrieve the public certificate in
PEM format by using the following command:

```
openssl pkcs12 -in myCertificate.p12 -out myCertificate.crt.pem -clcerts -nokeys
```

You can also use `openssl` to retrieve the private key, as follows:

```
openssl pkcs12 -in myCertificate.p12 -out myCertificate.key.pem -nocerts -nodes
```

Note that in both cases, openssl will ask you for the
password used to create the certificate. The sample code we've used
so far hasn't specified a password, so you can append `-passin 'pass:'`
to the end of each command.

### Certificates in PEM format

If you want to work with certificates in PEM format,
you can tell Azure's Key Vault service to create and manage your
certificates in PEM format by providing the `contentType` property
at the moment of creating the certificates.

The following example shows how to create and retrieve
the public and the private parts of a PEM formatted certificate
using the Key Vault clients for Certificates and Secrets:

```ts
// Creating the certificate
const certificateName = "MyCertificate";
const createPoller = await client.beginCreateCertificate(certificateName, {
  issuerName: "Self",
  subject: "cn=MyCert",
  contentType: "application/x-pem-file" // Here you specify you want to work with PEM certificates.
});
const keyVaultCertificate = await createPoller.pollUntilDone();

// Getting the PEM formatted private key and public certificate:
const certificateSecret = await secretClient.getSecret(certificateName);
const PEMPair = certificateSecret.value!;

console.log(PEMPair);
```

Keep in mind that your public certificate will
be in the same blob of content as your private key.
You can use the PEM headers to extract them accordingly.

### List all certificates

`listPropertiesOfCertificates` will list all certificates in the Key Vault.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

async function main() {
  for await (let certificateProperties of client.listPropertiesOfCertificates()) {
    console.log("Certificate properties: ", certificateProperties);
  }
}

main();
```

### Updating a certificate

The certificate attributes can be updated to an existing certificate version with
`updateCertificate`, as follows:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  const result = await client.getCertificate(certificateName);
  await client.updateCertificateProperties(certificateName, result.properties.version, {
    enabled: false,
    tags: {
      myCustomTag: "myCustomTagsValue"
    }
  });
}

main();
```

The certificate's policy can also be updated individually with `updateCertificatePolicy`, as follows:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  const result = client.getCertificate(certificateName);
  // Note: Sending `Self` as the `issuerName` of the certificate's policy will create a self-signed certificate.
  await client.updateCertificatePolicy(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert"
  });
}

main();
```

### Deleting a certificate

The `beginDeleteCertificate` method sets a certificate up for deletion. This process will
happen in the background as soon as the necessary resources are available.

If [soft-delete](https://docs.microsoft.com/azure/key-vault/key-vault-ovw-soft-delete)
is enabled for the Key Vault, this operation will only label the certificate as a
_deleted_ certificate. A deleted certificate can't be updated. They can only be either
read, recovered or purged.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  const poller = await client.beginDeleteCertificate(certificateName);

  // You can use the deleted certificate immediately:
  const deletedCertificate = poller.getResult();

  // The certificate is being deleted. Only wait for it if you want to restore it or purge it.
  await poller.pollUntilDone();

  // You can also get the deleted certificate this way:
  await client.getDeletedCertificate(certificateName);

  // Deleted certificates can also be recovered or purged.

  // recoverDeletedCertificate returns a poller, just like beginDeleteCertificate.
  // const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
  // await recoverPoller.pollUntilDone();

  // If a certificate is done and the Key Vault has soft-delete enabled, the certificate can be purged with:
  await client.purgeDeletedCertificate(certificateName);
}

main();
```

Since the deletion of a certificate won't happen instantly, some time is needed
after the `beginDeleteCertificate` method is called before the deleted certificate is
available to be read, recovered or purged.

### Iterating lists of certificates

Using the CertificateClient, you can retrieve and iterate through all of the
certificates in a Certificate Vault, as well as through all of the deleted certificates and the
versions of a specific certificate. The following API methods are available:

- `listPropertiesOfCertificates` will list all of your non-deleted certificates by their names, only
  at their latest versions.
- `listDeletedCertificates` will list all of your deleted certificates by their names,
  only at their latest versions.
- `listPropertiesOfCertificateVersions` will list all the versions of a certificate based on a certificate
  name.

Which can be used as follows:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  for await (let certificateProperties of client.listPropertiesOfCertificates()) {
    console.log("Certificate properties: ", certificateProperties);
  }
  for await (let deletedCertificate of client.listDeletedCertificates()) {
    console.log("Deleted certificate: ", deletedCertificate);
  }
  for await (let certificateProperties of client.listPropertiesOfCertificateVersions(
    certificateName
  )) {
    console.log("Certificate properties: ", certificateProperties);
  }
}

main();
```

All of these methods will return **all of the available results** at once. To
retrieve them by pages, add `.byPage()` right after invoking the API method you
want to use, as follows:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

const credential = new DefaultAzureCredential();

const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new CertificateClient(url, credential);

const certificateName = "MyCertificateName";

async function main() {
  for await (let page of client.listPropertiesOfCertificates().byPage()) {
    for (let certificateProperties of page) {
      console.log("Certificate properties: ", certificateProperties);
    }
  }
  for await (let page of client.listDeletedCertificates().byPage()) {
    for (let deletedCertificate of page) {
      console.log("Deleted certificate: ", deletedCertificate);
    }
  }
  for await (let page of client.listPropertiesOfCertificateVersions(certificateName).byPage()) {
    for (let certificateProperties of page) {
      console.log("Properties of certificate: ", certificateProperties);
    }
  }
}

main();
```

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

You can find more code samples through the following links:

- [KeyVault Certificates Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/javascript)
- [KeyVault Certificates Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript)
- [KeyVault Certificates Test Cases](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-certificates%2FREADME.png)
