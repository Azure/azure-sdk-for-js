---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-communication-services
urlFragment: communication-messages-javascript-beta
---

# Azure client library for Azure Communication Messages Services client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure client library for Azure Communication Messages Services in some common scenarios.

| **File Name**                                                                                             | **Description**                                                     |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [DownloadMedia.js][downloadmedia]                                                                         | Download a media file                                               |
| [GetMessageTemplateList.js][getmessagetemplatelist]                                                       | Get Template list for a channel                                     |
| [SendAudioMessage.js][sendaudiomessage]                                                                   | Send a audio message                                                |
| [SendButtonActionInteractiveMessage.js][sendbuttonactioninteractivemessage]                               | Send a interactive message                                          |
| [SendButtonActionWithDocHeaderInteractiveMessage.js][sendbuttonactionwithdocheaderinteractivemessage]     | Send a interactive message                                          |
| [SendButtonActionWithImageHeaderInteractiveMessage.js][sendbuttonactionwithimageheaderinteractivemessage] | Send a interactive message                                          |
| [SendButtonActionWithVideoHeaderInteractiveMessage.js][sendbuttonactionwithvideoheaderinteractivemessage] | Send a interactive message                                          |
| [SendDocumentMessage.js][senddocumentmessage]                                                             | Send a document message                                             |
| [SendImageMessage.js][sendimagemessage]                                                                   | Send an image message                                               |
| [SendListActionInteractiveMessage.js][sendlistactioninteractivemessage]                                   | Send a interactive message                                          |
| [SendReactionMessage.js][sendreactionmessage]                                                             | Send a reaction message                                             |
| [SendStickerMessage.js][sendstickermessage]                                                               | Send a sticker message. Supported sticker type - (.webp)            |
| [SendTemplateMessage.js][sendtemplatemessage]                                                             | Send a template message                                             |
| [SendTextMessage.js][sendtextmessage]                                                                     | Send a text message                                                 |
| [SendTextTemplateMessageUsingAAD.js][sendtexttemplatemessageusingaad]                                     | Use AAD token credentials when sending a whatsapp template message. |
| [SendUrlActionInteractiveMessage.js][sendurlactioninteractivemessage]                                     | Send a interactive message                                          |
| [SendVideoMessage.js][sendvideomessage]                                                                   | Send a video message                                                |

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

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[downloadmedia]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/DownloadMedia.js
[getmessagetemplatelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/GetMessageTemplateList.js
[sendaudiomessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendAudioMessage.js
[sendbuttonactioninteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendButtonActionInteractiveMessage.js
[sendbuttonactionwithdocheaderinteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendButtonActionWithDocHeaderInteractiveMessage.js
[sendbuttonactionwithimageheaderinteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendButtonActionWithImageHeaderInteractiveMessage.js
[sendbuttonactionwithvideoheaderinteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendButtonActionWithVideoHeaderInteractiveMessage.js
[senddocumentmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendDocumentMessage.js
[sendimagemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendImageMessage.js
[sendlistactioninteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendListActionInteractiveMessage.js
[sendreactionmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendReactionMessage.js
[sendstickermessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendStickerMessage.js
[sendtemplatemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendTemplateMessage.js
[sendtextmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendTextMessage.js
[sendtexttemplatemessageusingaad]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendTextTemplateMessageUsingAAD.js
[sendurlactioninteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendUrlActionInteractiveMessage.js
[sendvideomessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/javascript/SendVideoMessage.js
[apiref]: https://learn.microsoft.com/javascript/api/overview/azure/communication-messages-rest-readme?view=azure-node-latest
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-messages-rest/README.md
