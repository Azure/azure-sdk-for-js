# Azure Communication Email client library for JavaScript

This package contains a JavaScript/TypeScript SDK for Azure Communication Services for Email.

## Getting started

### Prerequisites

You need an [Azure subscription][azure_sub], a [Communication Service Resource][communication_resource_docs], and an [Email Communication Resource][email_resource_docs] with an active [Domain][domain_overview].

To create these resource, you can use the [Azure Portal][communication_resource_create_portal], the [Azure PowerShell][communication_resource_create_power_shell], or the [.NET management client library][communication_resource_create_net].

### Installing

```bash
npm install @azure/communication-email
```

## Examples

`EmailClient` provides the functionality to send email messages.

## Authentication

Email clients can be authenticated using the connection string acquired from an Azure Communication Resource in the [Azure Portal][azure_portal].

```javascript
const { EmailClient } = require("@azure/communication-email");

const connectionString = `endpoint=https://<resource-name>.communication.azure.com/;accessKey=<Base64-Encoded-Key>`;
const client = new EmailClient(connectionString);
```

You can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The README for @azure/identity provides more details and samples to get you started.
AZURE_CLIENT_SECRET, AZURE_CLIENT_ID and AZURE_TENANT_ID environment variables are needed to create a DefaultAzureCredential object.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { EmailClient } from "@azure/communication-email";

const endpoint = "https://<resource-name>.communication.azure.com";
let credential = new DefaultAzureCredential();
const client = new EmailClient(endpoint, credential);
```

### Send an Email Message

To send an email message, call the `beginSend` function from the `EmailClient`. This will return a poller. You can use this poller to check on the status of the operation and retrieve the result once it's finished.

```javascript Snippet:Azure_Communication_Email_Send
const message = {
  senderAddress: "sender@contoso.com",
  content: {
    subject: "This is the subject",
    plainText: "This is the body",
  },
  recipients: {
    to: [
      {
        address: "customer@domain.com",
        displayName: "Customer Name",
      },
    ],
  },
};

const poller = await emailClient.beginSend(message);
const response = await poller.pollUntilDone();
```

### Send an Email Message to Multiple Recipients

To send an email message to multiple recipients, add a object for each recipient type and an object for each recipient.

```javascript Snippet:Azure_Communication_Email_Send_Multiple_Recipients
const message = {
  senderAddress: "sender@contoso.com",
  content: {
    subject: "This is the subject",
    plainText: "This is the body",
  },
  recipients: {
    to: [
      {
        address: "customer1@domain.com",
        displayName: "Customer Name 1",
      },
      {
        address: "customer2@domain.com",
        displayName: "Customer Name 2",
      },
    ],
    cc: [
      {
        address: "ccCustomer1@domain.com",
        displayName: " CC Customer 1",
      },
      {
        address: "ccCustomer2@domain.com",
        displayName: "CC Customer 2",
      },
    ],
    bcc: [
      {
        address: "bccCustomer1@domain.com",
        displayName: " BCC Customer 1",
      },
      {
        address: "bccCustomer2@domain.com",
        displayName: "BCC Customer 2",
      },
    ],
  },
};

const poller = await emailClient.beginSend(message);
const response = await poller.pollUntilDone();
```

### Send Email with Attachments

Azure Communication Services support sending email with attachments.

```javascript Snippet:Azure_Communication_Email_Send_With_Attachments
const filePath = "C://readme.txt";

const message = {
  senderAddress: "sender@contoso.com",
  content: {
    subject: "This is the subject",
    plainText: "This is the body",
  },
  recipients: {
    to: [
      {
        address: "customer@domain.com",
        displayName: "Customer Name",
      },
    ],
  },
  attachments: [
    {
      name: path.basename(filePath),
      contentType: "text/plain",
      contentInBase64: readFileSync(filePath, "base64"),
    },
  ],
};

const response = await emailClient.send(message);
```

## Next steps

- [Read more about Email in Azure Communication Services][nextsteps]

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

This project has adopted the [Microsoft Open Source Code of Conduct][coc]. For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

<!-- LINKS -->

[azure_sub]: https://azure.microsoft.com/free/dotnet/
[azure_portal]: https://portal.azure.com
[cla]: https://cla.microsoft.com
[coc]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[communication_resource_docs]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[email_resource_docs]: https://aka.ms/acsemail/createemailresource
[communication_resource_create_portal]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[communication_resource_create_power_shell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[communication_resource_create_net]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-net
[package]: https://www.nuget.org/packages/Azure.Communication.Common/
[product_docs]: https://aka.ms/acsemail/overview
[nextsteps]: https://aka.ms/acsemail/overview
[nuget]: https://www.nuget.org/
[source]: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/communication
[domain_overview]: https://aka.ms/acsemail/domainsoverview
