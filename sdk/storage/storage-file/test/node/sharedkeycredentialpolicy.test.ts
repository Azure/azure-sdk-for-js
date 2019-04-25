import { Aborter } from "../../src/Aborter";
import { DirectoryURL } from "../../src/DirectoryURL";
import { FileURL } from "../../src/FileURL";
import { ShareURL } from "../../src/ShareURL";
import { getBSU } from "../utils";
import { record } from "../utils/nock-recorder";

describe("SharedKeyCredentialPolicy Node.js only", function() {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  const testSuiteTitle = this.fullTitle();

  let recorder: any;

  before(async () => {
    recorder = record(testSuiteTitle, "before");
    shareName = recorder.getUniqueName("1share-with-dash");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
    recorder.stop();
  });

  after(async () => {
    recorder = record(testSuiteTitle, "after");
    await shareURL.delete(Aborter.none);
    recorder.stop();
  });

  beforeEach(async () => {
    recorder = record(testSuiteTitle, this.ctx.currentTest!.title);
  });

  afterEach(async () => {
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
