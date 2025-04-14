import { BlobServiceClient } from "@azure/storage-blob";
import { ManagedIdentityCredential } from "@azure/identity";
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function authenticateStorage(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    context.log("Http function was triggered.");
    //parse the request body
    await authToStorageHelper(context);

    return {
      // status: 200, /* Defaults to 200 */
      body: "Successfully authenticated with storage",
    };
  } catch (error: any) {
    context.log(error);
    return {
      status: 400,
      body: error,
    };
  }
}

app.http("authenticateStorage", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: authenticateStorage,
});

async function authToStorageHelper(context: InvocationContext): Promise<void> {
  // This will use the system managed identity
  const credential1 = new ManagedIdentityCredential();

  const clientId = process.env.IDENTITY_USER_DEFINED_CLIENT_ID!;
  const account1 = process.env.IDENTITY_STORAGE_NAME_1;
  const account2 = process.env.IDENTITY_STORAGE_NAME_2;

  const credential2 = new ManagedIdentityCredential({ clientId });
  const client1 = new BlobServiceClient(`https://${account1}.blob.core.windows.net`, credential1);
  const client2 = new BlobServiceClient(`https://${account2}.blob.core.windows.net`, credential2);
  context.log("Getting containers for storage account client: system managed identity");
  let iter = client1.listContainers();
  let i = 1;
  context.log("Client with system assigned identity");
  let containerItem = await iter.next();
  while (!containerItem.done) {
    context.log(`Container ${i++}: ${containerItem.value.name}`);
    containerItem = await iter.next();
  }

  context.log("Getting properties for storage account client: user assigned managed identity");
  iter = client2.listContainers();
  context.log("Client with user assigned identity");
  containerItem = await iter.next();
  while (!containerItem.done) {
    context.log(`Container ${i++}: ${containerItem.value.name}`);
    containerItem = await iter.next();
  }
}
