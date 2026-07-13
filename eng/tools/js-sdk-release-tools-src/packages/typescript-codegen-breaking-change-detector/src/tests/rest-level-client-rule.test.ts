import { describe, expect, test } from 'vitest';

import { join } from 'node:path';
import { createAstContext, detectBreakingChangesBetweenPackages } from '../azure/detect-breaking-changes';
import { createTempFolder, createTestAstContext, getFormattedDate } from './utils';

describe('detect rest level client breaking changes', async () => {
  test('should ignore operation rename', async () => {
    const testCaseDir = '../../misc/test-cases/rest-level-client-to-rest-level-client/';
    const currentPackageFolder = join(__dirname, testCaseDir, 'current-package');
    const baselinePackageFolder = join(__dirname, testCaseDir, 'baseline-package');
    const date = getFormattedDate();
    const tempFolder = await createTempFolder(`.tmp/temp-${date}`);
    const messagesMap = await detectBreakingChangesBetweenPackages(
      baselinePackageFolder,
      currentPackageFolder,
      tempFolder,
      true
    );
    expect(messagesMap.size).toBe(1);
    // TODO: add more checks
  });
});

describe('detect rest level client breaking changes v2', async () => {
  test('should ignore operation rename', async () => {
    const testCaseDir = '../../misc/test-cases/rest-level-client-to-rest-level-client/';
    const currentApiViewPath = join(__dirname, testCaseDir, 'current-package/review/arm-servicefabric.api.md');
    const baselineApiViewPath = join(__dirname, testCaseDir, 'baseline-package/review/arm-servicefabric.api.md');
    const date = getFormattedDate();
    const tempFolder = await createTempFolder(`.tmp/temp-${date}`);
    const context = await createAstContext(
      { path: baselineApiViewPath },
      { path: currentApiViewPath },
      tempFolder,
      true
    );
    // TODO: add more checks
  });
});
