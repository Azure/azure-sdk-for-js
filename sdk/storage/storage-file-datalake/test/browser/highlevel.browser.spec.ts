import { record } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";
import { DataLakeFileClient, DataLakeFileSystemClient } from "../../src";
import { getDataLakeServiceClient, recorderEnvSetup } from "../utils";
import { blobToString, bodyToString, getBrowserFile } from "../utils/index.browser";
import { MB } from "../../src/utils/constants";

dotenv.config({ path: "../.env" });

describe.only("Highlevel browser only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let tempFileLarge: File;
  const tempFileLargeLength: number = 257 * MB - 1;
  let tempFileSmall: File;
  const tempFileSmallLength: number = 1 * MB - 1;
  let recorder: any;

  beforeEach(async function () {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async function () {
    await fileSystemClient.delete();
    recorder.stop();
  });

  before(async function () {
    recorder = record(this, recorderEnvSetup);
    tempFileLarge = getBrowserFile(recorder.getUniqueName("browserfilesmall"), tempFileLargeLength);
    tempFileSmall = getBrowserFile(recorder.getUniqueName("browserfilelarge"), tempFileSmallLength);
    recorder.stop();

    console.log(tempFileLarge.size);
  });

  after(async () => { });

  it("upload should succeed with a single upload", async () => {
    recorder.skip("browser", "Temp file - recorder doesn't support saving the file");
    await fileClient.upload(tempFileSmall);

    const readResponse = await fileClient.read();
    const readString = await bodyToString(readResponse);
    const uploadedString = await blobToString(tempFileSmall);
    assert.equal(uploadedString, readString);
  });
});
