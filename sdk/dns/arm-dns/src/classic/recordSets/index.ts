// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext } from "../../api/networkContext.js";
import { RecordSet, RecordType } from "../../models/models.js";
import {
  RecordSetsListAllByDnsZoneOptionalParams,
  RecordSetsListByDnsZoneOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "../../api/recordSets/options.js";
import {
  listAllByDnsZone,
  listByDnsZone,
  listByType,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/recordSets/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecordSets operations. */
export interface RecordSetsOperations {
  /** Lists all record sets in a DNS zone. */
  listAllByDnsZone: (
    resourceGroupName: string,
    zoneName: string,
    options?: RecordSetsListAllByDnsZoneOptionalParams,
  ) => PagedAsyncIterableIterator<RecordSet>;
  /** Lists all record sets in a DNS zone. */
  listByDnsZone: (
    resourceGroupName: string,
    zoneName: string,
    options?: RecordSetsListByDnsZoneOptionalParams,
  ) => PagedAsyncIterableIterator<RecordSet>;
  /** Lists the record sets of a specified type in a DNS zone. */
  listByType: (
    resourceGroupName: string,
    zoneName: string,
    recordType: RecordType,
    options?: RecordSetsListByTypeOptionalParams,
  ) => PagedAsyncIterableIterator<RecordSet>;
  /** Deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    zoneName: string,
    relativeRecordSetName: string,
    recordType: RecordType,
    options?: RecordSetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a record set within a DNS zone. */
  update: (
    resourceGroupName: string,
    zoneName: string,
    relativeRecordSetName: string,
    recordType: RecordType,
    parameters: RecordSet,
    options?: RecordSetsUpdateOptionalParams,
  ) => Promise<RecordSet>;
  /** Creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created). */
  createOrUpdate: (
    resourceGroupName: string,
    zoneName: string,
    relativeRecordSetName: string,
    recordType: RecordType,
    parameters: RecordSet,
    options?: RecordSetsCreateOrUpdateOptionalParams,
  ) => Promise<RecordSet>;
  /** Gets a record set. */
  get: (
    resourceGroupName: string,
    zoneName: string,
    relativeRecordSetName: string,
    recordType: RecordType,
    options?: RecordSetsGetOptionalParams,
  ) => Promise<RecordSet>;
}

function _getRecordSets(context: NetworkContext) {
  return {
    listAllByDnsZone: (
      resourceGroupName: string,
      zoneName: string,
      options?: RecordSetsListAllByDnsZoneOptionalParams,
    ) => listAllByDnsZone(context, resourceGroupName, zoneName, options),
    listByDnsZone: (
      resourceGroupName: string,
      zoneName: string,
      options?: RecordSetsListByDnsZoneOptionalParams,
    ) => listByDnsZone(context, resourceGroupName, zoneName, options),
    listByType: (
      resourceGroupName: string,
      zoneName: string,
      recordType: RecordType,
      options?: RecordSetsListByTypeOptionalParams,
    ) => listByType(context, resourceGroupName, zoneName, recordType, options),
    delete: (
      resourceGroupName: string,
      zoneName: string,
      relativeRecordSetName: string,
      recordType: RecordType,
      options?: RecordSetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, zoneName, relativeRecordSetName, recordType, options),
    update: (
      resourceGroupName: string,
      zoneName: string,
      relativeRecordSetName: string,
      recordType: RecordType,
      parameters: RecordSet,
      options?: RecordSetsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        zoneName,
        relativeRecordSetName,
        recordType,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      zoneName: string,
      relativeRecordSetName: string,
      recordType: RecordType,
      parameters: RecordSet,
      options?: RecordSetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        zoneName,
        relativeRecordSetName,
        recordType,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      zoneName: string,
      relativeRecordSetName: string,
      recordType: RecordType,
      options?: RecordSetsGetOptionalParams,
    ) => get(context, resourceGroupName, zoneName, relativeRecordSetName, recordType, options),
  };
}

export function _getRecordSetsOperations(context: NetworkContext): RecordSetsOperations {
  return {
    ..._getRecordSets(context),
  };
}
