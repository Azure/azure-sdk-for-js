# Azure KeyVault Certificates client library for JS

Azure KeyVault is a service that allows you to encrypt authentication
keys, storage account keys, data encryption keys, .pfx files, and
passwords by using keys that are protected by hardware security
modules (HSMs).

Use the client library for Azure KeyVault Certificates in your Node.js application to

- Get, set and delete a certificate.
- Update a certificate, as well as it's policy, issuer, opperation or contacts.
- Backup and restore a certificate.
- Get, purge or recover a deleted certificate.
- Get all the versions of a certificate.
- Get all certificates.
- Get all deleted certificates.
- Merge certificates.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates) | [Package (npm)](https://www.npmjs.com/package/@azure/keyvault-certificates) | [API Reference Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/keyvault/) | [Product documentation](https://azure.microsoft.com/en-us/services/keyvault/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-services/samples)

## Getting started

### Install the package

Install the Azure Event KeyVault Certificates client library using npm

`npm install @azure/keyvault-certificates`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[KeyVault resource](https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Authenticate the client

Here's an example authentication:

```typescript
import { CertificatesClient } from "@azure/keyvault-certificates";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

const clientId = process.env["CLIENT_ID"] || "";
const clientCertificate = process.env["CLIENT_SECRET"] || "";
const tenantId = process.env["TENANT_ID"] || "";
const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";

const url = `https://${vaultName}.vault.azure.net`;
const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
  clientId,
  clientSecret,
  tenantId,
  {
    tokenAudience: "https://vault.azure.net"
  }
);

const client = new CertificatesClient(url, credential);
```

## Key concepts

> Soon.

## Examples

The following sections provide code snippets that cover some of the
common tasks using Azure KeyVault Certificates

- [Single certificate](#single-certificate)

### Single certificate

Once you have created an instance of an `CertificatesClient` class, you can:

```javascript
const certificateName = "MyCertificateName";
const result = await client.createCertificate(certificateName, {
  certificatePolicy: {
    issuerParameters: { name: "Self" },
    x509CertificateProperties: { subject: "cn=MyCert" }
  }
});

for await (const certificateAttr of client.getAllCertificates()) {
  const certificate = await client.getCertificate(certificateAttr.name);
  console.log("certificate: ", certificate);
}

console.log("result: ", result);

await client.updateCertificate(certificateName, "", {
  tags: {
    customTag: "value"
  }
});

await client.createCertificate(certificateName, {
  certificatePolicy: {
    issuerParameters: { name: "Self" },
    x509CertificateProperties: { subject: "cn=MyCert" }
  },
  tags: {
    customTag: "value"
  }
});

for await (const version of client.getCertificateVersions(certificateName)) {
  const certificate = await client.getCertificate(certificateName, version.version);
  console.log("certificate: ", certificate);
}

await client.deleteCertificate(certificateName);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the KeyVault Certificates SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the KeyVault Certificates SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the event transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:keyvault-certificates:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

### Logging to a file

- Set the `DEBUG` environment variable as shown above and then run your test script as follows:

  - Logging statements from your test script go to `out.log` and logging statements from the sdk go to `debug.log`.
    ```bash
    node your-test-script.js > out.log 2>debug.log
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log` by redirecting stderr to stdout (&1), and then redirect stdout to a file:
    ```bash
    node your-test-script.js >out.log 2>&1
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log`.

    ```bash
      node your-test-script.js &> out.log
    ```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/keyvault/keyvault-certificates/README.png)
