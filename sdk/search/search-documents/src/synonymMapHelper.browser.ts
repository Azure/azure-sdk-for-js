// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SynonymMap } from "./serviceModels";

/**
 * Helper method to create a SynonymMap object. This is a NodeJS only method.
 * Will throw an error for browser.
 *
 * @param _name - Name of the SynonymMap.
 * @param _filePath - Path of the file that contains the Synonyms (seperated by new lines)
 * @returns SynonymMap object
 */
export async function createSynonymMapFromFile(
  _name: string,
  _filePath: string,
): Promise<SynonymMap> {
  throw new Error("Not implemented for browser.");
}
