// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import {
  DefaultNamingPolicy,
  Resource,
  Stack,
  deref,
  fn,
  type ProvisioningComponent,
  type ExpressionOrValue,
  type ResourceNamingRules,
  type NamingContext,
} from "../src/index.js";
import { deserialize, serialize } from "../src/serialization/index.js";
import { unwrapResourceHandle } from "../src/constructs/resource/resource-proxy.js";
import { assertValidResourceName } from "../src/naming/name-validation.js";
import * as nameValidation from "../src/naming/name-validation.js";
import { renderBicepFiles } from "../src/internal.js";
import { validateRenderedBicepFiles } from "./scripts/test/bicep-validator.js";
import { createLoopedResource, Loop } from "../src/constructs/resource/resource.js";

const rules: ResourceNamingRules = {
  abbreviation: "st",
  minLength: 3,
  maxLength: 24,
  pattern: {
    regex: "^[a-z0-9]+$",
    message: "Use lowercase letters and digits.",
  },
  scope: "global",
};

class NamedResource extends Resource<"Contoso.Naming/resources"> {
  static resourceType = "Contoso.Naming/resources" as const;
  static apiVersion = "2025-01-01";
  protected static namingRules = rules;
  static {
    this.register();
  }
  constructor(
    context: ProvisioningComponent,
    props: { name?: ExpressionOrValue<string>; existing?: boolean } = {},
  ) {
    super(context, {
      ...props,
      type: NamedResource.resourceType,
      apiVersion: NamedResource.apiVersion,
    });
  }
}

class CompositeResource extends Resource<"Contoso.Naming/parents/children"> {
  protected static namingRules: ResourceNamingRules = Object.freeze({
    ...rules,
    nameSegments: 2,
    scope: "parent",
  });
  static getNamingRules() {
    return this.namingRules;
  }
  getDeclarationNamingRules() {
    return this.namingRules;
  }
  constructor(context: ProvisioningComponent, props: { name?: ExpressionOrValue<string> } = {}) {
    super(context, {
      ...props,
      type: "Contoso.Naming/parents/children",
      apiVersion: "2025-01-01",
    });
  }
}

class PartialAncestryResource extends Resource<"Contoso.Naming/parents/missing/children"> {
  protected static namingRules: ResourceNamingRules = {
    ...rules,
    nameSegments: 2,
    scope: "parent",
  };
  constructor(context: ProvisioningComponent, props: { name: string }) {
    super(context, {
      ...props,
      type: "Contoso.Naming/parents/missing/children",
      apiVersion: "2025-01-01",
    });
  }
}

