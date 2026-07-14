import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import {
  updateApiRefLink,
  makeChangesForMigrateTrack1ToTrack2,
} from '../../common/changelog/modifyChangelogFileAndBumpVersion.js';
import { UpdateMode } from '../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js';
import path from 'path';
import fs from 'fs';
import { mkdir, rm } from 'fs/promises';

describe('updateApiRefLink', () => {
  test('should remove ?view=azure-node-preview from apiRefLink when version is stable', () => {
    const packageJsonContent = JSON.stringify(
      {
        name: '@azure/arm-test',
        version: '1.0.0-beta.1',
        'sdk-type': 'mgmt',
        'api-surface': {
          apiRefLink: 'https://docs.microsoft.com/javascript/api/@azure/arm-test?view=azure-node-preview',
        },
      },
      null,
      2
    );

    const result = updateApiRefLink(packageJsonContent, '1.0.0');
    expect(result).toContain('"apiRefLink": "https://docs.microsoft.com/javascript/api/@azure/arm-test"');
    expect(result).not.toContain('?view=azure-node-preview');
  });

  test('should keep ?view=azure-node-preview in apiRefLink when version is beta', () => {
    const packageJsonContent = JSON.stringify(
      {
        name: '@azure/arm-test',
        version: '1.0.0',
        'sdk-type': 'mgmt',
        'api-surface': {
          apiRefLink: 'https://docs.microsoft.com/javascript/api/@azure/arm-test',
        },
      },
      null,
      2
    );

    const result = updateApiRefLink(packageJsonContent, '1.0.0-beta.1');
    expect(result).toContain(
      '"apiRefLink": "https://docs.microsoft.com/javascript/api/@azure/arm-test?view=azure-node-preview"'
    );
  });

  test('should add ?view=azure-node-preview to apiRefLink when bumping to beta version', () => {
    const packageJsonContent = JSON.stringify(
      {
        name: '@azure/arm-test',
        version: '1.0.0',
        'sdk-type': 'mgmt',
        'api-surface': {
          apiRefLink: 'https://docs.microsoft.com/javascript/api/@azure/arm-test',
        },
      },
      null,
      2
    );

    const result = updateApiRefLink(packageJsonContent, '2.0.0-beta.1');
    expect(result).toContain(
      '"apiRefLink": "https://docs.microsoft.com/javascript/api/@azure/arm-test?view=azure-node-preview"'
    );
  });

  test('should not duplicate ?view=azure-node-preview when version is already beta with preview link', () => {
    const packageJsonContent = JSON.stringify(
      {
        name: '@azure/arm-test',
        version: '1.0.0-beta.1',
        'sdk-type': 'mgmt',
        'api-surface': {
          apiRefLink: 'https://docs.microsoft.com/javascript/api/@azure/arm-test?view=azure-node-preview',
        },
      },
      null,
      2
    );

    const result = updateApiRefLink(packageJsonContent, '1.0.0-beta.2');
    const occurrences = (result.match(/\?view=azure-node-preview/g) || []).length;
    expect(occurrences).toBe(1);
    expect(result).toContain(
      '"apiRefLink": "https://docs.microsoft.com/javascript/api/@azure/arm-test?view=azure-node-preview"'
    );
  });

  test('should handle package.json without apiRefLink', () => {
    const packageJsonContent = JSON.stringify(
      {
        name: '@azure/arm-test',
        version: '1.0.0-beta.1',
        'sdk-type': 'mgmt',
      },
      null,
      2
    );

    const result = updateApiRefLink(packageJsonContent, '1.0.0');
    expect(result).not.toContain('apiRefLink');
    expect(result).not.toContain('?view=azure-node-preview');
  });

  test('should handle package.json with learn.microsoft.com apiRefLink domain', () => {
    const packageJsonContent = JSON.stringify(
      {
        name: '@azure-rest/arm-test',
        version: '1.0.0-beta.1',
        'sdk-type': 'mgmt',
        'api-surface': {
          apiRefLink: 'https://learn.microsoft.com/javascript/api/@azure-rest/arm-test?view=azure-node-preview',
        },
      },
      null,
      2
    );

    const result = updateApiRefLink(packageJsonContent, '1.0.0');
    expect(result).toContain('"apiRefLink": "https://learn.microsoft.com/javascript/api/@azure-rest/arm-test"');
    expect(result).not.toContain('?view=azure-node-preview');
  });
});

