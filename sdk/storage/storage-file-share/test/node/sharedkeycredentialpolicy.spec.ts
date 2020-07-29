import { getBSU, recorderEnvSetup } from "../utils";
import { ShareClient } from "../../src";
import { Recorder, record } from "@azure/test-utils-recorder";

describe("StorageSharedKeyCredentialPolicy Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  before(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("1share-with-dash");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
    await recorder.stop();
  });

  after(async function() {
    recorder = record(this, recorderEnvSetup);
    await shareClient.delete();
    await recorder.stop();
  });

  beforeEach(function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
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
