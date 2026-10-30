// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { Resource } from "../src/constructs/resource/resource.js";
import type {
  ExistingResourceProps,
  SingletonExistingResourceProps,
} from "../src/constructs/resource/resource.js";
import type { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import { Stack } from "../src/constructs/stack.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";
import { deref } from "../src/constructs/resource/resource-proxy.js";

describe("Resource ctor — third-arg `options`", () => {
  it("accepts `props.existing` and marks the resource as existing", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const r = new Resource(stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: "sa1",
      existing: true,
    });

    expect(r.existing).toBe(true);
    expect(deref(r.name)).toBe("sa1");
  });

  it("omitting options keeps existing behavior (no condition, deployable)", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const r = new Resource(stack, {
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      name: "sa1",
    });

    expect(r.existing).toBeUndefined();
    expect(r.condition).toBeUndefined();
  });

  it("retains explicit resource dependencies", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const dependency = new Resource(stack, {
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      name: "dependency",
    });
    const resource = new Resource(
      stack,
      {
        type: "Contoso.Test/resources",
        apiVersion: "2024-01-01",
        name: "dependent",
      },
      { dependsOn: [dependency] },
    );

    expect(resource.dependsOn).toEqual([dependency]);
  });
});

describe("Resource ctor — existing references via subclasses", () => {
  interface WidgetProps {
    region?: string;
  }

  class Widget extends Resource<"Contoso.Widgets/widgets"> {
    static readonly resourceType = "Contoso.Widgets/widgets";
    static readonly apiVersion = "2024-01-01";

    constructor(
      context: ProvisioningComponent,
      props:
        | (WidgetProps & { name: string; existing?: false })
        | (ExistingResourceProps & { existing: true }),
    ) {
      super(context, {
        type: Widget.resourceType,
        apiVersion: Widget.apiVersion,
        name: props.name,
        ...((props as { existing?: boolean }).existing === true ? { existing: true as const } : {}),
      });
    }
  }

  interface ConfigProps {
    value?: string;
  }

  class Config extends Resource<"Contoso.Widgets/widgets/configs"> {
    static readonly resourceType = "Contoso.Widgets/widgets/configs";
    static readonly apiVersion = "2024-01-01";

    constructor(
      context: ProvisioningComponent,
      props?:
        | (ConfigProps & { existing?: false })
        | (SingletonExistingResourceProps & { existing: true }),
    ) {
      super(context, {
        type: Config.resourceType,
        apiVersion: Config.apiVersion,
        name: "default",
        ...((props as { existing?: boolean } | undefined)?.existing === true
          ? { existing: true as const }
          : {}),
      });
    }
  }

  it("ordinary resource: existing arm requires name and marks existing", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const w = new Widget(stack, { name: "w1", existing: true });

    expect(w.type).toBe("Contoso.Widgets/widgets");
    expect(w.existing).toBe(true);
    expect(deref(w.name)).toBe("w1");
  });

  it("singleton child: existing arm needs no name and marks existing", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const c = new Config(stack, { existing: true });

    expect(c.type).toBe("Contoso.Widgets/widgets/configs");
    expect(c.existing).toBe(true);
    expect(deref(c.name)).toBe("default");
  });
});
