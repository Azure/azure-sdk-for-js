import path, { join } from "path";
import { ModularClientPackageOptions } from "../../../common/types.js";
import { generateRepoDataInTspLocation, runCommand } from "../../../common/utils.js";
import { logger } from "../../../utils/logger.js";
import {
  generateProvisioningCodeFromTypeSpec,
  patchWorkspaceDependencyToLink,
  provisioningEmitterName,
} from "../../../provisioning/provisioningGenerator.js";
import pkg from "@npmcli/package-json";
const { load } = pkg;
export async function updatePackageVersion(
  packageDirectory: string,
  version: string,
): Promise<void> {
  const packageJson = await load(packageDirectory);
  packageJson.content.version = version;
  await packageJson.save();
}

export async function generateTypeScriptCodeFromTypeSpec(
  options: ModularClientPackageOptions,
  originalVersion: string | undefined,
  packageDirectory: string,
): Promise<void> {
  // if (options.emitterName === provisioningEmitterName) {
  //   await generateProvisioningCodeFromTypeSpec(options, packageDirectory);
  //   if (originalVersion) await updatePackageVersion(packageDirectory, originalVersion);
  //   return;
  // }

  const tspConfigPath = join(options.typeSpecDirectory, "tspconfig.yaml");
  logger.info("Start to generate code by tsp-client.");
  const repoUrl = generateRepoDataInTspLocation(options.repoUrl);
  const tspClientDir = join(process.cwd(), "eng", "common", "tsp-client");

  logger.info(`Using tsp-client from: ${tspClientDir}`);
  const tspClientArgs = [
    "init",
    "--update-if-exists",
    "--debug",
    "--tsp-config",
    tspConfigPath,
    "--local-spec-repo",
    options.typeSpecDirectory,
    "--repo",
    repoUrl,
    "--commit",
    options.gitCommitId,
  ];

  if (options.emitterPackageJsonPath) {
    tspClientArgs.push("--emitter-package-json-path", options.emitterPackageJsonPath);
  }

  await runCommand(
    "npm",
    ["--prefix", tspClientDir, "exec", "--no", "--", "tsp-client", ...tspClientArgs],
    { shell: true, stdio: "inherit" },
    false,
  );

  if (originalVersion) await updatePackageVersion(packageDirectory, originalVersion);
  logger.info(`Generated typescript code successfully.`);

  // TODO: remove this hard-coded path after publishing the provisioning package to npm
  patchWorkspaceDependencyToLink(
    packageDirectory,
    "@azure/provisioning-core",
    path.join(
      "D:/GithubSource/tmpSource/js-provisioning-lib/packages/typespec-ts-provisioning",
      "packages",
      "core",
    ),
  );
}
