// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type { ModelVersion } from "../../../models/models.js";
import type { BetaModelsCreateFromSourceOptions } from "./options.js";

export async function createFromSource(
  _context: Client,
  _name: string,
  _version: string,
  _source: string,
  _options: BetaModelsCreateFromSourceOptions = {},
): Promise<ModelVersion> {
  throw new Error("Model uploads from local files are only supported in Node.js.");
}
