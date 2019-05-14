import { Aborter } from "../../src/Aborter";
import { DirectoryClient } from "../../src/DirectoryClient";
import { FileClient } from "../../src/FileClient";
import { ShareClient } from "../../src/ShareClient";
import { getBSU, getUniqueName } from "../utils";

describe("SharedKeyCredentialPolicy Node.js only", () => {
  const serviceClient = getBSU();
  const shareName: string = getUniqueName("1share-with-dash");
  const shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);

  before(async () => {
    await shareClient.create(Aborter.none);
  });

  after(async () => {
    await shareClient.delete(Aborter.none);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = getUniqueName("dir empty");
    const dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
    await dirClient.create(Aborter.none);

    const fileName: string = getUniqueName("file empty");
    const fileClient = FileClient.fromDirectoryClient(dirClient, fileName);
    await fileClient.create(Aborter.none, 0);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = getUniqueName("Dir empty");
    const dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
    await dirClient.create(Aborter.none);

    const fileName: string = getUniqueName("Upper_another");
    const fileClient = FileClient.fromDirectoryClient(dirClient, fileName);
    await fileClient.create(Aborter.none, 0);
  });
});
