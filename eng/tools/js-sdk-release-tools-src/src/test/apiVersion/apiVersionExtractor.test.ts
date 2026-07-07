import { describe, expect, test, vi, afterEach } from 'vitest';
import { getApiVersionType, isModelOnly } from '../../mlc/apiVersion/apiVersionTypeExtractor.js';
import { getApiVersionType as getApiVersionTypeInRLC } from '../../llc/apiVersion/apiVersionTypeExtractor.js';
import { join } from 'path';
import { ApiVersionType } from '../../common/types.js';
import { getApiVersionTypeFromNpm } from '../../xlc/apiVersion/utils.js';
import { generateTestNpmView } from '../utils/utils.js';

describe('Rest client file fallbacks', () => {
  describe('Modular client', () => {
    test('src/api/xxxContext.ts exists', async () => {
      const root = join(__dirname, 'testCases/new-context/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('metadata.json exists with stable apiVersion', async () => {
      const root = join(__dirname, 'testCases/mlc-metadata-json/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Stable);
    });
    test('metadata.json exists with preview apiVersion', async () => {
      const root = join(__dirname, 'testCases/mlc-metadata-json-preview/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('metadata.json exists with apiVersions - all stable', async () => {
      const root = join(__dirname, 'testCases/mlc-metadata-apiVersions-all-stable/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Stable);
    });
    test('metadata.json exists with apiVersions - with preview', async () => {
      const root = join(__dirname, 'testCases/mlc-metadata-apiVersions-with-preview/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('metadata.json exists with apiVersions - preview listed first', async () => {
      const root = join(__dirname, 'testCases/mlc-metadata-apiVersions-preview-first/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('metadata.json exists with apiVersions - single stable version', async () => {
      const root = join(__dirname, 'testCases/mlc-metadata-apiVersions-single/');
      const version = await getApiVersionType(root);
      expect(version).toBe(ApiVersionType.Stable);
    });
    test('Model only spec', async () => {
      const mockNpmUtils = await import('../../common/npmUtils.js');
      let npmViewCount = 0;

      const npmViewSpy = vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockImplementation(async () => {
        npmViewCount++;
        // First getApiVersionType call:
        if (npmViewCount === 1) return { 'dist-tags': { latest: '1.0.0' } }; // For isModelOnly check
        if (npmViewCount === 2) return { 'dist-tags': { latest: '1.0.0-beta.1' } }; // For getApiVersionTypeFromNpm - should return Preview
        // Second getApiVersionType call:
        if (npmViewCount === 3) return { 'dist-tags': { latest: '1.0.0' } }; // For isModelOnly check
        if (npmViewCount === 4) return { 'dist-tags': { latest: '1.0.0' } }; // For getApiVersionTypeFromNpm - should return Stable
        return { 'dist-tags': { latest: '1.0.0' } };
      });

      const githubCheckSpy = vi
        .spyOn(mockNpmUtils, 'checkDirectoryExistsInGithub')
        .mockImplementation(async () => false); // Always return false to indicate model-only package

      const root = join(__dirname, 'testCases/mlc-model-only/');
      const version1 = await getApiVersionType(root);
      expect(version1).toBe(ApiVersionType.Preview); // Beta version from npm
      const version2 = await getApiVersionType(root);
      expect(version2).toBe(ApiVersionType.Stable); // Stable version from npm

      npmViewSpy.mockRestore();
      githubCheckSpy.mockRestore();
    });
  });
  describe('RLC', () => {
    test('src/xxxContext.ts exists', async () => {
      const root = join(__dirname, 'testCases/rlc-context/');
      const version = await getApiVersionTypeInRLC(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test("src/xxxContext.ts doesn't exists, fallback to src/xxxClient.ts", async () => {
      const root = join(__dirname, 'testCases/rlc-client/');
      const version = await getApiVersionTypeInRLC(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('get source folder from readme', async () => {
      const root = join(__dirname, 'testCases/rlc-source-from-readme/');
      const version = await getApiVersionTypeInRLC(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('get source folder from src', async () => {
      const root = join(__dirname, 'testCases/rlc-source-from-src/');
      const version = await getApiVersionTypeInRLC(root);
      expect(version).toBe(ApiVersionType.Preview);
    });
    test('get api version in parameters.ts that has `api-version: string`', async () => {
      const root = join(__dirname, 'testCases/rlc-source-from-src-streaming/');
      const version = await getApiVersionTypeInRLC(root);
      expect(version).toBe(ApiVersionType.Stable);
    });
    test('Model only spec', async () => {
      const mockNpmUtils = await import('../../common/npmUtils.js');
      let count = 0;
      const spy = vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockImplementation(async () => {
        count++;
        if (count === 1) return { 'dist-tags': { latest: '1.0.0-beta.1' } };
        return { 'dist-tags': { latest: '1.0.0' } };
      });

      const root = join(__dirname, 'testCases/rlc-model-only/');
      const version1 = await getApiVersionTypeInRLC(root);
      expect(version1).toBe(ApiVersionType.Preview);
      const version2 = await getApiVersionTypeInRLC(root);
      expect(version2).toBe(ApiVersionType.Stable);
      spy.mockRestore();
    });
  });
});

describe('Get ApiVersion Type From Npm', () => {
  interface TestCase {
    latestVersion?: string;
    latestVersionDate?: string;
    betaVersion?: string;
    betaVersionDate?: string;
    expectedVersionType: ApiVersionType;
  }
  const cases: TestCase[] = [
    // stable version is latest
    {
      latestVersion: '1.0.0',
      latestVersionDate: '2025-06-20T09:13:48.079Z',
      betaVersion: '1.0.0-beta.1',
      betaVersionDate: '2025-06-01T07:07:56.529Z',
      expectedVersionType: ApiVersionType.Stable,
    },
    // beta version is latest
    {
      latestVersion: '1.0.0',
      latestVersionDate: '2025-06-01T09:13:48.079Z',
      betaVersion: '1.0.0-beta.1',
      betaVersionDate: '2025-06-21T07:07:56.529Z',
      expectedVersionType: ApiVersionType.Stable,
    },
    // only has latest tag in beta version (back compatibility)
    {
      latestVersion: '1.0.0-beta.1',
      betaVersion: undefined,
      expectedVersionType: ApiVersionType.Preview,
    },
    // only has beta tag in beta version
    {
      latestVersion: undefined,
      betaVersion: '1.0.0-beta.1',
      expectedVersionType: ApiVersionType.Preview,
    },
    // only has latest tag in stable version
    {
      latestVersion: '1.0.0',
      betaVersion: undefined,
      expectedVersionType: ApiVersionType.Stable,
    },
    // no stable or beta version, indicate no npm package, fallback to preview
    {
      latestVersion: undefined,
      betaVersion: undefined,
      expectedVersionType: ApiVersionType.Preview,
    },
  ];
  test.each(cases)(
    'Stable: $latestVersion on data: $latestVersionDate, Beta: $betaVersion on data $betaVersionDate, Expected:$expectedVersionType',
    async ({ latestVersion, betaVersion, expectedVersionType, latestVersionDate, betaVersionDate }) => {
      const npmView = generateTestNpmView(latestVersion, betaVersion, latestVersionDate, betaVersionDate);
      const npmUtils = await import('../../common/npmUtils.js');
      const spy = vi.spyOn(npmUtils, 'tryGetNpmView').mockImplementation(async () => npmView);
      const npmVersion = await getApiVersionTypeFromNpm('test');
      expect(npmVersion).toBe(expectedVersionType);
      spy.mockRestore();
    }
  );
});

describe('isModelOnly - Track 1 to Track 2 migration git tag fallback', () => {
  const root = join(__dirname, 'testCases/mlc-model-only/');
  // package name in mlc-model-only/package.json is "@azure/eventgrid-systemevents"
  // getNpmPackageName (common/utils.ts) returns the raw name → used as git tag prefix
  const gitTagPrefix = '@azure/eventgrid-systemevents';
  // checkDirectoryExistsInGithub receives the same full npm package name
  const npmPkgName = '@azure/eventgrid-systemevents';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('beta release: npm latest=3.0.0 (no git tag), next=4.0.0-beta.3 (has git tag) → uses beta tag, src/api found → not model-only', async () => {
    const mockNpmUtils = await import('../../common/npmUtils.js');
    vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockResolvedValue({
      'dist-tags': { latest: '3.0.0', next: '4.0.0-beta.3' },
      versions: { '3.0.0': {}, '4.0.0-beta.1': {}, '4.0.0-beta.2': {}, '4.0.0-beta.3': {} },
    });
    vi.spyOn(mockNpmUtils, 'checkGitTagExists').mockImplementation((tag: string) => {
      // Only the beta tags exist locally; T1 tag was never created
      return (
        tag === `${gitTagPrefix}_4.0.0-beta.3` ||
        tag === `${gitTagPrefix}_4.0.0-beta.2` ||
        tag === `${gitTagPrefix}_4.0.0-beta.1`
      );
    });
    vi.spyOn(mockNpmUtils, 'checkDirectoryExistsInGithub').mockResolvedValue(true);

    const result = await isModelOnly(root, true /* isBetaRelease */);
    expect(result).toBe(false);
    expect(mockNpmUtils.checkDirectoryExistsInGithub).toHaveBeenCalledWith(
      root,
      ['src/api', 'src/operations'],
      npmPkgName,
      '4.0.0-beta.3'
    );
  });

  test('beta release: preferred tag missing, falls back to most recent existing tag (4.0.0-beta.2)', async () => {
    const mockNpmUtils = await import('../../common/npmUtils.js');
    vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockResolvedValue({
      'dist-tags': { latest: '3.0.0', next: '4.0.0-beta.3' },
      versions: { '3.0.0': {}, '4.0.0-beta.1': {}, '4.0.0-beta.2': {}, '4.0.0-beta.3': {} },
    });
    vi.spyOn(mockNpmUtils, 'checkGitTagExists').mockImplementation((tag: string) => {
      // next tag (4.0.0-beta.3) is missing; 4.0.0-beta.2 is the most recent existing
      return tag === `${gitTagPrefix}_4.0.0-beta.2` || tag === `${gitTagPrefix}_4.0.0-beta.1`;
    });
    vi.spyOn(mockNpmUtils, 'checkDirectoryExistsInGithub').mockResolvedValue(true);

    const result = await isModelOnly(root, true);
    expect(result).toBe(false);
    expect(mockNpmUtils.checkDirectoryExistsInGithub).toHaveBeenCalledWith(
      root,
      ['src/api', 'src/operations'],
      npmPkgName,
      '4.0.0-beta.2'
    );
  });

  test('stable release: latest=1.0.0 git tag exists, src/api found → not model-only', async () => {
    const mockNpmUtils = await import('../../common/npmUtils.js');
    vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockResolvedValue({
      'dist-tags': { latest: '1.0.0' },
      versions: { '1.0.0': {} },
    });
    vi.spyOn(mockNpmUtils, 'checkGitTagExists').mockImplementation((tag: string) => tag === `${gitTagPrefix}_1.0.0`);
    vi.spyOn(mockNpmUtils, 'checkDirectoryExistsInGithub').mockResolvedValue(true);

    const result = await isModelOnly(root, false /* isBetaRelease */);
    expect(result).toBe(false);
    expect(mockNpmUtils.checkDirectoryExistsInGithub).toHaveBeenCalledWith(
      root,
      ['src/api', 'src/operations'],
      npmPkgName,
      '1.0.0'
    );
  });

  test('no git tag found for any version → uses preferred version, src/api missing → model-only', async () => {
    const mockNpmUtils = await import('../../common/npmUtils.js');
    vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockResolvedValue({
      'dist-tags': { latest: '3.0.0' },
      versions: { '3.0.0': {} },
    });
    vi.spyOn(mockNpmUtils, 'checkGitTagExists').mockReturnValue(false);
    vi.spyOn(mockNpmUtils, 'checkDirectoryExistsInGithub').mockResolvedValue(false);

    const result = await isModelOnly(root, false);
    expect(result).toBe(true);
  });

  test('first T2 beta (no next/beta dist-tag yet), isBetaRelease=true → falls back to stable tag → src/api found → not model-only', async () => {
    const mockNpmUtils = await import('../../common/npmUtils.js');
    vi.spyOn(mockNpmUtils, 'tryGetNpmView').mockResolvedValue({
      // no beta/next dist-tag: this is the very first T2 beta being published
      'dist-tags': { latest: '3.0.0' },
      versions: { '3.0.0': {} },
    });
    vi.spyOn(mockNpmUtils, 'checkGitTagExists').mockImplementation((tag: string) => tag === `${gitTagPrefix}_3.0.0`);
    vi.spyOn(mockNpmUtils, 'checkDirectoryExistsInGithub').mockResolvedValue(true);

    const result = await isModelOnly(root, true);
    expect(result).toBe(false);
    // getNextBetaVersion returns undefined → falls back to stableVersion 3.0.0
    expect(mockNpmUtils.checkDirectoryExistsInGithub).toHaveBeenCalledWith(
      root,
      ['src/api', 'src/operations'],
      npmPkgName,
      '3.0.0'
    );
  });
});
