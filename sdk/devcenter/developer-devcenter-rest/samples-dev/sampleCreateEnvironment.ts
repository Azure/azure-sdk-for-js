import { DefaultAzureCredential } from "@azure/identity";
import {
  ProjectOutput,
  isUnexpected,
  EnvironmentDefinitionOutput,
  EnvironmentTypeOutput,
  EnvironmentsCreateOrReplaceEnvironmentParameters,
  getLongRunningPoller,
  paginate,
} from "@azure-rest/developer-devcenter";
import createClient from "@azure-rest/developer-devcenter";

/**
 * @summary Demonstrates creating, fetching outputs from, and deleting an Environment
 */
async function createEnvironment() {
  // Build client and fetch required parameters
  const endpoint = process.env.DEVCENTER_ENDPOINT || "<endpoint>";
  const client = createClient(endpoint, new DefaultAzureCredential());

  // Get all projects
  const projectList = await client.path("/projects").get();
  const projects: ProjectOutput[] = [];
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

  const projectName: string = firstProject.name;

  // Get all catalog items for the first project
  const environmentDefinitionList = await client
    .path("/projects/{projectName}/environmentDefinitions", projectName)
    .get();
  const environmentDefinitions: EnvironmentDefinitionOutput[] = [];

  if (isUnexpected(environmentDefinitionList)) {
    throw new Error(environmentDefinitionList.body.error.message);
  }

  console.log("Iterating through environment definition results:");

  for await (const environmentDefinition of paginate(client, environmentDefinitionList)) {
    const { catalogName, name } = environmentDefinition;
    console.log(`Received environment definition "${name}" from catalog "${catalogName}"`);
    environmentDefinitions.push(environmentDefinition);
  }

  if (environmentDefinitions.length < 1) {
    throw "No environment definitions found.";
  }

  const firstEnvironmentDefinition = environmentDefinitions[0];

  if (!firstEnvironmentDefinition.name) {
    throw "Environment definition is missing name";
  }

  if (!firstEnvironmentDefinition.catalogName) {
    throw "Environment definition is missing catalog name";
  }

  // Get all environment types for the first project
  const environmentTypeList = await client
    .path("/projects/{projectName}/environmentTypes", projectName)
    .get();
  const environmentTypes: EnvironmentTypeOutput[] = [];

  if (isUnexpected(environmentTypeList)) {
    throw new Error(environmentTypeList.body.error.message);
  }

  console.log("Iterating through environment type results:");

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
  const environmentsCreateParameters: EnvironmentsCreateOrReplaceEnvironmentParameters = {
    contentType: "application/json",
    body: {
      environmentDefinitionName: firstEnvironmentDefinition.name,
      environmentType: firstEnvironmentType.name,
      catalogName: firstEnvironmentDefinition.catalogName,
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
