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
| Name                 | Description                                                                                                                                                                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CallAutomationClient | `CallAutomationClient` is the primary interface for developers using this client library. It can be used to initiate calls by `createCall` or `answerCall`.                                                                                                                                                                              |
| CallConnection       | `CallConnection` represents a ongoing call. Once the call is established with `createCall` or `answerCall`, further actions can be performed for the call, such as `transfer` or `addParticipant`.                                                                                                                                       |
| CallMedia            | `CallMedia` can be used to do media related actions, such as `play`, to play media file. This can be retrieved from established `CallConnection`.                                                                                                                                                                                        |
| CallRecording        | `CallRecording` can be used to do recording related actions, such as `startRecording`. This can be retrieved from `CallAutomationClient`.                                                                                                                                                                                                |
| Callback Events      | Callback events are events sent back during duration of the call. It gives information and state of the call, such as `CallConnected`. `CallbackUrl` must be provided during `createCall` and `answerCall`, and callback events will be sent to this url. You can use `callAutomationEventParser` to parse these events when it arrives. |
| Incoming Call Event  | When incoming call happens (that can be answered with `answerCall`), incoming call eventgrid event will be sent. This is different from Callback events above, and should be setup on Azure portal. See [Incoming Call][incomingcall] for detail.                                                                                        |
| CallAutomationEventProcessor | `CallAutomationEventProcessor` is a convinient way to handle mid-call callback events such as `CallConnected`. This will ensure correlation between call and events more easily. See below example for its usage.|

## Examples
### Initialize CallAutomationClient
```JavaScript
import { CallAutomationClient } from '@azure/communication-call-automation';
import { DefaultAzureCredential } from "@azure/identity"; 

// Your unique Azure Communication service endpoint
const credential = new DefaultAzureCredential(); 
const endpointUrl = '<ENDPOINT>' 
const callAutomationClient = new CallAutomationClient(endpointUrl, credential); 
```

### Create Call
```JavaScript
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { CallAutomationClient, CallInvite } from '@azure/communication-call-automation';

// target endpoint for ACS User
const target: CommunicationUserIdentifier = {
  communicationUserId:
    "8:acs:...",
}

// make invitation
const callInvite: CallInvite = {
   targetParticipant:target
};

// callback url to recieve callback events
const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";

// send out the invitation, creating call
const response = callAutomationClient.createCall(callInvite, callbackUrl);
```

### Play Media
```JavaScript
// from callconnection of response above, play media of media file
const myFile: FileSource = { uri: "https://<FILE-SOURCE>/<SOME-FILE>.wav" }
const response = callConnection.getCallMedia().playToAll(myFile);
```

### Handle Mid-Connection callback events
To easily handle mid-connection events, Call Automation's SDK provides easier way to handle these events. Take a look at CallAutomationEventProcessor. This will ensure correlation between call and events more easily.
```JavaScript
const eventProcessor: CallAutomationEventProcessor = await callAutomationClient.getEventProcessor();
eventProcessor.processEvents(incomingEvent);
```
ProcessEvents is required for EventProcessor to work. After event is being consumed by EventProcessor, you can start using its feature.

See below for example: where you are making a call with CreateCall, and wait for CallConnected event of the call.
```JavaScript
// send out the invitation, creating call
const callInvite = new CallInvite(target);
const callbackUrl = "https://<MY-EVENT-HANDLER-URL>/events";
const callResult = callAutomationClient.createCall(callInvite, callbackUrl);

// giving 30 seconds timeout for waiting on createCall's event, 'CallConnected'
const createCallEventResult : CreateCallEventResult = await callResult.waitForEventProcessor(undefined, 30000);
// once this returns, call is now established!

// check if it was successful
if (createCallEventResult.isSuccess)
{
  // work with callConnected event
  const callConnectedEvent : CallConnected = createCallEventResult.successResult!;
}
```

## Troubleshooting

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
[product_docs]: https://docs.microsoft.com/azure/communication-services/overview
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[build_doc]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md
[incomingcall]: https://learn.microsoft.com/azure/communication-services/concepts/voice-video-calling/incoming-call-notification
[build1]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/callflows-for-customer-interactions?pivots=programming-language-csha
[build2]: https://learn.microsoft.com/azure/communication-services/how-tos/call-automation-sdk/redirect-inbound-telephony-calls?pivots=programming-language-csharp
[build3]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/play-action?pivots=programming-language-csharp
[build4]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/recognize-action?pivots=programming-language-csharp
[recording1]: https://learn.microsoft.com/azure/communication-services/concepts/voice-video-calling/call-recording
[recording2]: https://learn.microsoft.com/azure/communication-services/quickstarts/voice-video-calling/get-started-call-recording?pivots=programming-language-csharp
