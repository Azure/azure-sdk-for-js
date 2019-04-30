import { Aborter } from "../src/Aborter";
import { BlockBlobURL } from "../src/BlockBlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { getBSU } from "./utils/index";
import * as assert from "assert";
import { appendToURLPath } from "../src/utils/utils.common";
import { record } from "./utils/nock-recorder";
import * as dotenv from "dotenv";
dotenv.config({path:"../.env"});

describe("Special Naming Tests", function() {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  const testSuiteTitle = this.fullTitle();

  let recorder: any;

  before(async () => {
    recorder = record(testSuiteTitle, "before");
    containerName = recorder.getUniqueName("1container-with-dash");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    recorder.stop();
  });

  after(async () => {
    recorder = record(testSuiteTitle, "after");
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  beforeEach(async () => {
    recorder = record(testSuiteTitle, this.ctx.currentTest!.title);
  });

  afterEach(async () => {
    recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async () => {
    const blobName: string = recorder.getUniqueName("blob empty");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with spaces in URL string", async () => {
    const blobName: string = recorder.getUniqueName("blob empty");
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with /", async () => {
    const blobName: string = recorder.getUniqueName("////blob/empty /another");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names with / in URL string", async () => {
    const blobName: string = recorder.getUniqueName("////blob/empty /another");
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names uppercase", async () => {
    const blobName: string = recorder.getUniqueName("////Upper/blob/empty /another");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special container and blob names uppercase in URL string", async () => {
    const blobName: string = recorder.getUniqueName("////Upper/blob/empty /another");
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob names Chinese characters", async () => {
    const blobName: string = recorder.getUniqueName(
      "////Upper/blob/empty /another 汉字"
    );
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob names Chinese characters in URL string", async () => {
    const blobName: string = recorder.getUniqueName(
      "////Upper/blob/empty /another 汉字"
    );
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name characters", async () => {
    const blobName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
        prefix: blobName.replace(/\\/g, "/")
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name characters in URL string", async () => {
    const blobName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'"
    );
    const blockBlobURL = new BlockBlobURL(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXURL object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(
        containerURL.url,
        blobName.replace(/%/g, "%25").replace(/\?/g, "%3F")
      ),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
        prefix: blobName.replace(/\\/g, "/")
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian URI encoded", async () => {
    const blobName: string = recorder.getUniqueName("ру́сский язы́к");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      blobNameEncoded
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobNameEncoded
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian", async () => {
    const blobName: string = recorder.getUniqueName("ру́сский язы́к");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Russian in URL string", async () => {
    const blobName: string = recorder.getUniqueName("ру́сский язы́к");
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic URI encoded", async () => {
    const blobName: string = recorder.getUniqueName("عربي/عربى");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      blobNameEncoded
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobNameEncoded
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic", async () => {
    const blobName: string = recorder.getUniqueName("عربي/عربى");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Arabic in URL string", async () => {
    const blobName: string = recorder.getUniqueName("عربي/عربى");
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese URI encoded", async () => {
    const blobName: string = recorder.getUniqueName("にっぽんご/にほんご");
    const blobNameEncoded: string = encodeURIComponent(blobName);
    const blockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      blobNameEncoded
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobNameEncoded
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese", async () => {
    const blobName: string = recorder.getUniqueName("にっぽんご/にほんご");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });

  it("Should work with special blob name Japanese in URL string", async () => {
    const blobName: string = recorder.getUniqueName("にっぽんご/にほんご");
    const blockBlobURL = new BlockBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );

    await blockBlobURL.upload(Aborter.none, "A", 1);
    await blockBlobURL.getProperties(Aborter.none);
    const response = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobName
      }
    );
    assert.notDeepEqual(response.segment.blobItems.length, 0);
  });
});
