import { describe, expect, it } from "vitest";
import { sideEffects } from "../src/checks/packageJson.ts";
import { resolveProject } from "../src/util/resolveProject.ts";

describe("package.json sideEffects check", () => {
  it.each([
    { sdkType: "provisioning" as const, expected: true },
    { sdkType: "client" as const, expected: false },
    { sdkType: "mgmt" as const, expected: false },
    { sdkType: "utility" as const, expected: false },
  ])("requires $expected for $sdkType packages", async ({ sdkType, expected }) => {
    const project = await resolveProject(import.meta.dirname);
    const context = {
      fix: false,
      verbose: false,
      project: {
        ...project,
        packageJson: { ...project.packageJson, "sdk-type": sdkType, sideEffects: expected },
      },
    };

    await expect(sideEffects.check(context)).resolves.toBeUndefined();
    context.project.packageJson.sideEffects = !expected;
    await expect(sideEffects.check(context)).rejects.toThrow(/sideEffects/);
  });
});
