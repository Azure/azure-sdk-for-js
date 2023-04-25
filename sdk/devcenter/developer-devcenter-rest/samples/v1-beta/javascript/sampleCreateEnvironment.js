const { DefaultAzureCredential } = require("@azure/identity");
const { isUnexpected, getLongRunningPoller, paginate } = require("@azure-rest/developer-devcenter");
const createClient = require("@azure-rest/developer-devcenter").default;
require("dotenv").config();

/**
 * @summary Demonstrates creating, fetching outputs from, and deleting an Environment
 */
async function createEnvironment() {
  // Build client and fetch required parameters
  const endpoint = process.env.DEVCENTER_ENDPOINT || "<endpoint>";
  const client = createClient(endpoint, new DefaultAzureCredential());

  // Get all projects
  const projectList = await client.path("/projects").get();
  const projects = [];
  if (isUnexpected(projectList)) {
    throw projectList.body.error;
  }

  console.log("Iterating through project results:");

  for await (const project of paginate(client, projectList)) {
    const { name } = project;
    console.log(`Received project "${name}"`);
    projects.push(project);
  }

  if (projects.length < 1) {
    throw "No projects found.";
  }

  const firstProject = projects[0];

  if (!firstProject.name) {
    throw "Project is missing name";
  }

  const projectName = firstProject.name;

  // Get all catalog items for the first project
  const catalogItemList = await client
    .path("/projects/{projectName}/catalogItems", projectName)
    .get();
  const catalogItems = [];

  if (isUnexpected(catalogItemList)) {
    throw new Error(catalogItemList.body.error.message);
  }

  console.log("Iterating through pool results:");

  for await (const catalogItem of paginate(client, catalogItemList)) {
    const { catalogName, name } = catalogItem;
    console.log(`Received catalog item "${name}" from catalog "${catalogName}"`);
    catalogItems.push(catalogItem);
  }

  if (catalogItems.length < 1) {
    throw "No catalog items found.";
  }

  const firstCatalogItem = catalogItems[0];

  if (!firstCatalogItem.name) {
    throw "Catalog item is missing name";
  }

  if (!firstCatalogItem.catalogName) {
    throw "Catalog item is missing catalog name";
  }

  // Get all environment types for the first project
  const environmentTypeList = await client
    .path("/projects/{projectName}/environmentTypes", projectName)
    .get();
  const environmentTypes = [];

  if (isUnexpected(environmentTypeList)) {
    throw new Error(environmentTypeList.body.error.message);
  }

  console.log("Iterating through catalog item results:");

  for await (const environmentType of paginate(client, environmentTypeList)) {
    const { name } = environmentType;
    console.log(`Received environment type "${name}"`);
    environmentTypes.push(environmentType);
  }

  if (environmentTypes.length < 1) {
    throw "No environment types found.";
  }

  const firstEnvironmentType = environmentTypes[0];

  if (!firstEnvironmentType.name) {
    throw "Environment type is missing name";
  }

  // Create an environment with the first catalog item and environment type
  const environmentsCreateParameters = {
    contentType: "application/json",
    body: {
      catalogItemName: firstCatalogItem.name,
      environmentType: firstEnvironmentType.name,
      catalogName: firstCatalogItem.catalogName,
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
