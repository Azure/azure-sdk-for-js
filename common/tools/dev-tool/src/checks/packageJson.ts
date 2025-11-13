import path from "path";
import {
  assert,
  packageJsonCheck,
  enableForEsmPackage,
  enableForSdkType,
} from "../framework/check";
import { resolveRoot } from "../util/resolveProject";

/**
 * Expected value for engines field
 */
const LTS_ENGINES = ">=20.0.0";

export const license = packageJsonCheck({
  description: 'License field in package.json must be set to "MIT"',
  fix({ packageJson }) {
    return {
      ...packageJson,
      license: "MIT",
    };
  },
});

export const homepage = packageJsonCheck({
  description: "Homepage should be the URL to the package's README on GitHub",
  severity: "warning",
  async fix({ project, packageJson }) {
    const root = await resolveRoot();
    const libraryRelativePath = path.relative(root, project.path);

    return {
      ...packageJson,
      homepage: `https://github.com/Azure/azure-sdk-for-js/blob/main/${libraryRelativePath}/README.md`,
    };
  },
});

export const author = packageJsonCheck({
  description: "author must be set to Microsoft Corporation",
  fix({ packageJson }) {
    return {
      ...packageJson,
      author: "Microsoft Corporation",
    };
  },
});

export const bugs = packageJsonCheck({
  description: "bugs URL must point to azure-sdk-for-js repo",
  fix({ packageJson }) {
    return {
      ...packageJson,
      bugs: {
        url: "https://github.com/Azure/azure-sdk-for-js/issues",
      },
    };
  },
});

export const engines = packageJsonCheck({
  description: "engines field must be set to LTS",
  fix({ packageJson }) {
    return {
      ...packageJson,
      engines: {
        ...packageJson.engines,
        node: LTS_ENGINES,
      },
    };
  },
});

export const filesEsm = packageJsonCheck({
  description: "`files` field should just contain dist/, license and readme for ESM packages",
  enable: enableForEsmPackage,
  severity: "warning",
  fix({ packageJson }) {
    return {
      ...packageJson,
      files: ["dist/", "LICENSE", "README.md"],
    };
  },
});

export const keywords = packageJsonCheck({
  description:
    "`keywords` field should contain at least 'azure' and 'cloud'; all keywords must be lowercase",
  enable: enableForSdkType("client"),
  fix({ packageJson }) {
    packageJson.keywords ??= [];
    packageJson.keywords = packageJson.keywords.map((x) => x.toLowerCase());
    if (!packageJson.keywords.includes("azure")) {
      packageJson.keywords.push("azure");
    }

    if (!packageJson.keywords.includes("cloud")) {
      packageJson.keywords.push("cloud");
    }

    return packageJson;
  },
});

export const name = packageJsonCheck({
  description: "package.json name must follow correct format",
  async check({ packageJson }) {
    assert(packageJson.name.startsWith("@azure"), "package name must start with @azure");
  },
});

export const repository = packageJsonCheck({
  description: "package.json repository value must be 'github:Azure/azure-sdk-for-js'",
  fix({ packageJson }) {
    return {
      ...packageJson,
      repository: "github:Azure/azure-sdk-for-js",
    };
  },
});

const sdkTypes = ["client", "mgmt", "utility"];

export const sdkType = packageJsonCheck({
  description: `package.json sdk-type field must be one of: ${sdkTypes.join(", ")}`,
  check({ packageJson }) {
    assert(sdkTypes.includes(packageJson["sdk-type"] ?? ""), "sdk-type field not recognized");
  },
});

export const sideEffects = packageJsonCheck({
  description: "package.json sideEffects field must be false",
  fix({ packageJson }) {
    return {
      ...packageJson,
      sideEffects: false,
    };
  },
});

export const noWorkspaceSpecifiersInDependencies = packageJsonCheck({
  description: "non-private packages must not use workspace: specifiers in runtime dependencies",
  tags: ["release"],
  async check({ packageJson }) {
    // Skip check for private packages as they are not published
    if (packageJson.private) {
      return;
    }

    const dependencies = packageJson.dependencies ?? {};
    const workspaceDeps = Object.entries(dependencies).filter(([, version]) =>
      version.startsWith("workspace:"),
    );

    if (workspaceDeps.length > 0) {
      const depList = workspaceDeps.map(([name, version]) => `  ${name}: ${version}`).join("\n");
      assert(
        false,
        "package.json dependencies must not use workspace: specifiers",
        `The following runtime dependencies use workspace: specifiers which may resolve to unpublished versions:\n${depList}\n\nPlease use specific version ranges instead (e.g., "^1.0.0").`,
      );
    }
  },
});
