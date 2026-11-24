import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { execFileSync } from "child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { pathToFileURL } from "url";
import { logger } from "../../utils/logger.js";
import {
  NpmViewParameters,
  tryCreateLastestStableNpmViewFromGithub,
} from "../../common/npmUtils.js";

describe("release tag baseline retrieval", () => {
  const packageName = "@azure/arm-test";
  const tag = `${packageName}_1.0.0`;
  const baseline = "```ts\nexport interface OriginalModel {}\n```\n";
  let tempPath: string;
  let remotePath: string;
  let sourcePath: string;
  let sdkRootPath: string;
  let parameters: NpmViewParameters;

  function git(repoPath: string, ...args: string[]): string {
    return execFileSync("git", ["-C", repoPath, ...args], { encoding: "utf8" });
  }

  function prepareCheckout(files: Record<string, string>, annotated = false): void {
    git(sourcePath, "init", "--initial-branch=main");
    git(sourcePath, "config", "user.name", "Release Tools Test");
    git(sourcePath, "config", "user.email", "release-tools@example.test");
    git(sourcePath, "config", "core.autocrlf", "false");
    git(sourcePath, "config", "commit.gpgsign", "false");
    git(sourcePath, "config", "tag.gpgsign", "false");
    const sourcePackagePath = join(sourcePath, "sdk", "test", "arm-test");
    mkdirSync(join(sourcePackagePath, "review"), { recursive: true });
    const packageJson = JSON.stringify({ name: packageName, version: "1.0.0" });
    writeFileSync(join(sourcePackagePath, "package.json"), packageJson);
    for (const [filePath, content] of Object.entries(files)) {
      writeFileSync(join(sourcePackagePath, filePath), content);
    }
    git(sourcePath, "add", ".");
    git(sourcePath, "-c", "core.hooksPath=", "commit", "-m", "Released API");
    git(sourcePath, "tag", ...(annotated ? ["-a", "-m", "Release"] : []), tag);
    git(sourcePath, "-c", "core.hooksPath=", "commit", "--allow-empty", "-m", "Current SDK");
    git(sourcePath, "tag", "unrelated-release");
    git(tempPath, "clone", "--bare", sourcePath, remotePath);
    git(tempPath, "clone", "--no-local", "--depth=1", "--no-tags", remotePath, sdkRootPath);
    git(
      sdkRootPath,
      "config",
      `url.${pathToFileURL(remotePath).href}.insteadOf`,
      "https://github.com/Azure/azure-sdk-for-js.git",
    );

    const npmPackagePath = join(tempPath, "npm package");
    mkdirSync(join(npmPackagePath, "review"), { recursive: true });
    writeFileSync(join(npmPackagePath, "package.json"), packageJson);
    parameters = {
      file: "ApiView",
      version: "1.0.0",
      packageName,
      sdkRootPath,
      packageFolderPath: join(sdkRootPath, "sdk", "test", "arm-test"),
      npmPackagePath,
    };
  }

  function targetPath(): string {
    return join(parameters.npmPackagePath, "review", "arm-test.api.md");
  }

  beforeEach(() => {
    tempPath = mkdtempSync(join(tmpdir(), "release tools baseline "));
    sourcePath = join(tempPath, "source");
    remotePath = join(tempPath, "origin.git");
    sdkRootPath = join(tempPath, "sdk checkout");
    mkdirSync(sourcePath);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    rmSync(tempPath, { recursive: true, force: true });
  });

  test.each([false, true])("fetches a missing tag (annotated: %s)", (annotated) => {
    prepareCheckout({ "review/arm-test.api.md": baseline }, annotated);
    expect(git(sdkRootPath, "tag", "--list")).toBe("");
    expect(git(sdkRootPath, "rev-parse", "--is-shallow-repository").trim()).toBe("true");

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
    expect(git(sdkRootPath, "rev-parse", "FETCH_HEAD")).toBe(
      git(sourcePath, "rev-parse", `refs/tags/${tag}`),
    );
    expect(git(sdkRootPath, "tag", "--list")).toBe("");
  });

  test("uses an existing local release tag without fetching or replacing it", () => {
    prepareCheckout({ "review/arm-test.api.md": baseline });
    git(sdkRootPath, "fetch", "--no-tags", "origin", `refs/tags/${tag}:refs/tags/${tag}`);
    const originalTag = git(sdkRootPath, "rev-parse", `refs/tags/${tag}`);
    git(sdkRootPath, "remote", "remove", "origin");
    git(tempPath, "--git-dir", remotePath, "tag", "--delete", tag);

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
    expect(git(sdkRootPath, "rev-parse", `refs/tags/${tag}`)).toBe(originalTag);
  });

  test("retrieves the release tag from upstream when origin is a sync repository without tags", () => {
    prepareCheckout({ "review/arm-test.api.md": baseline });
    const syncRepository = join(tempPath, "azure-sdk-for-js-pr.git");
    git(tempPath, "init", "--bare", syncRepository);
    git(sdkRootPath, "remote", "set-url", "origin", syncRepository);
    const warn = vi.spyOn(logger, "warn");

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("Failed to fetch release tag"));
    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
    expect(git(sdkRootPath, "remote", "get-url", "origin").trim()).toBe(syncRepository);
    expect(git(sdkRootPath, "tag", "--list")).toBe("");
  });

  test("retrieves the release tag from upstream when origin is unavailable", () => {
    prepareCheckout({ "review/arm-test.api.md": baseline });
    git(sdkRootPath, "remote", "remove", "origin");

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
  });

  test("fetches upstream when the local tag cannot provide API content without replacing it", () => {
    prepareCheckout({ "review/arm-test.api.md": baseline });
    git(sdkRootPath, "tag", tag, "HEAD:sdk/test/arm-test/package.json");
    const originalTag = git(sdkRootPath, "rev-parse", `refs/tags/${tag}`);

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
    expect(git(sdkRootPath, "rev-parse", `refs/tags/${tag}`)).toBe(originalTag);
  });

  test("restores API baselines larger than the default process buffer", () => {
    const largeBaseline = `${"// Released API\n".repeat(100000)}${baseline}`;
    prepareCheckout({ "review/arm-test.api.md": largeBaseline });

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(largeBaseline);
  });

  test("prefers the node API review file when both filenames exist", () => {
    prepareCheckout({
      "review/arm-test-node.api.md": baseline,
      "review/arm-test.api.md": "```ts\nexport interface OtherModel {}\n```\n",
    });

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
  });

  test("falls back to the standard API file when the node file is empty", () => {
    prepareCheckout({
      "review/arm-test-node.api.md": " \n",
      "review/arm-test.api.md": baseline,
    });

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(targetPath(), "utf8")).toBe(baseline);
  });

  test("warns and preserves the default baseline when fetching fails, ignoring stale FETCH_HEAD", () => {
    prepareCheckout({ "review/arm-test.api.md": baseline });
    git(sdkRootPath, "fetch", "--no-tags", "origin", `refs/tags/${tag}`);
    git(sdkRootPath, "remote", "remove", "origin");
    git(tempPath, "--git-dir", remotePath, "tag", "--delete", tag);
    const warn = vi.spyOn(logger, "warn");
    expect(() => tryCreateLastestStableNpmViewFromGithub(parameters)).not.toThrow();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(`Failed to fetch release tag ${tag}`),
    );
    expect(readFileSync(targetPath(), "utf8")).toBe("```ts\n```");
  });

  test.each<Record<string, string>>([
    {},
    { "review/arm-test-node.api.md": " \n", "review/arm-test.api.md": "\n" },
  ])("preserves the default baseline when no usable API file exists: %j", (files) => {
    prepareCheckout(files);

    const warn = vi.spyOn(logger, "warn");
    expect(() => tryCreateLastestStableNpmViewFromGithub(parameters)).not.toThrow();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Using default content."));
    expect(readFileSync(targetPath(), "utf8")).toBe("```ts\n```");
  });

  test("restores the changelog from a missing release tag", () => {
    const changelog = "# Release history\n\n## 1.0.0\n\nInitial release.\n";
    prepareCheckout({ "CHANGELOG.md": changelog });
    parameters.file = "CHANGELOG.md";

    tryCreateLastestStableNpmViewFromGithub(parameters);

    expect(readFileSync(join(parameters.npmPackagePath, "CHANGELOG.md"), "utf8")).toBe(changelog);
  });

  test("preserves the empty changelog fallback when it is missing", () => {
    prepareCheckout({});
    parameters.file = "CHANGELOG.md";

    expect(() => tryCreateLastestStableNpmViewFromGithub(parameters)).not.toThrow();
    expect(readFileSync(join(parameters.npmPackagePath, "CHANGELOG.md"), "utf8")).toBe("");
  });
});
