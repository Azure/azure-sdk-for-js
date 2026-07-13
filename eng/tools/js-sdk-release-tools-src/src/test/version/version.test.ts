import { describe, expect, test } from 'vitest';
import { generateTestNpmView } from '../utils/utils.js';
import {
  getLatestStableVersion,
  getNextBetaVersion,
  getUsedVersions,
  shouldTreatAsFirstRelease,
} from '../../utils/version.js';
import { tryGetNpmView } from '../../common/npmUtils.js';

interface TestCase {
  latestVersion?: string;
  latestVersionDate?: string;
  betaVersion?: string;
  betaVersionDate?: string;
  nextVersion?: string;
  nextVersionDate?: string;
  expectedVersion?: string;
  description?: string;
}

describe('Get latest stable version after GA but beta version before GA', () => {
  const cases: TestCase[] = [
    {
      latestVersion: '1.0.0',
      latestVersionDate: '2025-06-20T09:13:48.079Z',
      betaVersion: '1.0.0-beta.1',
      betaVersionDate: '2025-06-01T07:07:56.529Z',
      expectedVersion: '1.0.0',
    },
    {
      latestVersion: '1.0.0',
      latestVersionDate: '2025-06-01T09:13:48.079Z',
      betaVersion: '1.0.0-beta.1',
      betaVersionDate: '2025-06-21T07:07:56.529Z',
      expectedVersion: '1.0.0',
    },
    {
      latestVersion: '1.0.0-beta.1',
      betaVersion: undefined,
      expectedVersion: '1.0.0-beta.1',
    },
    {
      latestVersion: undefined,
      betaVersion: '1.0.0-beta.1',
      expectedVersion: '1.0.0-beta.1',
    },
  ];
  test.each(cases)(
    'Stable: $latestVersion on data: $latestVersionDate, Beta: $betaVersion on data $betaVersionDate, Expected:$expectedVersion',
    async ({ latestVersion, betaVersion, expectedVersion, latestVersionDate, betaVersionDate }) => {
      const npmView = generateTestNpmView(latestVersion, betaVersion, latestVersionDate, betaVersionDate);
      const version = getLatestStableVersion(npmView!);
      expect(version).toBe(expectedVersion);
    }
  );
});

describe('Get next beta version from beta and next tags', () => {
  const cases: TestCase[] = [
    // When both beta and next tags exist, and next is more recent
    {
      betaVersion: '1.0.0-beta.1',
      betaVersionDate: '2025-06-01T07:07:56.529Z',
      nextVersion: '1.0.0-beta.2',
      nextVersionDate: '2025-06-20T09:13:48.079Z',
      expectedVersion: '1.0.0-beta.2', // next is more recent
    },
    // When both beta and next tags exist, and beta is more recent
    {
      betaVersion: '1.0.0-beta.2',
      betaVersionDate: '2025-06-20T09:13:48.079Z',
      nextVersion: '1.0.0-beta.1',
      nextVersionDate: '2025-06-01T07:07:56.529Z',
      expectedVersion: '1.0.0-beta.2', // beta is more recent
    },
    // When only beta tag exists
    {
      betaVersion: '1.0.0-beta.1',
      betaVersionDate: '2025-06-01T07:07:56.529Z',
      nextVersion: undefined,
      expectedVersion: '1.0.0-beta.1', // only beta exists
    },
    // When only next tag exists
    {
      betaVersion: undefined,
      nextVersion: '1.0.0-beta.1',
      nextVersionDate: '2025-06-01T07:07:56.529Z',
      expectedVersion: '1.0.0-beta.1', // only next exists
    },
    // When neither beta nor next tag exists
    {
      betaVersion: undefined,
      nextVersion: undefined,
      expectedVersion: undefined, // neither exists
    },
    // When dates are not available, default to beta
    {
      betaVersion: '1.0.0-beta.1',
      nextVersion: '1.0.0-beta.2',
      expectedVersion: '1.0.0-beta.1', // no dates, default to beta
    },
  ];

  test.each(cases)(
    'Beta: $betaVersion ($betaVersionDate), Next: $nextVersion ($nextVersionDate), Expected: $expectedVersion',
    async ({ betaVersion, betaVersionDate, nextVersion, nextVersionDate, expectedVersion }) => {
      const npmView = generateTestNpmView(
        undefined, // latest version not needed for this test
        betaVersion,
        undefined, // latest version date not needed
        betaVersionDate,
        nextVersion,
        nextVersionDate
      );

      const version = getNextBetaVersion(npmView);
      expect(version).toBe(expectedVersion);
    }
  );

  test('returns undefined when npmViewResult is undefined', () => {
    const version = getNextBetaVersion(undefined);
    expect(version).toBeUndefined();
  });
});

