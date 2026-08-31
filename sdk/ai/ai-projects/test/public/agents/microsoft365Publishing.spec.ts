// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import type {
  AIProjectClient,
  GetMicrosoft365PackageOptionalParams,
  Microsoft365PublishDefaults,
  Microsoft365PublishScope,
  PublishToMicrosoft365OptionalParams,
} from "../../../src/index.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";

const publishScope: Microsoft365PublishScope = "Personal";

type Microsoft365PublishingOptions = GetMicrosoft365PackageOptionalParams &
  PublishToMicrosoft365OptionalParams;

function createPublishOptions(
  defaults: Microsoft365PublishDefaults,
): Microsoft365PublishingOptions {
  return {
    agentDisplayName: defaults.agentDisplayName ?? "Azure SDK Microsoft 365 test agent",
    botServiceArmId: defaults.botServiceArmId,
    appVersion: defaults.recommendedNextAppVersion ?? "1.0.0",
    shortDescription: defaults.shortDescription ?? "An Azure SDK test agent.",
    fullDescription:
      defaults.fullDescription ?? "A Foundry agent used to test Microsoft 365 publishing.",
    developerName: defaults.developerName ?? "Microsoft",
    developerWebsiteUrl: defaults.developerWebsiteUrl ?? "https://www.microsoft.com",
    privacyUrl: defaults.privacyUrl ?? "https://privacy.microsoft.com/en-us/privacystatement",
    termsOfUseUrl: defaults.termsOfUseUrl ?? "https://www.microsoft.com/servicesagreement",
  };
}

describe("agents - Microsoft 365 publishing", function () {
  let recorder: Recorder;
  let project: AIProjectClient;
  let agentName: string;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    project = createProjectsClient(recorder);
    agentName = assertEnvironmentVariable("FOUNDRY_AGENT_NAME");
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // TODO(microsoft365Publishing): unskip after recording added.
  it.skip("gets Microsoft 365 publish defaults", async function () {
    const defaults = await project.agents.getMicrosoft365PublishDefaults(agentName);

    assert.equal(defaults.agentName, agentName);
  });

  // TODO(microsoft365Publishing): unskip after recording added.
  it.skip("generates a Microsoft Teams app package", async function () {
    const defaults = await project.agents.getMicrosoft365PublishDefaults(agentName);
    const appPackage = await project.agents.getMicrosoft365Package(
      agentName,
      publishScope,
      createPublishOptions(defaults),
    );

    assert.isTrue(appPackage.readableStreamBody !== undefined || appPackage.blobBody !== undefined);
  });

  // TODO(microsoft365Publishing): unskip after recording added.
  it.skip("publishes an agent to Microsoft 365", async function () {
    const defaults = await project.agents.getMicrosoft365PublishDefaults(agentName);
    const published = await project.agents.publishToMicrosoft365(
      agentName,
      publishScope,
      createPublishOptions(defaults),
    );

    assert.isTrue(published.titleId !== undefined || published.teamsAppId !== undefined);
  });
});
