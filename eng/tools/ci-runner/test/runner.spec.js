// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, describe, it, vi } from "vitest";
import { runAllWithDirection } from "../src/runner.js";
import { spawnPnpm, spawnPnpmWithOutput } from "../src/spawn.js";

vi.mock("../src/spawn.js", async () => {
  return {
    spawnPnpmRun: vi.fn(),
    spawnPnpm: vi.fn(),
    spawnPnpmWithOutput: vi.fn(),
  };
});

vi.mock("../src/testProxyRestore.js", async () => {
  return { runTestProxyRestore: vi.fn() };
});

describe("runAllWithDirection two-pass resolution", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should use direct filters when command is short", () => {
    runAllWithDirection("test:node", ["@azure/app-configuration"], [], false);

    assert.strictEqual(
      vi.mocked(spawnPnpmWithOutput).mock.calls.length,
      0,
      "should not call pnpm list for short commands",
    );
    const call = vi.mocked(spawnPnpm).mock.calls[0];
    assert.ok(call.includes("--filter"));
    assert.ok(call.includes("@azure/app-configuration"));
  });

  it("should trigger two-pass when filter args exceed threshold", () => {
    // Build a filter list that exceeds 7000 chars
    const filters = ["...@azure/app-configuration"];
    for (let i = 0; i < 200; i++) {
      filters.push(`!@azure/some-very-long-package-name-${i}`);
    }

    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce(
      JSON.stringify([
        { name: "@azure/app-configuration" },
        { name: "@azure/unchanged-dependent" },
        { name: "@azure/some-very-long-package-name-50" },
      ]),
    );

    runAllWithDirection("test:node", filters, [], false);

    // Should have called pnpm list with only inclusion filters
    const listCall = vi.mocked(spawnPnpmWithOutput).mock.calls[0];
    assert.ok(listCall, "should call pnpm list for resolution");
    assert.ok(
      !listCall.some((a) => typeof a === "string" && a.startsWith("!")),
      "pnpm list should not include !exclusion filters",
    );
    assert.ok(
      listCall.includes("...@azure/app-configuration"),
      "should include the inclusion filter",
    );

    // Final command should have concrete names only
    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    assert.ok(testCall.includes("@azure/app-configuration"), "batch package included");
    assert.ok(testCall.includes("@azure/unchanged-dependent"), "unchanged dependent included");
    assert.ok(
      !testCall.includes("@azure/some-very-long-package-name-50"),
      "excluded package removed",
    );

    // No ...P or !P patterns in final command
    const finalFilters = testCall.filter((a, i) => i > 0 && testCall[i - 1] === "--filter");
    for (const f of finalFilters) {
      assert.ok(!f.startsWith("..."), `should not have ...prefix: ${f}`);
      assert.ok(!f.startsWith("!"), `should not have !exclusion: ${f}`);
    }
  });

  it("should fall back when spawnPnpmWithOutput throws", () => {
    const filters = ["...@azure/app-configuration"];
    for (let i = 0; i < 300; i++) {
      filters.push(`!@azure/some-other-batch-pkg-${i}`);
    }

    vi.mocked(spawnPnpmWithOutput).mockImplementationOnce(() => {
      throw new Error("Error executing command: spawn pnpm ENOENT");
    });

    runAllWithDirection("test:node", filters, [], false);

    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    assert.ok(testCall.includes("...@azure/app-configuration"), "should use original filters");
    assert.ok(
      testCall.some((a) => typeof a === "string" && a.startsWith("!@azure/some-other-batch-pkg-")),
      "should include original exclusion filters as fallback",
    );
  });

  it("should fall back to original filters on invalid pnpm list output", () => {
    const filters = ["...@azure/app-configuration"];
    for (let i = 0; i < 300; i++) {
      filters.push(`!@azure/some-other-batch-pkg-${i}`);
    }

    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("not valid json");

    runAllWithDirection("test:node", filters, [], false);

    // Should fall back to original filter list (with !exclusions)
    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    assert.ok(testCall.includes("...@azure/app-configuration"), "should use original filters");
    assert.ok(
      testCall.some((a) => typeof a === "string" && a.startsWith("!@azure/some-other-batch-pkg-")),
      "should include original exclusion filters as fallback",
    );
    // Verify pnpm list WAS called (the two-pass was triggered)
    assert.strictEqual(
      vi.mocked(spawnPnpmWithOutput).mock.calls.length,
      1,
      "should have attempted pnpm list resolution",
    );
  });

  it("should handle pnpm list returning empty array", () => {
    const filters = ["...@azure/app-configuration"];
    for (let i = 0; i < 300; i++) {
      filters.push(`!@azure/some-other-batch-pkg-${i}`);
    }

    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("[]");

    runAllWithDirection("test:node", filters, [], false);

    // With empty resolution, should fall back to the original filters
    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    assert.ok(
      testCall.includes("...@azure/app-configuration"),
      "should use original filters when resolution is empty",
    );
    assert.ok(
      testCall.some((a) => typeof a === "string" && a.startsWith("!@azure/some-other-batch-pkg-")),
      "should include original exclusion filters when resolution is empty",
    );
    assert.strictEqual(
      vi.mocked(spawnPnpmWithOutput).mock.calls.length,
      1,
      "should have attempted pnpm list resolution",
    );
  });

  it("at scale: 400 exclusions produce a short final command", () => {
    const filters = [
      "...@azure/app-configuration",
      "@azure/identity",
      "@azure/template",
    ];

    for (let i = 0; i < 400; i++) {
      filters.push(`!@azure/other-batch-pkg-${i}`);
    }

    // pnpm list resolves inclusions + some dependents
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce(
      JSON.stringify([
        { name: "@azure/app-configuration" },
        { name: "@azure/identity" },
        { name: "@azure/template" },
        { name: "@azure/unchanged-dep-a" },
        { name: "@azure/unchanged-dep-b" },
        { name: "@azure/other-batch-pkg-50" },
        { name: "@azure/other-batch-pkg-200" },
      ]),
    );

    runAllWithDirection("test:node", filters, [], false);

    // Verify pnpm list only got inclusion filters
    const listCall = vi.mocked(spawnPnpmWithOutput).mock.calls[0];
    const listFilterCount = listCall.filter((a) => a === "--filter").length;
    assert.strictEqual(listFilterCount, 3, "pnpm list should have exactly 3 inclusion filters");

    // Verify final command is short (exclude cwd argument at index 0)
    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    const cmdArgs = testCall.slice(1);
    const cmdLength = cmdArgs.join(" ").length;
    assert.ok(cmdLength < 8191, `final command ${cmdLength} chars should be under 8191`);

    // Verify correct packages included/excluded
    assert.ok(testCall.includes("@azure/app-configuration"));
    assert.ok(testCall.includes("@azure/identity"));
    assert.ok(testCall.includes("@azure/template"));
    assert.ok(testCall.includes("@azure/unchanged-dep-a"));
    assert.ok(testCall.includes("@azure/unchanged-dep-b"));
    assert.ok(!testCall.includes("@azure/other-batch-pkg-50"), "excluded package filtered out");
    assert.ok(!testCall.includes("@azure/other-batch-pkg-200"), "excluded package filtered out");
  });

  it("exclusion removes all resolved packages except those not in exclusionSet", () => {
    const filters = ["...@azure/app-configuration", "!@azure/dep-a", "!@azure/dep-b"];
    // Add enough filler exclusions to exceed the 7000-char threshold
    for (let i = 0; i < 300; i++) {
      filters.push(`!@azure/filler-other-batch-pkg-${i}`);
    }

    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce(
      JSON.stringify([
        { name: "@azure/app-configuration" },
        { name: "@azure/dep-a" },
        { name: "@azure/dep-b" },
      ]),
    );

    runAllWithDirection("test:node", filters, [], false);

    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    const finalFilters = testCall.filter((a, i) => i > 0 && testCall[i - 1] === "--filter");
    assert.deepStrictEqual(finalFilters, ["@azure/app-configuration"]);
  });

  it("should pass through extraParams after filters", () => {
    const filters = ["@azure/app-configuration"];
    runAllWithDirection("test:node", filters, ["--concurrency=1"], false);

    const testCall = vi.mocked(spawnPnpm).mock.calls[0];
    assert.ok(testCall.includes("--concurrency=1"), "extra params should be passed through");
    // Extra params come after the filters
    const filterIdx = testCall.indexOf("@azure/app-configuration");
    const paramIdx = testCall.indexOf("--concurrency=1");
    assert.ok(paramIdx > filterIdx, "extra params should come after filters");
  });
});
