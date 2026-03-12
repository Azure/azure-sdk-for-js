// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates creating, fetching outputs from, and deleting an Environment
 */

import { DefaultAzureCredential } from "@azure/identity";
import type {
  ProjectOutput,
  CatalogOutput,
  EnvironmentTypeOutput,
  EnvironmentDefinitionOutput,
} from "@azure-rest/developer-devcenter";
import { isUnexpected, getLongRunningPoller } from "@azure-rest/developer-devcenter";
import createClient from "@azure-rest/developer-devcenter";
import "dotenv/config";

async function createEnvironment(): Promise<void> {
  // Build client and fetch required parameters
  const endpoint = process.env.DEVCENTER_ENDPOINT || "<devcenter name>";
  const client = createClient(endpoint, new DefaultAzureCredential());

  const projectList = await client.path("/projects").get();
  if (isUnexpected(projectList)) {
    throw projectList.body.error;
  }

  const project: ProjectOutput = projectList.body.value[0];
  if (project === undefined || project.name === undefined) {
    throw new Error("No projects found.");
  }
  const projectName: string = project.name;

  const catalogList = await client.path("/projects/{projectName}/catalogs", projectName).get();
  if (isUnexpected(catalogList)) {
    throw catalogList.body.error;
  }

  const catalog: CatalogOutput = catalogList.body.value[0];
  const catalogName: string = catalog.name;

  const environmentDefinitionsList = await client
    .path(
      "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
      projectName,
      catalogName,
    )
    .get();

  if (isUnexpected(environmentDefinitionsList)) {
    throw environmentDefinitionsList.body.error;
  }

  const environmentDefinition: EnvironmentDefinitionOutput =
    environmentDefinitionsList.body.value[0];
  const environmentDefinitionName: string = environmentDefinition.name;

  const environmentTypeList = await client
    .path("/projects/{projectName}/environmentTypes", projectName)
    .get();
  if (isUnexpected(environmentTypeList)) {
    throw environmentTypeList.body.error;
  }

  const environmentType: EnvironmentTypeOutput = environmentTypeList.body.value[0];
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
    throw environmentCreateResponse.body.error;
  }

  const environmentCreatePoller = await getLongRunningPoller(client, environmentCreateResponse);
  const environmentCreateResult = await environmentCreatePoller.pollUntilDone();
  if (isUnexpected(environmentCreateResult)) {
    throw environmentCreateResult.body.error;
  }
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
    throw environmentDeleteResponse.body.error;
  }

  const environmentDeletePoller = await getLongRunningPoller(client, environmentDeleteResponse);
  await environmentDeletePoller.pollUntilDone();

  console.log("Cleaned up environment successfully.");
}

createEnvironment().catch(console.error);
