// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueuesContext } from "../../api/queuesContext.js";
import {
  getQueues,
  getUserDelegationKey,
  getStatistics,
  getProperties,
  setProperties,
} from "../../api/service/operations.js";
import {
  ServiceGetQueuesOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "../../api/service/options.js";
import {
  QueueServiceProperties,
  QueueServiceStats,
  KeyInfo,
  UserDelegationKey,
  QueueItem,
} from "../../models/azure/storage/queues/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** returns a list of the queues under the specified account */
  getQueues: (options?: ServiceGetQueuesOptionalParams) => PagedAsyncIterableIterator<QueueItem>;
  /** Retrieves a user delegation key for the Queue service. This is only a valid operation when using bearer token authentication. */
  getUserDelegationKey: (
    keyInfo: KeyInfo,
    options?: ServiceGetUserDelegationKeyOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & UserDelegationKey &
      StorageCompatResponseInfo<
        UserDelegationKey,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Retrieves statistics related to replication for the Queue service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
  getStatistics: (
    options?: ServiceGetStatisticsOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & QueueServiceStats &
      StorageCompatResponseInfo<
        QueueServiceStats,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Retrieves properties of a storage account's Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getProperties: (
    options?: ServiceGetPropertiesOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & QueueServiceProperties &
      StorageCompatResponseInfo<
        QueueServiceProperties,
        {
          version: string;
          requestId?: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets properties for a storage account's Queue service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
  setProperties: (
    queueServiceProperties: QueueServiceProperties,
    options?: ServiceSetPropertiesOptionalParams,
  ) => Promise<
    {
      version: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { version: string; requestId?: string; clientRequestId?: string; date: Date }
    >
  >;
}

function _getService(context: QueuesContext) {
  return {
    getQueues: (options?: ServiceGetQueuesOptionalParams) => getQueues(context, options),
    getUserDelegationKey: (keyInfo: KeyInfo, options?: ServiceGetUserDelegationKeyOptionalParams) =>
      getUserDelegationKey(context, keyInfo, options),
    getStatistics: (options?: ServiceGetStatisticsOptionalParams) =>
      getStatistics(context, options),
    getProperties: (options?: ServiceGetPropertiesOptionalParams) =>
      getProperties(context, options),
    setProperties: (
      queueServiceProperties: QueueServiceProperties,
      options?: ServiceSetPropertiesOptionalParams,
    ) => setProperties(context, queueServiceProperties, options),
  };
}

export function _getServiceOperations(context: QueuesContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
