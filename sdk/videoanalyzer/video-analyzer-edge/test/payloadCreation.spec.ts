import { assert } from "chai";
//import { helloWorld } from "../src";
//import { assert } from "console";
import {
  PipelineTopology,
  RtspSource,
  UnsecuredEndpoint,
  NodeInput,
  IotHubMessageSink,
  createRequest
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

    const nodeInput: NodeInput = {
      nodeName: "rtspSource"
    };

    const msgSink: IotHubMessageSink = {
      name: "msgSink",
      inputs: [nodeInput],
      hubOutputName: "${hubSinkOutputName}",
      "@type": "#Microsoft.VideoAnalyzer.IotHubMessageSink"
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
        sinks: [msgSink]
      }
    };

    const setGraphTopRequest = createRequest("pipelineTopologySet", graphTopology);
    assert.strictEqual(setGraphTopRequest.payload["@apiVersion"], "1.0");
  });
});
