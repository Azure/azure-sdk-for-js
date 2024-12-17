// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as PublicParameters from "./parameters.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";

interface ListFilesQueryParameters {
  /**
   * The purpose of the file.
   *
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"
   */
  purpose?: string;
}
export function convertListFilesParameters <T extends ListFilesQueryParameters> (
  options: T
): Record<string, unknown> {
  return {
    ...(options && {purpose: options.purpose}),
  }
};

export function convertListFilesQueryParamProperties(
  options: PublicParameters.ListFilesQueryParamProperties
): GeneratedParameters.ListFilesQueryParamProperties {
  return{
    ...convertListFilesParameters(options),
    ...(options.purpose && {purpose: options.purpose}),
  }
}
