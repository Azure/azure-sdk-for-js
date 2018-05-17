const dependencies = require("./dependencies");

const localDependencies = dependencies.getDependenciesWithClonedRepositories();
for (const localDependency of localDependencies) {
  let version = dependencies.getNpmPackageVersion(localDependency, "preview");
  if (!version) {
    version = dependencies.getNpmPackageVersion(localDependency, "latest");
  }
  dependencies.updatePackageJsonDependency(localDependency, `^${version}`);
}