// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Azure Video Analyzer Edge sdk.
 */

const { createRequest } = require("@azure/video-analyzer-edge");

const { Client } = require("azure-iothub");

function buildPipelineTopology() {
  const rtspSource = {
    //Create a source for your pipeline topology
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
    //Create an input for your sink
    nodeName: "rtspSource"
  };

  const videoSink = {
    name: "videoSink",
    inputs: [nodeInput],
    videoName: "video",
    localMediaCachePath: "/var/lib/videoanalyzer/tmp/",
    localMediaCacheMaximumSizeMiB: "1024",
    "@type": "#Microsoft.VideoAnalyzer.VideoSink"
  };

  const pipelineTopology = {
    name: "jsTestTopology",
    properties: {
      description: "description for jsTestTopology",
      parameters: [
        { name: "rtspUserName", type: "String", default: "testUsername" },
        { name: "rtspPassword", type: "SecretString", default: "testPassword" },
        { name: "rtspUrl", type: "String" }
      ],
      sources: [rtspSource],
      sinks: [videoSink]
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

function createRemoteDeviceAdapter(deviceName, iotDeviceName) {
  const remoteDeviceProperties = {
    target: { host: "camerasimulator" },
    iotHubDeviceConnection: {
      deviceId: iotDeviceName,
      credentials: {
        "@type": "#Microsoft.VideoAnalyzer.SymmetricKeyCredentials",
        key: process.env.iothub_deviceprimarykey
      }
    }
  };

  const remoteDeviceAdapter = {
    name: deviceName,
    properties: remoteDeviceProperties
  };

  return remoteDeviceAdapter;
}

async function main() {
  const deviceId = process.env.iothub_deviceid;
  const moduleId = process.env.iothub_moduleid;
  const connectionString = process.env.iothub_connectionstring;
  const iotHubClient = Client.fromConnectionString(connectionString ?? ""); //Connect to your IoT Hub

  async function invokeMethodHelper(methodRequest) {
    //Helper method to send a module method request to your IoT Hub device
    return await iotHubClient.invokeDeviceMethod(deviceId ?? "", moduleId ?? "", {
      methodName: methodRequest.methodName,
      payload: methodRequest.payload
    });
  }

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

  const endpoint = {
    url: "http://camerasimulator:8554",
    "@type": "#Microsoft.VideoAnalyzer.UnsecuredEndpoint"
  };
  const getOnvifDeviceRequest = createRequest("onvifDeviceGet", endpoint);
  const getOnvifDeviceResponse = await invokeMethodHelper(getOnvifDeviceRequest);
  console.log(getOnvifDeviceResponse);

  const listOnvifDeviceRequest = createRequest("onvifDeviceDiscover");
  const listOnvifDeviceResponse = await invokeMethodHelper(listOnvifDeviceRequest);
  console.log(listOnvifDeviceResponse);

  const remoteDeviceAdapter = await createRemoteDeviceAdapter(
    "remoteDeviceAdapterSample",
    "iotDeviceNameSample"
  );
  console.log(remoteDeviceAdapter);
  const setRemoteDeviceAdapterRequest = createRequest(
    "remoteDeviceAdapterSet",
    remoteDeviceAdapter
  );
  const setRemoteDeviceAdapterResponse = await invokeMethodHelper(setRemoteDeviceAdapterRequest);
  console.log(setRemoteDeviceAdapterResponse);

  const getRemoteDeviceAdapterRequest = createRequest(
    "remoteDeviceAdapterGet",
    remoteDeviceAdapter.name
  );
  const getRemoteDeviceAdapterResponse = await invokeMethodHelper(getRemoteDeviceAdapterRequest);
  console.log(getRemoteDeviceAdapterResponse);

  const listRemoteDeviceAdapterRequest = createRequest("remoteDeviceAdapterList");
  const listRemoteDeviceAdapterResponse = await invokeMethodHelper(listRemoteDeviceAdapterRequest);
  console.log(listRemoteDeviceAdapterResponse);

  const deleteRemoteDeviceAdapterRequest = createRequest(
    "remoteDeviceAdapterDelete",
    remoteDeviceAdapter.name
  );
  const deleteRemoteDeviceAdapterResponse = await invokeMethodHelper(
    deleteRemoteDeviceAdapterRequest
  );
  console.log(deleteRemoteDeviceAdapterResponse);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