describe("resource name validation", () => {
  it("keeps shared naming metadata intact without enforcing declaration-relative counts", () => {
    const stack = new Stack("names");
    const parent = new Resource(stack, {
      type: "Contoso.Naming/parents",
      apiVersion: "2025-01-01",
      name: "owner",
    });
    const root = new CompositeResource(stack, { name: "owner/logs" });
    const child = new CompositeResource(parent, { name: "logs" });
    for (const resource of [root, child]) {
      expect(resource.getDeclarationNamingRules()).toBe(CompositeResource.getNamingRules());
    }
    expect(CompositeResource.getNamingRules().nameSegments).toBe(2);
    child.name = "owner/logs";
    root.name = "logs";
    expect(deref(child.name)).toBe("owner/logs");
    expect(deref(root.name)).toBe("logs");
  });

  it("provides custom policies with contextual segment counts separately from shared rules", () => {
    let received: NamingContext | undefined;
    const stack = new Stack("names", {
      namingPolicy: {
        generateName(context) {
          received = context;
          return "logs";
        },
      },
    });
    const parent = new Resource(stack, {
      type: "Contoso.Naming/parents",
      apiVersion: "2025-01-01",
      name: "owner",
    });
    new CompositeResource(parent);
    expect(received?.rules).toBe(CompositeResource.getNamingRules());
    expect(received?.rules.nameSegments).toBe(2);
    expect(received?.nameSegments).toBe(1);
  });

  it("uses actual ARM parent declarations, including hand-authored parents", () => {
    const stack = new Stack("names");
    const parent = new Resource(stack, {
      type: "Contoso.Naming/parents",
      apiVersion: "2025-01-01",
      name: "owner",
    });
    expect(deref(new CompositeResource(stack, { name: "owner/logs" }).name)).toBe("owner/logs");
    expect(deref(new CompositeResource(parent, { name: "logs" }).name)).toBe("logs");
    expect(() => new CompositeResource(parent)).not.toThrow();
    expect(() => new CompositeResource(parent, { name: "owner/logs" })).not.toThrow();
    expect(() => new CompositeResource(stack)).toThrow("undeclared ancestors");
  });

  it("uses full names at the stack root and relative names below a declared ancestor", () => {
    const stack = new Stack("names");
    const parent = new Resource(stack, {
      type: "Contoso.Naming/parents",
      apiVersion: "2025-01-01",
      name: "owner",
    });
    expect(
      deref(
        new PartialAncestryResource(parent, {
          name: "proxy/logs",
        }).name,
      ),
    ).toBe("proxy/logs");
    expect(
      deref(
        new PartialAncestryResource(stack, {
          name: "owner/proxy/logs",
        }).name,
      ),
    ).toBe("owner/proxy/logs");
    expect(deref(new PartialAncestryResource(stack, { name: "proxy/logs" }).name)).toBe(
      "proxy/logs",
    );
    expect(
      deref(
        new PartialAncestryResource(parent, {
          name: "owner/proxy/logs",
        }).name,
      ),
    ).toBe("owner/proxy/logs");
  });

  it.each([-1, 0, 1, Number.MAX_SAFE_INTEGER])(
    "preserves the safe integer identifier %s without applying string constraints",
    (name) => {
      expect(() => assertValidResourceName(name, "test", rules)).not.toThrow();
    },
  );

  it.each([1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, null, {}, true, undefined])(
    "rejects an unsupported name value %s",
    (name) => {
      expect(() => assertValidResourceName(name, "test", rules)).toThrow(
        "Name must be a string, a safe integer, or an expression.",
      );
    },
  );

  it("preserves safe integer names independently of ancestry metadata", () => {
    expect(() => assertValidResourceName(1, "test", { ...rules, nameSegments: 2 })).not.toThrow();
    expect(() => assertValidResourceName(1, "test", { ...rules, nameSegments: 1 })).not.toThrow();
  });

  it("validates the terminal segment of relative composite ARM names", () => {
    const composite = { ...rules, nameSegments: 2 };
    expect(() =>
      assertValidResourceName("eastus/" + "a".repeat(24), "test", composite),
    ).not.toThrow();
    expect(() => assertValidResourceName("eastus/INVALID", "test", composite)).toThrow("lowercase");
    for (const name of ["logs", "eastus//logs", "/logs"]) {
      expect(() => assertValidResourceName(name, "test", composite)).not.toThrow();
    }
    expect(() =>
      assertValidResourceName(fn.concat("eastus/", fn.uniqueString("seed")), "test", composite),
    ).not.toThrow();
    const policy = new DefaultNamingPolicy({ workload: "app" });
    expect(() => policy.generateName({ type: "test", rules: composite })).toThrow(
      "undeclared ancestors",
    );
  });
  it.each([
    ["abc", "valid"],
    ["a".repeat(24), "valid"],
    ["ab", "invalid"],
    ["a".repeat(25), "invalid"],
    ["My_name", "invalid"],
    ["a-b", "invalid"],
  ])("validates %s as %s", (name, status) => {
    const validate = () => assertValidResourceName(name, "test", rules);
    if (status === "valid") expect(validate).not.toThrow();
    else expect(validate).toThrow("Invalid name");
  });

  it("does not impose generation preferences on explicit names", () => {
    expect(() =>
      assertValidResourceName("logs", "test", {
        ...rules,
        abbreviation: "st",
        separator: "-",
      }),
    ).not.toThrow();
  });

  it("treats an empty TypeSpec pattern as matching every string", () => {
    const unrestricted = { ...rules, pattern: { regex: "" } };
    const policy = new DefaultNamingPolicy({ workload: "MyApp" });
    expect(() =>
      assertValidResourceName(fn.uniqueString("seed"), "test", unrestricted),
    ).not.toThrow();
    expect(() =>
      assertValidResourceName(
        policy.generateName({ type: "test", rules: unrestricted }),
        "test",
        unrestricted,
      ),
    ).not.toThrow();
  });

  it("generates for supported separator groups without changing literal regex semantics", () => {
    const unanchored = {
      ...rules,
      pattern: { regex: "^[a-z0-9]+(-[a-z0-9]+)*" },
    };
    expect(() =>
      assertValidResourceName(fn.concat("st-", fn.uniqueString("seed")), "test", unanchored),
    ).not.toThrow();
    expect(() => assertValidResourceName("st--logs", "test", unanchored)).not.toThrow();
    const anchored = {
      ...unanchored,
      pattern: { regex: "^[a-z0-9]+(-[a-z0-9]+)*$" },
    };
    expect(() => assertValidResourceName("st--logs", "test", anchored)).toThrow("Name must match");
    const policy = new DefaultNamingPolicy({ workload: "my--app" });
    expect(() =>
      assertValidResourceName(
        policy.generateName({ type: "test", rules: anchored }),
        "test",
        anchored,
      ),
    ).not.toThrow();
  });

  it("preserves unanchored pattern semantics", () => {
    const constraints = {
      ...rules,
      pattern: { regex: "abc" },
    };
    expect(() => assertValidResourceName("xabc", "test", constraints)).not.toThrow();
    expect(() => assertValidResourceName("abcx", "test", constraints)).not.toThrow();
    expect(() => assertValidResourceName("xyz", "test", constraints)).toThrow(
      "Name must match abc",
    );
  });

  it("accepts deployment-time expressions without inspecting their parts", () => {
    expect(() => assertValidResourceName(fn.concat("AB", "C"), "test", rules)).not.toThrow();
    expect(() =>
      assertValidResourceName(fn.concat("eastus", fn.uniqueString("seed")), "test", {
        ...rules,
        nameSegments: 2,
      }),
    ).not.toThrow();
    const parameter = new Stack("names").parameters.add("name", "string");
    expect(() => assertValidResourceName(parameter, "test", rules)).not.toThrow();
  });

  it("validates literals with regex constructs unsupported by name generation", () => {
    const constraints = {
      ...rules,
      pattern: { regex: "^(?!.*--)[a-z0-9-]+$" },
    };
    expect(() => assertValidResourceName("abc", "test", constraints)).not.toThrow();
    expect(() => assertValidResourceName("a--b", "test", constraints)).toThrow("Name must match");
  });

  it("validates constructor, existing-reference, and assignment inputs", () => {
    const stack = new Stack("names");
    expect(() => new NamedResource(stack, { name: "INVALID" })).toThrow("lowercase");
    expect(() => new NamedResource(stack, { name: "INVALID", existing: true })).toThrow(
      "lowercase",
    );
    expect(stack.children).toHaveLength(0);
    const resource = new NamedResource(stack, { name: "logs" });
    expect(() => {
      resource.name = "INVALID";
    }).toThrow("lowercase");
    expect(deref(resource.name)).toBe("logs");
  });

  it("validates each explicit, generated, and assigned name once at its authoring boundary", () => {
    const validation = vi.spyOn(nameValidation, "assertValidResourceName");
    try {
      const stack = new Stack("names");
      const explicit = new NamedResource(stack, { name: "logs" });
      expect(validation).toHaveBeenCalledTimes(1);
      validation.mockClear();
      new NamedResource(stack);
      expect(validation).toHaveBeenCalledTimes(1);
      validation.mockClear();
      explicit.name = "other";
      expect(validation).toHaveBeenCalledTimes(1);
    } finally {
      validation.mockRestore();
    }
  });

  it("serializes authored names without revalidating them", () => {
    const stack = new Stack("names");
    const resource = new NamedResource(stack, { name: "logs" });
    unwrapResourceHandle(resource).name = "INVALID";
    const serialized = serialize(stack);
    const declaration = Object.values(serialized.infras[0]!.resources!)[0]!;
    expect(declaration.value).toMatchObject({
      kind: "object",
      value: { name: { kind: "string", value: "INVALID" } },
    });
  });

  it("revalidates restored names using registered metadata", () => {
    const stack = new Stack("names");
    new NamedResource(stack, { name: "logs" });
    const json = JSON.stringify(serialize(stack));
    expect(deref(deserialize(json)[0]!.getResources(NamedResource)[0]!.name)).toBe("logs");
    expect(() => deserialize(json.replace('"logs"', '"INVALID"'))).toThrow("lowercase");
  });

  it.each([false, true])(
    "preserves composite names through construction, assignment, and restoration (existing: %s)",
    (existing) => {
      const stack = new Stack("names");
      const resource = new NamedResource(stack, {
        name: "owner/logs",
        existing,
      });
      expect(deref(resource.name)).toBe("owner/logs");
      resource.name = "owner/proxy/logs";
      const restored = deserialize(JSON.stringify(serialize(stack)))[0]!;
      expect(deref(restored.getResources(NamedResource)[0]!.name)).toBe("owner/proxy/logs");
      expect(() => {
        resource.name = "owner/INVALID";
      }).toThrow("lowercase");
      expect(deref(resource.name)).toBe("owner/proxy/logs");
    },
  );

  it("preserves custom naming-policy output without imposing a segment count", () => {
    const stack = new Stack("names", {
      namingPolicy: { generateName: () => "owner/proxy/logs" },
    });
    const resource = new NamedResource(stack);
    expect(deref(resource.name)).toBe("owner/proxy/logs");
  });

  it("rejects custom policy output and does not leave partial declarations", () => {
    const stack = new Stack("names", {
      namingPolicy: { generateName: () => "INVALID" },
    });
    expect(() => new NamedResource(stack)).toThrow("Cannot generate a compliant name");
    expect(stack.children).toHaveLength(0);
  });

  it("does not trust overrides of the default naming policy to validate their output", () => {
    class InvalidPolicy extends DefaultNamingPolicy {
      override generateName() {
        return "INVALID";
      }
    }
    const stack = new Stack("names", {
      namingPolicy: new InvalidPolicy({ workload: "app" }),
    });
    expect(() => new NamedResource(stack)).toThrow("Cannot generate a compliant name");
    expect(stack.children).toHaveLength(0);
  });

  it("validates loop names and requires an explicit per-iteration name", () => {
    const stack = new Stack("names");
    const loop = new Loop(["first", "second"]);
    expect(() => createLoopedResource(NamedResource, loop, stack, {})).toThrow(
      "per-iteration name",
    );
    expect(() => createLoopedResource(NamedResource, loop, stack, { name: "INVALID" })).toThrow(
      "lowercase",
    );
    expect(stack.children).toHaveLength(0);
    const valid = createLoopedResource(NamedResource, loop, stack, {
      name: loop.item,
    });
    expect(() => Reflect.set(valid.at(0), "name", "INVALID")).toThrow();
  });
});

