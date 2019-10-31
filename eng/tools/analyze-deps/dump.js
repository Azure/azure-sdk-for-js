const fs = require("fs");
const path = require("path");
const util = require("util");

const jju = require("jju");
const yaml = require("js-yaml");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const appendPackageData = (data, pkgJson) => {
  data[`${pkgJson.name}:${pkgJson.version}`] = {
    name: pkgJson.name,
    version: pkgJson.version,
    type: 'internal',
    deps: pkgJson.dependencies || {}
  };
};

const getRushPackages = async (rushPath) => {
  const baseDir = path.dirname(rushPath);
  const rushJson = jju.parse(await readFile(rushPath, "utf8"));
  const packageData = {};

  for (const proj of rushJson.projects) {
    const projDir = path.join(baseDir, proj.projectFolder);
    const packageJson = jju.parse(await readFile(path.join(projDir, "package.json"), "utf8"));
    appendPackageData(packageData, packageJson);
  }

  return packageData;
};

const readPnpmLock = async (lockPath) => {
  const data = await readFile(lockPath, "utf8");
  return yaml.safeLoad(data);
};

const addUpdateRushPackage = (packages, internalPackages, pnpmLock, pkgId) => {
  const yamlKey = `@rush-temp/${packages[pkgId].name.replace("@azure/", "")}`;
  const packageKey = pnpmLock.dependencies[yamlKey];
  const resolvedDeps = pnpmLock.packages[packageKey].dependencies;

  for (const depName of Object.keys(packages[pkgId].deps)) {
    if (resolvedDeps[depName]) {
      // Replace the version spec with the resolved version
      packages[pkgId].deps[depName] = resolvedDeps[depName];

      // Add the dependency to the top level of the packages list
      const depId = `${depName}:${resolvedDeps[depName]}`;
      if (!packages[depId]) {
        packages[depId] = {
          name: depName,
          version: resolvedDeps[depName],
          type: internalPackages.includes(depName) ? 'internalbinary' : 'external',
          deps: {}
        };
      }
    } else {
      // Local linked projects are not listed here, so pull the version from the local package.json
      const depInfo = Object.values(packages).find(pkgInfo => pkgInfo.name == depName);
      packages[pkgId].deps[depName] = depInfo.version;
    }
  }
}

const main = async () => {
  const packages = await getRushPackages(path.resolve(`${__dirname}/../../../rush.json`));
  const internalPackages = Object.values(packages).map(pkgInfo => pkgInfo.name);
  const pnpmLock = await readPnpmLock(path.resolve(`${__dirname}/../../../common/config/rush/pnpm-lock.yaml`));
  for (const pkgId of Object.keys(packages)) {
    addUpdateRushPackage(packages, internalPackages, pnpmLock, pkgId);
  }
  await writeFile("data.js", "const data = " + JSON.stringify(packages) + ";");
};

main();
