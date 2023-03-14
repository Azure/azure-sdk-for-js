import { DefaultAzureCredential } from "@azure/identity";
import {
  ProjectOutput,
  isUnexpected,
  CatalogItemOutput,
  EnvironmentTypeOutput,
  EnvironmentsCreateOrUpdateEnvironmentParameters,
  getLongRunningPoller,
} from "@azure-rest/developer-devcenter";
import createClient from "@azure-rest/developer-devcenter";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * @summary Demonstrates creating, fetching outputs from, and deleting an Environment
 */
async function createEnvironment() {
  // Build client and fetch required parameters
  const tenantId = process.env.AZURE_TENANT_ID || "<tenant id>";
  const devCenter = process.env.AZURE_DEVCENTER_NAME || "<devcenter name>";
  const client = createClient(tenantId, devCenter, new DefaultAzureCredential());

  const projectList = await client.path("/projects").get();
  if (isUnexpected(projectList)) {
    throw new Error(projectList.body.error.message);
  }

  let project: ProjectOutput = projectList.body.value[0];
  if (project === undefined || project.name === undefined) {
    throw "No projects found.";
  }
  const projectName: string = project.name;

  const catalogItemList = await client
    .path("/projects/{projectName}/catalogItems", projectName)
    .get();
  if (isUnexpected(catalogItemList)) {
    throw new Error(catalogItemList.body.error.message);
  }

  let catalogItem: CatalogItemOutput = catalogItemList.body.value[0];
  if (catalogItem === undefined || catalogItem.name === undefined) {
    throw new Error("No catalog items found.");
  }

  const environmentTypeList = await client
    .path("/projects/{projectName}/environmentTypes", projectName)
    .get();
  if (isUnexpected(environmentTypeList)) {
    throw new Error(environmentTypeList.body.error.message);
  }

  let environmentType: EnvironmentTypeOutput = environmentTypeList.body.value[0];
  if (environmentType === undefined || environmentType.name === undefined) {
    throw new Error("No environment types found.");
  }

  const environmentsCreateParameters: EnvironmentsCreateOrUpdateEnvironmentParameters = {
    contentType: "application/json",
    body: {
      catalogItemName: catalogItem.name,
      environmentType: environmentType.name,
      catalogName: catalogItem.catalogName,
    },
  };

  const environmentName = "DevEnvironment";
  const userId = "me";

  // Provision a dev box
  const environmentCreateResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/environments/{environmentName}",
      projectName,
      userId,
      environmentName
    )
    .put(environmentsCreateParameters);
  if (isUnexpected(environmentCreateResponse)) {
    throw new Error(environmentCreateResponse.body.error.message);
  }

  const environmentCreatePoller = getLongRunningPoller(client, environmentCreateResponse);
  const environmentCreateResult = await environmentCreatePoller.pollUntilDone();
  console.log(
    `Provisioned environment with state ${environmentCreateResult.body.provisioningState}.`
  );

  // Get the deployment outputs
  const artifactListResult = await client
    .path(
      "/projects/{projectName}/users/{userId}/environments/{environmentName}/artifacts",
      projectName,
      userId,
      environmentName
    )
    .get();
  if (isUnexpected(artifactListResult)) {
    throw new Error(artifactListResult.body.error.message);
  }

  console.log("Retrieved deployment artifacts:");
  console.log(artifactListResult.body.value);

  // Tear down the environment when finished
  const environmentDeleteResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/environments/{environmentName}",
      projectName,
      userId,
      environmentName
    )
    .delete();
  if (isUnexpected(environmentDeleteResponse)) {
    throw new Error(environmentDeleteResponse.body.error.message);
  }

  const environmentDeletePoller = getLongRunningPoller(client, environmentDeleteResponse);
  await environmentDeletePoller.pollUntilDone();

  console.log("Cleaned up environment successfully.");
}

createEnvironment();
