const { DefaultAzureCredential } = require("@azure/identity");
const { isUnexpected, getLongRunningPoller } = require("@azure-rest/developer-devcenter");
const createClient = require("@azure-rest/developer-devcenter").default;
require("dotenv").config();

/**
 * @summary Demonstrates creating, accessing, and deleting a Dev Box
 */
async function createDevBox() {
  // Build client and fetch required parameters
  const endpoint = process.env.DEVCENTER_ENDPOINT || "<devcenter name>";
  const client = createClient(endpoint, new DefaultAzureCredential());

  const projectList = await client.path("/projects").get();
  if (isUnexpected(projectList)) {
    throw new Error(projectList.body.error);
  }

  let project = projectList.body.value[0];
  if (project === undefined || project.name === undefined) {
    throw new Error("No projects found.");
  }
  const projectName = project.name;

  const poolList = await client.path("/projects/{projectName}/pools", projectName).get();
  if (isUnexpected(poolList)) {
    throw new Error(poolList.body.error);
  }

  let pool = poolList.body.value[0];
  if (pool === undefined || pool.name === undefined) {
    throw new Error("No pools found.");
  }

  const devBoxCreateParameters = {
    contentType: "application/json",
    body: { poolName: pool.name },
  };

  // Provision a dev box
  const devBoxCreateResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
      projectName,
      "me",
      "TestDevBox",
    )
    .put(devBoxCreateParameters);

  if (isUnexpected(devBoxCreateResponse)) {
    throw new Error(devBoxCreateResponse.body.error.message);
  }

  const devBoxCreatePoller = await getLongRunningPoller(client, devBoxCreateResponse);
  const devBoxCreateResult = await devBoxCreatePoller.pollUntilDone();

  console.log(`Provisioned dev box with state ${devBoxCreateResult.body.provisioningState}.`);

  // Get the connection URL to access the machine
  const remoteConnectionResult = await client
    .path(
      "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
      projectName,
      "me",
      "TestDevBox",
    )
    .get();

  if (isUnexpected(remoteConnectionResult)) {
    throw new Error(remoteConnectionResult.body.error.message);
  }

  console.log(`Connect using remote connection URL ${remoteConnectionResult.body.webUrl}.`);

  // Tear down the machine when finished
  const devBoxDeleteResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
      projectName,
      "me",
      "TestDevBox",
    )
    .delete();

  if (isUnexpected(devBoxDeleteResponse)) {
    throw new Error(devBoxDeleteResponse.body.error.message);
  }

  const devBoxDeletePoller = await getLongRunningPoller(client, devBoxDeleteResponse);
  await devBoxDeletePoller.pollUntilDone();

  console.log(`Cleaned up dev box successfully.`);
}

createDevBox();
