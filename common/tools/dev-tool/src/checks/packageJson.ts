import path from "path";
import { check, packageJsonCheck, enableForEsmPackage, enableForSdkType } from "../framework/check";
import { resolveRoot } from "../util/resolveProject";

/**
 * Expected value for engines field
 */
const LTS_ENGINES = ">=18.0.0";

export const license = packageJsonCheck({
  description: 'License field in package.json must be set to "MIT"',
  hasFix: true,
  async check({ packageJson }) {
    packageJson.license = "MIT";
  },
});

export const homepage = packageJsonCheck({
  description: "Homepage should be the URL to the package's README on GitHub",
  hasFix: true,
  severity: "warning",
  async check({ project, packageJson }) {
    const root = await resolveRoot();
    const p = path.relative(root, project.path);
    packageJson.homepage = `https://github.com/Azure/azure-sdk-for-js/blob/main/${p}/README.md`;
  },
});

export const author = packageJsonCheck({
  description: "author must be set to Microsoft Corporation",
  hasFix: true,
  async check({ packageJson }) {
    packageJson.author = "Microsoft Corporation";
  },
});

export const bugs = packageJsonCheck({
  description: "bugs URL must point to azure-sdk-for-js repo",
  hasFix: true,
  async check({ packageJson }) {
    packageJson.bugs = { url: "https://github.com/Azure/azure-sdk-for-js/issues" };
  },
});

export const engines = packageJsonCheck({
  description: "engines field must be set to LTS",
  hasFix: true,
  async check({ packageJson }) {
    packageJson.engines = { ...packageJson.engines, node: LTS_ENGINES };
  },
});

export const filesEsm = packageJsonCheck({
  description: "`files` field should just contain dist/, license and readme for ESM packages",
  enable: enableForEsmPackage,
  hasFix: true,
  severity: "warning",
  async check({ packageJson }) {
    packageJson.files = ["dist/", "LICENSE", "README.md"];
  },
});

export const keywords = packageJsonCheck({
  description: "`keywords` field should contain at least 'azure' and 'cloud'",
  enable: enableForSdkType("client"),
  hasFix: true,
  async check({ packageJson }) {
    packageJson.keywords ??= [];
    if (!packageJson.keywords.some((x) => x.toLowerCase() === "azure")) {
      packageJson.keywords.push("azure");
    }

    if (!packageJson.keywords.some((x) => x.toLowerCase() === "cloud")) {
      packageJson.keywords.push("cloud");
    }
  },
});

export const name = packageJsonCheck({
  description: "package.json name must follow correct format",
  async check({ packageJson }) {
    check(packageJson.name.startsWith("@azure"), "package name must start with @azure");
  },
});

export const repository = packageJsonCheck({
  description: "package.json repository value must be 'github:Azure/azure-sdk-for-js'",
  hasFix: true,
  async check({ packageJson }) {
    packageJson.repository = "github:Azure/azure-sdk-for-js";
  },
});

const sdkTypes = ["client", "mgmt", "utility"];

export const sdkType = packageJsonCheck({
  description: `package.json sdk-type field must be one of: ${sdkTypes.join(", ")}`,
  async check({ packageJson }) {
    check(sdkTypes.includes(packageJson["sdk-type"] ?? ""), "sdk-type field not recognized");
  },
});

export const sideEffects = packageJsonCheck({
  description: "package.json sideEffects field must be false",
  hasFix: true,
  async check({ packageJson }) {
    packageJson.sideEffects = false;
  },
});
