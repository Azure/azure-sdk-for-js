// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { testProposedConnection } from "../../api/blobAccessPointConnectionTests/operations.js";
import type { BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams } from "../../api/blobAccessPointConnectionTests/options.js";
import type {
  BlobAccessPointConnectionTestResponse,
  BlobAccessPointProposedConnectionTestRequest,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BlobAccessPointConnectionTests operations. */
export interface BlobAccessPointConnectionTestsOperations {
  /** Test a proposed Blob Access Point connection before the configuration is created. The connection is validated in the context of the storage account in the request path, so no Blob Access Point configuration needs to exist beforehand. */
  testProposedConnection: (
    resourceGroupName: string,
    accountName: string,
    body: BlobAccessPointProposedConnectionTestRequest,
    options?: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams,
  ) => PollerLike<
    OperationState<BlobAccessPointConnectionTestResponse>,
    BlobAccessPointConnectionTestResponse
  >;
  /** @deprecated use testProposedConnection instead */
  beginTestProposedConnection: (
    resourceGroupName: string,
    accountName: string,
    body: BlobAccessPointProposedConnectionTestRequest,
    options?: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<BlobAccessPointConnectionTestResponse>,
      BlobAccessPointConnectionTestResponse
    >
  >;
  /** @deprecated use testProposedConnection instead */
  beginTestProposedConnectionAndWait: (
    resourceGroupName: string,
    accountName: string,
    body: BlobAccessPointProposedConnectionTestRequest,
    options?: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams,
  ) => Promise<BlobAccessPointConnectionTestResponse>;
}

function _getBlobAccessPointConnectionTests(context: StorageManagementContext) {
  return {
    testProposedConnection: (
      resourceGroupName: string,
      accountName: string,
      body: BlobAccessPointProposedConnectionTestRequest,
      options?: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams,
    ) => testProposedConnection(context, resourceGroupName, accountName, body, options),
    beginTestProposedConnection: async (
      resourceGroupName: string,
      accountName: string,
      body: BlobAccessPointProposedConnectionTestRequest,
      options?: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams,
    ) => {
      const poller = testProposedConnection(context, resourceGroupName, accountName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestProposedConnectionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      body: BlobAccessPointProposedConnectionTestRequest,
      options?: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams,
    ) => {
      return await testProposedConnection(context, resourceGroupName, accountName, body, options);
    },
  };
}

export function _getBlobAccessPointConnectionTestsOperations(
  context: StorageManagementContext,
): BlobAccessPointConnectionTestsOperations {
  return {
    ..._getBlobAccessPointConnectionTests(context),
  };
}
