# Azure Remote Rendering client library for JavaScript

Azure Remote Rendering (ARR) is a service that enables you to render high-quality, interactive 3D content in the cloud and stream it in real time to devices, such as the HoloLens 2.

This SDK offers functionality to convert assets to the format expected by the runtime, and also to manage
the lifetime of remote rendering sessions.

> NOTE: Once a session is running, a client application will connect to it using one of the "runtime SDKs".
> These SDKs are designed to best support the needs of an interactive application doing 3d rendering.
> They are available in ([.net](https://docs.microsoft.com/dotnet/api/microsoft.azure.remoterendering)
> or ([C++](https://docs.microsoft.com/cpp/api/remote-rendering/)).

[Product documentation](https://docs.microsoft.com/azure/remote-rendering/)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### Prerequisites

You will need an [Azure subscription](https://azure.microsoft.com/free/) and an [Azure Remote Rendering account](https://docs.microsoft.com/azure/remote-rendering/how-tos/create-an-account) to use this package.

### Install the `@azure/mixed-reality-remote-rendering` package

Install the Template client library for JavaScript with `npm`:

```bash
npm install @azure/mixed-reality-remote-rendering
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### CORS

This library cannot be used to make direct calls to the Azure Remote Rendering service from a browser.
Please refer to [this document](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/cors/ts/README.md) for guidance.

### Authenticate the client

Constructing a remote rendering client requires an authenticated account, and a remote rendering endpoint.
For an account created in the eastus region, the account domain will have the form "eastus.mixedreality.azure.com".
There are several different forms of authentication:

- Account Key authentication
  - Account keys enable you to get started quickly with using Azure Remote Rendering. But before you deploy your application
    to production, we recommend that you update your app to use Azure AD authentication.
- Azure Active Directory (AD) token authentication
  - If you're building an enterprise application and your company is using Azure AD as its identity system, you can use
    user-based Azure AD authentication in your app. You then grant access to your Azure Remote Rendering accounts by using
    your existing Azure AD security groups. You can also grant access directly to users in your organization.
  - Otherwise, we recommend that you obtain Azure AD tokens from a web service that supports your app. We recommend this
    method for production applications because it allows you to avoid embedding the credentials for access to Azure Spatial
    Anchors in your client application.

See [here](https://docs.microsoft.com/azure/remote-rendering/how-tos/authentication) for detailed instructions and information.

In all the following examples, the client is constructed with a `remoteRenderingEndpoint`.
The available endpoints correspond to regions, and the choice of endpoint determines the region in which the service performs its work.
An example is `https://remoterendering.eastus2.mixedreality.azure.com`.

> NOTE: For converting assets, it is preferable to pick a region close to the storage containing the assets.

> NOTE: For rendering, it is strongly recommended that you pick the closest region to the devices using the service.
> The time taken to communicate with the server impacts the quality of the experience.

#### Authenticating with account key authentication

Use the `AccountKeyCredential` object to use an account identifier and account key to authenticate:

```typescript Snippet:CreateAClient
const credential = new AzureKeyCredential(accountKey);

const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
```

#### Authenticating with an AAD client secret

Use the `ClientSecretCredential` object to perform client secret authentication.

```typescript Snippet:CreateAClientWithAAD
let credential = new ClientSecretCredential(tenantId, clientId, clientSecret, {
  authorityHost: "https://login.microsoftonline.com/" + tenantId
});

const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
```

#### Authenticating a user using device code authentication

Use the `DeviceCodeCredential` object to perform device code authentication.

```typescript Snippet:CreateAClientWithDeviceCode
const userPromptCallback = (deviceCodeInfo: DeviceCodeInfo) => {
  console.debug(deviceCodeInfo.message);
  console.log(deviceCodeInfo.message);
};

const credential = new DeviceCodeCredential({
  tenantId: tenantId,
  clientId: clientId,
  userPromptCallback: userPromptCallback,
  authorityHost: "https://login.microsoftonline.com/" + tenantId
});

const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
```

See [here](https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/Device-Code-Flow) for more
information about using device code authentication flow.

#### Interactive authentication with DefaultAzureCredential

Use the `DefaultAzureCredential` object with `includeInteractiveCredentials: true` to use default interactive authentication
flow:

```typescript Snippet:CreateAClientWithAzureCredential
let credential = new DefaultAzureCredential();

return new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential, {
  authenticationEndpointUrl: "https://sts.mixedreality.azure.com"
});
```

#### Authenticating with a static access token

You can pass a Mixed Reality access token as an `AccessToken` previously retrieved from the
[Mixed Reality STS service](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mixedreality/mixed-reality-authentication)
to be used with a Mixed Reality client library:

```typescript Snippet:CreateAClientWithStaticAccessToken
// GetMixedRealityAccessTokenFromWebService is a hypothetical method that retrieves
// a Mixed Reality access token from a web service. The web service would use the
// MixedRealityStsClient and credentials to obtain an access token to be returned
// to the client.
const accessToken = GetMixedRealityAccessTokenFromWebService();

RemoteRenderingClient client = new RemoteRenderingClient(remoteRenderingEndpoint, accountId, accessToken);
```

## Key concepts

### RemoteRenderingClient

The `RemoteRenderingClient` is the client library used to access the RemoteRenderingService.
It provides methods to create and manage asset conversions and rendering sessions.

## Examples

- [Convert a simple asset](#convert-a-simple-asset)
- [Convert a more complex asset](#convert-a-more-complex-asset)
- [Get the output when an asset conversion has finished](#get-the-output-when-an-asset-conversion-has-finished)
- [List conversions](#list-conversions)
- [Create a session](#create-a-session)
- [Extend the lease time of a session](#extend-the-lease-time-of-a-session)
- [List sessions](#list-sessions)
- [Stop a session](#stop-a-session)

### Convert a simple asset

We assume that a RemoteRenderingClient has been constructed as described in the [Authenticate the Client](#authenticate-the-client) section.
The following snippet describes how to request that "box.fbx", found at the root of the blob container at the given URI, gets converted.

```typescript Snippet:StartAnAssetConversion
const inputSettings: AssetConversionInputSettings = {
  storageContainerUrl,
  relativeInputAssetPath: "box.fbx"
};
const outputSettings: AssetConversionOutputSettings = {
  storageContainerUrl
};
const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

// A randomly generated UUID is a good choice for a conversionId.
const conversionId = uuid();

const conversionPoller: AssetConversionPollerLike = await client.beginConversion(
  conversionId,
  conversionSettings
);
```

The output files will be placed beside the input asset.

### Convert a more complex asset

Assets can reference other files, and blob containers can contain files belonging to many different assets.
In this example, we show how prefixes can be used to organize your blobs and how to convert an asset to take account of that organization.
Assume that the blob container at `inputStorageUrl` contains many files, including "Bicycle/bicycle.gltf", "Bicycle/bicycle.bin" and "Bicycle/saddleTexture.jpg".
(So the prefix "Bicycle" is acting very like a folder.)
We want to convert the glTF so that it has access to the other files which share the prefix, without requiring the conversion service to access any other files.
To keep things tidy, we also want the output files to be written to a different storage container and given a common prefix: "ConvertedBicycle".
The code is as follows:

```typescript Snippet:StartAComplexAssetConversion
  const inputSettings: AssetConversionInputSettings = {
    storageContainerUrl: inputStorageUrl,
    blobPrefix: "Bicycle"
    relativeInputAssetPath: "bicycle.gltf"
  };
  const outputSettings: AssetConversionOutputSettings = {
    storageContainerUrl: outputStorageUrl,
    blobPrefix: "ConvertedBicycle"
  };
  const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

  const conversionId = uuid();

  const conversionPoller: AssetConversionPollerLike = await client.beginConversion(
    conversionId,
    conversionSettings
  );
```

> NOTE: when a prefix is given in the input options, then the input file parameter is assumed to be relative to that prefix.
> The same applies to the output file parameter in output options.

### Get the output when an asset conversion has finished

Converting an asset can take anywhere from seconds to hours.
This code uses the conversionPoller returned by beginConversion to poll regularly until the conversion has finished or failed.
The default polling period is 10 seconds.

```typescript Snippet:QueryConversionStatus
const conversion = await conversionPoller.pollUntilDone();

console.log("== Check results ==");

if (conversion.status === "Succeeded") {
  console.log("Conversion succeeded: Output written to " + conversion.output?.outputAssetUrl);
} else if (conversion.status === "Failed") {
  console.log("Conversion failed: " + conversion.error.code + " " + conversion.error.message);
}
```

Note that the state of a AssetConversionPollerLike can be serialized by calling conversionPoller.toString().
That value can later be passed into beginConversion as a `resumeFrom` value, to construct a new poller
which carries on from where the earlier one left off:

```typescript
const serializedPollerString = conversionPoller.toString();
// ...
const resumedPoller = client.beginConversion({ resumeFrom: serializedPollerString });
```

### List conversions

You can get information about your conversions using the `getConversions` method.
This method may return conversions which have yet to start, conversions which are running and conversions which have finished.
In this example, we just list the output URIs of successful conversions started in the last day.

```typescript Snippet:ListConversions
for await (const conversion of client.listConversions()) {
  if (conversion.status === "Succeeded") {
    console.log(
      `Conversion ${conversion.conversionId} succeeded: Output written to ${conversion.output?.outputAssetUrl}`
    );
  } else if (conversion.status === "Failed") {
    console.log(
      `Conversion ${conversion.conversionId} failed: ${conversion.error.code} ${conversion.error.message}`
    );
  }
}
```

### Create a session

We assume that a RemoteRenderingClient has been constructed as described in the [Authenticate the Client](#authenticate-the-client) section.
The following snippet describes how to request that a new rendering session be started.

```typescript Snippet:CreateASession
const sessionSettings: RenderingSessionSettings = {
  maxLeaseTimeInMinutes: 4,
  size: "Standard"
};

// A randomly generated UUID is a good choice for a conversionId.
const sessionId = uuid();

const sessionPoller: RenderingSessionPollerLike = await client.beginSession(
  sessionId,
  sessionSettings
);
```

Note that the state of a RenderingSessionPollerLike can be serialized by calling toString().
That value can later be passed into beginSession as a `resumeFrom` value, to construct a new poller
which carries on from where the earlier one left off:

```typescript
const serializedPollerString = sessionPoller.toString();
// ...
const resumedPoller = client.beginSession({ resumeFrom: serializedPollerString });
```

### Extend the lease time of a session

If a session is approaching its maximum lease time, but you want to keep it alive, you will need to make a call to increase
its maximum lease time.
This example shows how to query the current properties and then extend the lease if it will expire soon.

> NOTE: The runtime SDKs also offer this functionality, and in many typical scenarios, you would use them to
> extend the session lease.

```typescript Snippet:UpdateSession
/// When the lease is within 2 minutes of expiring, extend it by 15 minutes.
let currentSession = await client.getSession(sessionId);
if (currentSession.status == "Ready") {
  if (
    currentSession.maxLeaseTimeInMinutes -
      (Date.now() - currentSession.properties.createdOn.valueOf()) / 60000 <
    2
  ) {
    let newLeaseTime = currentSession.maxLeaseTimeInMinutes + 15;

    await client.updateSession(sessionId, { maxLeaseTimeInMinutes: newLeaseTime });
  }
}
```

### List sessions

You can get information about your sessions using the `getSessions` method.
This method may return sessions which have yet to start and sessions which are ready.

```typescript Snippet:ListSessions
for await (const session of client.listSessions()) {
  console.log(`Session ${session.sessionId} is ${session.status}`);
}
```

### Stop a session

The following code will stop a running session with given id.

```typescript Snippet:StopSession
client.endSession(sessionId);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setlogLevel } = require("@azure/logger");

setLogLevel("info");
```

### Azure Remote Rendering troubleshooting

For general troubleshooting advice concerning Azure Remote Rendering, see [the Troubleshoot page](https://docs.microsoft.com/azure/remote-rendering/resources/troubleshoot) for remote rendering at docs.microsoft.com.

The client methods will throw exceptions if the request cannot be made.
However, in the case of both conversions and sessions, the requests can succeed but the requested operation may not be successful.
In this case, no exception will be thrown, but the returned objects can be inspected to understand what happened.

If the asset in a conversion is invalid, the conversion operation will return an AssetConversion object
with a Failed status and carrying a RemoteRenderingServiceError with details.
Once the conversion service is able to process the file, a &lt;assetName&gt;.result.json file will be written to the output container.
If the input asset is invalid, then that file will contain a more detailed description of the problem.

Similarly, sometimes when a session is requested, the session ends up in an error state.
The startSessionOperation method will return a RenderingSession object, but that object will have an Error status and carry a
RemoteRenderingServiceError with details.

## Next steps

- Read the [Product documentation](https://docs.microsoft.com/azure/remote-rendering/)
- Learn about the runtime SDKs:
  - .NET: https://docs.microsoft.com/dotnet/api/microsoft.azure.remoterendering
  - C++: https://docs.microsoft.com/cpp/api/remote-rendering/

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
