# Azure client library for Azure Communication Messages Services client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure client library for Azure Communication Messages Services in some common scenarios.

| **File Name**                                                         | **Description**                                                     |
| --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [DownloadMedia.js][downloadmedia]                                     | Download a media file                                               |
| [GetMessageTemplateList.js][getmessagetemplatelist]                   | Get Template list for a channel                                     |
| [SendMediaMessage.js][sendmediamessage]                               | Send a media message                                                |
| [SendTemplateMessage.js][sendtemplatemessage]                         | Send a template message                                             |
| [SendTextMessage.js][sendtextmessage]                                 | Send a text message                                                 |
| [SendTextTemplateMessageUsingAAD.js][sendtexttemplatemessageusingaad] | Use AAD token credentials when sending a whatsapp template message. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

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
node DownloadMedia.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ACS_ACCESS_KEY="<acs access key>" ACS_URL="<acs url>" node DownloadMedia.js
```

## Next Steps

[downloadmedia]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v1/javascript/DownloadMedia.js
[getmessagetemplatelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v1/javascript/GetMessageTemplateList.js
[sendmediamessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v1/javascript/SendMediaMessage.js
[sendtemplatemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v1/javascript/SendTemplateMessage.js
[sendtextmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v1/javascript/SendTextMessage.js
[sendtexttemplatemessageusingaad]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v1/javascript/SendTextTemplateMessageUsingAAD.js
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-messages-rest/README.md
