// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertEnvironmentVariable } from "@azure-tools/test-recorder";

import path from "path";

export const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));

export function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = assertEnvironmentVariable(
    "FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL",
  );
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}
