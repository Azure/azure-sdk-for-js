// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import { list, get } from "../../api/template/operations.js";
import {
  TemplateListOptionalParams,
  TemplateGetOptionalParams,
} from "../../api/template/options.js";
import { Template } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Template operations. */
export interface TemplateOperations {
  /** Gets a list of supported templates. */
  list: (options?: TemplateListOptionalParams) => PagedAsyncIterableIterator<Template>;
  /** Gets a list of supported templates. */
  get: (templateName: string, options?: TemplateGetOptionalParams) => Promise<Template>;
}

function _getTemplate(context: DeveloperHubServiceContext) {
  return {
    list: (options?: TemplateListOptionalParams) => list(context, options),
    get: (templateName: string, options?: TemplateGetOptionalParams) =>
      get(context, templateName, options),
  };
}

export function _getTemplateOperations(context: DeveloperHubServiceContext): TemplateOperations {
  return {
    ..._getTemplate(context),
  };
}
