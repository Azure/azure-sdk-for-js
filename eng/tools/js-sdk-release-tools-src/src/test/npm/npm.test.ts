import { describe, expect, test, vi, afterEach } from 'vitest';
import { spawnSync } from 'child_process';
import { updatePackageVersion } from '../../mlc/clientGenerator/utils/typeSpecUtils.js';
import { join } from 'path';
import { load } from '@npmcli/package-json';
import { tryGetNpmView } from '../../common/npmUtils.js';

vi.mock('child_process', async () => {
  const actual = await vi.importActual<typeof import('child_process')>('child_process');
  return { ...actual, spawnSync: vi.fn() };
});

describe('Npm package json', () => {
  test('Replace package version', async () => {
    const packageDirectory = join(__dirname, 'testCases');
    await updatePackageVersion(packageDirectory, '2.0.0');
    const packageJson = await load(packageDirectory);
    expect(packageJson.content.version).toBe('2.0.0');
  });
});

describe("Npm view", () => {
  const spawnSyncMock = vi.mocked(spawnSync);

  afterEach(() => {
    spawnSyncMock.mockReset();
  });

  function mockSpawnSyncResult(status: number, stdout: string) {
    spawnSyncMock.mockReturnValue({ pid: 0, output: [], stdout, stderr: '', status, signal: null } as any);
  }

  test("returns undefined when package does not exist", async () => {
    mockSpawnSyncResult(1, '');
    const result = await tryGetNpmView("non-exist", "https://registry.example.com/");
    expect(result).toBeUndefined();
  });

  test("returns parsed package data for existing package", async () => {
    mockSpawnSyncResult(0, JSON.stringify({ name: "connect", version: "3.7.0" }));
    const result = await tryGetNpmView("connect", "https://registry.example.com/");
    expect(result!["name"]).toBe("connect");
  });

  test("passes --registry flag when registry is provided", async () => {
    mockSpawnSyncResult(0, JSON.stringify({ name: "connect" }));
    const registry = "https://pkgs.dev.azure.com/example/_packaging/feed/npm/registry/";
    await tryGetNpmView("connect", registry);
    const args = spawnSyncMock.mock.calls[0][1] as string[];
    expect(args).toContain("--registry");
    expect(args).toContain(registry);
  });

  test("omits --registry flag when registry is not provided", async () => {
    mockSpawnSyncResult(0, JSON.stringify({ name: "connect" }));
    await tryGetNpmView("connect");
    const args = spawnSyncMock.mock.calls[0][1] as string[];
    expect(args).not.toContain("--registry");
  });
});
