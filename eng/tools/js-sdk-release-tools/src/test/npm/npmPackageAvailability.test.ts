import { beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  spawnSync: vi.fn(),
}));

vi.mock("child_process", async (importOriginal) => ({
  ...(await importOriginal<typeof import("child_process")>()),
  spawnSync: mocks.spawnSync,
}));

import { getLatestAvailableNpmPackageVersion } from "../../common/npmUtils.js";

const npmView = {
  "dist-tags": { latest: "1.2.2-alpha.1" },
  versions: {
    "1.2.0": {},
    "1.2.1": {},
    "1.2.2-alpha.1": {},
  },
};

describe("npm package availability", () => {
  beforeEach(() => {
    mocks.spawnSync.mockReset();
  });

  test("falls back to the previous compatible version", () => {
    mocks.spawnSync
      .mockReturnValueOnce({ status: 1, stdout: "", stderr: "version unavailable" })
      .mockReturnValueOnce({ status: 0, stdout: "[]", stderr: "" });

    expect(getLatestAvailableNpmPackageVersion("@azure/arm-example", npmView)).toBe("1.2.0");
    expect(mocks.spawnSync).toHaveBeenCalledTimes(2);
    expect(mocks.spawnSync.mock.calls[0][1]).toEqual(
      expect.arrayContaining(["@azure/arm-example@1.2.1", "--dry-run", "--json"]),
    );
    expect(mocks.spawnSync.mock.calls[1][1]).toEqual(
      expect.arrayContaining(["@azure/arm-example@1.2.0", "--dry-run", "--json"]),
    );
  });

  test("throws when no compatible version is available", () => {
    mocks.spawnSync.mockReturnValue({
      status: 1,
      stdout: "",
      stderr: "version unavailable",
    });

    expect(() => getLatestAvailableNpmPackageVersion("@azure/arm-example", npmView)).toThrow(
      "None of the compatible npm package versions are available for @azure/arm-example: 1.2.1, 1.2.0",
    );
  });
});
