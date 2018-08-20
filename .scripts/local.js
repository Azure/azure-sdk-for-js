const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  dependencies.runLocalRepositoryNPMScript(localDependency, "local");
}
let refreshNodeModules = false;
for (const localDependency of localDependencies) {
  const localRepositoryPath = dependencies.getLocalRepositoryPath(localDependency);
  if (dependencies.updatePackageJsonDependency(localDependency, `file:${localRepositoryPath}`)) {
    refreshNodeModules = true;
  }
}
if (refreshNodeModules) {
  dependencies.refreshNodeModules();
}
dependencies.updatePackageJsonMain("./lib/msRestAzure.ts");