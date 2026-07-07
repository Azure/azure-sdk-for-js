import * as fs from 'fs';

export function prepareCommandToInstallDependenciesForTypeSpecProject(source: string, target: string): string {
  let command = `npm install`;
  if (!fs.existsSync(target) && fs.existsSync(source)) {
    fs.copyFileSync(source, target);
  } else if (fs.existsSync(target) && fs.existsSync(source)) {
    const predefinedDependencies = JSON.parse(fs.readFileSync(source, 'utf-8'))['dependencies'];
    for (const d of Object.keys(predefinedDependencies)) {
      command += ` "${d}@${predefinedDependencies[d]}"`;
    }
  } else if (!fs.existsSync(target) && !fs.existsSync(source)) {
    throw new Error(`Cannot find package.json in ${source}`);
  }
  return command;
}
