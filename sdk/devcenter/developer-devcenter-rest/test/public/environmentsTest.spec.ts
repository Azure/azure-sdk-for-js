// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, beforeEach, afterEach, expect, assert } from "vitest";
import {
  AzureDeveloperDevCenterClient,
  CatalogOutput,
  EnvironmentDefinitionOutput,
  EnvironmentTypeOutput,
  CreateOrReplaceEnvironmentParameters,
  isUnexpected,
  paginate,
  getLongRunningPoller,
  EnvironmentOutput,
} from "../../src/index.js";

const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};
describe("DevCenter Environments Operations Test", () => {
  let recorder: Recorder;
  let client: AzureDeveloperDevCenterClient;

  let endpoint: string;
  let projectName: string;
  let catalogName: string;
  let envDefinitionName: string;
  let environmentTypeName: string;
  let environmentName: string;
  let userId: string;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);

    endpoint = env["ENDPOINT"] || "";
    projectName = env["DEFAULT_PROJECT_NAME"] || "";
    catalogName = env["DEFAULT_CATALOG_NAME"] || "";
    envDefinitionName = env["DEFAULT_ENVIRONMENT_DEFINITION_NAME"] || "";
    environmentTypeName = env["DEFAULT_ENVIRONMENT_TYPE_NAME"] || "";
    environmentName = env["DEFAULT_ENVIRONMENT_NAME"] || "";
    userId = env["DEFAULT_USER_NAME"] || "";

    client = createRecordedClient(recorder, endpoint, {
      allowInsecureConnection: false,
    });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Get catalog by project and name", async function () {
    const catalog = await client
      .path("/projects/{projectName}/catalogs/{catalogName}", projectName, catalogName)
      .get();

    if (isUnexpected(catalog)) {
      throw catalog.body.error;
    }

    expect(catalog.body.name).to.equal(env["DEFAULT_CATALOG_NAME"]);
  });

  it("List catalogs in a project", async function () {
    const catalogList = await client.path("/projects/{projectName}/catalogs", projectName).get();

    if (isUnexpected(catalogList)) {
      throw catalogList.body.error;
    }

    const catalogs: CatalogOutput[] = [];
    console.log("Iterating through catalog results:");

    for await (const catalog of paginate(client, catalogList)) {
      const { name } = catalog;
      console.log(`Received catalog "${name}"`);
      catalogs.push(catalog);
    }

    expect(catalogs.length).to.equal(1);
    expect(catalogs[0].name).to.equal(env["DEFAULT_CATALOG_NAME"]);
  });

  it("Get environment definition by project, catalog, and item name", async function () {
    const environmentDefinitionOutput = await client
      .path(
        "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}",
        projectName,
        catalogName,
        envDefinitionName,
      )
      .get();

    if (isUnexpected(environmentDefinitionOutput)) {
      throw environmentDefinitionOutput.body.error;
    }

    expect(environmentDefinitionOutput.body.name).to.equal(envDefinitionName);
  });

  it("List environment definition by project, catalog", async function () {
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

    const environmentDefinitions: EnvironmentDefinitionOutput[] = [];

    for await (const environmentDefinition of paginate(client, environmentDefinitionsList)) {
      const { name } = environmentDefinition;
      console.log(`Received env definition: "${name}"`);
      environmentDefinitions.push(environmentDefinition);
    }

    expect(environmentDefinitions.length).to.equal(8);
  });

  it("List environments within a project", async function () {
    await createDevelopmentEnvironment();

    const environmentsList = await client
      .path("/projects/{projectName}/environments", projectName)
      .get();

    if (isUnexpected(environmentsList)) {
      throw environmentsList.body.error;
    }

    const environments: EnvironmentOutput[] = [];

    for await (const environment of paginate(client, environmentsList)) {
      const { name } = environment;
      console.log(`Received env type: "${name}"`);
      environments.push(environment);
    }

    expect(environments.length).to.equal(1);
    expect(environments[0].name).to.equal(environmentName);

    await deleteDevelopmentEnvironment();
  });

  it("List environments within a project by userId", async function () {
    await createDevelopmentEnvironment();

    const environmentsList = await client
      .path("/projects/{projectName}/users/{userId}/environments", projectName, userId)
      .get();

    if (isUnexpected(environmentsList)) {
      throw environmentsList.body.error;
    }

    const environments: EnvironmentOutput[] = [];

    for await (const environment of paginate(client, environmentsList)) {
      const { name } = environment;
      console.log(`Received env type: "${name}"`);
      environments.push(environment);
    }

    expect(environments.length).to.equal(1);
    expect(environments[0].name).to.equal(environmentName);

    await deleteDevelopmentEnvironment();
  });

  it("Get environment by projectName, userId, and environment name", async function () {
    await createDevelopmentEnvironment();

    const environmentOutput = await client
      .path(
        "/projects/{projectName}/users/{userId}/environments/{environmentName}",
        projectName,
        userId,
        environmentName,
      )
      .get();

    if (isUnexpected(environmentOutput)) {
      throw environmentOutput.body.error;
    }

    expect(environmentOutput.body.name).to.equal(environmentName);

    await deleteDevelopmentEnvironment();
  });

  it("List environment types by project", async function () {
    const environmentTypesList = await client
      .path("/projects/{projectName}/environmentTypes", projectName)
      .get();

    if (isUnexpected(environmentTypesList)) {
      throw environmentTypesList.body.error;
    }

    const environmentTypes: EnvironmentTypeOutput[] = [];

    for await (const environmentDefinitionType of paginate(client, environmentTypesList)) {
      const { name } = environmentDefinitionType;
      console.log(`Received env type: "${name}"`);
      environmentTypes.push(environmentDefinitionType);
    }

    expect(environmentTypes.length).to.equal(1);
    expect(environmentTypes[0].name).to.equal(environmentTypeName);
  });

  it("Create and then delete deployment environment", async function () {
    await createDevelopmentEnvironment();
    await deleteDevelopmentEnvironment();
  });

  async function createDevelopmentEnvironment(): Promise<void> {
    const environmentsCreateParameters: CreateOrReplaceEnvironmentParameters = {
      body: {
        environmentDefinitionName: envDefinitionName,
        environmentType: environmentTypeName,
        catalogName: catalogName,
      },
    };

    // Provision an environment
    const environmentCreateResponse = await client
      .path(
        "/projects/{projectName}/users/{userId}/environments/{environmentName}",
        projectName,
        userId,
        environmentName,
      )
      .put(environmentsCreateParameters);
    console.log("Sent create");

    if (isUnexpected(environmentCreateResponse)) {
      throw new Error(
        `Creation failed with message ${environmentCreateResponse.body?.error.message}`,
      );
    }

    assert.equal(
      environmentCreateResponse.status,
      "201",
      "Environment creation should return 201 created.",
    );

    const environmentCreatePoller = await getLongRunningPoller(
      client,
      environmentCreateResponse,
      testPollingOptions,
    );
    const environmentCreateResult = await environmentCreatePoller.pollUntilDone();

    if (isUnexpected(environmentCreateResult)) {
      throw new Error(
        `Creation failed with message ${environmentCreateResult.body?.error.message}`,
      );
    }

    assert.equal(
      environmentCreateResult.status,
      "200",
      "Create environment polling should return 200 OK.",
    );
    assert.equal(environmentCreateResult.body.name, environmentName);
    assert.equal(environmentCreateResult.body.provisioningState, "Succeeded");
  }

  async function deleteDevelopmentEnvironment(): Promise<void> {
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
      throw new Error(environmentDeleteResponse.body?.error.message);
    }

    assert.equal(
      environmentDeleteResponse.status,
      "202",
      "Environment delete should return 202 accepted.",
    );

    const environmentDeletePoller = await getLongRunningPoller(
      client,
      environmentDeleteResponse,
      testPollingOptions,
    );
    const environmentDeleteResult = await environmentDeletePoller.pollUntilDone();

    if (isUnexpected(environmentDeleteResult)) {
      throw new Error(environmentDeleteResult.body?.error.message);
    }

    assert.equal(
      environmentDeleteResult.status,
      "200",
      "Environment delete long-running operation should return 200 OK.",
    );

    console.log("Cleaned up environment successfully.");
  }
});
