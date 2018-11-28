import { Aborter } from "../../lib/Aborter";
import { BlockBlobURL } from "../../lib/BlockBlobURL";
import { ContainerURL } from "../../lib/ContainerURL";
import { getBSU, getUniqueName } from "../utils/index";

describe("SharedKeyCredentialPolicy Node.js only", () => {
  const serviceURL = getBSU();
  const containerName: string = getUniqueName("1container-with-dash");
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  before(async () => {
    await containerURL.create(Aborter.none);
  });

  after(async () => {
    await containerURL.delete(Aborter.none);
  });

  it("SharedKeyCredentialPolicy should work with special container and blob names with spaces", async () => {
    const blobName: string = getUniqueName("blob empty");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
  });

  it("SharedKeyCredentialPolicy should work with special container and blob names with /", async () => {
    const blobName: string = getUniqueName("////blob/empty /another");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
  });

  it("SharedKeyCredentialPolicy should work with special container and blob names uppercase", async () => {
    const blobName: string = getUniqueName("////Upper/blob/empty /another");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
  });
});
