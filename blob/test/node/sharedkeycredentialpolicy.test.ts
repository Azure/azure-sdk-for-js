import { Aborter } from "../../lib/Aborter";
import { BlobURL } from "../../lib/BlobURL";
import { BlockBlobURL } from "../../lib/BlockBlobURL";
import { ContainerURL } from "../../lib/ContainerURL";
import { getBSU, getUniqueName } from "../utils/index";

describe("SharedKeyCredentialPolicy Node.js only", () => {
  const serviceURL = getBSU();
  const containerName: string = getUniqueName("1container-with-dash");
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  const blobName: string = getUniqueName("blob empty");
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

  it("SharedKeyCredentialPolicy should work with special container and blob names", async () => {
    await containerURL.create(Aborter.none);
    await blockBlobURL.upload(Aborter.none, "A", 1);
    await containerURL.delete(Aborter.none);
  });
});
