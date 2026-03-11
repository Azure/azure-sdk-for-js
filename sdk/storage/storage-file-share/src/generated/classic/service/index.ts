// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext } from "../../api/fileContext.js";
import {
  getUserDelegationKey,
  listSharesSegment,
  getProperties,
  setProperties,
} from "../../api/service/operations.js";
import {
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceListSharesSegmentOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "../../api/service/options.js";
import {
  FileServiceProperties,
  ListSharesResponse,
  KeyInfo,
  UserDelegationKey,
} from "../../models/azure/storage/files/shares/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** Retrieves a user delegation key for the File service. This can be used to generate a user delegation SAS. */
  getUserDelegationKey: (
    keyInfo: KeyInfo,
    options?: ServiceGetUserDelegationKeyOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & UserDelegationKey &
      StorageCompatResponseInfo<
        UserDelegationKey,
        {
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** The List Shares Segment operation returns a list of the shares and share snapshots under the specified account. */
  listSharesSegment: (
    options?: ServiceListSharesSegmentOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ListSharesResponse &
      StorageCompatResponseInfo<
        ListSharesResponse,
        {
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Gets the properties of a storage account's File service, including properties for Storage Analytics metrics and CORS (Cross-Origin Resource Sharing) rules. */
  getProperties: (
    options?: ServiceGetPropertiesOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & FileServiceProperties &
      StorageCompatResponseInfo<
        FileServiceProperties,
        {
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets properties for a storage account's File service endpoint, including properties for Storage Analytics metrics and CORS (Cross-Origin Resource Sharing) rules. */
  setProperties: (
    storageServiceProperties: FileServiceProperties,
    options?: ServiceSetPropertiesOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      { apiVersion: string; requestId: string; clientRequestId?: string; date: Date }
    >
  >;
}

function _getService(context: FileContext) {
  return {
    getUserDelegationKey: (keyInfo: KeyInfo, options?: ServiceGetUserDelegationKeyOptionalParams) =>
      getUserDelegationKey(context, keyInfo, options),
    listSharesSegment: (options?: ServiceListSharesSegmentOptionalParams) =>
      listSharesSegment(context, options),
    getProperties: (options?: ServiceGetPropertiesOptionalParams) =>
      getProperties(context, options),
    setProperties: (
      storageServiceProperties: FileServiceProperties,
      options?: ServiceSetPropertiesOptionalParams,
    ) => setProperties(context, storageServiceProperties, options),
  };
}

export function _getServiceOperations(context: FileContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
