// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  PipelineTopology,
  RtspSource,
  UnsecuredEndpoint,
  NodeInput,
  VideoSink,
  createRequest
} from "../src";

describe("test", () => {
  it("creates a pipeline topology and calls createRequest to ensure apiVersion is added", () => {
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

    const videoSink: VideoSink = {
      name: "videoSink",
      inputs: [nodeInput],
      videoName: "video",
      localMediaCachePath: "/var/lib/videoanalyzer/tmp/",
      localMediaCacheMaximumSizeMiB: "1024",
      "@type": "#Microsoft.VideoAnalyzer.VideoSink"
    };

    const pipelineTopology: PipelineTopology = {
      name: "jsTestTopology",
      properties: {
        description: "description for jsTestTopology",
        parameters: [
          { name: "rtspUserName", type: "String", default: "dummyUsername" },
          { name: "rtspPassword", type: "SecretString", default: "dummyPassword" },
          { name: "rtspUrl", type: "String" }
        ],
        sources: [rtspSource],
        sinks: [videoSink]
      }
    };

    const pipelineTopologySetRequest = createRequest("pipelineTopologySet", pipelineTopology);
    assert.strictEqual(pipelineTopologySetRequest.payload["@apiVersion"], "1.1");
  });
});
