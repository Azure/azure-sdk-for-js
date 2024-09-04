# Azure Communication Recipient Verification client library for JavaScript

The Recipient Verification library allows users to verify the phone number of recipients before sending messages or making calls to the phone number.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure-tools/communication-recipient-verification
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Recipient Verification client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the `RecipientVerificationClient` with any of the following methods:

### Using a connection string

```javascript
const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new RecipientVerificationClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```javascript
const { AzureKeyCredential } = require("@azure/core-auth");
const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");
const credential = new AzureKeyCredential("<key-from-resource>");
const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");

const credential = new DefaultAzureCredential();
const client = new RecipientVerificationClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Recipient Verification Client. The scenarios that are covered here consist of:

- [Request phone number verification code](#request-phone-number-verification-code)
- [Verify phone number](#verify-phone-number)
- [Remove a verified number](#remove-verified-number)
- [Get verified numbers](#get-verified-numbers)

### Request phone number verification code

```typescript
import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new RecipientVerificationClient(connectionString);

async function main() {
  // body of the request
  const VerificationRequest = {
    identity: "+11234567890",
    channel: "sms",
  };

  // get the verification status
  const status = await client.requestVerification(VerificationRequest);
  console.log(status);
}

main();
```

### Verify phone number

```typescript
import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new RecipientVerificationClient(connectionString);

async function main() {
  // id that is used to reference users phone number
  const verificationId = "7e5dd7e1-5203-41ab-960e-65c1eb804fc6";

  // body of the request
  const VerificationRequest = {
    verificationCode: "1234567",
  };

  // verifying your phone number
  const status = await client.verifyIdentity(verificationId, VerificationRequest);
  console.log(status);
}

main();
```

### Remove verified number

```typescript
import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new RecipientVerificationClient(connectionString);

async function main() {
  // id that is used to reference users phone number
  const verificationId = "4d313ff0-3aeb-477e-8c15-7c9a893e8999";

  // delete verification for a resource
  await client.deleteVerification(verificationId);
}

main();
```

### Get verified numbers

```typescript
import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new RecipientVerificationClient(connectionString);

async function main() {
  // get all verifications for a resource
  const verifications = await client.getVerifications();

  // print all verifications
  for await (const verification of verifications) {
    console.log(verification);
  }
}

main();
```

## Troubleshooting

## Next steps

Please take a look at the samples directory for detailed examples on how to use this library.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-toll-free-verification%2FREADME.png)
