# Azure Video Analyzer Edge client library for JavaScript

Azure Video Analytics on IoT Edge provides a platform to build intelligent video applications that span the edge and the cloud. The platform offers the capability to capture, record, and analyze live video along with publishing the results, video and video analytics, to Azure services in the cloud or the edge. It is designed to be an extensible platform, enabling you to connect different video analysis edge modules (such as Cognitive services containers, custom edge modules built by you with open-source machine learning models or custom models trained with your own data) to it and use them to analyze live video without worrying about the complexity of building and running a live video pipeline.

Use the client library for Azure Video Analytics to:

- Simplify interactions with the [Microsoft Azure IoT SDKs](https://github.com/azure/azure-iot-sdks)
- Programatically construct media graph topologies and instances

[Product documentation][doc_product] | [Direct methods][doc_direct_methods] | [Source code][source]

## Getting started

### Install the package

Install the Live Video Analytics client library for Typescript with npm:

```bash
npm install @azure/media-video-analyzer-edge
```

### Prerequisites

- TypeScript v3.6.
- You need an active [Azure subscription][azure_sub], and a [IoT device connection string][iot_device_connection_string] to use this package.
- To interact with Azure IoT Hub you will need to run `npm install azure-iothub`
- You will need to use the version of the SDK that corresponds to the version of the LVA Edge module you are using.

  | SDK     | LVA Edge Module |
  | ------- | --------------- |
  | 1.0.0b1 | 1.0             |

### Creating a pipeline topology and making requests

Please visit the [Examples](#examples) for starter code

## Key concepts

### Pipeline Topology vs Pipeline Instance

A _pipeline topology_ is a blueprint or template of a graph. It defines the parameters of the graph using placeholders as values for them. A _live instance_ references a pipeline topology and specifies the parameters. This way you are able to have multiple graph instances referencing the same topology but with different values for parameters. For more information please visit [Pipeline topologies and instances][doc_media_pipeline]

## Examples

### Creating a pipeline topology

To create a pipeline topology you need to define parameters, sources, and sinks.

```
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

  const assetSink: AssetSink = {
    name: "assetSink",
    inputs: [graphNodeInput],
    assetContainerSasUrl:
      "https://sampleAsset-${System.PipelineTopologyName}-${System.LivePipelineName}.com",
    localMediaCachePath: "/var/lib/azuremediaservices/tmp/",
    localMediaCacheMaximumSizeMiB: "2048",
    "@type": "#Microsoft.VideoAnalyzer.AssetSink"
  };

  const pipelineTopology: PipelineTopology = {
    name: "jsTestGraph",
    properties: {
      description: "description for jsTestGraph",
      parameters: [
        { name: "rtspUserName", type: "String", default: "dummyUsername" },
        { name: "rtspPassword", type: "SecretString", default: "dumyPassword" },
        { name: "rtspUrl", type: "String" }
      ],
      sources: [rtspSource],
      sinks: [assetSink]
    }
  };

```

### Creating a live pipeline instance

To create a live pipeline instance, you need to have an existing pipeline topology.

```
const livePipeline: LivePipeline = {
    name: graphTopologyName,
    properties: {
      description: "description for jsTestGraphInstance",
      topologyName: "jsTestGraph",
      parameters: [{ name: "rtspUrl", value: "rtsp://sample.com" }]
    }
  };

```

### Invoking a pipeline method request

```
const pipelineTopologySetRequest = createRequest("pipelineTopologySet", pipelineTopology);
const setPipelineTopResponse = await iotHubClient.invokeDeviceMethod(device_id, module_id, {
      methodName: pipelineTopologySetRequest.methodName,
      payload: pipelineTopologySetRequest.payload
    });
```

## Troubleshooting

## Next steps

- [Samples][samples]
- [Azure IoT Device SDK][iot-device-sdk]
- [Azure IoTHub Service SDK][iot-hub-sdk]

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
[package]: TODO://link-to-published-package
[source]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/videoanalyzer/
[doc_direct_methods]: https://docs.microsoft.com/azure/media-services/live-video-analytics-edge/direct-methods
[doc_product]: https://docs.microsoft.com/azure/media-services/live-video-analytics-edge/
[iot-device-sdk]: https://www.npmjs.com/package/azure-iot-device
[iot-hub-sdk]: https://github.com/Azure/azure-iot-sdk-node
[iot_device_connection_string]: https://docs.microsoft.com/azure/media-services/live-video-analytics-edge/get-started-detect-motion-emit-events-quickstart
[github-page-issues]: https://github.com/Azure/azure-sdk-for-python/issues
