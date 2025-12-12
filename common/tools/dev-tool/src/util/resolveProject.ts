// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createPrinter } from "./printer";
import { SampleConfiguration } from "./samples/configuration";
import { pathToFileURL } from "node:url";

const { debug } = createPrinter("resolve-project");

/**
 * This is the base definition of PackageJson for our
 * packages. Other modules in this project may extend
 * this definition on their own by declaring an interface
 * to merge with this one:
 *
 * ```typescript
 * declare global {
 *   interface PackageJson {
 *     [MY_CUSTOM_PACKAGE_JSON_KEY]?: CustomType;
 *   }
 * }
 * ```
 */
declare global {
  interface PackageJson {
    name: string;
    version: string;
    "sdk-type"?: "client" | "mgmt" | "perf-test" | "utility";
    description: string;
    main?: string;
    types: string;
    exports?: {
      [path: string]: {
        import?: string;
        require?: string;
        types?: string;
        [extraTypes: `types@${string}`]: string;
      };
    };
    typesVersions?: {
      [k: string]: {
        [k: string]: string[];
      };
    };
    tshy?: Record<string, object>;
    type?: string;
    module?: string;
    bin?: Record<string, string>;
    files: string[];
    scripts: Record<string, string>;
    repository: string;
    author: string;
    keywords?: string[];
    license: string;
    bugs: {
      url: string;
    };
    homepage: string;
    sideEffects: boolean;
    private: boolean;
    engines?: { node?: string };

    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;

    [METADATA_KEY]?: AzureSdkMetadata;
  }
}

export const METADATA_KEY = "//metadata";

/**
 * Metadata that is specifically used by the Azure SDK tooling.
 */
export interface AzureSdkMetadata {
  /**
   * Configuration for samples.
   */
  sampleConfiguration?: SampleConfiguration;

  /**
   * The date this package was last migrated.
   */
  migrationDate?: string;

  /**
   * Paths that contain instances of the package's version number that should be updated automatically.
   */
  constantPaths?: Array<{
    /** The path to the containing file. */
    path: string;
    /** A line prefix to match */
    prefix: string;
  }>;
}

/**
 * Information about an Azure SDK for JS package
 */
export interface ProjectInfo {
  /**
   * The name of the package
   */
  name: string;
  /**
   * An absolute path to the package directory
   */
  path: string;
  /**
   * The package SemVer string, e.g. 1.0.0-preview.3 or 4.0.0
   */
  version: string;
  /**
   * The package info object (result of reading/parsing package.json)
   */
  packageJson: PackageJson;
}

async function isAzureSDKPackage(fileName: string): Promise<boolean> {
  const f = await import(fileName);

  if (f.name.includes("@azure/monorepo")) {
    return false;
  } else if (/^@azure(-[a-z]+)?\//.test(f.name)) {
    return true;
  } else if (f.name.startsWith("@typespec")) {
    return true;
  } else {
    return false;
  }
}

async function findAzSDKPackageJson(directory: string): Promise<[string, PackageJson]> {
  const files = await readdir(directory);

  if (files.includes("pnpm-workspace.yaml")) {
    throw new Error("Reached monorepo root, but no matching Azure SDK package was found.");
  }

  for (const file of files) {
    if (file === "package.json") {
      const fullPath = pathToFileURL(path.join(directory, file)).href;
      const packageObject = (await import(fullPath)).default;
      if (await isAzureSDKPackage(fullPath)) {
        return [directory, packageObject];
      }
      debug(`found package.json at ${fullPath}, but it is not an Azure SDK package`);
    }
  }

  const nextPath = path.resolve(path.join(directory, ".."));

  if (nextPath === directory) {
    throw new Error("Reached filesystem root, but no matching Azure SDK package was found.");
  }

  return findAzSDKPackageJson(nextPath);
}

/**
 * Determine which Azure SDK project a given directory belongs to.
 *
 * @param workingDirectory the directory to resolve the package from
 * @returns the package info for the SDK project that owns the given directory
 */
export async function resolveProject(
  workingDirectory: string = process.cwd(),
): Promise<ProjectInfo> {
  if (!existsSync(workingDirectory)) {
    throw new Error(`No such file or directory: ${workingDirectory}`);
  }

  const directory = await stat(workingDirectory);

  if (!directory.isDirectory()) {
    throw new Error(`${workingDirectory} is not a directory`);
  }

  const [path, packageJson] = await findAzSDKPackageJson(workingDirectory);

  if (!packageJson.name || !packageJson.version) {
    throw new Error(
      `Malformed package (did not have a name or version): ${path}, name="${packageJson.name}", version="${packageJson.version}"`,
    );
  }

  return {
    name: packageJson.name,
    path,
    version: packageJson.version,
    packageJson,
  };
}

/**
 * Finds the monorepo root.
 *
 * @param start - an optional starting point (defaults to CWD)
 * @returns an absolute path to the root of the monorepo
 */
export async function resolveRoot(start: string = process.cwd()): Promise<string> {
  if (existsSync(path.join(start, "pnpm-workspace.yaml"))) {
    return start;
  } else {
    const nextPath = path.resolve(start, "..");
    if (nextPath === start) {
      throw new Error("Reached filesystem root, but no pnpm-workspace.yaml was found.");
    } else {
      return resolveRoot(nextPath);
    }
  }
}

export async function isModuleProject() {
  const projectInfo = await resolveProject(process.cwd());
  return projectInfo.packageJson.type === "module";
}

/**
 * @param info - the project to bind to
 * @returns - a "require"-like function that always resolves relative to the input project
 */
export function bindRequireFunction(info: ProjectInfo): (id: string) => unknown {
  return (moduleSpecifier) => {
    try {
      return require(
        path.join(info.path, "node_modules", moduleSpecifier.split("/").join(path.sep)),
      );
    } catch {
      return require(moduleSpecifier);
    }
  };
}
