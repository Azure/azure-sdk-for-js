// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { getTestingContainerSasUrl } from "./injectables.js";

export const ASSET_PATH = path.resolve(path.join(process.cwd(), "assets"));

export function makeTestUrl(urlPath: string): string {
  const testingContainerUrl = getTestingContainerSasUrl();
  const parts = testingContainerUrl.split("?");
  return `${parts[0]}${urlPath}?${parts[1]}`;
}
