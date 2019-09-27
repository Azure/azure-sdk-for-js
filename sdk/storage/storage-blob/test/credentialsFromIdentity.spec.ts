import * as assert from "assert";
import * as dotenv from "dotenv";
import { env, getUniqueName, isBrowser } from "./utils";
import { BlobServiceClient } from "../src";
import {
  TokenCredential,
  ClientSecretCredential,
  ClientCertificateCredential,
  DeviceCodeCredential,
  UsernamePasswordCredential,
  ManagedIdentityCredential
} from "@azure/identity";
dotenv.config({ path: "../.env" });

describe("Test Credentials from @azure/identity", () => {
  async function verifyCredential(credential: TokenCredential) {
    const blobServiceClient = new BlobServiceClient(
      `https://${env.ACCOUNT_NAME}.blob.core.windows.net/`,
      credential
    );

    // const result = await newClient.getProperties();

    // assert.ok(typeof result.requestId);
    // assert.ok(result.requestId!.length > 0);
    // assert.ok(typeof result.version);
    // assert.ok(result.version!.length > 0);

    const access = "container";
    const metadata = { key: "value" };
    const { containerClient } = await blobServiceClient.createContainer(
      getUniqueName("container"),
      {
        access,
        metadata
      }
    );
    const result = await containerClient.getProperties();
    assert.deepEqual(result.blobPublicAccess, access);
    assert.deepEqual(result.metadata, metadata);
  }

  beforeEach(async function() {
    if (env.TEST_MODE === "record" || env.TEST_MODE === "playback") {
      // Not exectuing these tests in the record/playback modes. Is it required ?
      this.skip();
    }
  });

  // Works with node and failed in the browser with the following error
  //    Error: Failed to send request to https://login.microsoftonline.com/<my-tenant-id>/oauth2/v2.0/token
  it("ClientSecretCredential should be able to instantiate BlobServiceClient", async function() {
    if (isBrowser()) this.skip();
    await verifyCredential(
      new ClientSecretCredential(
        env.AZURE_TENANT_ID || "",
        env.AZURE_CLIENT_ID || "",
        env.AZURE_CLIENT_SECRET || ""
      )
    );
  });

  // Cannot test in the CI. Don't know how to test locally
  it.skip("ManagedIdentityCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(new ManagedIdentityCredential());
  });

  // Don't know how to test
  it.skip("ClientCertificateCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(
      new ClientCertificateCredential(env.AZURE_TENANT_ID || "", env.AZURE_CLIENT_ID || "", ".")
    );
  });

  // Cannot test in the CI. Tried testing locally, but stuck as explained below -
  //
  //    In node, after I entered the code in https://microsoft.com/devicelogin to authenticate,
  //    the following popped up -
  //       `<AAD-app-name> needs permission to access resources in your organization that only an admin can grant.
  //        Please ask an admin to grant permission to this app before you can use it.`
  it.skip("DeviceCodeCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(
      new DeviceCodeCredential(env.AZURE_TENANT_ID || "", env.AZURE_CLIENT_ID, (response) =>
        console.log(response)
      )
    );
  });

  // Failed in node with the following error
  //        "error": "invalid_client",
  //        "error_description": "AADSTS7000218: The request body must contain the following parameter: 'client_assertion' or 'client_secret'.
  // Failed in browser with the following error
  //        Error: Failed to send request to https://login.microsoftonline.com/<my-tenant-id>/oauth2/v2.0/token
  //
  // Also, the test didn't throw any error when I didn't provide any username/password in the environment for the browser
  it.skip("UsernamePasswordCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID || "",
        env.AZURE_CLIENT_ID,
        env.ACCOUNT_USERNAME,
        env.ACCOUNT_PASSWORD
      )
    );
  });
});
