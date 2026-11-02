// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it } from "vitest";
import { Resource, Stack } from "../src/index.js";
import type { ProvisioningComponent } from "../src/constructs/provisioning-component.js";
import type { ResourceOptions, ResourceProps } from "../src/constructs/resource/resource.js";
import { createLoopedResource, Loop } from "../src/internal-loop.js";
import { DEFAULT_NAMING_RULES, type ResourceNamingRules } from "../src/naming/naming-rules.js";

describe("resource construction validation", () => {
  afterEach(() => Stack.clearRoots());

  it.each([false, true])(
    "passes all construction inputs to the resource class before registration (looped: %s)",
    (looped) => {
      const stack = new Stack("validation");
      const rules: ResourceNamingRules = {
        ...DEFAULT_NAMING_RULES,
        abbreviation: "test",
      };
      const options: ResourceOptions = { condition: true };
      const props = {
        type: "Contoso.Test/widgets",
        apiVersion: "2024-01-01",
        name: "widget",
        properties: { enabled: true },
      };
      let calls = 0;
      class ValidatedResource extends Resource {
        protected static override namingRules = rules;

        protected static override validate(
          context: ProvisioningComponent,
          resourceProps: ResourceProps<string> & Record<string, unknown>,
          resourceOptions?: ResourceOptions,
          namingRules?: ResourceNamingRules,
        ): void {
          calls++;
          expect(this).toBe(ValidatedResource);
          expect(context).toBe(stack);
          expect(resourceProps).toEqual(props);
          expect(resourceOptions).toBe(options);
          expect(namingRules).toBe(rules);
          expect(context.children).toEqual([]);
        }
      }

      const resource = looped
        ? createLoopedResource(ValidatedResource, new Loop(["widget"]), stack, props, options)
        : new ValidatedResource(stack, props, options);
      expect(calls).toBe(1);
      expect(stack.children).toEqual([resource]);
    },
  );

  it.each([false, true])("does not register a rejected declaration (looped: %s)", (looped) => {
    const stack = new Stack("rejected");
    class RejectedResource extends Resource {
      protected static override validate(): void {
        throw new Error("Invalid construction inputs.");
      }
    }
    const props = {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "widget",
    };
    expect(() =>
      looped
        ? createLoopedResource(RejectedResource, new Loop(["widget"]), stack, props)
        : new RejectedResource(stack, props),
    ).toThrow("Invalid construction inputs.");
    expect(stack.children).toEqual([]);
  });
});
