// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

type Microsoft365PublishScope = "Personal" | "Shared" | "Tenant";

// TODO(agents-microsoft365-publish): unskip after recording added.
describe.skip("agents Microsoft365 publish", function () {
  let project: AIProjectClient;

  it("setup", async function () {
    const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint string>";
    project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  });

  it.skip("TODO(agents-microsoft365-publish): unskip after recording added - get defaults and package", async function () {
    const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";
    const publishScope = "Personal" as Microsoft365PublishScope;
    const defaults = await project.agents.getMicrosoft365PublishDefaults(agentName);
    await project.agents.getMicrosoft365Package(agentName, publishScope, {
      appVersion: defaults.recommendedNextAppVersion || "1.0.0",
      optionalPermissionScopes: [],
    });
  });

  it.skip("TODO(agents-microsoft365-publish): unskip after recording added - publish to Microsoft365", async function () {
    const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";
    const publishScope = "Personal" as Microsoft365PublishScope;
    await project.agents.publishToMicrosoft365(agentName, publishScope, {
      appVersion: "1.0.0",
      optionalPermissionScopes: [],
    });
  });
});
