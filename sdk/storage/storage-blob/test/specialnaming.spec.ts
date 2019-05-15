import { Aborter } from "../src/Aborter";
import { BlockBlobClient } from "../src/BlockBlobClient";
import { ContainerClient } from "../src/ContainerClient";
import { getBSU, getUniqueName } from "./utils/index";
import * as assert from "assert";
import { appendToURLPath } from "../src/utils/utils.common";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("Special Naming Tests", () => {
  const serviceClient = getBSU();
  const containerName: string = getUniqueName("1container-with-dash");
  const containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);

  before(async () => {
    await containerClient.create(Aborter.none);
  });

  after(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("Should work with special container and blob names with spaces", async () => {
    const blobName: string = getUniqueName("blob empty");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with spaces in URL string", async () => {
    const blobName: string = getUniqueName("blob empty");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with /", async () => {
    const blobName: string = getUniqueName("////blob/empty /another");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with / in URL string", async () => {
    const blobName: string = getUniqueName("////blob/empty /another");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names uppercase", async () => {
    const blobName: string = getUniqueName("////Upper/blob/empty /another");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names uppercase in URL string", async () => {
    const blobName: string = getUniqueName("////Upper/blob/empty /another");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob names Chinese characters", async () => {
    const blobName: string = getUniqueName("////Upper/blob/empty /another 汉字");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob names Chinese characters in URL string", async () => {
    const blobName: string = getUniqueName("////Upper/blob/empty /another 汉字");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name characters", async () => {
    const blobName: string = getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
      prefix: blobName.replace(/\\/g, "/")
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name characters in URL string", async () => {
    const blobName: string = getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blockBlobClient = new BlockBlobClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XxxClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(containerClient.url, blobName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
      prefix: blobName.replace(/\\/g, "/")
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian URI encoded", async () => {
    const blobName: string = getUniqueName("ру́сский язы́к");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobNameEncoded);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobNameEncoded
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian", async () => {
    const blobName: string = getUniqueName("ру́сский язы́к");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian in URL string", async () => {
    const blobName: string = getUniqueName("ру́сский язы́к");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic URI encoded", async () => {
    const blobName: string = getUniqueName("عربي/عربى");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobNameEncoded);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobNameEncoded
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic", async () => {
    const blobName: string = getUniqueName("عربي/عربى");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic in URL string", async () => {
    const blobName: string = getUniqueName("عربي/عربى");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese URI encoded", async () => {
    const blobName: string = getUniqueName("にっぽんご/にほんご");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobNameEncoded);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobNameEncoded
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese", async () => {
    const blobName: string = getUniqueName("にっぽんご/にほんご");
    const blockBlobClient = BlockBlobClient.fromContainerClient(containerClient, blobName);

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese in URL string", async () => {
    const blobName: string = getUniqueName("にっぽんご/にほんご");
    const blockBlobClient = new BlockBlobClient(
      appendToURLPath(containerClient.url, blobName),
      containerClient.pipeline
    );

    await blockBlobClient.upload(Aborter.none, "A", 1);
    await blockBlobClient.getProperties(Aborter.none);
    const response = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      prefix: blobName
    });
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });
});
