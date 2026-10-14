import { describe, expect, it } from "vitest";

import { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import type { DeploymentContext } from "../src/deployment-context/deployment-context.js";
import { DefaultNamingPolicy } from "../src/naming/naming-policy.js";

class ContextComponent extends ProvisioningComponent {
  constructor(parent?: ProvisioningComponent, context?: DeploymentContext) {
    super(parent);
    this._localDeploymentContext = context;
  }
}

describe("deployment context inheritance", () => {
  it("uses the nearest location and naming policy while merging tags root to leaf", () => {
    const rootPolicy = new DefaultNamingPolicy({ workload: "root" });
    const innerPolicy = new DefaultNamingPolicy({ workload: "inner" });
    const root = new ContextComponent(undefined, {
      location: "westus",
      namingPolicy: rootPolicy,
      tags: { environment: "prod", owner: "platform" },
    });
    const middle = new ContextComponent(root, {
      location: "eastus",
      namingPolicy: innerPolicy,
      tags: { owner: "application", tier: "api" },
    });
    const leaf = new ContextComponent(middle);

    expect(leaf.deploymentContext).toEqual({
      location: "eastus",
      namingPolicy: innerPolicy,
      tags: {
        environment: "prod",
        owner: "application",
        tier: "api",
      },
    });
  });

  it("excludes a component's own contribution and returns empty fields without ancestors", () => {
    const root = new ContextComponent(undefined, {
      location: "westus",
      tags: { environment: "prod" },
    });

    expect(root.deploymentContext).toEqual({
      location: undefined,
      namingPolicy: undefined,
      tags: undefined,
    });

    expect(new ContextComponent(root).deploymentContext).toEqual({
      location: "westus",
      namingPolicy: undefined,
      tags: { environment: "prod" },
    });
  });
});
