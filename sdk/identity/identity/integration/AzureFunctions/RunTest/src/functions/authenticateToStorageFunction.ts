
import { BlobServiceClient } from "@azure/storage-blob";
import { ManagedIdentityCredential } from "@azure/identity";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function authenticateStorage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    context.log('Http function was triggered.');
    //parse the request body
    await authToStorageHelper(context);
   
    return {
      // status: 200, /* Defaults to 200 */
      body: "Successfully authenticated with storage",
    };
  } catch (error: any) {
    return {
      status: 400,
      body: error,
    };
  }
};

app.http('authenticateStorage', {
    methods: ['GET', 'POST'],
    authLevel: "anonymous",
    handler: authenticateStorage
});

async function authToStorageHelper(context: InvocationContext): Promise<void> {
  // This will use the system managed identity
  const credential1 = new ManagedIdentityCredential();

  const clientId = process.env.IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID!;
  const account1 = process.env.IDENTITY_STORAGE_NAME_1;
  const account2 = process.env.IDENTITY_STORAGE_NAME_2;

  const credential2 = new ManagedIdentityCredential({"clientId": clientId });
  const client1 = new BlobServiceClient(`https://${account1}.blob.core.windows.net`, credential1);
  const client2 = new BlobServiceClient(`https://${account2}.blob.core.windows.net`, credential2);
  context.log("Listing containers for storage account: system managed identity")
  await client1.listContainers();
  context.log("Listing containers for storage account: user assigned managed identity")
  await client2.listContainers();
}
