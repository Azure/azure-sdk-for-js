import { Aborter } from "../lib/Aborter";
import { FileURL } from "../lib/FileURL";
import { ShareURL } from "../lib/ShareURL";
import { getBSU, getUniqueName } from "./utils/index";
import * as assert from "assert";
import { appendToURLPath } from "../lib/utils/utils.common";
import { DirectoryURL } from "../lib/DirectoryURL";

describe("Special Naming Tests", () => {
  const serviceURL = getBSU();
  const shareName: string = getUniqueName("1share-with-dash");
  const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  const directoryName = getUniqueName("dir");
  const directoryURL = DirectoryURL.fromShareURL(shareURL, directoryName);

  before(async () => {
    await shareURL.create(Aborter.none);
    await directoryURL.create(Aborter.none);
  });

  after(async () => {
    await shareURL.delete(Aborter.none);
  });

  it("Should work with special container and file names with spaces", async () => {
    const fileName: string = getUniqueName("file empty");
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names with spaces in URL string", async () => {
    const fileName: string = getUniqueName("file empty");
    const fileURL = new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase", async () => {
    const fileName: string = getUniqueName("Upper file empty another");
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase in URL string", async () => {
    const fileName: string = getUniqueName("Upper file empty another");
    const fileURL = new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters", async () => {
    const fileName: string = getUniqueName("Upper file empty another 汉字");
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters in URL string", async () => {
    const fileName: string = getUniqueName("Upper file empty another 汉字");
    const fileURL = new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters", async () => {
    const fileName: string = getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: fileName.replace(/\\/g, "/")
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters in URL string", async () => {
    const fileName: string = getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const fileURL = new FileURL(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXURL object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(
        directoryURL.url,
        fileName.replace(/%/g, "%25").replace(/\?/g, "%3F")
      ),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: fileName.replace(/\\/g, "/")
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special directory name characters", async () => {
    const directoryName: string = getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const specialDirectoryURL = DirectoryURL.fromShareURL(
      shareURL,
      directoryName
    );
    const rootDirectoryURL = DirectoryURL.fromShareURL(shareURL, "");

    await specialDirectoryURL.create(Aborter.none);
    await specialDirectoryURL.getProperties(Aborter.none);
    const response = await rootDirectoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: directoryName.replace(/\\/g, "/")
      }
    );
    assert.notDeepEqual(response.segment.directoryItems.length, 0);
  });

  it("Should work with special directory name characters in URL string", async () => {
    const directoryName: string = getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const specialDirectoryURL = new DirectoryURL(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXURL object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(
        shareURL.url,
        directoryName.replace(/%/g, "%25").replace(/\?/g, "%3F")
      ),
      shareURL.pipeline
    );

    await specialDirectoryURL.create(Aborter.none);
    await specialDirectoryURL.getProperties(Aborter.none);

    const rootDirectoryURL = DirectoryURL.fromShareURL(shareURL, "");
    const response = await rootDirectoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: directoryName.replace(/\\/g, "/")
      }
    );
    assert.notDeepEqual(response.segment.directoryItems.length, 0);
  });

  it("Should work with special file name Russian URI encoded", async () => {
    const fileName: string = getUniqueName("ру́сский язы́к");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileURL = FileURL.fromDirectoryURL(directoryURL, blobNameEncoded);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobNameEncoded
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Russian", async () => {
    const fileName: string = getUniqueName("ру́сский язы́к");
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Russian in URL string", async () => {
    const fileName: string = getUniqueName("ру́сский язы́к");
    const fileURL = new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic URI encoded", async () => {
    const fileName: string = getUniqueName("عربي/عربى");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileURL = FileURL.fromDirectoryURL(directoryURL, blobNameEncoded);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobNameEncoded
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic", async () => {
    const fileName: string = getUniqueName("عربيعربى");
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic in URL string", async () => {
    const fileName: string = getUniqueName("عربيعربى");
    const fileURL = new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese URI encoded", async () => {
    const fileName: string = getUniqueName("にっぽんごにほんご");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileURL = FileURL.fromDirectoryURL(directoryURL, blobNameEncoded);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: blobNameEncoded
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese", async () => {
    const fileName: string = getUniqueName("にっぽんごにほんご");
    const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese in URL string", async () => {
    const fileName: string = getUniqueName("にっぽんごにほんご");
    const fileURL = new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );

    await fileURL.create(Aborter.none, 10);
    await fileURL.getProperties(Aborter.none);
    const response = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      undefined,
      {
        prefix: fileName
      }
    );
    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });
});
