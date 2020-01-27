import {
  applyReplacementMap,
  ReplacementMap,
  ReplacementFunctions,
  applyReplacementFunctions,
  encodeRFC3986
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
});
