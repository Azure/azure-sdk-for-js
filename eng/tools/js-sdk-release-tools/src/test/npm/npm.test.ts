import { beforeEach, describe, expect, test, vi } from "vitest";
import { updatePackageVersion } from "../../mlc/clientGenerator/utils/typeSpecUtils.js";
import { join } from "path";
import { load } from "@npmcli/package-json";
import { tryGetNpmView } from "../../common/npmUtils.js";
import * as fetch from "npm-registry-fetch";
import { logger } from "../../utils/logger.js";

vi.mock("npm-registry-fetch", () => ({ json: vi.fn() }));

describe("Npm package json", () => {
  test("Replace package version", async () => {
    const packageDirectory = join(__dirname, "testCases");
    await updatePackageVersion(packageDirectory, "2.0.0");
    const packageJson = await load(packageDirectory);
    expect(packageJson.content.version).toBe("2.0.0");
  });
});

describe("Npm view", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test("uses the public npm registry first", async () => {
    const infoSpy = vi.spyOn(logger, "info");
    vi.mocked(fetch.json).mockResolvedValue({ name: "connect" });

    const result = await tryGetNpmView("connect");

    expect(result).toEqual({ name: "connect" });
    expect(fetch.json).toHaveBeenCalledOnce();
    expect(fetch.json).toHaveBeenCalledWith("/connect", {
      registry: "https://registry.npmjs.org/",
    });
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining("from public npm"));
  });

  test("falls back to the Azure SDK feed when public npm fails", async () => {
    const infoSpy = vi.spyOn(logger, "info");
    vi.mocked(fetch.json)
      .mockRejectedValueOnce(new Error("not found"))
      .mockResolvedValueOnce({ name: "@azure/example" });

    const result = await tryGetNpmView("@azure/example");

    expect(result).toEqual({ name: "@azure/example" });
    expect(fetch.json).toHaveBeenNthCalledWith(1, "/@azure/example", {
      registry: "https://registry.npmjs.org/",
    });
    expect(fetch.json).toHaveBeenNthCalledWith(2, "/@azure/example", {
      registry:
        "https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-js/npm/registry/",
    });
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining("from Azure SDK feed"));
  });

  test("returns undefined when neither source has package information", async () => {
    const errorSpy = vi.spyOn(logger, "error");
    vi.mocked(fetch.json).mockRejectedValue(new Error("not found"));

    const result = await tryGetNpmView("non-exist");

    expect(result).toBeUndefined();
    expect(fetch.json).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("from all sources"));
  });
});
