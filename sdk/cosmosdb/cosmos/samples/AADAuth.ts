import { UsernamePasswordCredential } from "@azure/identity";
// @ts-ignore
import { CosmosClient } from "../dist";
import { handleError, finish, logStep } from "./Shared/handleError";

const endpoint = "your-endpoint";
const masterKey = "your-master-key";
const existingContainerId = "your-container-id";

async function run() {
  logStep("Create credential object from @azure/identity");
  const credentials = new UsernamePasswordCredential(
    "fake-tenant-id",
    "fake-client-id",
    "fakeUsername",
    "fakePassword"
  );
  logStep("Pass credentials to client object with key aadCredentials");
  const aadClient = new CosmosClient({
    endpoint,
    aadCredentials: credentials
  });

  const genericClient = new CosmosClient({
    endpoint,
    key: masterKey
  });

  logStep(
    "Only certain operations are authorized. Reading databases/containers will throw errors, but reading items will work"
  );

  // fails
  await aadClient.databases.readAll().fetchAll();
  // succeeds
  await genericClient.databases.readAll().fetchAll();

  // succeeds
  await aadClient.database('example').container(existingContainerId).items.readAll();
  // succeeds
  await genericClient.database('example').container(existingContainerId).items.readAll();

  await finish();
}

run().catch(handleError);
