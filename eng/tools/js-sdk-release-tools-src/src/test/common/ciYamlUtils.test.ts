import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { createOrUpdateCiYaml } from '../../common/ciYamlUtils.js';
import path from 'path';
import { ensureDir, remove, writeFile, readFile } from 'fs-extra';
import { parse } from 'yaml';
import { getRandomInt } from '../utils/utils.js';

describe('createOrUpdateCiYaml', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempDir = path.join(__dirname, `tmp/ci-yaml-${getRandomInt(100000)}`);
    await ensureDir(tempDir);
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await remove(tempDir);
  });

  describe("management plane (path contains 'arm-')", () => {
    // @azure/arm-myservice → name: "azure-arm-myservice", safeName: "azurearmmyservice"
    const npmPackageInfo = { name: '@azure/arm-myservice', version: '1.0.0' };

    test('creates ci.mgmt.yml from template when it does not exist', async () => {
      const packageDir = 'sdk/myservice/arm-myservice';
      await ensureDir(path.join(tempDir, 'sdk/myservice'));

      const ciPath = await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      expect(ciPath).toBe('sdk/myservice/ci.mgmt.yml');

      const content = await readFile(path.join(tempDir, 'sdk/myservice/ci.mgmt.yml'), 'utf-8');
      const parsed = parse(content);

      expect(parsed.extends.parameters.ServiceDirectory).toBe('myservice');
      expect(parsed.extends.parameters.Artifacts).toHaveLength(1);
      expect(parsed.extends.parameters.Artifacts[0].name).toBe('azure-arm-myservice');
      expect(parsed.extends.parameters.Artifacts[0].safeName).toBe('azurearmmyservice');
      expect(parsed.trigger.paths.include).toContain(packageDir);
      expect(parsed.trigger.paths.include).toContain(ciPath);
      expect(parsed.pr.paths.include).toContain(packageDir);
      expect(parsed.pr.paths.include).toContain(ciPath);
    });

    test('updates existing ci.mgmt.yml by adding new artifact and paths', async () => {
      const ciMgmtPath = 'sdk/myservice/ci.mgmt.yml';
      await ensureDir(path.join(tempDir, 'sdk/myservice'));

      const existingContent = `trigger:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
  paths:
    include:
      - sdk/myservice/arm-existing
      - sdk/myservice/ci.mgmt.yml
pr:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
  paths:
    include:
      - sdk/myservice/arm-existing
      - sdk/myservice/ci.mgmt.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-arm-existing
        safeName: azurearmexisting
`;
      await writeFile(path.join(tempDir, ciMgmtPath), existingContent, 'utf-8');

      const newPackageDir = 'sdk/myservice/arm-myservice';
      const resultPath = await createOrUpdateCiYaml(newPackageDir, npmPackageInfo);

      expect(resultPath).toBe(ciMgmtPath);
      const content = await readFile(path.join(tempDir, ciMgmtPath), 'utf-8');
      const parsed = parse(content);

      const artifactNames = parsed.extends.parameters.Artifacts.map((a: any) => a.name);
      expect(artifactNames).toContain('azure-arm-existing');
      expect(artifactNames).toContain('azure-arm-myservice');
      expect(parsed.trigger.paths.include).toContain(newPackageDir);
      expect(parsed.trigger.paths.include).toContain(ciMgmtPath);
      expect(parsed.pr.paths.include).toContain(newPackageDir);
      expect(parsed.pr.paths.include).toContain(ciMgmtPath);
    });

    test('does not duplicate artifact when updating existing ci.mgmt.yml', async () => {
      const packageDir = 'sdk/myservice/arm-myservice';
      const ciMgmtPath = 'sdk/myservice/ci.mgmt.yml';
      await ensureDir(path.join(tempDir, 'sdk/myservice'));

      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/arm-myservice
      - sdk/myservice/ci.mgmt.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/arm-myservice
      - sdk/myservice/ci.mgmt.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-arm-myservice
        safeName: azurearmmyservice
`;
      await writeFile(path.join(tempDir, ciMgmtPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciMgmtPath), 'utf-8');
      const parsed = parse(content);

      const artifactNames = parsed.extends.parameters.Artifacts.map((a: any) => a.name);
      expect(artifactNames.filter((n: string) => n === 'azure-arm-myservice')).toHaveLength(1);
      expect(parsed.trigger.paths.include.filter((p: string) => p === packageDir)).toHaveLength(1);
      expect(parsed.pr.paths.include.filter((p: string) => p === packageDir)).toHaveLength(1);
    });
  });

  describe("data plane (path does not contain 'arm-')", () => {
    // @azure/myservice → name: "azure-myservice", safeName: "azuremyservice"
    const npmPackageInfo = { name: '@azure/myservice', version: '1.0.0' };

    test('creates ci.yml from template when it does not exist', async () => {
      const packageDir = 'sdk/myservice/myservice';
      await ensureDir(path.join(tempDir, 'sdk/myservice'));

      const ciPath = await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      expect(ciPath).toBe('sdk/myservice/ci.yml');

      const content = await readFile(path.join(tempDir, 'sdk/myservice/ci.yml'), 'utf-8');
      const parsed = parse(content);

      expect(parsed.extends.parameters.ServiceDirectory).toBe('myservice');
      const artifact = parsed.extends.parameters.Artifacts?.find((a: any) => a.name === 'azure-myservice');
      expect(artifact).toBeDefined();
      expect(artifact.safeName).toBe('azuremyservice');
      expect(parsed.trigger.paths.include).toContain(packageDir);
      expect(parsed.trigger.paths.include).toContain(ciPath);
      expect(parsed.pr.paths.include).toContain(packageDir);
      expect(parsed.pr.paths.include).toContain(ciPath);
      expect(parsed.trigger.branches?.exclude).toBeFalsy();
      expect(parsed.pr.branches?.exclude).toBeFalsy();
    });

    test('updates existing ci.yml by adding new artifact and paths', async () => {
      const ciPath = 'sdk/myservice/ci.yml';
      await ensureDir(path.join(tempDir, 'sdk/myservice'));

      const existingContent = `trigger:
  branches:
    include:
      - main
      - release/*
      - hotfix/*
  paths:
    include:
      - sdk/myservice/existing
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
  paths:
    include:
      - sdk/myservice/existing
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-existing
        safeName: azureexisting
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      const newPackageDir = 'sdk/myservice/myservice';
      const resultPath = await createOrUpdateCiYaml(newPackageDir, npmPackageInfo);

      expect(resultPath).toBe(ciPath);
      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      const artifactNames = parsed.extends.parameters.Artifacts.map((a: any) => a.name);
      expect(artifactNames).toContain('azure-existing');
      expect(artifactNames).toContain('azure-myservice');
      expect(parsed.trigger.paths.include).toContain(newPackageDir);
      expect(parsed.trigger.paths.include).toContain(ciPath);
      expect(parsed.pr.paths.include).toContain(newPackageDir);
      expect(parsed.pr.paths.include).toContain(ciPath);
    });

    test('does not duplicate artifact when updating existing ci.yml', async () => {
      const packageDir = 'sdk/myservice/myservice';
      const ciPath = 'sdk/myservice/ci.yml';
      await ensureDir(path.join(tempDir, 'sdk/myservice'));

      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-myservice
        safeName: azuremyservice
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      const artifactNames = parsed.extends.parameters.Artifacts.map((a: any) => a.name);
      expect(artifactNames.filter((n: string) => n === 'azure-myservice')).toHaveLength(1);
      expect(parsed.trigger.paths.include.filter((p: string) => p === packageDir)).toHaveLength(1);
      expect(parsed.pr.paths.include.filter((p: string) => p === packageDir)).toHaveLength(1);
    });
  });

  test('returns empty string when writing fails due to missing parent directory', async () => {
    // Do NOT create the parent directory; writeFile inside the function will fail.
    // The catch block should swallow the error and return ''.
    const result = await createOrUpdateCiYaml('sdk/myservice/mypackage', {
      name: '@azure/mypackage',
      version: '1.0.0',
    });
    expect(result).toBe('');
  });

  describe('updateDataPlaneCiYaml — edge cases via existing ci.yml', () => {
    const npmPackageInfo = { name: '@azure/myservice', version: '1.0.0' };
    const packageDir = 'sdk/myservice/myservice';
    const ciPath = 'sdk/myservice/ci.yml';

    test('does not modify branches.exclude even when the section is missing', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // No branches.exclude at all
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-myservice
        safeName: azuremyservice
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      // data plane update should not touch branches.exclude
      expect(parsed.trigger.branches.exclude).toBeUndefined();
      expect(parsed.pr.branches.exclude).toBeUndefined();
    });

    test('does not add packageDir when service root (no trailing slash) already covers it', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-myservice
        safeName: azuremyservice
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      // packageDir is already covered by 'sdk/myservice', should not be duplicated
      expect(parsed.trigger.paths.include).not.toContain(packageDir);
      expect(parsed.pr.paths.include).not.toContain(packageDir);
    });

    test('does not add packageDir when service root (with trailing slash) already covers it', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-myservice
        safeName: azuremyservice
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      // packageDir is already covered by 'sdk/myservice/', should not be duplicated
      expect(parsed.trigger.paths.include).not.toContain(packageDir);
      expect(parsed.pr.paths.include).not.toContain(packageDir);
    });

    test('creates paths.include and adds packageDir and ciPath when section is missing', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // No paths.include at all; artifact is different so update proceeds
      const existingContent = `trigger:
  branches:
    include:
      - main
pr:
  branches:
    include:
      - main
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-other
        safeName: azureother
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      expect(parsed.trigger.paths.include).toContain(packageDir);
      expect(parsed.trigger.paths.include).toContain(ciPath);
      expect(parsed.pr.paths.include).toContain(packageDir);
      expect(parsed.pr.paths.include).toContain(ciPath);
    });

    test('creates Artifacts list and adds artifact when section is missing', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // No extends.parameters.Artifacts at all
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      expect(parsed.extends.parameters.Artifacts).toHaveLength(1);
      expect(parsed.extends.parameters.Artifacts[0].name).toBe('azure-myservice');
      expect(parsed.extends.parameters.Artifacts[0].safeName).toBe('azuremyservice');
    });

    test('adds ci.yml path itself to trigger.paths.include and pr.paths.include', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // paths.include exists but ci.yml path is absent; artifact is different so update proceeds
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-other
        safeName: azureother
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      expect(parsed.trigger.paths.include).toContain(ciPath);
      expect(parsed.pr.paths.include).toContain(ciPath);
    });

    test('skips update and does not rewrite file when artifact already exists', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-myservice
        safeName: azuremyservice
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      // File should not be rewritten — content stays exactly as written (no comment header prepended)
      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      expect(content).toBe(existingContent);
    });

    test('written file starts with the required comment header', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // artifact is different so update proceeds and file gets rewritten
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/myservice
      - sdk/myservice/ci.yml
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-other
        safeName: azureother
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      expect(content).toMatch(
        /^# NOTE: Please refer to https:\/\/aka\.ms\/azsdk\/engsys\/ci-yaml before editing this file\./
      );
    });

    test('adds mgmt package directories and ci.mgmt.yml to paths.exclude', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // Create actual mgmt directories and ci.mgmt.yml on disk
      await ensureDir(path.join(tempDir, 'sdk/myservice/arm-helper'));
      await ensureDir(path.join(tempDir, 'sdk/myservice/arm-another'));
      await writeFile(path.join(tempDir, 'sdk/myservice/ci.mgmt.yml'), '# mgmt ci', 'utf-8');
      const existingContent = `trigger:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/
pr:
  branches:
    include:
      - main
  paths:
    include:
      - sdk/myservice/
extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: myservice
    Artifacts:
      - name: azure-other
        safeName: azureother
`;
      await writeFile(path.join(tempDir, ciPath), existingContent, 'utf-8');

      await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      expect(parsed.trigger.paths.exclude).toContain('sdk/myservice/arm-helper');
      expect(parsed.trigger.paths.exclude).toContain('sdk/myservice/arm-another');
      expect(parsed.trigger.paths.exclude).toContain('sdk/myservice/ci.mgmt.yml');
      expect(parsed.pr.paths.exclude).toContain('sdk/myservice/arm-helper');
      expect(parsed.pr.paths.exclude).toContain('sdk/myservice/arm-another');
      expect(parsed.pr.paths.exclude).toContain('sdk/myservice/ci.mgmt.yml');
    });

    test('adds mgmt exclusions when creating ci.yml from scratch', async () => {
      await ensureDir(path.join(tempDir, 'sdk/myservice'));
      // No ci.yml exists yet; create mgmt directories and ci.mgmt.yml on disk
      await ensureDir(path.join(tempDir, 'sdk/myservice/arm-compute'));
      await writeFile(path.join(tempDir, 'sdk/myservice/ci.mgmt.yml'), '# mgmt ci', 'utf-8');

      const ciPath = await createOrUpdateCiYaml(packageDir, npmPackageInfo);

      expect(ciPath).toBe('sdk/myservice/ci.yml');
      const content = await readFile(path.join(tempDir, ciPath), 'utf-8');
      const parsed = parse(content);

      expect(parsed.trigger.paths.exclude).toContain('sdk/myservice/arm-compute');
      expect(parsed.trigger.paths.exclude).toContain('sdk/myservice/ci.mgmt.yml');
      expect(parsed.pr.paths.exclude).toContain('sdk/myservice/arm-compute');
      expect(parsed.pr.paths.exclude).toContain('sdk/myservice/ci.mgmt.yml');
    });
  });
});
