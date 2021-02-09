// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

import {
  MediaGraphTopologySetRequest,
  MediaGraphTopology,
  MediaGraphTopologyListRequest,
  MethodRequest,
  MediaGraphRtspSource,
  MediaGraphUnsecuredEndpoint,
  MediaGraphNodeInput,
  MediaGraphAssetSink,
  MediaGraphInstance
} from "../../../";
import { DigitalTwinClient, Registry, IoTHubTokenCredentials, Client } from "azure-iothub";
//import {Message,  } from 'azure-iot-common'
import { ModuleClient } from "azure-iot-device";

// const setrequest: MediaGraphTopologySetRequest = {
//   graph: {name: 'sample', properties: {description: 'sample descrip',
//   parameters:[{name: "rtspUserName",type: 'String'},{name: 'rtspPassword',type:'SecretString'},{name:'rtspUrl', type:'String'}]}},
//   apiVersion: '2.0'
// }

function buildGraphTopology() {
  const rtspSource: MediaGraphRtspSource = {
    name: "rtspSource",
    endpoint: {
      url: "${rtspUrl}",
      type: "#Microsoft.Media.MediaGraphUnsecuredEndpoint",
      credentials: {
        username: "${rtspUserName}",
        password: "${rtspPassword}",
        type: "#Microsoft.Media.MediaGraphUsernamePasswordCredentials"
      }
    } as MediaGraphUnsecuredEndpoint,
    type: "#Microsoft.Media.MediaGraphRtspSource"
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
    type: "#Microsoft.Media.MediaGraphAssetSink"
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
  const module_d = "lvaEdge";
  const connectionString = "enter-your-connection-string";
  const cli = Client.fromConnectionString(connectionString);

  const invokeMethod = async (methodRequest: MethodRequest) => {
    return await cli.invokeDeviceMethod(device_id, module_d, {
      methodName: methodRequest.MethodName,
      payload: methodRequest.Payload
    });
  };

  const graphTopology = buildGraphTopology();
  const graphInstance = buildGraphInstance(graphTopology.name);

  const graphSetRequest = new MediaGraphTopologySetRequest(graphTopology);
  console.log(graphSetRequest);
  const setRequestResult = await invokeMethod(graphSetRequest);
  console.log(setRequestResult);

  const graphListRequest = new MediaGraphTopologyListRequest();
  console.log(graphListRequest);
  const listGraphResult = await invokeMethod(graphListRequest);
  console.log(listGraphResult);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
