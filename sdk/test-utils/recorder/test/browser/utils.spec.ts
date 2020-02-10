import { testHasChanged, generateTestRecordingFilePath, stripNewLines } from "../../src/utils";
import chai from "chai";
const { expect } = chai;

describe("Browser utils", () => {
  describe("testHasChanged", () => {
    it("Should not crash if the recorded file doesn't exist", function() {
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;

      (window as any).__json__ = {};

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      expect(testHasChanged(testSuiteTitle, testTitle, "test/myTest.spec.ts", newHash)).to.equal(
        true
      );
    });

    it("Should return true if the older hash doesn't exist", function() {
      const platform = "browsers";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      (window as any).__json__ = {
        ["recordings/" + filePath]: {}
      };

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      expect(testHasChanged(testSuiteTitle, testTitle, "test/myTest.spec.ts", newHash)).to.equal(
        true
      );
    });
  });

  describe("stripNewLines", () => {
    it("should remove new lines", () => {
      const targetString = "a\r\nb\nc\rd";
      expect(stripNewLines(targetString)).to.equal("abcd");
    });
  });
});
