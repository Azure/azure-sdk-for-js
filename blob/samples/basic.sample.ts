import { Aborter } from "../lib/Aborter";
import { BlobURL } from "../lib/BlobURL";
import { BlockBlobURL } from "../lib/BlockBlobURL";
import { ContainerURL } from "../lib/ContainerURL";
import { SharedKeyCredential } from "../lib/credentials/SharedKeyCredential";
import {
  ServiceListContainersSegmentResponse,
  ServiceURL
} from "../lib/ServiceURL";
import { StorageURL } from "../lib/StorageURL";

// tslint:disable:no-console
async function executeSample() {
  const account = "account";
  const accountKey = "accountkey";

  const pipeline = StorageURL.newPipeline(
    new SharedKeyCredential(account, accountKey)
  );

  // List containers
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  let marker;
  do {
    const listContainersResponse: ServiceListContainersSegmentResponse = await serviceURL.listContainersSegment(
      Aborter.None,
      marker
    );

    marker = listContainersResponse.marker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  const createContainerResponse = await containerURL.create(Aborter.None);
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const uploadBlobResponse = await blockBlobURL.upload(
    Aborter.None,
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // Get blob content
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobURL.download(Aborter.None, 0);
  console.log(
    "Downloaded blob content",
    downloadBlockBlobResponse
      .readableStreamBody!.read(content.length)
      .toString()
  );

  // Delete container
  await containerURL.delete(Aborter.None);

  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
executeSample()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });
