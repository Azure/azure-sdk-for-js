# Azure Video Analyzer Edge client library for JavaScript

Azure Video Analyzer provides a platform to build intelligent video applications that span the edge and the cloud. The platform offers the capability to capture, record, and analyze live video along with publishing the results, video and video analytics, to Azure services in the cloud or the edge. It is designed to be an extensible platform, enabling you to connect different video analysis edge modules such as Cognitive services containers, custom edge modules built by you with open source machine learning models or custom models trained with your own data. You can then use them to analyze live video without worrying about the complexity of building and running a live video pipeline.

Use the client library for Video Analyzer Edge to:

-  Simplify interactions with the [Microsoft Azure IoT SDKs](https://github.com/azure/azure-iot-sdks)
-  Programmatically construct pipeline topologies and live pipelines

[Product documentation][doc_product] | [Direct methods][doc_direct_methods] | [Source code][source]

## Getting started

### Install the package

Install the Video Analyzer client library for Typescript with npm:

```bash
npm install @azure/video-analyzer-edge
```

### Prerequisites

-  TypeScript v3.6.
-  You need an active [Azure subscription][azure_sub], and a IoT device connection string to use this package.
-  To interact with Azure IoT Hub you will need to run `npm install azure-iothub`
-  You will need to use the version of the SDK that corresponds to the version of the Video Analyzer Edge module you are using.

  | SDK          | Video Analyzer edge module |
  | ------------ | -------------------------- |
  | 1.0.0-beta.x | 1.0                        |

### Creating a pipeline topology and making requests

Please visit the [Examples](#examples) for starter code.

We guarantee that all client instance methods are thread-safe and independent of each other ([guideline](https://azure.github.io/azure-sdk/dotnet_introduction.html#dotnet-service-methods-thread-safety)). This ensures that the recommendation of reusing client instances is always safe, even across threads.

## Key concepts

### Pipeline topology vs live pipeline

A _pipeline topology_ is a blueprint or template for instantiating live pipelines. It defines the parameters of the pipeline using placeholders as values for them. A _live pipeline_ references a pipeline topology and specifies the parameters. This way you are able to have multiple live pipelines referencing the same topology but with different values for parameters. For more information please visit [pipeline topologies and live pipelines][doc_pipelines].

## Examples

### Creating a pipeline topology

To create a pipeline topology you need to define sources and sinks.

```typescript
const rtspSource: RtspSource = {
    name: "rtspSource",
    endpoint: {
      url: "${rtspUrl}",
      "@type": "#Microsoft.VideoAnalyzer.UnsecuredEndpoint",
      credentials: {
        username: "${rtspUserName}",
        password: "${rtspPassword}",
        "@type": "#Microsoft.VideoAnalyzer.UsernamePasswordCredentials"
      }
    } as UnsecuredEndpoint,
    "@type": "#Microsoft.VideoAnalyzer.RtspSource"
  };

  const nodeInput: NodeInput = {
    nodeName: "rtspSource"
  };

  const msgSink: IotHubMessageSink = {
    name: "msgSink",
    inputs: [nodeInput],
    hubOutputName: "${hubSinkOutputName}",
    "@type": "#Microsoft.VideoAnalyzer.IotHubMessageSink"
  };

  const pipelineTopology: PipelineTopology = {
    name: "jsTestTopology",
    properties: {
      description: "Continuous video recording to a Video Analyzer video",
      parameters: [
        { name: "rtspUserName", type: "String", default: "dummyUsername" },
        { name: "rtspPassword", type: "SecretString", default: "dummyPassword" },
        { name: "rtspUrl", type: "String" }
        { name: "hubSinkOutputName", type: "String" }
      ],
      sources: [rtspSource],
      sinks: [msgSink]
    }
  };

```

### Creating a live pipeline

To create a live pipeline instance, you need to have an existing pipeline topology.

```typescript
const livePipeline: LivePipeline = {
  name: pipelineTopologyName,
  properties: {
    description: "Continuous video recording to a Video Analyzer video",
    topologyName: "jsTestTopology",
    parameters: [{ name: "rtspUrl", value: "rtsp://sample.com" }]
  }
};
```

### Invoking a direct method

To invoke a direct method on your device you need to first define the request using the Video Analyzer Edge SDK, then send that method request using the IoT SDK's `CloudToDeviceMethod`.

```typescript
import { createRequest } from "@azure/video-analyzer-edge";
import { Client } from "azure-iothub";

const deviceId = "lva-sample-device";
const moduleId = "mediaEdge";
const connectionString = "connectionString";
const iotHubClient = Client.fromConnectionString(connectionString);
const pipelineTopologySetRequest = createRequest("pipelineTopologySet", pipelineTopology);
const setPipelineTopResponse = await iotHubClient.invokeDeviceMethod(deviceId, moduleId, {
  methodName: pipelineTopologySetRequest.methodName,
  payload: pipelineTopologySetRequest.payload
});
```

## Troubleshooting

-  When creating a method request remember to check the spelling of the name of the method

## Next steps

-  [Samples][samples]
-  [Azure IoT Device SDK][iot-device-sdk]
-  [Azure IoTHub Service SDK][iot-hub-sdk]

## Contributing

This project welcomes contributions and suggestions. Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution.
For details, visit https://cla.microsoft.com.

If you encounter any issues, please open an issue on our [Github][github-page-issues].

When you submit a pull request, a CLA-bot will automatically determine whether
you need to provide a CLA and decorate the PR appropriately (e.g., label,
comment). Simply follow the instructions provided by the bot. You will only
need to do this once across all repos using our CLA.

This project has adopted the
[Microsoft Open Source Code of Conduct][code_of_conduct]. For more information,
see the Code of Conduct FAQ or contact opencode@microsoft.com with any
additional questions or comments.

<!-- LINKS -->

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com

[source]: https://aka.ms/ava/sdk/client/js/source
[samples]: https://aka.ms/video-analyzer-sample
[package]: https://aka.ms/ava/sdk/client/js
[doc_direct_methods]: https://go.microsoft.com/fwlink/?linkid=2162396
[doc_product]: https://go.microsoft.com/fwlink/?linkid=2162396
[doc_pipelines]: https://go.microsoft.com/fwlink/?linkid=2162396
[iot-device-sdk]: https://www.npmjs.com/package/azure-iot-device
[iot-hub-sdk]: https://github.com/Azure/azure-iot-sdk-node
[github-page-issues]: https://github.com/Azure/azure-sdk-for-js/issues
