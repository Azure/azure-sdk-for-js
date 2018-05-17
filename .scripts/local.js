const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  dependencies.runLocalRepositoryNPMScript(localDependency, "local");
}
let refreshNodeModules = false;
for (const localDependency of localDependencies) {
  if (dependencies.updatePackageJsonDependency(localDependency, `file:../${localDependency}`)) {
    refreshNodeModules = true;
  }
}
if (refreshNodeModules) {
  dependencies.refreshNodeModules();
}
dependencies.updatePackageJsonMain("./lib/msRestAzure.ts");