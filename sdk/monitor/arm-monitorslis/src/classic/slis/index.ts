// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { listByParent, $delete, createOrUpdate, get } from "../../api/slis/operations.js";
import type {
  SlisListByParentOptionalParams,
  SlisDeleteOptionalParams,
  SlisCreateOrUpdateOptionalParams,
  SlisGetOptionalParams,
} from "../../api/slis/options.js";
import type { Sli } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Slis operations. */
export interface SlisOperations {
  /** Lists all SLI resources under a parent resource. */
  listByParent: (
    serviceGroupName: string,
    options?: SlisListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Sli>;
  /** Deletes an SLI resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    serviceGroupName: string,
    sliName: string,
    options?: SlisDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an SLI resource. */
  createOrUpdate: (
    serviceGroupName: string,
    sliName: string,
    resource: Sli,
    options?: SlisCreateOrUpdateOptionalParams,
  ) => Promise<Sli>;
  /** Gets an SLI resource. */
  get: (serviceGroupName: string, sliName: string, options?: SlisGetOptionalParams) => Promise<Sli>;
}

function _getSlis(context: MonitorContext) {
  return {
    listByParent: (serviceGroupName: string, options?: SlisListByParentOptionalParams) =>
      listByParent(context, serviceGroupName, options),
    delete: (serviceGroupName: string, sliName: string, options?: SlisDeleteOptionalParams) =>
      $delete(context, serviceGroupName, sliName, options),
    createOrUpdate: (
      serviceGroupName: string,
      sliName: string,
      resource: Sli,
      options?: SlisCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, serviceGroupName, sliName, resource, options),
    get: (serviceGroupName: string, sliName: string, options?: SlisGetOptionalParams) =>
      get(context, serviceGroupName, sliName, options),
  };
}

export function _getSlisOperations(context: MonitorContext): SlisOperations {
  return {
    ..._getSlis(context),
  };
}
