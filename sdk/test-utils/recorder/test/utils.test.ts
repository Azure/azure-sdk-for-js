import * as assert from "assert";
import { applyReplacementDictionary } from "../src/utils";

describe("utils", () => {
  describe("applyReplacementDictionary", () => {
    it("should filter URI encoded secrets", () => {
      const env: { [x: string]: string } = {
        SECRET: "(SECRET)"
      };

      const replaceableVariables: { [x: string]: string } = {
        SECRET: "HIDDEN_SECRET"
      };

      const recording = "azure.com/url/%28SECRET%29";
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(appliedDictionary, "azure.com/url/HIDDEN_SECRET");
    });

    it("should filter raw secrets", () => {
      const env: { [x: string]: string } = {
        ENDPOINT: "azure.com/url/"
      };

      const replaceableVariables: { [x: string]: string } = {
        ENDPOINT: "default.com/path/"
      };

      const recording = "azure.com/url/%28SECRET%29";
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(appliedDictionary, "default.com/path/%28SECRET%29");
    });

    it("should filter both, raw and URI encoded secrets", () => {
      const env: { [x: string]: string } = {
        SECRET: "(SECRET)",
        ENDPOINT: "azure.com"
      };

      const replaceableVariables: { [x: string]: string } = {
        SECRET: "HIDDEN_SECRET",
        ENDPOINT: "default.com"
      };

      const recording = "azure.com/url/%28SECRET%29";
      const appliedDictionary = applyReplacementDictionary(env, replaceableVariables, recording);

      assert.equal(appliedDictionary, "default.com/url/HIDDEN_SECRET");
    });
  });
});
