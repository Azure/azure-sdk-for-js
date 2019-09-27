import * as assert from "assert";
import * as dotenv from "dotenv";
import { env, getUniqueName } from "../utils";
import { BlobServiceClient } from "../../src";
import { DefaultAzureCredential, EnvironmentCredential, TokenCredential } from "@azure/identity";
dotenv.config({ path: "../.env" });

describe("Test Credentials from @azure/identity - Node.js Only", () => {
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
      // Not exectuing these tests in the record/playback modes
      this.skip();
    }
  });

  // Only for node, not for browsers
  it("DefaultAzureCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(new DefaultAzureCredential());
  });

  // Only for node, not for browsers
  it("EnvironmentCredential should be able to instantiate BlobServiceClient", async () => {
    await verifyCredential(new EnvironmentCredential());
  });
});
