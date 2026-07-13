import { modifyOrGenerateCiYml } from '../../utils/changeCiYaml.js';

export async function generateExtraFiles(packagePath: string, packageName: string, sdkRepo: string) {
  await modifyOrGenerateCiYml(sdkRepo, packagePath, packageName, false);
}
