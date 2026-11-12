import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as fsModule from "fs";
import * as pathModule from "path";
import shellModule from "shelljs";
import * as npmUtilsModule from "../../../common/npmUtils.js";
import * as ignoreLinkModule from "../../../common/ignoreLink/ignoreLinkGenerator.js";

vi.mock("../../../common/npmUtils.js");
vi.mock("fs");
vi.mock("path");
vi.mock("shelljs");

const mockIgnoreLinksContent = [
  "https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-extensiontypes?view=azure-node-preview",
  "https://learn.microsoft.com/javascript/api/@azure/arm-sitemanager?view=azure-node-preview",
].join("\n");

describe("generateIgnoreLinkForPackage", () => {
  const mockSdkRepoPath = "/mock/sdk/repo/path";
  const mockPackageName = "@azure/mock-package";
  const mockIgnoreLinksPath = "/mock/sdk/repo/path/eng/ignore-links.txt";

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(shellModule.pwd).mockReturnValue({
      toString: () => mockSdkRepoPath,
    } as any);
    vi.mocked(pathModule.join).mockImplementation((...paths) => paths.join("/"));
    vi.mocked(fsModule.readFileSync).mockReturnValue(mockIgnoreLinksContent);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("does not update files when the package already exists in npm", async () => {
    vi.mocked(npmUtilsModule.tryGetNpmView).mockResolvedValue({ version: "1.0.0" });

    await ignoreLinkModule.tryGenerateIgnoreLinkForPackage(mockPackageName);

    expect(fsModule.readFileSync).not.toHaveBeenCalled();
    expect(fsModule.writeFileSync).not.toHaveBeenCalled();
  });

  test("updates only ignore-links.txt for a first beta release", async () => {
    vi.mocked(npmUtilsModule.tryGetNpmView).mockResolvedValue(undefined);

    await ignoreLinkModule.tryGenerateIgnoreLinkForPackage(mockPackageName);

    const learnLink = `https://learn.microsoft.com/javascript/api/${mockPackageName}?view=azure-node-preview`;
    const npmLink = `https://www.npmjs.com/package/${mockPackageName}`;
    const expectedContent = `${mockIgnoreLinksContent}\n${learnLink}\n${npmLink}\n`;
    expect(fsModule.writeFileSync).toHaveBeenCalledOnce();
    expect(fsModule.writeFileSync).toHaveBeenCalledWith(mockIgnoreLinksPath, expectedContent);
    expect(pathModule.join).not.toHaveBeenCalledWith(mockSdkRepoPath, ".github", "CODEOWNERS");
  });

  test("does not update ignore-links.txt when both links already exist", async () => {
    vi.mocked(npmUtilsModule.tryGetNpmView).mockResolvedValue(undefined);
    const learnLink = `https://learn.microsoft.com/javascript/api/${mockPackageName}?view=azure-node-preview`;
    const npmLink = `https://www.npmjs.com/package/${mockPackageName}`;
    vi.mocked(fsModule.readFileSync).mockReturnValue(
      `${mockIgnoreLinksContent}\n${learnLink}\n${npmLink}\n`,
    );

    await ignoreLinkModule.tryGenerateIgnoreLinkForPackage(mockPackageName);

    expect(fsModule.writeFileSync).not.toHaveBeenCalled();
  });

  test.each([
    {
      existingLink: `https://learn.microsoft.com/javascript/api/${mockPackageName}?view=azure-node-preview`,
      missingLink: `https://www.npmjs.com/package/${mockPackageName}`,
    },
    {
      existingLink: `https://www.npmjs.com/package/${mockPackageName}`,
      missingLink: `https://learn.microsoft.com/javascript/api/${mockPackageName}?view=azure-node-preview`,
    },
  ])("adds a missing link when the other link exists", async ({ existingLink, missingLink }) => {
    vi.mocked(npmUtilsModule.tryGetNpmView).mockResolvedValue(undefined);
    const existingContent = `${mockIgnoreLinksContent}\n${existingLink}`;
    vi.mocked(fsModule.readFileSync).mockReturnValue(existingContent);

    await ignoreLinkModule.tryGenerateIgnoreLinkForPackage(mockPackageName);

    expect(fsModule.writeFileSync).toHaveBeenCalledOnce();
    expect(fsModule.writeFileSync).toHaveBeenCalledWith(
      mockIgnoreLinksPath,
      `${existingContent}\n${missingLink}\n`,
    );
  });
});
