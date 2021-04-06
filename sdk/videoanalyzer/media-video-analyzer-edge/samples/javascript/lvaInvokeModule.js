// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

const {
  createPipelineTopologySetRequest,
  createLivePipelineListRequest,
  createPipelineTopologyListRequest,
  createPipelineTopologyGetRequest,
  createLivePipelineSetRequest,
  createLivePipelineActivateRequest,
  createLivePipelineGetRequest,
  createLivePipelineDeActivateRequest,
  createLivePipelineDeleteRequest,
  createPipelineTopologyDeleteRequest
} = require("@azure/media-video-analyzer-edge");
const { Client } = require("azure-iothub");

function buildPipelineTopology() {
  const rtspSource = {
    name: "rtspSource",
    endpoint: {
      url: "${rtspUrl}",
      "@type": "#Microsoft.VideoAnalyzer.UnsecuredEndpoint",
      credentials: {
        username: "${rtspUserName}",
        password: "${rtspPassword}",
        "@type": "#Microsoft.VideoAnalyzer.UsernamePasswordCredentials"
      }
    },
    "@type": "#Microsoft.VideoAnalyzer.RtspSource"
  };

  const nodeInput = {
    nodeName: "rtspSource"
  };

  const assetSink = {
    name: "assetSink",
    inputs: [nodeInput],
    assetContainerSasUrl:
      "https://sampleAsset-${System.PipelineTopologyName}-${System.LivePipelineName}.com",
    localMediaCachePath: "/var/lib/azuremediaservices/tmp/",
    localMediaCacheMaximumSizeMiB: "2048",
    "@type": "#Microsoft.VideoAnalyzer.AssetSink"
  };

  const pipelineTopology = {
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

  return pipelineTopology;
}

function buildLivePipeline(PipelineTopologyName) {
  const livePipeline = {
    name: PipelineTopologyName,
    properties: {
      description: "description for jsTestGraphInstance",
      topologyName: "jsTestGraph",
      parameters: [{ name: "rtspUrl", value: "rtsp://sample.com" }]
    }
  };

  return livePipeline;
}

async function main() {
  const device_id = "lva-sample-device";
  const module_id = "moduleId";
  const connectionString = "connectionString";
  const iotHubClient = Client.fromConnectionString(connectionString);

  const invokeMethodHelper = async (methodRequest) => {
    return await iotHubClient.invokeDeviceMethod(device_id, module_id, {
      methodName: methodRequest.methodName,
      payload: methodRequest.payload
    });
  };

  const pipelineTopology = buildPipelineTopology();
  const livePipeline = buildLivePipeline(pipelineTopology.name);

  const setPipelineTopRequest = createPipelineTopologySetRequest(pipelineTopology);
  const setPipelineTopResponse = await invokeMethodHelper(setPipelineTopRequest);
  console.log(setPipelineTopResponse);

  const listPipelineTopologyRequest = createPipelineTopologyListRequest();
  const listPipelineTopologyResponse = await invokeMethodHelper(listPipelineTopologyRequest);
  console.log(listPipelineTopologyResponse);

  const getPipelineTopologyRequest = createPipelineTopologyGetRequest(pipelineTopology.name);
  const getPipelineTopologyResponse = await invokeMethodHelper(getPipelineTopologyRequest);
  console.log(getPipelineTopologyResponse);

  const setLivePipelineRequest = createLivePipelineSetRequest(livePipeline);
  const setLivePipelineResponse = await invokeMethodHelper(setLivePipelineRequest);
  console.log(setLivePipelineResponse);

  const listLivePipelineRequest = createLivePipelineListRequest();
  const listLivePipelineResponse = await invokeMethodHelper(listLivePipelineRequest);
  console.log(listLivePipelineResponse);

  const activateLivePipelineRequest = createLivePipelineActivateRequest(livePipeline.name);
  const activateLivePipelineResponse = await invokeMethodHelper(activateLivePipelineRequest);
  console.log(activateLivePipelineResponse);

  const getLivePipelineRequest = createLivePipelineGetRequest(livePipeline.name);
  const getLivePipelineResponse = await invokeMethodHelper(getLivePipelineRequest);
  console.log(getLivePipelineResponse);

  const deactivateLivePipelineRequest = createLivePipelineDeActivateRequest(livePipeline.name);
  const deactivateLivePipelineResponse = await invokeMethodHelper(deactivateLivePipelineRequest);
  console.log(deactivateLivePipelineResponse);

  const deleteLivePipelineRequest = createLivePipelineDeleteRequest(livePipeline.name);
  const deleteLivePipelineResponse = await invokeMethodHelper(deleteLivePipelineRequest);
  console.log(deleteLivePipelineResponse);

  const deletePipelineTopRequest = createPipelineTopologyDeleteRequest(pipelineTopology.name);
  const deletePipelineTopResponse = await invokeMethodHelper(deletePipelineTopRequest);
  console.log(deletePipelineTopResponse);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
