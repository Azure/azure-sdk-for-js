import { Aborter } from "../../src/Aborter";
import { DirectoryURL } from "../../src/DirectoryURL";
import { FileURL } from "../../src/FileURL";
import { ShareURL } from "../../src/ShareURL";
import { getBSU } from "../utils";
import { record } from "../utils/nock-recorder";

describe("SharedKeyCredentialPolicy Node.js only", function() {
  const testSuiteTitle = this.fullTitle();

  let recorder = record(testSuiteTitle, "describe");

  const serviceURL = getBSU();
  const shareName: string = recorder.getUniqueName("1share-with-dash");
  const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  recorder.stop();

  before(async () => {
    recorder = record(testSuiteTitle, "before");
    await shareURL.create(Aborter.none);
    recorder.stop();
  });

  beforeEach(async () => {
    recorder = record(testSuiteTitle, this.ctx.currentTest!.title);
  });

  afterEach(async () => {
    recorder.stop();
  });

  after(async () => {
    recorder = record(testSuiteTitle, "after");
    await shareURL.delete(Aborter.none);
    recorder.stop();
  });

  it("SharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = recorder.getUniqueName("dir empty");
    const dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    const fileName: string = recorder.getUniqueName("file empty");
    const fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
    await fileURL.create(Aborter.none, 0);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = recorder.getUniqueName("Dir empty");
    const dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    const fileName: string = recorder.getUniqueName("Upper_another");
    const fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
    await fileURL.create(Aborter.none, 0);
  });
});
