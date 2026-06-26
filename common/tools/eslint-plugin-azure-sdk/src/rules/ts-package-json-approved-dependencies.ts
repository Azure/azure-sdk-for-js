// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to prevent shipped sdk libraries from taking unapproved third-party
 * runtime dependencies.
 *
 * Only packages with `"sdk-type": "client"` or `"sdk-type": "mgmt"` are checked;
 * samples, tests, perf tests, and utility/tooling packages are out of scope. A
 * package may only declare a runtime dependency (`dependencies`) on a
 * third-party package if that package is first-party (an `@azure`, `@microsoft`,
 * or `@typespec` scope) or it appears in the central allow-list at
 * `eng/approved-third-party-dependencies.yml`. `devDependencies` and
 * `peerDependencies` are not checked.
 */

import { TSESTree } from "@typescript-eslint/utils";
import path from "node:path";
import {
  checkDependencyApproval,
  createRule,
  loadApprovedDependencies,
  resolveApprovedDependenciesPath,
  stripPath,
} from "../utils/index.js";

export type Options = [
  {
    /**
     * Overrides the location of the allow-list file. Primarily intended for
     * testing; in the monorepo the rule resolves the file relative to the
     * repository root automatically.
     */
    configPath?: string;
  },
];

type MessageIds = "unapproved" | "exceptionOtherPackages" | "rootNotFound" | "configError";

/**
 * Returns the string key of a JSON property node, or undefined if it is not a
 * string-keyed property.
 */
function getKeyName(property: TSESTree.Property): string | undefined {
  const { key } = property;
  if (key.type === "Literal" && typeof key.value === "string") {
    return key.value;
  }
  return undefined;
}

/**
 * Finds the first top-level string-keyed property with the given name.
 */
function findProperty(
  object: TSESTree.ObjectExpression,
  name: string,
): TSESTree.Property | undefined {
  return object.properties.find(
    (property): property is TSESTree.Property =>
      property.type === "Property" && getKeyName(property) === name,
  );
}

export default createRule<Options, MessageIds>({
  name: "ts-package-json-approved-dependencies",
  meta: {
    type: "problem",
    docs: {
      description:
        "ensure client/mgmt library runtime dependencies are first-party or appear in the central third-party allow-list",
    },
    messages: {
      unapproved:
        'The third-party runtime dependency "{{dependency}}" is not approved. To take a new third-party dependency, add it to {{configFile}} (as a global "allowed" entry or a package-scoped "exceptions" entry) with the appropriate approval.',
      exceptionOtherPackages:
        'The third-party runtime dependency "{{dependency}}" is only approved for: {{packages}}. To use it in "{{packageName}}", add that package to the dependency\'s "packages" list in {{configFile}}.',
      rootNotFound:
        "Could not locate the monorepo root to find the third-party dependency allow-list ({{configFile}}).",
      configError: "Could not load the third-party dependency allow-list: {{details}}",
    },
    schema: [
      {
        type: "object",
        properties: {
          configPath: {
            type: "string",
            description: "Overrides the location of the allow-list file (used for testing).",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{}],
  create(context) {
    // Only act on package.json files.
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }

    // Only enforce the policy for packages under sdk/.
    if (!context.filename.split(/[\\/]/).includes("sdk")) {
      return {};
    }

    const configPathOption = context.options[0]?.configPath;
    const packageDirectory = path.dirname(context.filename);

    return {
      "ExpressionStatement > ObjectExpression": (node: TSESTree.ObjectExpression): void => {
        // Only enforce on shipped libraries (client/mgmt). Samples, tests,
        // perf tests, and utility/tooling packages are out of scope.
        const sdkTypeProperty = findProperty(node, "sdk-type");
        const sdkType =
          sdkTypeProperty?.value.type === "Literal" ? sdkTypeProperty.value.value : undefined;
        if (sdkType !== "client" && sdkType !== "mgmt") {
          return;
        }

        const dependenciesProperty = findProperty(node, "dependencies");
        if (
          dependenciesProperty === undefined ||
          dependenciesProperty.value.type !== "ObjectExpression"
        ) {
          return;
        }

        const nameProperty = findProperty(node, "name");
        const packageName =
          nameProperty?.value.type === "Literal" && typeof nameProperty.value.value === "string"
            ? nameProperty.value.value
            : "<unknown>";

        const configPath = configPathOption
          ? path.resolve(packageDirectory, configPathOption)
          : resolveApprovedDependenciesPath(packageDirectory);

        if (configPath === undefined) {
          context.report({
            node: dependenciesProperty,
            messageId: "rootNotFound",
            data: { configFile: "eng/approved-third-party-dependencies.yml" },
          });
          return;
        }

        let config;
        try {
          config = loadApprovedDependencies(configPath);
        } catch (e) {
          context.report({
            node: dependenciesProperty,
            messageId: "configError",
            data: { details: (e as Error).message },
          });
          return;
        }

        const configFile = "eng/approved-third-party-dependencies.yml";

        for (const dependency of dependenciesProperty.value.properties) {
          if (dependency.type !== "Property") {
            continue;
          }
          const dependencyName = getKeyName(dependency);
          if (dependencyName === undefined) {
            continue;
          }

          const result = checkDependencyApproval(dependencyName, packageName, config);
          if (result.status === "unapproved") {
            context.report({
              node: dependency,
              messageId: "unapproved",
              data: { dependency: dependencyName, configFile },
            });
          } else if (result.status === "exception-other-packages") {
            context.report({
              node: dependency,
              messageId: "exceptionOtherPackages",
              data: {
                dependency: dependencyName,
                packageName,
                packages: result.allowedPackages.join(", "),
                configFile,
              },
            });
          }
        }
      },
    };
  },
});
