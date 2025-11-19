# Azure Communication Services - Email client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Communication Services - Email in some common scenarios.

| **File Name**                                                       | **Description**                                |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| [sendEmailMultipleRecipients.ts][sendemailmultiplerecipients]       | Sends an email with multiple recipients        |
| [sendEmailSingleRecipient.ts][sendemailsinglerecipient]             | Sends an email with a single recipient         |
| [sendEmailWithAttachments.ts][sendemailwithattachments]             | Sends an email with a txt file attachment      |
| [sendEmailWithInlineAttachments.ts][sendemailwithinlineattachments] | Sends an email with an inline image attachment |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Communication Services Resource][createinstance_azurecommunicationservicesresource]
- [Email Communication Services Resource][createinstance_emailcommunicationservicesresource]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/sendEmailMultipleRecipients.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_ENDPOINT="<communication endpoint>" SENDER_ADDRESS="<sender address>" RECIPIENT_ADDRESS="<recipient address>" SECOND_RECIPIENT_ADDRESS="<second recipient address>" node dist/sendEmailMultipleRecipients.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendemailmultiplerecipients]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/typescript/src/sendEmailMultipleRecipients.ts
[sendemailsinglerecipient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/typescript/src/sendEmailSingleRecipient.ts
[sendemailwithattachments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/typescript/src/sendEmailWithAttachments.ts
[sendemailwithinlineattachments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/typescript/src/sendEmailWithInlineAttachments.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/communication-email?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesresource]: https://learn.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[createinstance_emailcommunicationservicesresource]: https://aka.ms/acsemail/createemailresource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-email/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
