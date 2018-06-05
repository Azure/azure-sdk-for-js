const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  dependencies.runLocalRepositoryNPMScript(localDependency, "latest");
}
let refreshNodeModules = false;
for (const localDependency of localDependencies) {
  const version = dependencies.getNpmPackageVersion(localDependency, "latest");
  if (dependencies.updatePackageJsonDependency(localDependency, `~${version}`)) {
    refreshNodeModules = true;
  }
}
if (refreshNodeModules) {
  dependencies.refreshNodeModules();
}
dependencies.updatePackageJsonMain("./dist/lib/msRestAzure.js");