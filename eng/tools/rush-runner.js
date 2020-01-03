const fs = require('fs');
const path = require('path');
const process = require('process');
const { spawnSync } = require('child_process');

const parseArgs = () => {
  if (process.argv.length < 3 || process.argv.some(a => ['-h', '--help'].includes(a.toLowerCase()))) {
    console.error('Usage: rush-runner.js <action> [<servicename>...] [args...]');
    console.error('Example: rush-runner.js build keyvault storage --verbose');
    process.exit(1);
  }

  let inFlags = false;
  const services = [], flags = [];
  const [scriptPath, action, ...givenArgs] = process.argv.slice(1);
  const baseDir = path.resolve(`${path.dirname(scriptPath)}/../..`);

  for (const arg of givenArgs) {
    if (!inFlags && arg.startsWith('-')) {
      inFlags = true;
    }

    if (inFlags) {
      flags.push(arg);
    } else {
      if (arg && arg !== '*') { // exclude empty value and special value "*" meaning all libraries
        services.push(arg);
      }
    }
  }
  return [baseDir, action, services, flags];
};

const getPackageJsons = (searchDir) => {
  return fs.readdirSync(searchDir)
    .filter(f => !f.startsWith('arm-')) // exclude libraries starting with "arm-"
    .map(f => path.join(searchDir, f, 'package.json')) // turn potential directory names into package.json paths
    .filter(f => fs.existsSync(f)); // only keep paths for files that actually exist
};

const getServicePackages = (baseDir, serviceDirs) => {
  const packageNames = [], packageDirs = [];
  for (const serviceDir of serviceDirs) {
    const searchDir = path.resolve(path.join(baseDir, 'sdk', serviceDir));
    const packageJsons = getPackageJsons(searchDir);
    for (const filePath of packageJsons) {
      const contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (contents['sdk-type'] === 'client') {
        packageNames.push(contents.name);
        packageDirs.push(path.dirname(filePath));
      }
    }
  }

  return [packageNames, packageDirs];
};

const spawnNode = (cwd, ...args) => {
  console.log(`Executing: "node ${args.join(' ')}" in ${cwd}\n\n`);
  const proc = spawnSync('node', args, { cwd, stdio: 'inherit' });
  console.log(`\n\nNode process exited with code ${proc.status}`);

  if (proc.status !== 0) {
    // proc.status will be null if the subprocess terminated due to a signal, which I don't think
    // should ever happen, but if it does it's safer to fail.
    process.exitCode = proc.status || 1;
  }
};

const flatMap = (arr, f) => {
  const result = arr.map(f);
  return [].concat(...result);
}

const [baseDir, action, serviceDirs, rushParams] = parseArgs();
const [packageNames, packageDirs] = getServicePackages(baseDir, serviceDirs);

if (serviceDirs.length === 0) {
  spawnNode(baseDir, 'common/scripts/install-run-rush.js', action, ...rushParams);
} else {
  let params = [];
  switch (action.toLowerCase().split(':')[0]) {
    // case 'build':
    //   params = flatMap(packageNames, (p) => [`--to`, p, `--from`, p]);
    //   spawnNode(baseDir, 'common/scripts/install-run-rush.js', action, ...params, ...rushParams);
    //   break;

    case 'test':
    case 'unit-test':
    case 'integration-test':
      params = flatMap(packageNames, (p) => [`--from`, p]);
      spawnNode(baseDir, 'common/scripts/install-run-rush.js', action, ...params, ...rushParams);
      break;

    case 'lint':
      for (const packageDir of packageDirs) {
        spawnNode(packageDir, '../../../common/scripts/install-run-rushx.js', action);
      }
      break;

    default:
      params = flatMap(packageNames, (p) => [`--to`, p]);
      spawnNode(baseDir, 'common/scripts/install-run-rush.js', action, ...params, ...rushParams);
      break;
  }
}
