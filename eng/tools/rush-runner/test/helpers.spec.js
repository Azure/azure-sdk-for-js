import { assert, describe, it } from "vitest";
import { getDirectionMappedPackages, reducedDependencyTestMatrix } from "../helpers.js";

describe("getDirectionMappedPackages", () => {
  it("should use --to reduced core scope for changed core package", () => {
    const changed = ["@azure/core-client"];
    const mapped = getDirectionMappedPackages(changed, ["unit-test"]);

    assert.deepStrictEqual(
      mapped,
      reducedDependencyTestMatrix["core"].map((p) => ["--to", p]),
    );
  });

  it("should use --to reduced core scope for changed test-util package", () => {
    const changed = ["@azure-tool/test-utils-vitest"];
    const mapped = getDirectionMappedPackages(changed, ["unit-test"]);

    assert.deepStrictEqual(
      mapped,
      reducedDependencyTestMatrix["core"].map((p) => ["--to", p]),
    );
  });

  it("should use --from for changed non-core packages", () => {
    const changed = ["@azure/app-configuration"];
    const mapped = getDirectionMappedPackages(changed, ["unit-test"]);

    const expected = [["--from", "@azure/app-configuration"]];
    assert.deepStrictEqual(mapped, expected);
  });

  it("should use --to and --from for mixed packages", () => {
    const changed = ["@azure/core-rest-pipeline", "@azure/app-configuration"];
    const mapped = getDirectionMappedPackages(changed, ["lint"]);

    const expected = reducedDependencyTestMatrix["core"].map((p) => ["--to", p]);
    expected.push(["--from", "@azure/app-configuration"]);
    assert.deepStrictEqual(mapped, expected);
  });
});
