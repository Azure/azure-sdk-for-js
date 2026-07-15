import { describe, expect, test } from 'vitest';
import { updatePackageVersion } from '../../mlc/clientGenerator/utils/typeSpecUtils.js';
import { join } from 'path';
import { load } from '@npmcli/package-json';
import { tryGetNpmView } from '../../common/npmUtils.js';

describe('Npm package json', () => {
  test('Replace package version', async () => {
    const packageDirectory = join(__dirname, 'testCases');
    await updatePackageVersion(packageDirectory, '2.0.0');
    const packageJson = await load(packageDirectory);
    expect(packageJson.content.version).toBe('2.0.0');
  });
});

describe('Npm view', () => {
  test('View package version', async () => {
    const nonExistResult = await tryGetNpmView('non-exist');
    expect(nonExistResult).toBeUndefined();

    const normalResult = await tryGetNpmView('connect');
    expect(normalResult!['name']).toBe('connect');
  });
});
