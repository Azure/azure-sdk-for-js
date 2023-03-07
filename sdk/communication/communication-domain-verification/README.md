# Azure Domain Verification client library for JavaScript

Domain Verification library provides capabilities to create TXT challenge to verify domain and actually verify domain

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure-tools/communication-domain-verification
```

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Domain Verification client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the client with any of the following methods:

### Using a connection string

```typescript
import { DomainVerificationClient } from "@azure/communication-domain-verification";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new DomainVerificationClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { DomainVerificationClient } from "@azure/communication-domain-verification";

const credential = new AzureKeyCredential("<key-from-resource>");
const client = new DomainVerificationClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { DomainVerificationClient } from "@azure/communication-domain-verification";

let credential = new DefaultAzureCredential();
const client = new DomainVerificationClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Domain Verification client. The scenarios that are covered here consist of:

- [Crate Verification Challenge](#create-verification-challenge)
- [Verify Domain Ownership](#verify-domain-ownership)


#### Crate Verification Challenge

Create domain verification challenge

```typescript
import { DomainVerificationClient } from "@azure/communication-domain-verification";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new DomainVerificationClient(connectionString);

async function main() {
  const domainName = "contoso.com";
  let result = await client.createDomainOwnershipChallenge(domainName)
  
  console.log(`Domain verification challenge value is ${result.value}`);
}

main();
```

#### Verify Domain Ownership

Create domain verification challenge

```typescript
import { DomainVerificationClient } from "@azure/communication-domain-verification";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new DomainVerificationClient(connectionString);

async function main() {
  const domainName = "contoso.com";
  let result = await client.verifyDomainOwnership(domainName)
  
  console.log(`Domain verification status is: ${result.status}`);
}

main();
```

## Troubleshooting

## Next steps

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure_identity_readme]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-domain-verification%2FREADME.png)
