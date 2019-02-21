import { Aborter } from "../../lib/Aborter";
import { DirectoryURL } from "../../lib/DirectoryURL";
import { FileURL } from "../../lib/FileURL";
import { ShareURL } from "../../lib/ShareURL";
import { getBSU, getUniqueName } from "../utils";

describe("SharedKeyCredentialPolicy Node.js only", () => {
  const serviceURL = getBSU();
  const shareName: string = getUniqueName("1share-with-dash");
  const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  before(async () => {
    await shareURL.create(Aborter.none);
  });

  after(async () => {
    await shareURL.delete(Aborter.none);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = getUniqueName("dir empty");
    const dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    const fileName: string = getUniqueName("file empty");
    const fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
    await fileURL.create(Aborter.none, 0);
  });

  it("SharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = getUniqueName("Dir empty");
    const dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);

    const fileName: string = getUniqueName("Upper_another");
    const fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
    await fileURL.create(Aborter.none, 0);
  });
});
