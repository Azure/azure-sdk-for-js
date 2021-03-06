# Azure Communication SMS client library for JavaScript

Azure Communication SMS services gives developers the ability to send SMS messages from a phone number that can be purchased through Communication Services.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].
- A phone number assigned to your Communication Services resource. See [how to acquire a phone number](#how-to-acquire-a-phone-number) for instructions on how to add a phone number to your Communication Services resource.

### Installing

```bash
npm install @azure/communication-sms
```

### How to acquire a phone number

Phone numbers can be acquired and assigned to a Communication Services resource from the [Azure Portal][azure_portal]. Instructions on how to get a phone number using the [Azure Portal][azure_portal] can be found [here][get_phone_number_az_portal].

You may also get a phone number by using the [`@azure/communication-administration`][azure_communication_admin] package. Instructions on how to use the package can be found in the [package's README][azure_communication_admin_readme].

## Key concepts

### SmsClient

`SmsClient` is the primary interface for developers using this client library. It provides an asynchronous method to send SMS messages.

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you may authenticate with any of the following methods:

### Using a connection string

```typescript
import { SmsClient } from "@azure/communication-sms";

const connectionString = `endpoint=https://<resource-name>.communication.azure.com/;accessKey=<Base64-Encoded-Key>`;
const client = new SmsClient(connectionString);
```

### Create a credential with `AzureKeyCredential`

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { SmsClient } from "@azure/communication-sms";

const endpoint = "https://<resource-name>.communication.azure.com";
const credential = new AzureKeyCredential("<Base64-Encoded-Key>");
const client = new SmsClient(endpoint, credential);
```

### Using Azure Active Directory managed identity

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The README for @azure/identity provides more details and samples to get you started.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { SmsClient } from "@azure/communication-sms";

const endpoint = "https://<resource-name>.communication.azure.com";
  //AZURE_CLIENT_SECRET, AZURE_CLIENT_ID and AZURE_TENANT_ID environment variables are needed to create a DefaultAzureCredential object.
let credential = new DefaultAzureCredential();
const client = new SmsClient(endpoint, credential);
```

## Send a 1:N SMS Message
To send a SMS message, call the `send` function from the `SmsClient`. You need to pass in a `SmsSendRequest` object.

```typescript
const sendResults = await client.send(
    {
      from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
      to: [
        "<to-phone-number-1>",
        "<to-phone-number-2>",
      ], // A list of E.164 formatted phone numbers to which message is being sent
      message: "Hello World via SMS!" // The message being sent
    },
    {
      enableDeliveryReport: true,
      tag: "TypeScriptSMSSample"
    }
  );

for (const sendResult of sendResults) {
  if (sendResult.successful) {
    console.log("Success: ", sendResult);
  } else {
    console.error("Something went wrong when trying to send this message: ", sendResult);
  }
}
```

## Troubleshooting

```typescript
try {
  const sendResults = await client.send(
    {
      from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
      to: [
        "<to-phone-number-1>",
        "<to-phone-number-2>",
      ], // The list of E.164 formatted phone numbers to which message is being sent
      message: "Hello World via SMS!" // The message being sent
    }
  );
  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
} catch (e) {
  console.error(e.message);
}
```

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
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[get_phone_number_az_portal]: https://docs.microsoft.com/azure/communication-services/quickstarts/telephony-sms/get-phone-number
[azure_communication_admin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/communication/communication-administration
[azure_communication_admin_readme]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-administration/README.md

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-sms%2FREADME.png)
