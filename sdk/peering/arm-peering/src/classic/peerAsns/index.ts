// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { listBySubscription, $delete, createOrUpdate, get } from "../../api/peerAsns/operations.js";
import type {
  PeerAsnsListBySubscriptionOptionalParams,
  PeerAsnsDeleteOptionalParams,
  PeerAsnsCreateOrUpdateOptionalParams,
  PeerAsnsGetOptionalParams,
} from "../../api/peerAsns/options.js";
import type { PeerAsn } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeerAsns operations. */
export interface PeerAsnsOperations {
  /** Lists all of the peer ASNs under the given subscription. */
  listBySubscription: (
    options?: PeerAsnsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PeerAsn>;
  /** Deletes an existing peer ASN with the specified name under the given subscription. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (peerAsnName: string, options?: PeerAsnsDeleteOptionalParams) => Promise<void>;
  /** Creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription. */
  createOrUpdate: (
    peerAsnName: string,
    peerAsn: PeerAsn,
    options?: PeerAsnsCreateOrUpdateOptionalParams,
  ) => Promise<PeerAsn>;
  /** Gets the peer ASN with the specified name under the given subscription. */
  get: (peerAsnName: string, options?: PeerAsnsGetOptionalParams) => Promise<PeerAsn>;
}

function _getPeerAsns(context: PeeringManagementContext) {
  return {
    listBySubscription: (options?: PeerAsnsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    delete: (peerAsnName: string, options?: PeerAsnsDeleteOptionalParams) =>
      $delete(context, peerAsnName, options),
    createOrUpdate: (
      peerAsnName: string,
      peerAsn: PeerAsn,
      options?: PeerAsnsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, peerAsnName, peerAsn, options),
    get: (peerAsnName: string, options?: PeerAsnsGetOptionalParams) =>
      get(context, peerAsnName, options),
  };
}

export function _getPeerAsnsOperations(context: PeeringManagementContext): PeerAsnsOperations {
  return {
    ..._getPeerAsns(context),
  };
}
