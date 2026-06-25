// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateDnsManagementContext } from "../../api/privateDnsManagementContext.js";
import {
  list,
  listByType,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/recordSets/operations.js";
import {
  RecordSetsListOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "../../api/recordSets/options.js";
import { RecordSet, RecordType } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecordSets operations. */
export interface RecordSetsOperations {
  /** Lists all record sets in a Private DNS zone. */
  list: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: RecordSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<RecordSet>;
  /** Lists the record sets of a specified type in a Private DNS zone. */
  listByType: (
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    options?: RecordSetsListByTypeOptionalParams,
  ) => PagedAsyncIterableIterator<RecordSet>;
  /** Deletes a record set from a Private DNS zone. This operation cannot be undone. */
  delete: (
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    options?: RecordSetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a record set within a Private DNS zone. */
  update: (
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    parameters: RecordSet,
    options?: RecordSetsUpdateOptionalParams,
  ) => Promise<RecordSet>;
  /** Creates or updates a record set within a Private DNS zone. */
  createOrUpdate: (
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    parameters: RecordSet,
    options?: RecordSetsCreateOrUpdateOptionalParams,
  ) => Promise<RecordSet>;
  /** Gets a record set. */
  get: (
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    options?: RecordSetsGetOptionalParams,
  ) => Promise<RecordSet>;
}

function _getRecordSets(context: PrivateDnsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      privateZoneName: string,
      options?: RecordSetsListOptionalParams,
    ) => list(context, resourceGroupName, privateZoneName, options),
    listByType: (
      resourceGroupName: string,
      privateZoneName: string,
      recordType: RecordType,
      options?: RecordSetsListByTypeOptionalParams,
    ) => listByType(context, resourceGroupName, privateZoneName, recordType, options),
    delete: (
      resourceGroupName: string,
      privateZoneName: string,
      recordType: RecordType,
      relativeRecordSetName: string,
      options?: RecordSetsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        options,
      ),
    update: (
      resourceGroupName: string,
      privateZoneName: string,
      recordType: RecordType,
      relativeRecordSetName: string,
      parameters: RecordSet,
      options?: RecordSetsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      privateZoneName: string,
      recordType: RecordType,
      relativeRecordSetName: string,
      parameters: RecordSet,
      options?: RecordSetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateZoneName: string,
      recordType: RecordType,
      relativeRecordSetName: string,
      options?: RecordSetsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, privateZoneName, recordType, relativeRecordSetName, options),
  };
}

export function _getRecordSetsOperations(
  context: PrivateDnsManagementContext,
): RecordSetsOperations {
  return {
    ..._getRecordSets(context),
  };
}
