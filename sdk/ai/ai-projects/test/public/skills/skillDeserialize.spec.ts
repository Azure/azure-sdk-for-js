// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { _agentsPagedResultSkillObjectDeserializer } from "../../../src/models/models.js";

describe("skills deserialization", () => {
  it("should deserialize paged skill results from the data property", () => {
    const result = _agentsPagedResultSkillObjectDeserializer({
      data: [
        {
          skill_id: "skill-1",
          has_blob: false,
          name: "test-skill",
          description: "Test skill",
          metadata: { owner: "test" },
        },
      ],
      first_id: "skill-1",
      last_id: "skill-1",
      has_more: false,
    });

    assert.lengthOf(result.data, 1);
    assert.deepEqual(result.data[0], {
      skill_id: "skill-1",
      has_blob: false,
      name: "test-skill",
      description: "Test skill",
      metadata: { owner: "test" },
    });
    assert.equal(result.first_id, "skill-1");
    assert.equal(result.last_id, "skill-1");
    assert.isFalse(result.has_more);
  });

  it("should deserialize skill results returned as a direct array", () => {
    const result = _agentsPagedResultSkillObjectDeserializer([
      {
        skill_id: "skill-1",
        has_blob: false,
        name: "test-skill",
      },
    ]);

    assert.lengthOf(result.data, 1);
    assert.equal(result.data[0].name, "test-skill");
  });
});
