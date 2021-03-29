import { assert } from "chai";
//import { helloWorld } from "../src";
//import { assert } from "console";
import {
  PipelineTopology,
  RtspSource,
  UnsecuredEndpoint,
  NodeInput,
  AssetSink,
  createPipelineTopologySetRequest
} from "../src";

describe("test", () => {
  it("creates a graph topology and calls createMediaGraphTopologySetRequest to ensure apiVersion is added", () => {
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
      assetContainerSasUrl: "sampleAsset-${System.GraphTopologyName}-${System.GraphInstanceName}",
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

    const setGraphTopRequest = createPipelineTopologySetRequest(graphTopology);
    assert.strictEqual(setGraphTopRequest.Payload["@apiVersion"], "1.0");
  });
});
