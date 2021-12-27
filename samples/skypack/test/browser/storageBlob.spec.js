import { BlobClient } from "https://cdn.skypack.dev/@azure/storage-blob";
import { assert } from "https://cdn.skypack.dev/chai";

describe("Storage Blob skypack tests", function () {
  it("retrieves properties of a blob", async function () {
    // You will need to replace the following value with a sas url to a Azure Storage blob.
    // You also need to set up CORS rules (https://github.com/Azure/azure-sdk-for-js/blob/9556faa7c6e6b7748ba9e9e630d0cc98713c33a4/sdk/storage/storage-blob/README.md#cors)
    const blobSasUrl = "<SAS url to a blob>";
    const client = new BlobClient(blobSasUrl);
    const properties = await client.getProperties();

    assert.ok(properties, "Expecting valid blob properties");
    assert.ok(properties.createdOn, "Expecting valid blob createdOn property");
    assert.ok(properties.accessTier, "Expecting valid blob accessTier property");
  });
}).timeout(30000);
