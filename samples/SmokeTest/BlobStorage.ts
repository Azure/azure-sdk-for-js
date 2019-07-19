import { SharedKeyCredential, BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class BlobStorage{

    private static ContainerClient : ContainerClient;
    private static blobName : string;

    static async Run(){
        console.log();
        console.log("------------------------");
        console.log("Storage - Blobs");
        console.log("------------------------");
        console.log("1) Upload Blob");
        console.log("2) Delete Blob (Clean up the resource)");
        console.log();

        const account = process.env["STORAGE_ACCOUNT_NAME"]     || "<YourStorageAccountNAME>";
        const accountKey = process.env["STORAGE_ACCOUNT_KEY"]   || "<YourStorageAccountKEY>";
        const containerName = "mycontainer";
        BlobStorage.blobName = "JSNewBlob";

        const credential = new SharedKeyCredential(account, accountKey);
        const serviceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`,credential);
        BlobStorage.ContainerClient = serviceClient.getContainerClient(containerName);

        //Ensure that the blob does not already existis
        try {
            await BlobStorage.CleanUp();
        }
        catch { }
        
        await BlobStorage.UploadBlob()
        await BlobStorage.CleanUp();
    }

    private static async UploadBlob(){
        //This will upload a new blob in an existing container.
        //If the container does not exist, it will create a new one.
        //If the blob already exists in the container, this will override it.
        console.log('Uploading blob...');
        const content = "This is the content for the sample blob";
        const blobName = "JSNewBlob";

        const blobClient = BlobStorage.ContainerClient.getBlobClient(blobName);
        const blockBlobClient = blobClient.getBlockBlobClient();

        await blockBlobClient.upload(content, content.length);
        console.log("\tdone");
    }

    private static async CleanUp(){
        console.log("Deleting container and blobs (Cleaning up the resource)...");
        const blobClient = BlobStorage.ContainerClient.getBlobClient(BlobStorage.blobName);
        await blobClient.delete();
        console.log("\tdone");
    }
}
