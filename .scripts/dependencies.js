const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function updatePackageJsonDependency(dependencyName, dependencyVersion) {
  const packageJsonFilePath = path.resolve(__dirname, "../package.json");

  const packageJson = JSON.parse(fs.readFileSync(packageJsonFilePath));
  if (packageJson.dependencies[dependencyName] == dependencyVersion) {
    console.log(`"${dependencyName}" is already set to "${dependencyVersion}".`);
  } else {
    console.log(`Changing "${dependencyName}" to "${dependencyVersion}"`)
    packageJson.dependencies[dependencyName] = dependencyVersion;

    fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, undefined, "  "));

    const npmInstallCommand = `npm install ${dependencyName}`;
    console.log(npmInstallCommand);
    execSync(npmInstallCommand, {stdio:[0,1,2]});
  }
}

function getNpmPackageVersion(packageName, tag) {
  const npmViewResult = JSON.parse(execSync(`npm view ${packageName} --json`, { stdio: ['pipe', 'pipe', 'ignore'] }));
  return npmViewResult['dist-tags'][tag];
}

exports.updatePackageJsonDependency = updatePackageJsonDependency;
exports.getNpmPackageVersion = getNpmPackageVersion;