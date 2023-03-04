// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFile, writeFile } from "fs-extra";
import path from "path";
import { createMigration } from "../util/migrations";
import { METADATA_KEY, ProjectInfo } from "../util/resolveProject";
import { SAMPLE_CONFIGURATION_KEY } from "../util/samples/configuration";

export default createMigration(
  "sample_configuration_metadata",
  "2023-03-03T23:11:30Z",
  "moves the `//sampleConfiguration` package.json field to the '//metadata' field",
  {
    validation: validate,
    execution: execute,
  }
);

async function validate(project: ProjectInfo) {
  // Only run the migration on "client" packages. TODO: do we need an entry in the Migration struct for this? Like an
  // `eligibility` method?
  if (project.packageJson["sdk-type"] !== "client") return;

  // TODO: get schema support from `dev-tool check` merged and validate the package.json SampleConfiguration schema
  const packageJsonPath = path.join(project.path, "package.json");

  const packageJson = JSON.parse(await (await readFile(packageJsonPath)).toString("utf-8"));

  if (!packageJson[METADATA_KEY].sampleConfiguration)
    throw new Error("No sample configuration detected after migration.");
}

async function execute(project: ProjectInfo) {
  // Only run the migration on "client" packages. See above TODO.
  if (project.packageJson["sdk-type"] !== "client") return;

  const packageJsonPath = path.join(project.path, "package.json");

  const packageJson = JSON.parse(await (await readFile(packageJsonPath)).toString("utf-8"));

  if (packageJson[SAMPLE_CONFIGURATION_KEY]) {
    // bah humbug. we need a way to ensure that this key is added without messing up the object order...
    packageJson[METADATA_KEY].sampleConfiguration = packageJson[SAMPLE_CONFIGURATION_KEY];

    delete packageJson[SAMPLE_CONFIGURATION_KEY];

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}
