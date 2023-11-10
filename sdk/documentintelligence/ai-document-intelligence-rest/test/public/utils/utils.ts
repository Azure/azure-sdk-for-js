// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertEnvironmentVariable } from "@azure-tools/test-recorder";

import path from "path";

export const ASSET_PATH = path.resolve(path.join(process.cwd(), "..", "..", "formrecognizer", "ai-form-recognizer", "assets"));

export function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = assertEnvironmentVariable(
    "FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL"
  );
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}

export function getRandomNumber(): number {
  return Math.ceil(Math.random() * 1000 + 10000);
}

export const containerSasUrl = (): string =>
  assertEnvironmentVariable("FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL");
