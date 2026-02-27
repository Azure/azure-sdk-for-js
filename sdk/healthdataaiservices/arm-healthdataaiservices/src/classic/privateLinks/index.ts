// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthDataAIServicesContext } from "../../api/healthDataAIServicesContext.js";
import type { PrivateLinksListByDeidServiceOptionalParams } from "../../api/options.js";
import { privateLinksListByDeidService } from "../../api/privateLinks/index.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinks operations. */
export interface PrivateLinksOperations {
  /** List private links on the given resource */
  listByDeidService: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: PrivateLinksListByDeidServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

export function getPrivateLinks(context: HealthDataAIServicesContext, subscriptionId: string) {
  return {
    listByDeidService: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: PrivateLinksListByDeidServiceOptionalParams,
    ) =>
      privateLinksListByDeidService(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
  };
}

export function getPrivateLinksOperations(
  context: HealthDataAIServicesContext,
  subscriptionId: string,
): PrivateLinksOperations {
  return {
    ...getPrivateLinks(context, subscriptionId),
  };
}
