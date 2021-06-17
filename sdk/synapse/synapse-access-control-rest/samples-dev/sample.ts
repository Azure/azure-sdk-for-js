import AccessControl, { getLongRunningPoller, paginate } from "../src";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  const client = AccessControl(endpoint, new DefaultAzureCredential());

  // Creating a role assignment is a long running operation
  const createRoleAsignment = await client
    .path("/rbac/roleAssignments")
    .post({ body: { principalId: "testId", roleId: "testRoleId" } });

  // We can use the helper poller provided with the library to poll
  // periodically and wait until the operation is done.
  const poller = getLongRunningPoller(client, createRoleAsignment);

  // Wait until the create operation is finished
  const createResult = await poller.pollUntilDone();

  console.log(createResult);

  const result = await client.path("/rbac/roles").get();

  if (result.status !== "200") {
    throw result.body.error;
  }

  // Roles may be returned in multiple pages.
  // we can use the paginate helper, passing the get response
  // and it will give us a PagedAsyncIterableIterator to fetch
  // all the items
  const roles = paginate(client, result);

  for await (const role of roles) {
    console.log(role.name);
  }
}

main().catch(console.error);
