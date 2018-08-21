import * as dependencies from "./dependencies";
import * as repository from "./repository";

dependencies.updatePackageJsonMain(dependencies.getThisRepositoryFolderPath(), "./dist/lib/msRest.js");
dependencies.updateLocalDependencies(repository.packageFolders, "preview", dependencies.getPreviewDependencyVersion);