import chai from "chai";
import fs from "fs";
import path from "path";

// Since `npm run build-samples` now update the typescript samples to make them debuggable,
// we now have the below tests to ensure such updates dont get checked in.
describe("Ensure typescript samples use published package", function(): void {
  const regex = new RegExp('from "@azure/service-bus"');

  function testSamples(folder: string): void {
    const files = fs.readdirSync(folder);
    const failingFiles = files.filter((file) => {
      const fileContents = fs.readFileSync(path.join(folder, file), { encoding: "utf-8" });
      return !regex.test(fileContents);
    });
    if (failingFiles.length) {
      chai.assert.fail(
        `${failingFiles.length} files (${failingFiles}) dont import @azure/service-bus`
      );
    }
  }

  it("Ensure getStarted samples use published package", () => {
    const folder = path.join(__dirname, "../samples/typescript/gettingStarted");
    testSamples(folder);
  });

  it("Ensure advancedFeatures samples use published package", () => {
    const folder = path.join(__dirname, "../samples/typescript/advancedFeatures");
    testSamples(folder);
  });
});
