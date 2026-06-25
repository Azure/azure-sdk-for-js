// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import { generate, list, get } from "../../api/versionedTemplate/operations.js";
import {
  VersionedTemplateGenerateOptionalParams,
  VersionedTemplateListOptionalParams,
  VersionedTemplateGetOptionalParams,
} from "../../api/versionedTemplate/options.js";
import { VersionedTemplate, GenerateVersionedTemplateResponse } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VersionedTemplate operations. */
export interface VersionedTemplateOperations {
  /** Generates a VersionedTemplate. */
  generate: (
    templateName: string,
    templateVersion: string,
    parameters: Record<string, string>,
    options?: VersionedTemplateGenerateOptionalParams,
  ) => Promise<GenerateVersionedTemplateResponse>;
  /** Gets a list of VersionedTemplate. */
  list: (
    templateName: string,
    options?: VersionedTemplateListOptionalParams,
  ) => PagedAsyncIterableIterator<VersionedTemplate>;
  /** Gets a VersionedTemplate. */
  get: (
    templateName: string,
    templateVersion: string,
    options?: VersionedTemplateGetOptionalParams,
  ) => Promise<VersionedTemplate>;
}

function _getVersionedTemplate(context: DeveloperHubServiceContext) {
  return {
    generate: (
      templateName: string,
      templateVersion: string,
      parameters: Record<string, string>,
      options?: VersionedTemplateGenerateOptionalParams,
    ) => generate(context, templateName, templateVersion, parameters, options),
    list: (templateName: string, options?: VersionedTemplateListOptionalParams) =>
      list(context, templateName, options),
    get: (
      templateName: string,
      templateVersion: string,
      options?: VersionedTemplateGetOptionalParams,
    ) => get(context, templateName, templateVersion, options),
  };
}

export function _getVersionedTemplateOperations(
  context: DeveloperHubServiceContext,
): VersionedTemplateOperations {
  return {
    ..._getVersionedTemplate(context),
  };
}
