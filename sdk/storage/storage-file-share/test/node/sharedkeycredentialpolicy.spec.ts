import { getBSU } from "../utils";
import { ShareClient } from "../../src";
import { Recorder, record } from "@azure/test-utils-recorder";

describe("StorageSharedKeyCredentialPolicy Node.js only", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

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

  it("StorageSharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = recorder.getUniqueName("dir empty");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = recorder.getUniqueName("file empty");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });

  it("StorageSharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = recorder.getUniqueName("Dir empty");
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = recorder.getUniqueName("Upper_another");
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });
});
