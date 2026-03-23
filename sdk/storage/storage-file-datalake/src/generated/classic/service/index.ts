// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext } from "../../api/dataLakeContext.js";
import { listFileSystems } from "../../api/service/operations.js";
import { ServiceListFileSystemsOptionalParams } from "../../api/service/options.js";
import {
  FileSystemList,
  AccountResourceType,
} from "../../models/azure/storage/files/dataLake/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Service operations. */
export interface ServiceOperations {
  /** List filesystems and their properties in given account. */
  listFileSystems: (
    resource: AccountResourceType,
    options?: ServiceListFileSystemsOptionalParams,
  ) => Promise<
    {
      continuation?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/json";
    } & FileSystemList &
      StorageCompatResponseInfo<
        FileSystemList,
        {
          continuation?: string;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/json";
        }
      >
  >;
}

function _getService(context: DataLakeContext) {
  return {
    listFileSystems: (
      resource: AccountResourceType,
      options?: ServiceListFileSystemsOptionalParams,
    ) => listFileSystems(context, resource, options),
  };
}

export function _getServiceOperations(context: DataLakeContext): ServiceOperations {
  return {
    ..._getService(context),
  };
}
