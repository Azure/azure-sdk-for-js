import { getBSU } from "../utils";
import { record } from "../utils/recorder";
import { ShareClient } from "../../src";

describe("SharedKeyCredentialPolicy Node.js only", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: any;

  before(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("1share-with-dash");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
    recorder.stop();
  });

  after(async function() {
    recorder = record(this);
    await shareClient.delete();
    recorder.stop();
  });

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("SharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = recorder.getUniqueName("dir empty");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = recorder.getUniqueName("file empty");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = recorder.getUniqueName("Dir empty");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = recorder.getUniqueName("Upper_another");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });
});
