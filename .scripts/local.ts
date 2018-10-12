import * as dependencies from "./dependencies";
import * as repository from "./repository";

dependencies.updateLocalDependencies(repository.packageFolders, "local", dependencies.getLocalDependencyVersion);