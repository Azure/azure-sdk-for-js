import { UsernamePasswordCredential } from "@azure/identity";
// @ts-ignore
import { CosmosClient } from "../dist";
import { handleError, finish, logStep } from "./Shared/handleError";

async function run() {
  const credentials = new UsernamePasswordCredential(
    "fake-tenant-id",
    "fake-client-id",
    "fakeUsername",
    "fakePassword"
  );
  const client = new CosmosClient({
    endpoint,
    aadCredentials: credentials
  });
  await client.databases.readAll().fetchAll();
  await finish();
}

run().catch(handleError);
