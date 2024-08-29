// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The customizations in this file will be applied on top of the generated file with the same
 * name and the merged result will be written to the src directory.
 */

import {
  AnalyzeWidgetOptions,
  analyzeWidget as _analyzeWidget,
} from "../../../generated/src/api/operations.js";
import { WidgetServiceContext as Client } from "../../../generated/src/rest/clientDefinitions.js";
import { AnalyzeResult } from "../../../generated/src/api/models.js";
import { RestError } from "@azure/core-rest-pipeline";
import { foo } from "./foo.js";

/**
 * In this customization we will perform the following tasks in addition to the generated:
 *  - We are going to add special error handling for demonstration purposes
 */
export async function analyzeWidget(
  context: Client,
  id: string,
  options?: AnalyzeWidgetOptions,
): Promise<AnalyzeResult> {
  try {
    foo();
    const result = await _analyzeWidget(context, id, options);
    return result;
  } catch (error: any) {
    console.error("Error occurred while calling analyzeWidget:", error);
    if (error.message && error.statusCode) {
      throw new RestError(error.message, { code: error.statusCode });
    }

    throw new Error(error);
  }
}
