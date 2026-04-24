// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createPipelineFromOptions } from "../../../src/createPipelineFromOptions.js";
import type { Agent, TlsSettings } from "../../../src/interfaces.js";

const stubAgent: Agent = {
  destroy() {},
  maxFreeSockets: 256,
  maxSockets: Infinity,
  requests: {},
  sockets: {},
};
const stubTlsSettings: TlsSettings = { ca: "test-ca" };

describe("createPipelineFromOptions", function () {
  it("creates a pipeline with agent option", function () {
    const pipeline = createPipelineFromOptions({ agent: stubAgent });
    const agentPol = pipeline.getOrderedPolicies().find((p) => p.name === "agentPolicy");
    assert.isDefined(agentPol);
    assert.strictEqual(agentPol!.name, "agentPolicy");
  });

  it("creates a pipeline with tlsOptions", function () {
    const pipeline = createPipelineFromOptions({ tlsOptions: stubTlsSettings });
    const tlsPol = pipeline.getOrderedPolicies().find((p) => p.name === "tlsPolicy");
    assert.isDefined(tlsPol);
    assert.strictEqual(tlsPol!.name, "tlsPolicy");
  });

  it("creates a pipeline with both agent and tls options", function () {
    const pipeline = createPipelineFromOptions({
      agent: stubAgent,
      tlsOptions: stubTlsSettings,
    });
    const policies = pipeline.getOrderedPolicies();
    const agentPol = policies.find((p) => p.name === "agentPolicy");
    assert.isDefined(agentPol);
    assert.strictEqual(agentPol!.name, "agentPolicy");
    const tlsPol = policies.find((p) => p.name === "tlsPolicy");
    assert.isDefined(tlsPol);
    assert.strictEqual(tlsPol!.name, "tlsPolicy");
  });
});
