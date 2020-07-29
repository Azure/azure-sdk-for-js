import {
  generateTestRecordingFilePath,
  nodeRequireRecordingIfExists,
  isBrowser,
  findRecordingsFolderPath,
  testHasChanged
} from "../../src/utils";
import chai from "chai";
const { expect } = chai;

describe("NodeJS utils", () => {
  describe("nodeRequireRecordingIfExists", () => {
    it("should be able to load the contents of a recording file if the file exists", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        "recordings/recording.json": "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      // If rollup bundle is used to execute the tests - `dist-test/index.node.js`, `recordings` folder is present one level above.
      mockRequire("../recordings/recording.json", {
        property: "value"
      });

      // If the dist-esm files are used to execute the tests - `dist-esm/test/node/utils.spec.js`, `recordings` folder is present three levels above.
      mockRequire("../../../recordings/recording.json", {
        property: "value"
      });

      expect(nodeRequireRecordingIfExists("recording.json", testAbsolutePath).property).to.equal(
        "value"
      );

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should throw if the file at a given recording path doesn't exist", function() {
      if (isBrowser()) {
        this.skip();
        return;
      }

      // Require shouldn't be mocked in this test since we should be preventing require from being reached.

      const mockFs = require("mock-fs");

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        recordings: {},
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      let error: Error | undefined;

      try {
        nodeRequireRecordingIfExists("recording.json", testAbsolutePath);
      } catch (e) {
        error = e;
      }

      expect(error!.message).to.equal(
        `The recording recording.json was not found in ${findRecordingsFolderPath(
          "recording.json"
        )}`
      );

      mockFs.restore();
    });
  });

  describe("testHasChanged", () => {
    it("should not crash if the recorded file doesn't exist", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        recordings: {},
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(true);

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should return true if the older hash doesn't exist", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const platform = "node";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        [`recordings/${filePath}`]: "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      mockRequire(`../recordings/${filePath}`, {});

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(true);

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should return false if the older hash is the same as the new hash", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const platform = "node";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        [`recordings/${filePath}`]: "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      // If rollup bundle is used to execute the tests - `dist-test/index.node.js`, `recordings` folder is present one level above.
      mockRequire(`../recordings/${filePath}`, {
        // We won't be testing whether MD5 works or not.
        hash: "same old hash"
      });

      // If the dist-esm files are used to execute the tests - `dist-esm/test/node/utils.spec.js`, `recordings` folder is present three levels above.
      mockRequire(`../../../recordings/${filePath}`, {
        // We won't be testing whether MD5 works or not.
        hash: "same old hash"
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "same old hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(false);

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should return true if the older hash is different than the new hash", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const platform = "node";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        [`recordings/${filePath}`]: "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      mockRequire(`../recordings/${filePath}`, {
        // We won't be testing whether MD5 works or not.
        hash: "old hash"
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(true);

      mockFs.restore();
      mockRequire.stopAll();
    });
  });
});
