# Azure Communication Call Automation client library for JavaScript

This package contains a JavaScript SDK for Azure Communication Call Automation. Call Automation provides developers the ability to build server-based, intelligent call workflows, and call recording for voice and PSTN channels.

[Overview of Call Automation][overview] | [Product documentation][product_docs]

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-call-automation
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation][build_doc].

## Key concepts

| Name                         | Description                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CallAutomationClient         | `CallAutomationClient` is the primary interface for developers using this client library. It can be used to initiate calls by `createCall` or `answerCall`.                                                                                                                                                                              |
| CallConnection               | `CallConnection` represents a ongoing call. Once the call is established with `createCall` or `answerCall`, further actions can be performed for the call, such as `transfer` or `addParticipant`.                                                                                                                                       |
| CallMedia                    | `CallMedia` can be used to do media related actions, such as `play`, to play media file. This can be retrieved from established `CallConnection`.                                                                                                                                                                                        |
| CallRecording                | `CallRecording` can be used to do recording related actions, such as `startRecording`. This can be retrieved from `CallAutomationClient`.                                                                                                                                                                                                |
| Callback Events              | Callback events are events sent back during duration of the call. It gives information and state of the call, such as `CallConnected`. `CallbackUrl` must be provided during `createCall` and `answerCall`, and callback events will be sent to this url. You can use `callAutomationEventParser` to parse these events when it arrives. |
| Incoming Call Event          | When incoming call happens (that can be answered with `answerCall`), incoming call eventgrid event will be sent. This is different from Callback events above, and should be setup on Azure portal. See [Incoming Call][incomingcall] for detail.                                                                                        |

## Examples

### Initialize CallAutomationClient

```ts snippet:ReadmeSampleCreateClient_Node
import { DefaultAzureCredential } from "@azure/identity";
import { CallAutomationClient } from "@azure/communication-call-automation";

// Your unique Azure Communication service endpoint
const credential = new DefaultAzureCredential();
const endpointUrl = "<ENDPOINT>";
const callAutomationClient = new CallAutomationClient(endpointUrl, credential);
```

### Create Call

```ts snippet:ReadmeSampleCreateCall
import { DefaultAzureCredential } from "@azure/identity";
import { CallAutomationClient } from "@azure/communication-call-automation";

// Your unique Azure Communication service endpoint
const credential = new DefaultAzureCredential();
const endpointUrl = "<ENDPOINT>";
const callAutomationClient = new CallAutomationClient(endpointUrl, credential);

// target endpoint for ACS User
const target = {
  communicationUserId: "8:acs:...",
};

// make invitation
const callInvite = {
  targetParticipant: target,
};

// callback url to receive callback events
const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";

// send out the invitation, creating call
const response = await callAutomationClient.createCall(callInvite, callbackUrl);
```

### Play Media

```ts snippet:ReadmeSamplePlayMedia
import { DefaultAzureCredential } from "@azure/identity";
import { CallAutomationClient, FileSource } from "@azure/communication-call-automation";

// Your unique Azure Communication service endpoint
const credential = new DefaultAzureCredential();
const endpointUrl = "<ENDPOINT>";
const callAutomationClient = new CallAutomationClient(endpointUrl, credential);

const target = { communicationUserId: "8:acs:..." };
const callInvite = { targetParticipant: target };
const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";

const createCallResult = await callAutomationClient.createCall(callInvite, callbackUrl);
const callConnection = createCallResult.callConnection;
// from callconnection of response above, play media of media file
const myFile: FileSource = { url: "https://<FILE-SOURCE>/<SOME-FILE>.wav", kind: "fileSource" };
const response = await callConnection.getCallMedia().playToAll([myFile]);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

- [Call Automation Overview][overview]
- [Incoming Call Concept][incomingcall]
- [Build a customer interaction workflow using Call Automation][build1]
- [Redirect inbound telephony calls with Call Automation][build2]
- [Quickstart: Play action][build3]
- [Quickstart: Recognize action][build4]
- [Read more about Call Recording in Azure Communication Services][recording1]
- [Record and download calls with Event Grid][recording2]

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

<!-- LINKS -->

[overview]: https://learn.microsoft.com/azure/communication-services/concepts/voice-video-calling/call-automation
[product_docs]: https://learn.microsoft.com/azure/communication-services/overview
[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[build_doc]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md
[incomingcall]: https://learn.microsoft.com/azure/communication-services/concepts/voice-video-calling/incoming-call-notification
[build1]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/callflows-for-customer-interactions?pivots=programming-language-csha
[build2]: https://learn.microsoft.com/azure/communication-services/how-tos/call-automation-sdk/redirect-inbound-telephony-calls?pivots=programming-language-csharp
[build3]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/play-action?pivots=programming-language-csharp
[build4]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/recognize-action?pivots=programming-language-csharp
[recording1]: https://learn.microsoft.com/azure/communication-services/concepts/voice-video-calling/call-recording
[recording2]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/get-started-call-recording?pivots=programming-language-csharp
