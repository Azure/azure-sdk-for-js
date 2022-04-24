// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as path from "path";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveRoot } from "../../util/resolveProject";
import { buildProject, runAutorest, scaffold, ScaffoldingOptions } from "../../util/scaffolding";

export const commandInfo = makeCommandInfo(
  "clone-template",
  "Creates a new package in the repository, cloning the template project",
  {
    name: {
      kind: "string",
      description: `Package name, without the scope. For example "storage-blob" would be the name for the package @azure/storage-blob`,
    },
    "service-folder": {
      kind: "string",
      description: `Folder in the repository where the package will live in. This is usually a technology group. For example @azure/storage-blob would live in the "storage" service folder. For more information please read https://azure.github.io/azure-sdk/general_design.html#namespaces`,
    },
    "tracing-namespace": {
      kind: "string",
      description: `Namespace to use with distributed tracing`,
    },
    version: {
      kind: "string",
      description: `Package version`,
      default: "1.0.0-beta.1",
    },
    "package-description": {
      kind: "string",
      description: `A description of the new package, this helps people discover your package, as it's listed in npm search`,
    },
    "product-name": {
      kind: "string",
      description: `Name of the Azure product this library will work with. For example: Azure Storage Blob`,
    },
    "skip-generate-client": {
      kind: "boolean",
      description: `Whether or not to run rushx generate:client after scaffolding completed`,
      default: false,
    },
    "skip-build": {
      kind: "boolean",
      description: `Whether or not to build the project after scaffolding completed`,
      default: false,
    },
    force: {
      kind: "boolean",
      description: "Forces scaffolding overwriting existing files",
      default: false,
      shortName: "t",
    },
  }
);

export default leafCommand(commandInfo, async (options) => {
  if (!options.name) {
    return false;
  }
  if (!options["service-folder"]) {
    return false;
  }

  let scaffoldingOptions: ScaffoldingOptions = {
    name: options.name,
    folderName: options["service-folder"],
    packageDescription: options["package-description"],
    productName: options["product-name"],
    tracingNamespace: options["tracing-namespace"],
    version: options["version"],
    generator: "template-clone",
    force: options["force"],
  };

  await scaffold(scaffoldingOptions);

  const projectPath = path.join(
    await resolveRoot(),
    "sdk",
    scaffoldingOptions.folderName,
    scaffoldingOptions.name
  );

  if (!options["skip-generate-client"]) {
    await runAutorest(projectPath);
  }

  if (!options["skip-build"]) {
    await buildProject(projectPath);
  }

  return true;
});