describe('Used Versions', async () => {
  test('Get used versions from npm view', async () => {
    const view = {
      versions: {
        '3.0.0-alpha.20250619.1': {
          name: '@azure/arm-test',
          version: '3.0.0-alpha.20250619.1',
          keywords: ['node'],
          author: { name: 'Microsoft Corporation' },
        },
        '3.0.0': {
          name: '@azure/arm-test',
          version: '3.0.0',
          keywords: ['node'],
          author: { name: 'Microsoft Corporation' },
        },
      },
    };
    const versions = getUsedVersions(view!);
    expect(versions).toEqual(['3.0.0-alpha.20250619.1', '3.0.0']);
  });
});

describe('shouldTreatAsFirstRelease', () => {
  // Scenario 1: Brand-new package, never published to npm
  test('returns true when npmViewResult is undefined (never published)', () => {
    expect(shouldTreatAsFirstRelease(undefined, undefined, false)).toBe(true);
    expect(shouldTreatAsFirstRelease(undefined, undefined, true)).toBe(true);
  });

  // Scenario 2: Package exists on npm but has no stable/beta version yet
  test('returns true when stableVersion is undefined (no stable version on npm)', () => {
    const npmView = generateTestNpmView(undefined, undefined, undefined, undefined, '1.0.0-next.1');
    expect(shouldTreatAsFirstRelease(npmView, undefined, false)).toBe(true);
    expect(shouldTreatAsFirstRelease(npmView, undefined, true)).toBe(true);
  });

  // Scenario 3a: Published version is alpha → publishing beta (alpha → beta)
  test('returns true when stable version is alpha and publishing beta', () => {
    const npmView = generateTestNpmView('1.0.0-alpha.20250619.1');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0-alpha.20250619.1', false)).toBe(true);
  });

  // Scenario 3b: Published version is alpha → publishing stable (alpha → stable)
  test('returns true when stable version is alpha and publishing stable', () => {
    const npmView = generateTestNpmView('1.0.0-alpha.20250619.1');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0-alpha.20250619.1', true)).toBe(true);
  });

  // Scenario 3c: Published version is rc → treat as incomparable
  test('returns true when stable version is rc (non-standard prerelease)', () => {
    const npmView = generateTestNpmView('1.0.0-rc.1');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0-rc.1', false)).toBe(true);
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0-rc.1', true)).toBe(true);
  });

  // Scenario 4: Latest published version is beta, current release targets stable (beta → GA)
  test('returns true when latest published is beta and current release is stable', () => {
    const npmView = generateTestNpmView('1.0.0-beta.1');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0-beta.1', true)).toBe(true);
  });

  // NOT a first release: latest is beta, publishing another beta
  test('returns false when latest published is beta and current release is also beta', () => {
    const npmView = generateTestNpmView('1.0.0-beta.1');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0-beta.1', false)).toBe(false);
  });

  // NOT a first release: latest is stable, publishing stable update
  test('returns false when latest published is stable and publishing stable update', () => {
    const npmView = generateTestNpmView('1.0.0');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0', true)).toBe(false);
  });

  // NOT a first release: latest is stable, publishing beta update
  test('returns false when latest published is stable and publishing beta', () => {
    const npmView = generateTestNpmView('1.0.0');
    expect(shouldTreatAsFirstRelease(npmView, '1.0.0', false)).toBe(false);
  });
});
