// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SynonymMap } from "./serviceModels.js";

/**
 * Helper method to create a SynonymMap object. This is a NodeJS only method.
 * Will throw an error for browser.
 *
 * @param name - Name of the SynonymMap.
 * @param filePath - Path of the file that contains the Synonyms (separated by new lines)
 * @returns SynonymMap object
 */
export async function createSynonymMapFromFile(
  _name: string,
  _filePath: string,
): Promise<SynonymMap> {
  throw new Error("Not implemented for browser.");
}
