import assert from "assert";
import { CosmosClient, DocumentBase } from "../..";
import { getTestDatabase } from "../common/TestHelpers";

const endpoint = "https://localhost:443";
const masterKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

// TODO: Skipping these tests for now until we find a way to run these tests in a seperate nodejs process
// Currently all tests are run in same process so we cannot update the environment variables for different tests
// This test runs fine when run independently but fails when run along with rest of the tests.
describe.skip("Validate SSL verification check for emulator", function() {
  it("nativeApi Client Should throw exception", async function() {
    try {
      const client = new CosmosClient({ endpoint, auth: { masterKey } });
      // create database
      await getTestDatabase("ssl verification", client);
    } catch (err) {
      // connecting to emulator should throw SSL verification error,
      // unless you explicitly disable it via connectionPolicy.DisableSSLVerification
      assert.equal(err.code, "DEPTH_ZERO_SELF_SIGNED_CERT", "client should throw exception");
    }
  });

  it("nativeApi Client Should successfully execute request", async function() {
    const connectionPolicy = new DocumentBase.ConnectionPolicy();
    // Disable SSL verification explicitly
    connectionPolicy.DisableSSLVerification = true;
    const client = new CosmosClient({
      endpoint,
      auth: { masterKey },
      connectionPolicy
    });

    // create database
    await getTestDatabase("ssl verification", client);
  });
});
