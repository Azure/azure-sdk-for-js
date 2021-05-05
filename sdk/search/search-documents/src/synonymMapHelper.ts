// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SynonymMap } from "./serviceModels";
import { promisify } from "util";
import * as fs from "fs";
declare let window: Window & typeof globalThis;
const readFileAsync = promisify(fs.readFile);

/**
 * Helper method to create a SynonymMap object. This is a NodeJS only method.
 *
 * @param name - Name of the SynonymMap.
 * @param filePath - Path of the file that contains the Synonyms (seperated by new lines)
 * @returns SynonymMap object
 */
export async function createSynonymMapFromFile(
  name: string,
  filePath: string
): Promise<SynonymMap> {
  if (isBrowser()) {
    throw new Error("Not implemented for browser.");
  }

  const synonyms: string[] = (await readFileAsync(filePath, "utf-8")).split("\n");
  return {
    name,
    synonyms
  };
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
