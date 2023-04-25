import { DefaultAzureCredential } from "@azure/identity";
import {
  ProjectOutput,
  isUnexpected,
  PoolOutput,
  DevBoxesCreateDevBoxParameters,
  getLongRunningPoller,
} from "@azure-rest/developer-devcenter";
import createClient from "@azure-rest/developer-devcenter";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * @summary Demonstrates creating, accessing, and deleting a Dev Box
 */
async function createDevBox() {
  // Build client and fetch required parameters
  const tenantId = process.env.AZURE_TENANT_ID || "<tenant id>";
  const devCenter = process.env.AZURE_DEVCENTER_NAME || "<devcenter name>";
  const client = createClient(tenantId, devCenter, new DefaultAzureCredential());

  const projectList = await client.path("/projects").get();
  if (isUnexpected(projectList)) {
    throw projectList.body.error;
  }

  let project: ProjectOutput = projectList.body.value[0];
  if (project === undefined || project.name === undefined) {
    throw "No projects found.";
  }
  const projectName: string = project.name;

  const poolList = await client.path("/projects/{projectName}/pools", projectName).get();
  if (isUnexpected(poolList)) {
    throw poolList.body.error;
  }

  let pool: PoolOutput = poolList.body.value[0];
  if (pool === undefined || pool.name === undefined) {
    throw "No pools found.";
  }

  const devBoxCreateParameters: DevBoxesCreateDevBoxParameters = {
    contentType: "application/json",
    body: { poolName: pool.name },
  };

  // Provision a dev box
  const devBoxCreateResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
      projectName,
      "me",
      "TestDevBox"
    )
    .put(devBoxCreateParameters);
  if (isUnexpected(devBoxCreateResponse)) {
    throw new Error(devBoxCreateResponse.body.error.message);
  }

  const devBoxCreatePoller = getLongRunningPoller(client, devBoxCreateResponse);
  const devBoxCreateResult = await devBoxCreatePoller.pollUntilDone();

  console.log(`Provisioned dev box with state ${devBoxCreateResult.body.provisioningState}.`);

  // Get the connection URL to access the machine
  const remoteConnectionResult = await client
    .path(
      "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
      projectName,
      "me",
      "TestDevBox"
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
      "TestDevBox"
    )
    .delete();
  if (isUnexpected(devBoxDeleteResponse)) {
    throw new Error(devBoxDeleteResponse.body.error.message);
  }

  const devBoxDeletePoller = getLongRunningPoller(client, devBoxDeleteResponse);
  await devBoxDeletePoller.pollUntilDone();

  console.log(`Cleaned up dev box successfully.`);
}

createDevBox();
