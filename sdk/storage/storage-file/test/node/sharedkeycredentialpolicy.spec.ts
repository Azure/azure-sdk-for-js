import { getBSU, getUniqueName } from "../utils";

describe("SharedKeyCredentialPolicy Node.js only", () => {
  const serviceClient = getBSU();
  const shareName: string = getUniqueName("1share-with-dash");
  const shareClient = serviceClient.createShareClient(shareName);

  before(async () => {
    await shareClient.create();
  });

  after(async () => {
    await shareClient.delete();
  });

  it("SharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = getUniqueName("dir empty");
    const dirClient = shareClient.createDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = getUniqueName("file empty");
    const fileClient = dirClient.createFileClient(fileName);
    await fileClient.create(0);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = getUniqueName("Dir empty");
    const dirClient = shareClient.createDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = getUniqueName("Upper_another");
    const fileClient = dirClient.createFileClient(fileName);
    await fileClient.create(0);
  });
});
