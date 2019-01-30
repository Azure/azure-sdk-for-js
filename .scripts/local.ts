import { resolvePath, changeClonedDependenciesTo } from "@ts-common/azure-js-dev-tools";

const packagePath: string = resolvePath(__dirname, "..");
changeClonedDependenciesTo(packagePath, "local");