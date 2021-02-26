// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

import {
  MediaGraphTopology,
  MethodRequest,
  MediaGraphRtspSource,
  MediaGraphUnsecuredEndpoint,
  MediaGraphNodeInput,
  MediaGraphAssetSink,
  MediaGraphInstance,
  createMediaGraphTopologySetRequest,
  createMediaGraphInstanceListRequest,
  createMediaGraphTopologyListRequest,
  createMediaGraphTopologyGetRequest,
  createMediaGraphInstanceSetRequest,
  createMediaGraphInstanceActivateRequest,
  createMediaGraphInstanceGetRequest,
  createMediaGraphInstanceDeActivateRequest,
  createMediaGraphInstanceDeleteRequest,
  createMediaGraphTopologyDeleteRequest
} from "../../../";
import { Client } from "azure-iothub";
import { ModuleClient } from "azure-iot-device";

function buildGraphTopology() {
  const rtspSource: MediaGraphRtspSource = {
    name: "rtspSource",
    endpoint: {
      url: "${rtspUrl}",
      "@type": "#Microsoft.Media.MediaGraphUnsecuredEndpoint",
      credentials: {
        username: "${rtspUserName}",
        password: "${rtspPassword}",
        "@type": "#Microsoft.Media.MediaGraphUsernamePasswordCredentials"
      }
    } as MediaGraphUnsecuredEndpoint,
    "@type": "#Microsoft.Media.MediaGraphRtspSource"
  };

  const graphNodeInput: MediaGraphNodeInput = {
    nodeName: "rtspSource"
  };

  const assetSink: MediaGraphAssetSink = {
    name: "assetSink",
    inputs: [graphNodeInput],
    assetNamePattern: "sampleAsset-${System.GraphTopologyName}-${System.GraphInstanceName}",
    localMediaCachePath: "/var/lib/azuremediaservices/tmp/",
    localMediaCacheMaximumSizeMiB: "2048",
    "@type": "#Microsoft.Media.MediaGraphAssetSink"
  };

  const graphTopology: MediaGraphTopology = {
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
  const graphInstance: MediaGraphInstance = {
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
  const connectionString =
    "HostName=lvasamplehubwuvvummbzrlk4.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=rHEELfVWEkKxbMBvdc7Fcp49QdBDA6skuOcLIIryD6c=";
  const cli = Client.fromConnectionString(connectionString);

  const invokeMethod = async (methodRequest: MethodRequest) => {
    return await cli.invokeDeviceMethod(device_id, module_id, {
      methodName: methodRequest.MethodName,
      payload: methodRequest.Payload
    });
  };

  const graphTopology = buildGraphTopology();
  const graphInstance = buildGraphInstance(graphTopology.name);

  const setGraphTopRequest = createMediaGraphTopologySetRequest(graphTopology);
  const setRequestResult2 = await invokeMethod(setGraphTopRequest);
  console.log(setRequestResult2);

  const listGraphRequest = createMediaGraphTopologyListRequest(graphTopology);
  const listGraphResponse = await invokeMethod(listGraphRequest);
  console.log(listGraphResponse);

  const getGraphRequest = createMediaGraphTopologyGetRequest(graphTopology.name);
  const getGraphResponse = await invokeMethod(getGraphRequest);
  console.log(getGraphResponse);

  const setGraphInstanceRequest = createMediaGraphInstanceSetRequest(graphInstance);
  const setGraphResponse = await invokeMethod(setGraphInstanceRequest);
  console.log(setGraphResponse);

  const listGraphInstanceRequest = createMediaGraphInstanceListRequest(graphInstance);
  const listGraphInstanceResponse = await invokeMethod(listGraphInstanceRequest);
  console.log(listGraphInstanceResponse);

  const activateGraphRequest = createMediaGraphInstanceActivateRequest(graphInstance.name);
  const activateGraphResponse = await invokeMethod(activateGraphRequest);
  console.log(activateGraphResponse);

  const getGraphInstanceRequest = createMediaGraphInstanceGetRequest(graphInstance.name);
  const getGraphInstanceResponse = await invokeMethod(getGraphInstanceRequest);
  console.log(getGraphInstanceResponse);

  const deactivateGraphRequest = createMediaGraphInstanceDeActivateRequest(graphInstance.name);
  const deactivateGraphResponse = await invokeMethod(deactivateGraphRequest);
  console.log(deactivateGraphResponse);

  const deleteGraphInstanceRequest = createMediaGraphInstanceDeleteRequest(graphInstance.name);
  const deleteGraphInstanceResponse = await invokeMethod(deleteGraphInstanceRequest);
  console.log(deleteGraphInstanceResponse);

  const deleteGraphTopRequest = createMediaGraphTopologyDeleteRequest(graphTopology.name);
  const deleteGraphTopResponse = await invokeMethod(deleteGraphTopRequest);
  console.log(deleteGraphTopResponse);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
