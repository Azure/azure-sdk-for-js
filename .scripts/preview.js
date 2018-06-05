const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  dependencies.runLocalRepositoryNPMScript(localDependency, "preview");
}
let refreshNodeModules = false;
for (const localDependency of localDependencies) {
  let version = dependencies.getNpmPackageVersion(localDependency, "preview");
  if (!version) {
    version = dependencies.getNpmPackageVersion(localDependency, "latest");
  }
  if (dependencies.updatePackageJsonDependency(localDependency, `~${version}`)) {
    refreshNodeModules = true;
  }
}
if (refreshNodeModules) {
  dependencies.refreshNodeModules();
}
dependencies.updatePackageJsonMain("./dist/lib/msRestAzure.js");