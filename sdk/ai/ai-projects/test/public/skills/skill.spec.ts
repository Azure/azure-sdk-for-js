// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import { randomUUID } from "@azure/core-util";

describe("skills - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let skillName: string;
  let skillCreated: boolean;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    skillName = recorder.variable("skillName", `js-test-skill-${randomUUID()}`);
    skillCreated = false;
  });

  afterEach(async function () {
    try {
      if (skillCreated) {
        await projectsClient.beta.skills.delete(skillName);
      }
    } finally {
      await recorder.stop();
    }
  });

  it("should create, get, list, and delete a skill", async function () {
    // Create a new skill
    const created = await projectsClient.beta.skills.create(skillName, {
      inlineContent: {
        description: "Test skill created by skill.spec.ts.",
        instructions: "You are a helpful assistant that answers questions concisely.",
        metadata: { owner: "test" },
      },
    });
    skillCreated = true;
    assert.isNotNull(created);
    assert.equal(created.name, skillName);
    assert.isNotEmpty(created.id);
    console.log(`Created skill: ${created.name} (id: ${created.id})`);

    // Retrieve the skill
    const fetched = await projectsClient.beta.skills.get(skillName);
    assert.isNotNull(fetched);
    assert.equal(fetched.name, skillName);
    assert.isNotEmpty(fetched.id);
    console.log(`Retrieved skill: ${fetched.name} (id: ${fetched.id})`);

    // List skills
    const skills = [];
    for await (const item of projectsClient.beta.skills.list({ limit: 10 })) {
      skills.push(item);
    }
    assert.isTrue(skills.length >= 1);
    console.log(`Found ${skills.length} skill(s)`);

    // Delete the skill
    const deleteResult = await projectsClient.beta.skills.delete(skillName);
    skillCreated = false;
    assert.isNotNull(deleteResult);
    assert.equal(deleteResult.name, skillName);
    assert.isTrue(deleteResult.deleted);
    console.log(`Deleted skill: ${deleteResult.name} (deleted: ${deleteResult.deleted})`);
  });
});
