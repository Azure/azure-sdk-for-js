const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  dependencies.updatePackageJsonDependency(localDependency, `file:../${localDependency}`);
}