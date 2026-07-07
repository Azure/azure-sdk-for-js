import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../../utils/logger.js';
import { getLatestStableVersion } from '../../utils/version.js';
import { tryGetNpmView } from '../../common/npmUtils.js';
import readline from 'readline';
import yaml from 'js-yaml';
export function validPackageName(packageName) {
  const match = /@azure-rest\/[a-zA-Z-]+/.exec(packageName);
  if (!match) return false;
  else return true;
}

export function findPackageInRepo(packageName, sdkRepo) {
  const rps = fs.readdirSync(path.join(sdkRepo, 'sdk'));
  for (const rp of rps) {
    if (!fs.lstatSync(path.join(sdkRepo, 'sdk', rp)).isDirectory()) {
      continue;
    }
    const packages = fs.readdirSync(path.join(sdkRepo, 'sdk', rp));
    for (const p of packages) {
      if (!fs.lstatSync(path.join(sdkRepo, 'sdk', rp, p)).isDirectory()) {
        continue;
      }
      if (fs.existsSync(path.join(sdkRepo, 'sdk', rp, p, 'package.json'))) {
        const packageJson = path.join(sdkRepo, 'sdk', rp, p, 'package.json');
        const packageJsonContent = JSON.parse(fs.readFileSync(packageJson, { encoding: 'utf-8' }));
        if (packageName === packageJsonContent['name']) {
          return path.join(sdkRepo, 'sdk', rp, p);
        }
      }
      if (fs.existsSync(path.join(sdkRepo, 'sdk', rp, p, 'swagger', 'README.md'))) {
        const readme = fs.readFileSync(path.join(sdkRepo, 'sdk', rp, p, 'swagger', 'README.md'), { encoding: 'utf-8' });
        const match = /package-name: "*(@azure-rest\/[a-zA-Z-]+)/.exec(readme);
        if (!!match && match.length === 2 && packageName === match[1]) {
          return path.join(sdkRepo, 'sdk', rp, p);
        }
      }
    }
  }
  return undefined;
}

export function getPackageFolderName(packageName) {
  const match = /@azure-rest\/([a-z-]+)/.exec(packageName);
  if (!match || match.length !== 2) {
    logger.error(
      `Package name'${packageName}' is invalid, please input a new packageName in format '@azure-rest/*****'.`
    );
    process.exit(1);
  } else {
    const subName = match[1];
    return `${subName}-rest`;
  }
}

export async function getLatestCodegen(packagePath) {
  const npmViewResult = await tryGetNpmView('@autorest/typescript');
  const stableVersion = npmViewResult ? getLatestStableVersion(npmViewResult) : undefined;
  // TODO: do not hardcode
  if (!stableVersion) return '6.0.0-beta.14';
  return stableVersion;
}

export function getPackagePathFromReadmePath(readmePath) {
  if (!fs.existsSync(readmePath)) {
    logger.error(`Invalid README.md file path '${readmePath}'.`);
    logger.error(`Report this issue in https://aka.ms/azsdk/support/specreview-channel`);
    process.exit(1);
  } else {
    const absolutePath = path.resolve(readmePath);
    const match = /.*sdk[\/\\]+[a-zA-Z0-9-]+[\/\\]+[a-zA-Z0-9-]+/.exec(absolutePath);
    if (!match || match.length !== 1) {
      logger.error(`Invalid README.md file path '${readmePath}'.`);
      logger.error(`Report this issue in https://aka.ms/azsdk/support/specreview-channel`);
      process.exit(1);
    }
    return match[0];
  }
}

export function createFolderIfNotExist(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

export function getConfigFromReadmeMd(readmePath: string) {
  const readme = fs.readFileSync(readmePath, { encoding: 'utf-8' });
  const match = /```yaml((.|\n)*)```/.exec(readme);
  if (!match || match.length !== 3) {
    throw new Error(`Cannot find valid package name from ${readmePath}`);
  }
  return yaml.load(match[1]);
}

export function getPackageNameFromReadmeMd(readme: any) {
  if (!readme['package-name'] || !/@azure-rest\/[a-zA-Z-]+/.exec(readme['package-name'])) {
    throw new Error(`Cannot find valid package name from existing README.md`);
  }
  return readme['package-name'];
}

export async function getPackageNameFromCommand(): Promise<string> {
  while (true) {
    const packageName = await getInputFromCommand('package-name');
    if (validPackageName(packageName)) {
      return packageName;
    } else {
      logger.warn("Invalid package name. It should be in format '@azure-rest/xxxxx', please input a new one.");
    }
  }
}

function ask(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

const messages = {
  'package-name': 'Please input packageName which should be in format @azure-rest/xxxxx: ',
  title: 'Please input the title of sdk: ',
  description: `Please input the description of sdk: `,
  'input-file': `Please input the swagger files. If you have multi input files, please use semicolons to separate: `,
  'package-version': `Please input the package version you want to generate: `,
  'credential-scopes': `Please input credential-scopes of your service: `,
  'service-name': `Which service folder do you want to store your package in sdk folder? Please input it: `,
};

export async function getInputFromCommand(parameter: string): Promise<string> {
  while (true) {
    const input = (await ask(messages[parameter].yellow)) as string;
    if (input.trim() === '') {
      logger.warn('Please do not input empty string.');
    } else {
      return input;
    }
  }
}

export async function getInputFromCommandWithDefaultValue(parameter: string, defaultValue: string): Promise<string> {
  const input = await ask(`${messages[parameter]}[default: ${defaultValue}]: `);
  if ((input as string).trim() === '') {
    return defaultValue;
  } else {
    return input as string;
  }
}

export function changeRequiredReadmePath(requiredReadme: any, swaggerRepo: string) {
  if (Array.isArray(requiredReadme)) {
    requiredReadme = requiredReadme.map((readme) => {
      if (swaggerRepo.includes('specification') && readme.startsWith('specification')) {
        return path.join(swaggerRepo, '..', readme);
      } else {
        return path.join(swaggerRepo, readme);
      }
    });
  } else if (typeof requiredReadme === 'string' || requiredReadme instanceof String) {
    requiredReadme = [path.join(swaggerRepo, requiredReadme as string)];
  } else {
    throw new Error(`Get invalid required in comment: ${requiredReadme}`);
  }
  return requiredReadme;
}
