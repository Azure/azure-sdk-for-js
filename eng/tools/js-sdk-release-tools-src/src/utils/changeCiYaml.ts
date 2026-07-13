import path from 'path';
import fs from 'fs';

import { parse, stringify } from 'yaml';

function addExcludeBranch(branches: any) {
  if (branches && branches.include.includes('feature/*')) {
    if (!branches['exclude']) {
      branches['exclude'] = [];
    }
    if (!branches['exclude'].includes('feature/v4')) {
      branches['exclude'].push('feature/v4');
      return true;
    }
  }
  return false;
}

function addArtifact(artifacts: any, name: string, safeName: string) {
  if (!artifacts) return false;
  for (const artifact of artifacts) {
    if (name === artifact.name) return false;
  }
  artifacts.push({
    name: name,
    safeName: safeName,
  });
  return true;
}

function addIncludePath(paths: any, includes: string[]) {
  let changed = false;
  if (paths) {
    if (!paths.include) {
      paths.include = [];
    }
    includes.forEach((element) => {
      if (!paths.include.includes(element)) {
        paths.include.push(element);
        changed = true;
      }
    });
  }
  return changed;
}

function addExcludePath(paths: any, excludes: string[]) {
  let changed = false;
  if (paths) {
    if (!paths.exclude) {
      paths.exclude = [];
    }
    excludes.forEach((element) => {
      if (!paths.exclude.includes(element)) {
        paths.exclude.push(element);
        changed = true;
      }
    });
  }
  return changed;
}

export function modifyOrGenerateCiYml(
  azureSDKForJSRepoRoot: string,
  changedPackageDirectory: string,
  packageName: string,
  isMgmt: boolean
) {
  const relativeRpFolderPathRegexResult = /sdk[\/\\][^\/]*[\/\\]/.exec(changedPackageDirectory);
  if (!relativeRpFolderPathRegexResult) return;
  let relativeRpFolderPath = relativeRpFolderPathRegexResult[0];
  const rpFolderName = path.basename(relativeRpFolderPath);
  const rpFolderPath = path.join(azureSDKForJSRepoRoot, relativeRpFolderPath);

  const name = packageName.replace('@', '').replace('/', '-');
  const safeName = name.replace(/-/g, '');

  const ciMgmtYmlPath = path.join(rpFolderPath, 'ci.mgmt.yml');
  const ciYmlPath = path.join(rpFolderPath, 'ci.yml');

  if (isMgmt) {
    // modify or change ci.mgmt.yml
    if (fs.existsSync(ciMgmtYmlPath)) {
      const ciMgmtYml = parse(fs.readFileSync(ciMgmtYmlPath, { encoding: 'utf-8' }));
      let changed = false;
      changed = addExcludeBranch(ciMgmtYml?.trigger?.branches) || changed;
      changed = addExcludeBranch(ciMgmtYml?.pr?.branches) || changed;
      changed =
        addIncludePath(ciMgmtYml?.trigger?.paths, [
          `${changedPackageDirectory.replace(/\\/g, '/')}`,
          `sdk/${rpFolderName}/ci.mgmt.yml`,
        ]) || changed;
      changed =
        addIncludePath(ciMgmtYml?.pr?.paths, [
          `${changedPackageDirectory.replace(/\\/g, '/')}`,
          `sdk/${rpFolderName}/ci.mgmt.yml`,
        ]) || changed;
      changed = addArtifact(ciMgmtYml?.extends?.parameters?.Artifacts, name, safeName) || changed;
      if (changed) {
        fs.writeFileSync(
          ciMgmtYmlPath,
          `# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.
                
${stringify(ciMgmtYml)}`,
          { encoding: 'utf-8' }
        );
      }
    } else {
      const ciMgmtYml = `# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.
            
trigger:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
    exclude:
      - feature/v4
  paths:
    include:
      - ${changedPackageDirectory.replace(/\\/g, '/')}
      - sdk/${rpFolderName}/ci.mgmt.yml

pr:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
    exclude:
      - feature/v4
  paths:
    include:
      - ${changedPackageDirectory.replace(/\\/g, '/')}
      - sdk/${rpFolderName}/ci.mgmt.yml

extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: ${rpFolderName}
    Artifacts:
      - name: ${name}
        safeName: ${safeName}
        `;
      fs.writeFileSync(ciMgmtYmlPath, ciMgmtYml, { encoding: 'utf-8' });
    }
    // modify ci.yml if exist
    if (fs.existsSync(ciYmlPath)) {
      const ciYml = parse(fs.readFileSync(ciYmlPath, { encoding: 'utf-8' }));
      let changed = false;
      changed =
        addExcludePath(ciYml?.trigger?.paths, [
          `${changedPackageDirectory.replace(/\\/g, '/')}`,
          `sdk/${rpFolderName}/ci.mgmt.yml`,
        ]) || changed;
      changed =
        addExcludePath(ciYml?.pr?.paths, [
          `${changedPackageDirectory.replace(/\\/g, '/')}`,
          `sdk/${rpFolderName}/ci.mgmt.yml`,
        ]) || changed;
      if (changed) {
        fs.writeFileSync(
          ciYmlPath,
          `# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.
                
${stringify(ciYml)}`,
          { encoding: 'utf-8' }
        );
      }
    }
  } else {
    // modify or change ci.yml
    if (fs.existsSync(ciYmlPath)) {
      const ciYml = parse(fs.readFileSync(ciYmlPath, { encoding: 'utf-8' }));
      let changed = false;
      changed = addExcludeBranch(ciYml?.trigger?.branches) || changed;
      changed = addExcludeBranch(ciYml?.pr?.branches) || changed;
      changed = addArtifact(ciYml?.extends?.parameters?.Artifacts, name, safeName) || changed;
      if (changed) {
        fs.writeFileSync(
          ciYmlPath,
          `# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.
                
${stringify(ciYml)}`,
          { encoding: 'utf-8' }
        );
      }
    } else {
      const ciYml = parse(`
trigger:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
    exclude:
      - feature/v4
  paths:
    include:
      - ${relativeRpFolderPath.replace(/\\/g, '/')}

pr:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
    exclude:
      - feature/v4
  paths:
    include:
      - ${relativeRpFolderPath.replace(/\\/g, '/')}

extends:
  template: /eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: ${rpFolderName}
    Artifacts:
      - name: ${name}
        safeName: ${safeName}
        `);

      if (fs.existsSync(ciMgmtYmlPath)) {
        const ciMgmtYml = parse(fs.readFileSync(ciMgmtYmlPath, 'utf-8'));
        if (ciMgmtYml?.trigger?.paths?.include) {
          addExcludePath(ciYml?.trigger?.paths, ciMgmtYml.trigger.paths.include);
        }
        if (ciMgmtYml?.pr?.paths?.include) {
          addExcludePath(ciYml?.pr?.paths, ciMgmtYml.pr.paths.include);
        }
      }

      fs.writeFileSync(
        ciYmlPath,
        `# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.
                
${stringify(ciYml)}`,
        { encoding: 'utf-8' }
      );
    }
  }
}
