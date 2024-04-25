// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createClientLogger } from "@azure/logger";

import path from "path";

export const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));

export function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = assertEnvironmentVariable(
    "DOCUMENT_INTELLIGENCE_TESTING_CONTAINER_SAS_URL",
  );
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}

export function getRandomNumber(): number {
  return Math.ceil(Math.random() * 1000 + 10000);
}

export const containerSasUrl = (): string =>
  assertEnvironmentVariable("DOCUMENT_INTELLIGENCE_TRAINING_CONTAINER_SAS_URL");

export const logger = createClientLogger("ai-form-recognizer:test");
