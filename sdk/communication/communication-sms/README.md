# Azure Communication SMS client library for JavaScript

Azure Communication SMS services gives developers the ability to send SMS messages from a phone number that can be purchased through Communication Services.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the[Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-sms
```

## Key concepts

### SmsClient

`SmsClient` is the primary interface for developers using this client library. It provides an asynchronous method to send SMS messages.

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you may authenticate with any of the following methods:

### Create a credential with `AzureKeyCredential`

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { SmsClient } from "@azure/communication-sms";

const credential = new AzureKeyCredential("<Base64-Encoded-Key>");
const client = new SmsClient("<Host>", credential);
```

### Using a connection string

```typescript
import { SmsClient } from "@azure/communication-sms";

const connectionString = `endpoint=<Host>;accessKey=<Base64-Encoded-Key>`;
const client = new SmsClient(connectionString);
```

### Using a `TokenCredential`

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-administration";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient("<Host>", credential);
```

## Sending SMS

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { SmsClient } from "@azure/communication-sms";

const credential = new AzureKeyCredential("<Base64-Encoded-Key>");
const client = new SmsClient("<Host>", credential);

const response = await client.send({
  from: "+12345678902",
  to: ["+12345678901"],
  message: "Hey there!"
});
```

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-sms%2FREADME.png)
