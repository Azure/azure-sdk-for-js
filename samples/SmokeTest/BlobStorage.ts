import { SharedKeyCredential, BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class BlobStorage{
    service = "Storage - Blobs";
    description = 
                "1) Upload Blob\n"+
                "2) Delete Blob (Clean up the resource)\n";

    private containerName : ContainerClient;
    private blobName : string;

    constructor(){
        //Setup the credentials and names for the container and blob.
        const account = process.env["STORAGE_ACCOUNT_NAME"];
        const accountKey = process.env["STORAGE_ACCOUNT_KEY"];
        const containerName = "mycontainer";
        this.blobName = "JSNewBlob";

        const credential = new SharedKeyCredential(account, accountKey);
        const serviceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`,credential);
        this.containerName = serviceClient.getContainerClient(containerName);

    }

    async Run(){
        await this.UploadBlob();
        await this.CleanUp();
    }

    private async UploadBlob(){
        //This will upload a new blob in an existing container.
        //If the container does not exist, it will create a new one.
        //If the blob already exists in the container, this will override it.
        console.log('Uploading blob...');
        const content = "This is the content for the sample blob";
        const blobName = "JSNewBlob";

        const blobClient = this.containerName.getBlobClient(blobName);
        const blockBlobClient = blobClient.getBlockBlobClient();

        const response = await blockBlobClient.upload(content, content.length);
        console.log("\tdone");
    }

    private async CleanUp(){
        console.log("Deleting container and blobs (Cleaning up the resource)...");
        const blobClient = this.containerName.getBlobClient(this.blobName);
        blobClient.delete();
        console.log("\tdone");
    }
}
