// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { create } from "../../api/tdeCertificates/operations.js";
import type { TdeCertificatesCreateOptionalParams } from "../../api/tdeCertificates/options.js";
import type { TdeCertificate } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TdeCertificates operations. */
export interface TdeCertificatesOperations {
  /** Creates a TDE certificate for a given server. */
  create: (
    resourceGroupName: string,
    serverName: string,
    parameters: TdeCertificate,
    options?: TdeCertificatesCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    parameters: TdeCertificate,
    options?: TdeCertificatesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: TdeCertificate,
    options?: TdeCertificatesCreateOptionalParams,
  ) => Promise<void>;
}

function _getTdeCertificates(context: SqlContext) {
  return {
    create: (
      resourceGroupName: string,
      serverName: string,
      parameters: TdeCertificate,
      options?: TdeCertificatesCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: TdeCertificate,
      options?: TdeCertificatesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: TdeCertificate,
      options?: TdeCertificatesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, serverName, parameters, options);
    },
  };
}

export function _getTdeCertificatesOperations(context: SqlContext): TdeCertificatesOperations {
  return {
    ..._getTdeCertificates(context),
  };
}
