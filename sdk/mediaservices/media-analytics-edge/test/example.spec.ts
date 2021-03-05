import { assert } from "chai";
//import { helloWorld } from "../src";
//import { assert } from "console";
import {
  MediaGraphTopology,
  MediaGraphRtspSource,
  MediaGraphUnsecuredEndpoint,
  MediaGraphNodeInput,
  MediaGraphAssetSink,
  createMediaGraphTopologySetRequest
} from "../";

describe("test", () => {
  it("creates a graph topology and calls createMediaGraphTopologySetRequest to ensure apiVersion is added", () => {
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

    const setGraphTopRequest = createMediaGraphTopologySetRequest(graphTopology);
    assert.strictEqual(setGraphTopRequest.Payload["@apiVersion"], "2.0");
  });
});
