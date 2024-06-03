const { DefaultAzureCredential } = require("@azure/identity");
const { isUnexpected, getLongRunningPoller } = require("@azure-rest/developer-devcenter");
const createClient = require("@azure-rest/developer-devcenter").default;
require("dotenv").config();

/**
 * @summary Demonstrates creating, fetching outputs from, and deleting an Environment
 */
async function createEnvironment() {
  // Build client and fetch required parameters
  const endpoint = process.env.DEVCENTER_ENDPOINT || "<devcenter name>";
  const client = createClient(endpoint, new DefaultAzureCredential());

  const projectList = await client.path("/projects").get();
  if (isUnexpected(projectList)) {
    throw new Error(projectList.body.error.message);
  }

  let project = projectList.body.value[0];
  if (project === undefined || project.name === undefined) {
    throw new Error("No projects found.");
  }
  const projectName = project.name;

  const catalogList = await client.path("/projects/{projectName}/catalogs", projectName).get();
  if (isUnexpected(catalogList)) {
    throw new Error(catalogList.body.error);
  }

  const catalog = catalogList.body.value[0];
  const catalogName = catalog.name;

  const environmentDefinitionsList = await client
    .path(
      "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
      projectName,
      catalogName,
    )
    .get();

  if (isUnexpected(environmentDefinitionsList)) {
    throw new Error(environmentDefinitionsList.body.error);
  }

  const environmentDefinition = environmentDefinitionsList.body.value[0];
  const environmentDefinitionName = environmentDefinition.name;

  const environmentTypeList = await client
    .path("/projects/{projectName}/environmentTypes", projectName)
    .get();
  if (isUnexpected(environmentTypeList)) {
    throw new Error(environmentTypeList.body.error.message);
  }

  let environmentType = environmentTypeList.body.value[0];
  if (environmentType === undefined || environmentType.name === undefined) {
    throw new Error("No environment types found.");
  }

  const environmentsCreateParameters = {
    contentType: "application/json",
    body: {
      environmentDefinitionName: environmentDefinitionName,
      environmentType: environmentType.name,
      catalogName: catalogName,
    },
  };

  const environmentName = "DevEnvironment";
  const userId = "me";

  // Provision an environment
  const environmentCreateResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/environments/{environmentName}",
      projectName,
      userId,
      environmentName,
    )
    .put(environmentsCreateParameters);
  if (isUnexpected(environmentCreateResponse)) {
    throw new Error(environmentCreateResponse.body.error.message);
  }

  const environmentCreatePoller = await getLongRunningPoller(client, environmentCreateResponse);
  const environmentCreateResult = await environmentCreatePoller.pollUntilDone();
  console.log(
    `Provisioned environment with state ${environmentCreateResult.body.provisioningState}.`,
  );

  // Tear down the environment when finished
  const environmentDeleteResponse = await client
    .path(
      "/projects/{projectName}/users/{userId}/environments/{environmentName}",
      projectName,
      userId,
      environmentName,
    )
    .delete();
  if (isUnexpected(environmentDeleteResponse)) {
    throw new Error(environmentDeleteResponse.body.error.message);
  }

  const environmentDeletePoller = await getLongRunningPoller(client, environmentDeleteResponse);
  await environmentDeletePoller.pollUntilDone();

  console.log("Cleaned up environment successfully.");
}

createEnvironment();
