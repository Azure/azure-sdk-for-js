import {
  applyReplacementMap,
  ReplacementMap,
  ReplacementFunctions,
  applyReplacementFunctions,
  encodeRFC3986,
  filterSecretsFromStrings,
  env,
  filterSecretsRecursivelyFromJSON
} from "../src/utils";
import chai from "chai";
const { expect } = chai;

describe("utils", () => {
  describe("encodeRFC3986", () => {
    // From https://tools.ietf.org/html/rfc3986
    // Also useful: https://en.wikipedia.org/wiki/Percent-encoding

    it("Should encode the reserved characters", () => {
      const genDelims = [":", "/", "?", "#", "[", "]", "@"];
      const encodedGenDelims = genDelims.map(encodeRFC3986);
      expect(encodedGenDelims).to.deep.equal(["%3A", "%2F", "%3F", "%23", "%5B", "%5D", "%40"]);

      const subDelims = ["!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "="];
      const encodedSubDelims = subDelims.map(encodeRFC3986);
      expect(encodedSubDelims).to.deep.equal([
        "%21",
        "%24",
        "%26",
        "%27",
        "%28",
        "%29",
        "%2A",
        "%2B",
        "%2C",
        "%3B",
        "%3D"
      ]);
    });

    it("Should not encode unreserved characters", () => {
      const unreservedCharacters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~";
      const result = encodeRFC3986(unreservedCharacters);
      expect(result).to.deep.equal(unreservedCharacters);
    });
  });

  describe("applyReplacementMap", () => {
    it("should filter URI encoded secrets", () => {
      const env: NodeJS.ProcessEnv = {
        SECRET: "(SECRET)"
      };

      const replaceableVariables: ReplacementMap = new Map();
      replaceableVariables.set("SECRET", "HIDDEN_SECRET");

      const recording = "azure.com/url/%28SECRET%29";
      const appliedMap = applyReplacementMap(env, replaceableVariables, recording);

      expect(appliedMap).to.equal("azure.com/url/HIDDEN_SECRET");
    });

    it("should filter raw secrets", () => {
      const env: NodeJS.ProcessEnv = {
        ENDPOINT: "azure.com/url/"
      };

      const replaceableVariables: ReplacementMap = new Map();
      replaceableVariables.set("ENDPOINT", "default.com/path/");

      const recording = "azure.com/url/%28SECRET%29";
      const appliedMap = applyReplacementMap(env, replaceableVariables, recording);

      expect(appliedMap).to.equal("default.com/path/%28SECRET%29");
    });

    it("should filter both, raw and URI encoded secrets", () => {
      const env: NodeJS.ProcessEnv = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com/url/"
      };

      const replaceableVariables: ReplacementMap = new Map();
      replaceableVariables.set("SECRET", "HIDDEN_SECRET");
      replaceableVariables.set("ENDPOINT", "default.com/path/");

      const recording = "azure.com/url/%28SECRET%29";
      const appliedMap = applyReplacementMap(env, replaceableVariables, recording);

      expect(appliedMap).to.equal("default.com/path/HIDDEN_SECRET");
    });

    it("should work with recordings of several lines", () => {
      const env: NodeJS.ProcessEnv = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com/url/"
      };

      const replaceableVariables: ReplacementMap = new Map();
      replaceableVariables.set("SECRET", "HIDDEN_SECRET");
      replaceableVariables.set("ENDPOINT", "default.com/path/");

      const recording = `
All the combinations:
azure.com/url/%28SECRET%29
ultramarine.com/url/%28SECRET%29
azure.com/url/PUBLIC
ultramarine.com/url/PUBLIC
`;
      const appliedMap = applyReplacementMap(env, replaceableVariables, recording);

      expect(appliedMap).to.equal(
        `
All the combinations:
default.com/path/HIDDEN_SECRET
ultramarine.com/url/HIDDEN_SECRET
default.com/path/PUBLIC
ultramarine.com/url/PUBLIC
`
      );
    });
  });

  describe("applyReplacementFunctions", () => {
    it("should apply one replacement function", () => {
      const replacements: ReplacementFunctions = [
        (source: string): string => {
          return source.replace(/banana/i, "Bonobo's");
        }
      ];
      const recording = "Banana Split";
      const appliedFunctions = applyReplacementFunctions(replacements, recording);
      expect(appliedFunctions).to.equal("Bonobo's Split");
    });

    it("should apply several replacement functions", () => {
      const replacements: ReplacementFunctions = [
        (source: string): string => {
          return source.replace(/banana/i, "Bonobo's");
        },
        (source: string): string => {
          return source.replace(/split/i, "Flex");
        }
      ];
      const recording = "Banana Split";
      const appliedFunctions = applyReplacementFunctions(replacements, recording);
      expect(appliedFunctions).to.equal("Bonobo's Flex");
    });

    it("should work with recordings of several lines", () => {
      const replacements: ReplacementFunctions = [
        (source: string): string => {
          return source.replace(/azure.com/g, "default.com");
        },
        (source: string): string => {
          return source.replace(/%28SECRET%29/g, "HIDDEN_SECRET");
        }
      ];
      const recording = `
All the combinations:
azure.com/url/%28SECRET%29
ultramarine.com/url/%28SECRET%29
azure.com/url/PUBLIC
ultramarine.com/url/PUBLIC
`;
      const appliedFunctions = applyReplacementFunctions(replacements, recording);
      expect(appliedFunctions).to.equal(
        `
All the combinations:
default.com/url/HIDDEN_SECRET
ultramarine.com/url/HIDDEN_SECRET
default.com/url/PUBLIC
ultramarine.com/url/PUBLIC
`
      );
    });
  });

  describe("filter secrets from content", () => {
    function verifyFilterFunctionForJson(
      recording: any,
      replacementMap: ReplacementMap,
      replacements: ReplacementFunctions,
      expectedFilteredOutput: any
    ) {
      const updatedRecording = filterSecretsRecursivelyFromJSON(
        recording,
        replacementMap,
        replacements
      );
      expect(updatedRecording).to.deep.equal(expectedFilteredOutput);
    }

    it("should work for strings", () => {
      env.SECRET = "SECRET";
      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("SECRET", "FAKE_IT");

      const recording = "HERE_IS_THE_FLAG-SECRET";
      const updatedRecording = filterSecretsFromStrings(recording, replacementMap, []);
      expect(updatedRecording).to.equal("HERE_IS_THE_FLAG-FAKE_IT");
    });

    it("should work for JSON content #1 - secret is present in the query attributes, part of the xml response string", () => {
      env.ACCOUNT_NAME = "azureaccount";
      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("ACCOUNT_NAME", "fakestorageaccount");
      verifyFilterFunctionForJson(
        {
          recordings: [
            {
              method: "GET",
              url: "https://azureaccount.net",
              query: {
                marker: "/azureaccount/queue156816850373302116x2",
                maxresults: "1"
              },
              response:
                '<?xml version="1.0" encoding="utf-8"?><EnumerationResults ServiceEndpoint="https://azureaccount.queue.core.windows.net/"><Prefix>queue156816850373302116</Prefix><Marker>/azureaccount/queue156816850373302116x2</Marker><MaxResults>1</MaxResults><Queues><Queue><Name>queue156816850373302116x2</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker /></EnumerationResults>',
              responseHeaders: {
                server: "Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0"
              }
            }
          ]
        },
        replacementMap,
        [],
        {
          recordings: [
            {
              method: "GET",
              url: "https://fakestorageaccount.net",
              query: {
                marker: "/fakestorageaccount/queue156816850373302116x2",
                maxresults: "1"
              },
              response:
                '<?xml version="1.0" encoding="utf-8"?><EnumerationResults ServiceEndpoint="https://fakestorageaccount.queue.core.windows.net/"><Prefix>queue156816850373302116</Prefix><Marker>/fakestorageaccount/queue156816850373302116x2</Marker><MaxResults>1</MaxResults><Queues><Queue><Name>queue156816850373302116x2</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker /></EnumerationResults>',
              responseHeaders: {
                server: "Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0"
              }
            }
          ]
        }
      );
    });

    it("should work for JSON content #2 - secret is present as part of a JSON lookalike response string ", () => {
      verifyFilterFunctionForJson(
        {
          recording: [
            {
              response:
                '{"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"eyJ0eXAiOiwN"}'
            }
          ]
        },
        new Map(),
        [
          (recording: any): any =>
            recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
        ],
        {
          recording: [
            {
              response:
                '{"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}'
            }
          ]
        }
      );
    });

    it("should work for JSON content #3 - array of JSON objects", () => {
      env.ACCOUNT_NAME = "azureaccount";
      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("ACCOUNT_NAME", "fakestorageaccount");
      verifyFilterFunctionForJson(
        [
          {
            response:
              '{"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"eyJ0eXAiOiwN"}'
          },
          { url: "http://bing.com" },
          { ACCOUNT_NAME: "azureaccount" }
        ],
        replacementMap,
        [
          (recording: any): any =>
            recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
        ],
        [
          {
            response:
              '{"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}'
          },
          { url: "http://bing.com" },
          { ACCOUNT_NAME: "fakestorageaccount" }
        ]
      );
    });

    it("should work for JSON content #4 - JSON content with key-value pair strings", () => {
      verifyFilterFunctionForJson(
        {
          response:
            '{"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"eyJ0eXAiOiwN"}'
        },
        new Map(),
        [
          (recording: any): any =>
            recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
        ],
        {
          response:
            '{"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}'
        }
      );
    });

    it("should work for JSON content #5 - regex to be replaced is present as a key-value pair in the JSON content", () => {
      verifyFilterFunctionForJson(
        { access_token: "eyJ0eXA75E_Q" },
        new Map(),
        [
          (recording: any): any =>
            recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
        ],
        { access_token: "access_token" }
      );
    });

    it("should work for JSON content #6 - JSON.stringify-ed content with regex to be replaced is present as a key-value pair at the top level in the JSON content", () => {
      verifyFilterFunctionForJson(
        JSON.stringify({ access_token: "eyJ0eXA75E_Q" }),
        new Map(),
        [
          (recording: any): any =>
            recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
        ],
        JSON.stringify({ access_token: "access_token" })
      );
    });

    it("should work for JSON content #7 - JSON.stringify-ed content - regex to be replaced is present as a key-value pair somewhere inside the tree in the JSON content", () => {
      verifyFilterFunctionForJson(
        JSON.stringify({
          recording: [{ access_token: "eyJ0eXA75E_Q" }]
        }),
        new Map(),
        [
          (recording: any): any =>
            recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
        ],
        JSON.stringify({
          recording: [{ access_token: "access_token" }]
        })
      );
    });
  });
});
