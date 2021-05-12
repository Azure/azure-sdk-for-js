// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { createRequest } = require("@azure/video-analyzer-edge");

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

  const msgSink = {
    name: "msgSink",
    inputs: [nodeInput],
    hubOutputName: "${hubSinkOutputName}",
    "@type": "#Microsoft.VideoAnalyzer.IotHubMessageSink"
  };

  const pipelineTopology = {
    name: "jsTestTopology",
    properties: {
      description: "description for jsTestTopology",
      parameters: [
        { name: "rtspUserName", type: "String", default: "dummyUsername" },
        { name: "rtspPassword", type: "SecretString", default: "dummyPassword" },
        { name: "rtspUrl", type: "String" },
        { name: "hubSinkOutputName", type: "String" }
      ],
      sources: [rtspSource],
      sinks: [msgSink]
    }
  };

  return pipelineTopology;
}

function buildLivePipeline(pipelineTopologyName) {
  const livePipeline = {
    name: "jsLivePipelineTest",
    properties: {
      description: "description",
      topologyName: pipelineTopologyName,
      parameters: [{ name: "rtspUrl", value: "rtsp://sample.com" }]
    }
  };

  return livePipeline;
}

async function main() {
  const device_id = "lva-sample-device";
  const module_id = "mediaEdge";
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

  const pipelineTopologySetRequest = createRequest("pipelineTopologySet", pipelineTopology);
  const setPipelineTopResponse = await invokeMethodHelper(pipelineTopologySetRequest);
  console.log(setPipelineTopResponse);

  const listPipelineTopologyRequest = createRequest("pipelineTopologyList");
  const listPipelineTopologyResponse = await invokeMethodHelper(listPipelineTopologyRequest);
  console.log(listPipelineTopologyResponse);

  const getPipelineTopologyRequest = createRequest("pipelineTopologyGet", pipelineTopology.name);
  const getPipelineTopologyResponse = await invokeMethodHelper(getPipelineTopologyRequest);
  console.log(getPipelineTopologyResponse);

  const setLivePipelineRequest = createRequest("livePipelineSet", livePipeline);
  const setLivePipelineResponse = await invokeMethodHelper(setLivePipelineRequest);
  console.log(setLivePipelineResponse);

  const listLivePipelineRequest = createRequest("livePipelineList");
  const listLivePipelineResponse = await invokeMethodHelper(listLivePipelineRequest);
  console.log(listLivePipelineResponse);

  const activateLivePipelineRequest = createRequest("livePipelineActivate", livePipeline.name);
  const activateLivePipelineResponse = await invokeMethodHelper(activateLivePipelineRequest);
  console.log(activateLivePipelineResponse);

  const getLivePipelineRequest = createRequest("livePipelineGet", livePipeline.name);
  const getLivePipelineResponse = await invokeMethodHelper(getLivePipelineRequest);
  console.log(getLivePipelineResponse);

  const deactivateLivePipelineRequest = createRequest("livePipelineDeactivate", livePipeline.name);
  const deactivateLivePipelineResponse = await invokeMethodHelper(deactivateLivePipelineRequest);
  console.log(deactivateLivePipelineResponse);

  const deleteLivePipelineRequest = createRequest("livePipelineDelete", livePipeline.name);
  const deleteLivePipelineResponse = await invokeMethodHelper(deleteLivePipelineRequest);
  console.log(deleteLivePipelineResponse);

  const deletePipelineTopRequest = createRequest("pipelineTopologyDelete", pipelineTopology.name);
  const deletePipelineTopResponse = await invokeMethodHelper(deletePipelineTopRequest);
  console.log(deletePipelineTopResponse);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
