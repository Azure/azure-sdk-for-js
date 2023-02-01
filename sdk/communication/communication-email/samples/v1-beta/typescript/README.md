# Azure Communication Services - Email client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Communication Services - Email in some common scenarios.

| **File Name**                  | **Description**                           |
| ------------------------------ | ----------------------------------------- |
| checkMessageStatus.ts          | Checks the message status of a sent email |
| sendEmailMultipleRecipients.ts | Sends an email with multiple recipients   |
| sendEmailSingleRecipient.ts    | Sends an email with a single recipient    |
| sendEmailWithAttachments.ts    | Sends an email with a txt file attachment |

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

Adapting the samples to run in the browser may require some additional consideration. For details, please see the package README.

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
node dist/checkMessageStatus.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<communication connection string>" SENDER_ADDRESS="<sender address>" RECIPIENT_ADDRESS="<recipient address>" node dist/checkMessageStatus.js
```

<!--Links-->

[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesresource]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[createinstance_emailcommunicationservicesresource]: https://aka.ms/acsemail/createemailresource
[typescript]: https://www.typescriptlang.org/docs/home.html