describe("ARM name-segment compatibility", () => {
  class BlobService extends Resource<"Microsoft.Storage/storageAccounts/blobServices"> {
    protected static namingRules: ResourceNamingRules = {
      ...rules,
      nameSegments: 2,
      scope: "parent",
    };
    constructor(context: ProvisioningComponent, name: string) {
      super(context, {
        type: "Microsoft.Storage/storageAccounts/blobServices",
        apiVersion: "2024-01-01",
        existing: true,
        name,
      });
    }
  }

  function createBlobServiceStack(declaredParent: boolean, name: string) {
    const stack = new Stack("names", { targetScope: "resourceGroup" });
    const context = declaredParent
      ? new Resource(stack, {
          type: "Microsoft.Storage/storageAccounts",
          apiVersion: "2024-01-01",
          existing: true,
          name: "account",
        })
      : stack;
    new BlobService(context, name);
    return stack;
  }

  it.each([false, true])(
    "compiles names relative to the actual ARM parent (declared: %s)",
    (declaredParent) => {
      const stack = createBlobServiceStack(
        declaredParent,
        declaredParent ? "default" : "account/default",
      );
      validateRenderedBicepFiles(renderBicepFiles(stack));
    },
    60_000,
  );

  it.each([
    { diagnostic: "BCP169", declaredParent: false, name: "default" },
    { diagnostic: "BCP170", declaredParent: true, name: "account/default" },
  ])(
    "defers literal segment-count errors to the Bicep compiler ($diagnostic)",
    ({ diagnostic, declaredParent, name }) => {
      const stack = createBlobServiceStack(declaredParent, name);
      expect(() => validateRenderedBicepFiles(renderBicepFiles(stack))).toThrow(diagnostic);
    },
    60_000,
  );
});

