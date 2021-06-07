---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-event-hubs
urlFragment: event-hubs-javascript-browser
---

# Azure Event Hubs client library browser samples for JavaScript

This sample programs show how to use the JavaScript client libraries for Azure Event Hubs to send and receive events in the browser while authenticating with Azure Active Directory.

| **File Name**                     | **Description**                                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [sendEvents.js][sendevents]       | Demonstrates how the send() function can be used to send events to an Event Hub instance.                                               |
| [receiveEvents.js][receiveevents] | Demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hubs instance. |
| [configuration.js][configuration] | Contains the configuration needed to authenticate and connect to an Event Hub instance.                                                 |
| [index.js][app]                   | Hooks up the send and receive samples to their respective buttons in the web application.                                               |
| [index.html][htmlpage]            | The web page that loads and runs the samples. Use a local web service to test by running `npm start` after building the app.            |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0 and run in browsers that support async/await (e.g. Edge, Firefox, Chrome.)

You need [an Azure subscription][freesub] and [an Azure Event Hub resource][azhubacct] to run these sample programs.
Samples retrieve credentials using the [InteractiveBrowserCredential][browsercred] from `@azure/identity`.
You can set the Event Hubs and authentication properties you'll need to run the sample in the [configuration.js][configuration] file.

Register a new application in AAD and assign the "Azure Event Hubs Data Owner" role to it.

- See https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
  to register a new application in the Azure Active Directory.
- Note down the client id and tenant id from the above step.
  You will need to set these in the [configuration.js][configuration] file.

Ensure your app registration has been configured properly to allow the [implicit grant flow][implicitgrantflow]
and allow both `Access tokens` and `ID tokens` to be issued by the authorization endpoint.
Also add a `redirect URI` that points to where you'll be hosting your application.
For running the sample locally, you can set this to `http://localhost:8080`.
In your app registration, you will also need to add a permission for the `Microsoft.EventHubs` app.
When adding permission for `Microsoft.EventHubs`, the type should be `delegated permissions` and the permission should be `user_impersonation`.

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Create a bundle JavaScript file that can be ran in the browser:

```bash
npm run build
```

3. Serve the web page on http://localhost:8080:

```bash
npm start
```

4. Navigate to the web page by visiting http://localhost:8080 in a browser.

## Troubleshooting

### Authentication error: AADSTS50011

If you receive error `AADSTS50011` with the message `The reply URL specified in the request does not match the reply URLs configured for the application`, make sure that you're accessing the sample using the same URI
as the redirect URI you added to your app registration. If you're following along with the sample, this should be `http://localhost:8080`.

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendevents]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/browserSample/src/sendEvents.js
[receiveevents]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/browserSample/src/receiveEvents.js
[configuration]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/browserSample/src/configuration.js
[app]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/browserSample/src/index.js
[htmlpage]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/browserSample/index.html
[apiref]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
[azhubacct]: https://docs.microsoft.com/azure/event-hubs/event-hubs-node-get-started-send
[aziothub]: https://docs.microsoft.com/azure/iot-hub/iot-hub-node-node-module-twin-getstarted
[freesub]: https://azure.microsoft.com/free/
[browsercred]: https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/using-azure-identity.md#interactivebrowsercredential
[implicitgrantflow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
