// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//@@TS-MAGIC-NEWLINE@@
/**
 * Demonstrates something
 */
//@@TS-MAGIC-NEWLINE@@
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
} = require("@azure/media-analytics-edge");
const { Client } = require("azure-iothub");
//@@TS-MAGIC-NEWLINE@@
function buildGraphTopology() {
  const rtspSource = {
    name: "rtspSource",
    endpoint: {
      url: "${rtspUrl}",
      "@type": "#Microsoft.Media.UnsecuredEndpoint",
      credentials: {
        username: "${rtspUserName}",
        password: "${rtspPassword}",
        "@type": "#Microsoft.Media.MediaGraphUsernamePasswordCredentials"
      }
    },
    "@type": "#Microsoft.Media.RtspSource"
  };
  //@@TS-MAGIC-NEWLINE@@
  const graphNodeInput = {
    nodeName: "rtspSource"
  };
  //@@TS-MAGIC-NEWLINE@@
  const assetSink = {
    name: "assetSink",
    inputs: [graphNodeInput],
    assetNamePattern: "sampleAsset-${System.GraphTopologyName}-${System.GraphInstanceName}",
    localMediaCachePath: "/var/lib/azuremediaservices/tmp/",
    localMediaCacheMaximumSizeMiB: "2048",
    "@type": "#Microsoft.Media.AssetSink"
  };
  //@@TS-MAGIC-NEWLINE@@
  const graphTopology = {
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
  //@@TS-MAGIC-NEWLINE@@
  return graphTopology;
}
//@@TS-MAGIC-NEWLINE@@
function buildGraphInstance(graphTopologyName) {
  const graphInstance = {
    name: graphTopologyName,
    properties: {
      description: "description for jsTestGraphInstance",
      topologyName: "jsTestGraph",
      parameters: [{ name: "rtspUrl", value: "rtsp://sample.com" }]
    }
  };
  //@@TS-MAGIC-NEWLINE@@
  return graphInstance;
}
//@@TS-MAGIC-NEWLINE@@
async function main() {
  console.log("== Sample Template ==");
  const device_id = "lva-sample-device";
  const module_id = "lvaEdge";
  const connectionString = "connectionString";
  const iotHubClient = Client.fromConnectionString(connectionString);
  //@@TS-MAGIC-NEWLINE@@
  const invokeMethodHelper = async (methodRequest) => {
    return await iotHubClient.invokeDeviceMethod(device_id, module_id, {
      methodName: methodRequest.MethodName,
      payload: methodRequest.Payload
    });
  };
  //@@TS-MAGIC-NEWLINE@@
  const graphTopology = buildGraphTopology();
  const graphInstance = buildGraphInstance(graphTopology.name);
  //@@TS-MAGIC-NEWLINE@@
  const setGraphTopRequest = createPipelineTopologySetRequest(graphTopology);
  const setRequestResult2 = await invokeMethodHelper(setGraphTopRequest);
  console.log(setRequestResult2);
  //@@TS-MAGIC-NEWLINE@@
  const listGraphRequest = createPipelineTopologyListRequest();
  const listGraphResponse = await invokeMethodHelper(listGraphRequest);
  console.log(listGraphResponse);
  //@@TS-MAGIC-NEWLINE@@
  const getGraphRequest = createPipelineTopologyGetRequest(graphTopology.name);
  const getGraphResponse = await invokeMethodHelper(getGraphRequest);
  console.log(getGraphResponse);
  //@@TS-MAGIC-NEWLINE@@
  const setGraphInstanceRequest = createLivePipelineSetRequest(graphInstance);
  const setGraphResponse = await invokeMethodHelper(setGraphInstanceRequest);
  console.log(setGraphResponse);
  //@@TS-MAGIC-NEWLINE@@
  const listGraphInstanceRequest = createLivePipelineListRequest();
  const listGraphInstanceResponse = await invokeMethodHelper(listGraphInstanceRequest);
  console.log(listGraphInstanceResponse);
  //@@TS-MAGIC-NEWLINE@@
  const activateGraphRequest = createLivePipelineActivateRequest(graphInstance.name);
  const activateGraphResponse = await invokeMethodHelper(activateGraphRequest);
  console.log(activateGraphResponse);
  //@@TS-MAGIC-NEWLINE@@
  const getGraphInstanceRequest = createLivePipelineGetRequest(graphInstance.name);
  const getGraphInstanceResponse = await invokeMethodHelper(getGraphInstanceRequest);
  console.log(getGraphInstanceResponse);
  //@@TS-MAGIC-NEWLINE@@
  const deactivateGraphRequest = createLivePipelineDeActivateRequest(graphInstance.name);
  const deactivateGraphResponse = await invokeMethodHelper(deactivateGraphRequest);
  console.log(deactivateGraphResponse);
  //@@TS-MAGIC-NEWLINE@@
  const deleteGraphInstanceRequest = createLivePipelineDeleteRequest(graphInstance.name);
  const deleteGraphInstanceResponse = await invokeMethodHelper(deleteGraphInstanceRequest);
  console.log(deleteGraphInstanceResponse);
  //@@TS-MAGIC-NEWLINE@@
  const deleteGraphTopRequest = createPipelineTopologyDeleteRequest(graphTopology.name);
  const deleteGraphTopResponse = await invokeMethodHelper(deleteGraphTopRequest);
  console.log(deleteGraphTopResponse);
}
//@@TS-MAGIC-NEWLINE@@
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
