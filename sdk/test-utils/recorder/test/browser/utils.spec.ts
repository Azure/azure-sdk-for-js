import {
  testHasChanged,
  generateTestRecordingFilePath,
  stripNewLines,
  windowLens
} from "../../src/utils";

import { expect } from "chai";

describe("Browser utils", () => {
  describe("windowLens", () => {
    it("should set and set at one level of depth", () => {
      windowLens.set(["A"], "A");
      expect(windowLens.get(["A"])).to.equal("A");
      // Cleaning what we just did.
      windowLens.set(["A"], undefined);
    });

    it("should set and set at more than one level of depth", () => {
      windowLens.set(["A", "B", "C"], "ABC");
      expect(windowLens.get(["A", "B", "C"])).to.equal("ABC");
      // Cleaning what we just did.
      windowLens.set(["A", "B", "C"], undefined);
      windowLens.set(["A", "B"], undefined);
      windowLens.set(["A"], undefined);
    });
  });

  describe("testHasChanged", () => {
    it("Should not crash if the recorded file doesn't exist", function() {
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;

      windowLens.set(["__json__"], {});

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

      windowLens.set(["__json__"], {
        ["recordings/" + filePath]: {}
      });

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
