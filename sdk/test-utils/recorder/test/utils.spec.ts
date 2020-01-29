import {
  applyReplacementMap,
  ReplacementMap,
  applyReplacementFunctions,
  encodeRFC3986,
  filterSecretsFromStrings,
  filterSecretsFromJSONContent,
  env
} from "../src/utils";
import chai from "chai";
import { setEnvironmentVariables } from "../src/baseRecorder";
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

      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("SECRET", "HIDDEN_SECRET");

      const recording = "azure.com/url/%28SECRET%29";
      const appliedMap = applyReplacementMap(env, replacementMap, recording);

      expect(appliedMap).to.equal("azure.com/url/HIDDEN_SECRET");
    });

    it("should filter raw secrets", () => {
      const env: NodeJS.ProcessEnv = {
        ENDPOINT: "azure.com/url/"
      };

      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("ENDPOINT", "default.com/path/");

      const recording = "azure.com/url/%28SECRET%29";
      const appliedMap = applyReplacementMap(env, replacementMap, recording);

      expect(appliedMap).to.equal("default.com/path/%28SECRET%29");
    });

    it("should filter both, raw and URI encoded secrets", () => {
      const env: NodeJS.ProcessEnv = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com/url/"
      };

      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("SECRET", "HIDDEN_SECRET");
      replacementMap.set("ENDPOINT", "default.com/path/");

      const recording = "azure.com/url/%28SECRET%29";
      const appliedMap = applyReplacementMap(env, replacementMap, recording);

      expect(appliedMap).to.equal("default.com/path/HIDDEN_SECRET");
    });

    it("should work with recordings of several lines", () => {
      const env: NodeJS.ProcessEnv = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com/url/"
      };

      const replacementMap: ReplacementMap = new Map();
      replacementMap.set("SECRET", "HIDDEN_SECRET");
      replacementMap.set("ENDPOINT", "default.com/path/");

      const recording = `
All the combinations:
azure.com/url/%28SECRET%29
ultramarine.com/url/%28SECRET%29
azure.com/url/PUBLIC
ultramarine.com/url/PUBLIC
`;
      const appliedMap = applyReplacementMap(env, replacementMap, recording);

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
      const replacements: Array<(content: string) => string> = [
        (source: string): string => {
          return source.replace(/banana/i, "Bonobo's");
        }
      ];
      const recording = "Banana Split";
      const appliedFunctions = applyReplacementFunctions(replacements, recording);
      expect(appliedFunctions).to.equal("Bonobo's Split");
    });

    it("should apply several replacement functions", () => {
      const replacements: Array<(content: string) => string> = [
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
      const replacements = [
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
    it("should work for strings", () => {
      env.SECRET = "SECRET";
      const replaceableVariables = { SECRET: "FAKE_IT" };

      const recording = "HERE_IS_THE_FLAG-SECRET";
      const updatedRecording = filterSecretsFromStrings(recording, replaceableVariables, []);
      expect(updatedRecording).to.equal("HERE_IS_THE_FLAG-FAKE_IT");
    });

    it("should work for JSON content", () => {
      env.ACCOUNT_NAME = "azureaccount";
      const replaceableVariables = { ACCOUNT_NAME: "fakestorageaccount" };

      const recording = {
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
      };
      const updatedRecording = filterSecretsFromJSONContent(recording, replaceableVariables, []);
      expect(updatedRecording).to.deep.equal({
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
      });
    });
  });

  describe("set environment variables", () => {
    it("should not fail if the dictionary is empty", () => {
      env.SECRET = "SECRET";
      const replaceableVariables = {};

      setEnvironmentVariables(replaceableVariables);
    });

    it("should succeed if the dictionary has one key-value pair", () => {
      const replaceableVariables = { SECRET: "FAKE_IT" };

      setEnvironmentVariables(replaceableVariables);
      expect(env.SECRET).to.equal("FAKE_IT");
    });

    it("should succeed if the dictionary has multiple key-value pairs", () => {
      const replaceableVariables = { ACCOUNT_NAME: "fake_account_name", SECRET: "FAKE IT" };

      setEnvironmentVariables(replaceableVariables);
      expect(env.SECRET).to.equal("FAKE IT");
      expect(env.ACCOUNT_NAME).to.equal("fake_account_name");
    });
  });
});
