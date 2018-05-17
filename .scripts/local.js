const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  dependencies.updatePackageJsonDependency(localDependency, `file:../${localDependency}`);
  dependencies.runLocalRepositoryNPMScript(localDependency, "local");
}
dependencies.updatePackageJsonMain("./lib/msRestAzure.ts");