describe("constraint-driven name generation", () => {
  it.each([
    [String.raw`^\d{3,8}$`, "A1B2C3"],
    [String.raw`^\x61[a-z\d]*\u0062$`, "9Workload"],
    [String.raw`^[A-Z]\w*[A-Z]$`, "Workload_9"],
    [String.raw`^[a-z]{0}[0-9]+$`, "App123"],
  ])("uses parsed regex atoms to generate for %s", (regex, workload) => {
    const constraints: ResourceNamingRules = {
      abbreviation: "",
      minLength: 3,
      maxLength: 12,
      pattern: { regex },
      scope: "parent",
    };
    const name = new DefaultNamingPolicy({ workload }).generateName({
      type: "Contoso.Test/children",
      rules: constraints,
    });
    expect(typeof name).toBe("string");
    expect(new RegExp(regex).test(String(name))).toBe(true);
    expect(String(name).length).toBeGreaterThanOrEqual(3);
    expect(String(name).length).toBeLessThanOrEqual(12);
  });

  it.each(["^[a-z0-9]+(-[a-z0-9]+)*$", "^[a-z0-9]+(?:-[a-z0-9]+)*$", "^[a-z0-9]+(-[a-z0-9]+)*"])(
    "generates distinct matching names for separator pattern %s",
    (regex) => {
      const constraints: ResourceNamingRules = {
        abbreviation: "st",
        minLength: 3,
        maxLength: 24,
        pattern: { regex },
        scope: "parent",
      };
      const policy = new DefaultNamingPolicy({ workload: "my--app" });
      const names = Array.from({ length: 3 }, () =>
        policy.generateName({ type: "test", rules: constraints }),
      );
      expect(new Set(names).size).toBe(3);
      for (const name of names) {
        expect(typeof name).toBe("string");
        expect(new RegExp(regex).test(String(name))).toBe(true);
      }
    },
  );

  it("validates policy candidates at resource construction, not during candidate generation", () => {
    const constraints: ResourceNamingRules = {
      abbreviation: "",
      pattern: { regex: "^(?=abc$)[a-z]+$" },
      scope: "parent",
    };
    expect(() => assertValidResourceName("abc", "test", constraints)).not.toThrow();
    expect(
      new DefaultNamingPolicy({ workload: "other" }).generateName({
        type: "test",
        rules: constraints,
      }),
    ).toBe("other");
    class PatternResource extends NamedResource {
      protected static override namingRules = constraints;
    }
    const stack = new Stack("names", {
      namingPolicy: new DefaultNamingPolicy({ workload: "other" }),
    });
    expect(() => new PatternResource(stack)).toThrow("Cannot generate a compliant name");
    expect(stack.children).toHaveLength(0);
  });

  it("surfaces invalid regex metadata instead of falling back to a naming alphabet", () => {
    expect(() =>
      new DefaultNamingPolicy({ workload: "app" }).generateName({
        type: "test",
        rules: { ...rules, pattern: { regex: "[" } },
      }),
    ).toThrow(SyntaxError);
  });

  it.each([
    ["^(ab|cd)-[0-9]{4}$", "ab-1234"],
    [String.raw`^([a-z]{2})-\1$`, "ab-ab"],
  ])("validates explicit names with grouping and backreferences for %s", (regex, name) => {
    const constraints: ResourceNamingRules = {
      abbreviation: "",
      minLength: 3,
      maxLength: 12,
      pattern: { regex },
      scope: "parent",
    };
    expect(() => assertValidResourceName(name, "test", constraints)).not.toThrow();
  });

  it("is deterministic without using Math.random", () => {
    const random = vi.spyOn(Math, "random").mockImplementation(() => {
      throw new Error("Unseeded randomness must not be used.");
    });
    try {
      const generate = () => {
        const policy = new DefaultNamingPolicy({
          workload: "app",
          environment: "prod",
          region: "eastus",
        });
        return Array.from({ length: 20 }, () =>
          policy.generateName({
            type: "test",
            rules: { ...rules, scope: "parent" },
            label: "logs",
          }),
        );
      };
      const first = generate();
      expect(first).toEqual(generate());
      expect(new Set(first).size).toBe(20);
      expect(random).not.toHaveBeenCalled();
    } finally {
      random.mockRestore();
    }
  });

  it("validates custom policy output against the original pattern", () => {
    let candidate = "abc";
    class PatternResource extends NamedResource {
      protected static override namingRules: ResourceNamingRules = {
        abbreviation: "",
        pattern: { regex: "^(?!abc)[a-z]{3}$" },
        scope: "parent",
      };
    }
    const stack = new Stack("names", {
      namingPolicy: { generateName: () => candidate },
    });
    expect(() => new PatternResource(stack)).toThrow("Name must match");
    candidate = "xyz";
    expect(deref(new PatternResource(stack).name)).toBe("xyz");
    expect(stack.children).toHaveLength(1);
  });

  it("rejects explicit names that violate length bounds even when their pattern matches", () => {
    expect(() =>
      assertValidResourceName("fixed", "test", {
        abbreviation: "",
        maxLength: 4,
        pattern: { regex: "^fixed$" },
        scope: "parent",
      }),
    ).toThrow("at most 4");
  });

  it("preserves unanchored semantics while satisfying independent minimum lengths", () => {
    const name = new DefaultNamingPolicy({ workload: "abc" }).generateName({
      type: "test",
      rules: {
        abbreviation: "",
        minLength: 5,
        maxLength: 8,
        pattern: { regex: "abc" },
        scope: "parent",
      },
    });
    expect(String(name)).toMatch(/abc/);
    expect(String(name).length).toBeGreaterThanOrEqual(5);
    expect(String(name).length).toBeLessThanOrEqual(8);
  });

  it("does not impose a convention length cap on explicit names without a maximum", () => {
    expect(() =>
      assertValidResourceName("a".repeat(32), "test", {
        abbreviation: "",
        pattern: { regex: "^a{32}$" },
        scope: "global",
      }),
    ).not.toThrow();
  });

  it("keeps complex patterns usable for explicit-name validation", () => {
    const constraints: ResourceNamingRules = {
      abbreviation: "",
      pattern: { regex: "(?<=a)b" },
      scope: "parent",
    };
    expect(() => assertValidResourceName("ab", "test", constraints)).not.toThrow();
    const candidate = new DefaultNamingPolicy({
      workload: "app",
    }).generateName({ type: "test", rules: constraints });
    expect(() => assertValidResourceName(candidate, "test", constraints)).toThrow(
      "Name must match",
    );
  });

  it("preserves workload segments and ordinal suffixes without a pattern", () => {
    const namingRules: ResourceNamingRules = {
      abbreviation: "ct",
      maxLength: 64,
      separator: "-",
      scope: "resourceGroup",
    };
    const policy = new DefaultNamingPolicy({
      workload: "MyApp",
      environment: "prod",
      region: "eus",
    });
    const context = { type: "test", rules: namingRules, label: "logs" };
    expect(policy.generateName(context)).toBe("ct-myapp-prod-eus-logs");
    expect(policy.generateName(context)).toBe("ct-myapp-prod-eus-logs-2");
  });

  it.each([{ minLength: 5, maxLength: 8 }, { minLength: 32 }, { maxLength: 2 }])(
    "honors local naming length metadata %j",
    (bounds) => {
      const policy = new DefaultNamingPolicy({ workload: "app" });
      const minimum = Math.max(1, bounds.minLength ?? 1);
      const maximum = bounds.maxLength ?? Math.max(24, minimum);
      for (let index = 0; index < 5; index++) {
        const name = policy.generateName({
          type: "test",
          rules: { abbreviation: "", scope: "parent", ...bounds },
        });
        expect(String(name)).toMatch(/^[a-z0-9]+$/);
        expect(String(name).length).toBeGreaterThanOrEqual(minimum);
        expect(String(name).length).toBeLessThanOrEqual(maximum);
      }
    },
  );

  it.each([{ minLength: -1 }, { maxLength: 1.5 }, { minLength: NaN }, { maxLength: Infinity }])(
    "rejects invalid naming length metadata %j",
    (bounds) => {
      expect(() =>
        assertValidResourceName("logs", "test", {
          abbreviation: "",
          scope: "global",
          ...bounds,
        }),
      ).toThrow("non-negative safe integers");
    },
  );

  it.each([-1, 0, 1.5, NaN, Infinity])(
    "rejects invalid automatic-naming segment metadata %s",
    (nameSegments) => {
      const policy = new DefaultNamingPolicy({ workload: "app" });
      expect(() =>
        policy.generateName({
          type: "test",
          rules: { ...rules, nameSegments },
        }),
      ).toThrow("positive safe integer");
    },
  );

  it("rejects non-empty literal names for zero-length contracts", () => {
    expect(() =>
      assertValidResourceName("a", "test", {
        abbreviation: "",
        scope: "global",
        minLength: 0,
        maxLength: 0,
      }),
    ).toThrow("at most 0");
  });

  it("covers varied workloads and repetition against the original rules", () => {
    for (const workload of ["", "!!!", "My-App_Name.test", "9workload", "a".repeat(300)]) {
      const policy = new DefaultNamingPolicy({ workload });
      for (let i = 0; i < 20; i++) {
        const name = policy.generateName({
          type: "Contoso.Test/storage",
          rules,
        });
        expect(() => assertValidResourceName(name, "test", rules)).not.toThrow();
      }
    }
  });

  it("pads names to the minimum and respects start/end constraints", () => {
    const policy = new DefaultNamingPolicy({ workload: "9-" });
    const constraints: ResourceNamingRules = {
      abbreviation: "",
      minLength: 8,
      maxLength: 12,
      pattern: { regex: "^[a-z][a-z0-9-]*[a-z0-9]$" },
      scope: "parent",
    };
    const name = policy.generateName({
      type: "Contoso.Test/children",
      rules: constraints,
    });
    expect(typeof name).toBe("string");
    expect(() => assertValidResourceName(name, "test", constraints)).not.toThrow();
  });

  it("rejects incompatible separators and insufficient suffix budgets", () => {
    const policy = new DefaultNamingPolicy({ workload: "app" });
    expect(() =>
      policy.generateName({
        type: "test",
        rules: { ...rules, separator: "-" },
      }),
    ).toThrow("separator");
    expect(() =>
      policy.generateName({
        type: "test",
        rules: { ...rules, maxLength: 10 },
      }),
    ).toThrow("suffix");
  });

  it("does not return colliding names after truncation", () => {
    const policy = new DefaultNamingPolicy({ workload: "a2" });
    const constraints: ResourceNamingRules = {
      abbreviation: "",
      minLength: 1,
      maxLength: 2,
      pattern: { regex: "^[a-z0-9]+$" },
      scope: "parent",
    };
    expect(policy.generateName({ type: "test", rules: constraints })).toBe("a2");
    expect(() => policy.generateName({ type: "test", rules: constraints })).toThrow(
      "distinct name",
    );
  });
});
