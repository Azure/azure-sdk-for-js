---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-communication-services
urlFragment: communication-messages-typescript-beta
---

# Azure client library for Azure Communication Messages Services client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure client library for Azure Communication Messages Services in some common scenarios.

| **File Name**                                                                                             | **Description**                                                     |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [DownloadMedia.ts][downloadmedia]                                                                         | Download a media file                                               |
| [GetMessageTemplateList.ts][getmessagetemplatelist]                                                       | Get Template list for a channel                                     |
| [SendAudioMessage.ts][sendaudiomessage]                                                                   | Send a audio message                                                |
| [SendButtonActionInteractiveMessage.ts][sendbuttonactioninteractivemessage]                               | Send a interactive message                                          |
| [SendButtonActionWithDocHeaderInteractiveMessage.ts][sendbuttonactionwithdocheaderinteractivemessage]     | Send a interactive message                                          |
| [SendButtonActionWithImageHeaderInteractiveMessage.ts][sendbuttonactionwithimageheaderinteractivemessage] | Send a interactive message                                          |
| [SendButtonActionWithVideoHeaderInteractiveMessage.ts][sendbuttonactionwithvideoheaderinteractivemessage] | Send a interactive message                                          |
| [SendDocumentMessage.ts][senddocumentmessage]                                                             | Send a document message                                             |
| [SendImageMessage.ts][sendimagemessage]                                                                   | Send an image message                                               |
| [SendListActionInteractiveMessage.ts][sendlistactioninteractivemessage]                                   | Send a interactive message                                          |
| [SendReactionMessage.ts][sendreactionmessage]                                                             | Send a reaction message                                             |
| [SendStickerMessage.ts][sendstickermessage]                                                               | Send a sticker message. Supported sticker type - (.webp)            |
| [SendTemplateMessage.ts][sendtemplatemessage]                                                             | Send a template message                                             |
| [SendTextMessage.ts][sendtextmessage]                                                                     | Send a text message                                                 |
| [SendTextTemplateMessageUsingAAD.ts][sendtexttemplatemessageusingaad]                                     | Use AAD token credentials when sending a whatsapp template message. |
| [SendUrlActionInteractiveMessage.ts][sendurlactioninteractivemessage]                                     | Send a interactive message                                          |
| [SendVideoMessage.ts][sendvideomessage]                                                                   | Send a video message                                                |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/DownloadMedia.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ACS_ACCESS_KEY="<acs access key>" ACS_URL="<acs url>" node dist/DownloadMedia.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[downloadmedia]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/DownloadMedia.ts
[getmessagetemplatelist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/GetMessageTemplateList.ts
[sendaudiomessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendAudioMessage.ts
[sendbuttonactioninteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendButtonActionInteractiveMessage.ts
[sendbuttonactionwithdocheaderinteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendButtonActionWithDocHeaderInteractiveMessage.ts
[sendbuttonactionwithimageheaderinteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendButtonActionWithImageHeaderInteractiveMessage.ts
[sendbuttonactionwithvideoheaderinteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendButtonActionWithVideoHeaderInteractiveMessage.ts
[senddocumentmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendDocumentMessage.ts
[sendimagemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendImageMessage.ts
[sendlistactioninteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendListActionInteractiveMessage.ts
[sendreactionmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendReactionMessage.ts
[sendstickermessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendStickerMessage.ts
[sendtemplatemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendTemplateMessage.ts
[sendtextmessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendTextMessage.ts
[sendtexttemplatemessageusingaad]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendTextTemplateMessageUsingAAD.ts
[sendurlactioninteractivemessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendUrlActionInteractiveMessage.ts
[sendvideomessage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-messages-rest/samples/v2-beta/typescript/src/SendVideoMessage.ts
[apiref]: https://learn.microsoft.com/javascript/api/overview/azure/communication-messages-rest-readme?view=azure-node-latest
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-messages-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
