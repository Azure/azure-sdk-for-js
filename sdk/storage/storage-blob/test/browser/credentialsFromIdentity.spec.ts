import * as assert from "assert";
import * as dotenv from "dotenv";
import { env, getUniqueName } from "../utils";
import { BlobServiceClient } from "../../src";
import { TokenCredential, InteractiveBrowserCredential } from "@azure/identity";
dotenv.config({ path: "../.env" });

describe("Test Credentials from @azure/identity - Browsers Only", () => {
  async function verifyCredential(credential: TokenCredential) {
    const blobServiceClient = new BlobServiceClient(
      `https://${env.ACCOUNT_NAME}.blob.core.windows.net/`,
      credential
    );

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

  // ChromeHeadless won't work because user needs to authenticate in the UI
  // Issue 1 -
  //    In browser, Fails with `AADSTS700054: response_type 'id_token' is not enabled for the application.`
  //    Fixed as explained by David here - https://github.com/Azure/azure-sdk-for-js/pull/5287#discussion_r331717709
  // Issue 2 -
  //    New error, after providing the email address,
  //            it fails with `AADSTS500113: No reply address is registered for the application.`
  it.skip("InteractiveBrowserCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(
      new InteractiveBrowserCredential(env.AZURE_TENANT_ID || "", env.AZURE_CLIENT_ID)
    );
  });
});
