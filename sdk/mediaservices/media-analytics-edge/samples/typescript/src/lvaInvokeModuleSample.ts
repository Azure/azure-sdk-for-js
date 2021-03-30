// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

import {
  PipelineTopology,
  Request,
  RtspSource,
  UnsecuredEndpoint,
  NodeInput,
  AssetSink,
  LivePipeline,
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
} from "@azure/media-analytics-edge";
import { Client } from "azure-iothub";

function buildGraphTopology() {
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

  const graphNodeInput: NodeInput = {
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

  const graphTopology: PipelineTopology = {
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

  return graphTopology;
}

function buildGraphInstance(graphTopologyName: string) {
  const graphInstance: LivePipeline = {
    name: graphTopologyName,
    properties: {
      description: "description for jsTestGraphInstance",
      topologyName: "jsTestGraph",
      parameters: [{ name: "rtspUrl", value: "rtsp://sample.com" }]
    }
  };

  return graphInstance;
}

export async function main() {
  console.log("== Sample Template ==");
  const device_id = "lva-sample-device";
  const module_id = "lvaEdge";
  const connectionString = "connectionString";
  const iotHubClient = Client.fromConnectionString(connectionString);

  const invokeMethodHelper = async (methodRequest: Request) => {
    return await iotHubClient.invokeDeviceMethod(device_id, module_id, {
      methodName: methodRequest.MethodName,
      payload: methodRequest.Payload
    });
  };

  const graphTopology = buildGraphTopology();
  const graphInstance = buildGraphInstance(graphTopology.name);

  const setGraphTopRequest = createPipelineTopologySetRequest(graphTopology);
  const setRequestResult2 = await invokeMethodHelper(setGraphTopRequest);
  console.log(setRequestResult2);

  const listGraphRequest = createPipelineTopologyListRequest();
  const listGraphResponse = await invokeMethodHelper(listGraphRequest);
  console.log(listGraphResponse);

  const getGraphRequest = createPipelineTopologyGetRequest(graphTopology.name);
  const getGraphResponse = await invokeMethodHelper(getGraphRequest);
  console.log(getGraphResponse);

  const setGraphInstanceRequest = createLivePipelineSetRequest(graphInstance);
  const setGraphResponse = await invokeMethodHelper(setGraphInstanceRequest);
  console.log(setGraphResponse);

  const listGraphInstanceRequest = createLivePipelineListRequest();
  const listGraphInstanceResponse = await invokeMethodHelper(listGraphInstanceRequest);
  console.log(listGraphInstanceResponse);

  const activateGraphRequest = createLivePipelineActivateRequest(graphInstance.name);
  const activateGraphResponse = await invokeMethodHelper(activateGraphRequest);
  console.log(activateGraphResponse);

  const getGraphInstanceRequest = createLivePipelineGetRequest(graphInstance.name);
  const getGraphInstanceResponse = await invokeMethodHelper(getGraphInstanceRequest);
  console.log(getGraphInstanceResponse);

  const deactivateGraphRequest = createLivePipelineDeActivateRequest(graphInstance.name);
  const deactivateGraphResponse = await invokeMethodHelper(deactivateGraphRequest);
  console.log(deactivateGraphResponse);

  const deleteGraphInstanceRequest = createLivePipelineDeleteRequest(graphInstance.name);
  const deleteGraphInstanceResponse = await invokeMethodHelper(deleteGraphInstanceRequest);
  console.log(deleteGraphInstanceResponse);

  const deleteGraphTopRequest = createPipelineTopologyDeleteRequest(graphTopology.name);
  const deleteGraphTopResponse = await invokeMethodHelper(deleteGraphTopRequest);
  console.log(deleteGraphTopResponse);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