describe('makeChangesForMigrateTrack1ToTrack2', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = path.join(__dirname, `tmp/migrate-test-${Date.now()}`);
    await mkdir(tempDir, { recursive: true });
  });

  afterEach(async () => {
    if (fs.existsSync(tempDir)) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  test('ModularClient: writes modular migration content with layered-API links to CHANGELOG.md', async () => {
    // Modular package: name is not @azure-rest/, no src/models/parameters.ts → SDKType.ModularClient
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: '@azure/arm-test', version: '1.0.0', 'sdk-type': 'mgmt' }, null, 2)
    );

    await makeChangesForMigrateTrack1ToTrack2(tempDir, '2.0.0-beta.1', '2024-01-01', UpdateMode.ChangelogOnly);

    const changelog = fs.readFileSync(path.join(tempDir, 'CHANGELOG.md'), 'utf8');

    // Version header is present
    expect(changelog).toContain('## 2.0.0-beta.1 (2024-01-01)');

    // Modular-specific content
    expect(changelog).toContain('The @azure/arm-test package has been upgraded to a new SDK generation');
    expect(changelog).toContain('layered APIs, smaller bundles, and improved ergonomics');
    expect(changelog).toContain('Starting from version 2.0.0-beta.1, this release includes breaking changes.');
    expect(changelog).toContain('https://aka.ms/azsdk/js/sdk/migration');
    expect(changelog).toContain('https://aka.ms/azsdk/js/sdk/quickstart');

    // Must NOT contain HLC-style content
    expect(changelog).not.toContain('aka.ms/js-track2-changelog');
    expect(changelog).not.toContain('aka.ms/js-track2-migration-guide');
    expect(changelog).not.toContain('aka.ms/azsdk/js/mgmt/quickstart');
  });

  test('HLC: writes default migration content with track2 links to CHANGELOG.md', async () => {
    // HLC package: has src/models/parameters.ts → SDKType.HighLevelClient
    await mkdir(path.join(tempDir, 'src', 'models'), { recursive: true });
    fs.writeFileSync(path.join(tempDir, 'src', 'models', 'parameters.ts'), '// parameters');
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: '@azure/arm-test', version: '1.0.0', 'sdk-type': 'mgmt' }, null, 2)
    );

    await makeChangesForMigrateTrack1ToTrack2(tempDir, '2.0.0-beta.1', '2024-01-01', UpdateMode.ChangelogOnly);

    const changelog = fs.readFileSync(path.join(tempDir, 'CHANGELOG.md'), 'utf8');

    // Version header is present
    expect(changelog).toContain('## 2.0.0-beta.1 (2024-01-01)');

    // HLC (default) content
    expect(changelog).toContain(
      'The package of @azure/arm-test is using our next generation design principles since version 2.0.0-beta.1, which contains breaking changes.'
    );
    expect(changelog).toContain('aka.ms/js-track2-changelog');
    expect(changelog).toContain('aka.ms/js-track2-migration-guide');
    expect(changelog).toContain('aka.ms/azsdk/js/mgmt/quickstart');

    // Must NOT contain modular-style content
    expect(changelog).not.toContain('aka.ms/azsdk/js/sdk/migration');
    expect(changelog).not.toContain('layered APIs');
  });

  test('RLC: writes default migration content to CHANGELOG.md', async () => {
    // RLC package: name starts with @azure-rest/ → SDKType.RestLevelClient (falls to default branch)
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: '@azure-rest/test', version: '1.0.0' }, null, 2)
    );

    await makeChangesForMigrateTrack1ToTrack2(tempDir, '2.0.0-beta.1', '2024-01-01', UpdateMode.ChangelogOnly);

    const changelog = fs.readFileSync(path.join(tempDir, 'CHANGELOG.md'), 'utf8');

    // Version header is present
    expect(changelog).toContain('## 2.0.0-beta.1 (2024-01-01)');

    // Default content (RLC uses the same branch as HLC)
    expect(changelog).toContain(
      'The package of @azure-rest/test is using our next generation design principles since version 2.0.0-beta.1, which contains breaking changes.'
    );
    expect(changelog).toContain('aka.ms/js-track2-changelog');

    // Must NOT contain modular-style content
    expect(changelog).not.toContain('aka.ms/azsdk/js/sdk/migration');
    expect(changelog).not.toContain('layered APIs');
  });
});
