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

  // Fails with `AADSTS700054: response_type 'id_token' is not enabled for the application.`
  it("InteractiveBrowserCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(
      new InteractiveBrowserCredential(env.AZURE_TENANT_ID || "", env.AZURE_CLIENT_ID)
    );
  });
});
