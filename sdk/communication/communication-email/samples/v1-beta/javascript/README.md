# Azure Communication Services - Email client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Communication Services - Email in some common scenarios.

| **File Name**                                                       | **Description**                                |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| [sendEmailMultipleRecipients.js][sendemailmultiplerecipients]       | Sends an email with multiple recipients        |
| [sendEmailSingleRecipient.js][sendemailsinglerecipient]             | Sends an email with a single recipient         |
| [sendEmailWithAttachments.js][sendemailwithattachments]             | Sends an email with a txt file attachment      |
| [sendEmailWithInlineAttachments.js][sendemailwithinlineattachments] | Sends an email with an inline image attachment |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node sendEmailMultipleRecipients.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_ENDPOINT="<communication endpoint>" SENDER_ADDRESS="<sender address>" RECIPIENT_ADDRESS="<recipient address>" SECOND_RECIPIENT_ADDRESS="<second recipient address>" node sendEmailMultipleRecipients.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendemailmultiplerecipients]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/javascript/sendEmailMultipleRecipients.js
[sendemailsinglerecipient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/javascript/sendEmailSingleRecipient.js
[sendemailwithattachments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/javascript/sendEmailWithAttachments.js
[sendemailwithinlineattachments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-email/samples/v1-beta/javascript/sendEmailWithInlineAttachments.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/communication-email?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesresource]: https://learn.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[createinstance_emailcommunicationservicesresource]: https://aka.ms/acsemail/createemailresource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-email/README.md
