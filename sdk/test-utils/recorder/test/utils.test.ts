import * as assert from "assert";
import {
  applyReplacementDictionary,
  ReplacementDictionary,
  ReplacementFunctions,
  applyReplacementFunctions,
  encodeRFC3986
} from "../src/utils";

describe("utils", () => {
  describe("encodeRFC3986", () => {
    // From https://tools.ietf.org/html/rfc3986
    // Also useful: https://en.wikipedia.org/wiki/Percent-encoding

    it("Should encode the reserved characters", () => {
      const genDelims = [":", "/", "?", "#", "[", "]", "@"];
      const encodedGenDelims = genDelims.map(encodeRFC3986);
      assert.deepEqual(encodedGenDelims, ["%3A", "%2F", "%3F", "%23", "%5B", "%5D", "%40"]);

      const subDelims = ["!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "="];
      const encodedSubDelims = subDelims.map(encodeRFC3986);
      assert.deepEqual(encodedSubDelims, [
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
      assert.deepEqual(result, unreservedCharacters);
    });
  });

  describe("applyReplacementDictionary", () => {
    it("should filter URI encoded secrets", () => {
      const env: ReplacementDictionary = {
        SECRET: "(SECRET)"
      };

      const replaceableVariables: ReplacementDictionary = {
        SECRET: "HIDDEN_SECRET"
      };

      const recording = "azure.com/url/%28SECRET%29";
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(appliedDictionary, "azure.com/url/HIDDEN_SECRET");
    });

    it("should filter raw secrets", () => {
      const env: ReplacementDictionary = {
        ENDPOINT: "azure.com/url/"
      };

      const replaceableVariables: ReplacementDictionary = {
        ENDPOINT: "default.com/path/"
      };

      const recording = "azure.com/url/%28SECRET%29";
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(appliedDictionary, "default.com/path/%28SECRET%29");
    });

    it("should filter both, raw and URI encoded secrets", () => {
      const env: ReplacementDictionary = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com"
      };

      const replaceableVariables: ReplacementDictionary = {
        SECRET: "HIDDEN_SECRET",
        ENDPOINT: "default.com"
      };

      const recording = "azure.com/url/%28SECRET%29";
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(appliedDictionary, "default.com/url/HIDDEN_SECRET");
    });

    it("should work with recordings of several lines", () => {
      const env: ReplacementDictionary = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com"
      };

      const replaceableVariables: ReplacementDictionary = {
        SECRET: "HIDDEN_SECRET",
        ENDPOINT: "default.com"
      };

      const recording = `
All the combinations:
azure.com/url/%28SECRET%29
ultramarine.com/url/%28SECRET%29
azure.com/url/PUBLIC
ultramarine.com/url/PUBLIC
`;
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(
        appliedDictionary,
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

  describe("applyReplacementFunctions", () => {
    it("should apply one replacement function", () => {
      const replacements: ReplacementFunctions = [
        (source: string): string => {
          return source.replace(/banana/i, "Bonobo's");
        }
      ];
      const recording = "Banana Split";
      const appliedFunctions = applyReplacementFunctions(replacements, recording);
      assert.equal(appliedFunctions, "Bonobo's Split");
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
      assert.equal(appliedFunctions, "Bonobo's Flex");
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
      assert.equal(
        appliedFunctions,
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
});
