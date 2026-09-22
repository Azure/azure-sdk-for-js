// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

// TODO(<feature>): unskip after recording added.
describe.skip("<feature>", function () {
  let project: AIProjectClient;
  // const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

  it("setup", async function () {
    const projectEndpoint =
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint string>";
    project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  });

  it.skip("exercises <feature>", async function () {
    // TODO(<feature>): replace with the operation under test, then unskip
    // and capture a recording with `npm run test:node` against a live project.
    void project;
  });
});
