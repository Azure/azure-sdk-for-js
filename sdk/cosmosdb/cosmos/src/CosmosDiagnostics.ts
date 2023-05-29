// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 } from "uuid";
import { Location } from "./documents";
import { CosmosDiagnosticContext } from "./CosmosDiagnosticsContext";

/**
 * This is a Cosmos Diagnostic type that holds diagnostic information during client operations. ie. Item.read().
 * The `clientSideRequestStatistics` member contains diagnostic information on operations happening in client process. ie.e
 * - metadata lookups.
 * - retries
 * - endpoints contacted.
 * - request, response payload stats.
 * Here all the server requests, apart from the final intended resource are considered as metadata calls.
 * i.e. for item.read(id), if the client makes server call to discover endpoints it would be considered
 * as metadata call.
 */
export class CosmosDiagnostics {
  /**
   * @internal
   */
  constructor(
    public readonly id: string,
    clientSideRequestStatistics: ClientSideRequestStatistics,
    private readonly cosmosDiagnosticContext: CosmosDiagnosticContext
  ) {
    this.clientSideRequestStatistics = clientSideRequestStatistics;
  }

  public readonly clientSideRequestStatistics: ClientSideRequestStatistics;

  public get getContactedRegionNames(): Set<string> {
    const locations = this.cosmosDiagnosticContext.locationEndpointsContacted.values();
    return new Set([...locations].map((location) => location.name));
  }
}

/**
 * This type contains diagnostic information regarding all metadata request to server during an CosmosDB client operation.
 */
export type MetadataLookUpDiagnostics = {
  metadataLookups: MetadataLookUpDiagnostic[];
};

/**
 * This type captures diagnostic information regarding retries attempt during an CosmosDB client operation.
 */
export type RetryDiagnostics = {
  failedAttempts: FailedRequestAttemptDiagnostic[];
};

/**
 * This type contains diagnostic information regarding a single metadata request to server.
 */
export interface MetadataLookUpDiagnostic {
  id: string;
  startTimeUTCInMs: number;
  endTimeUTCInMs: number;
  metaDataType: MetadataLookUpType;
  activityId: string;
}

/**
 * This type captures diagnostic information regarding a failed request to server api.
 */
export interface FailedRequestAttemptDiagnostic {
  id: string;
  attemptNumber: number;
  startTimeUTCInMs: number;
  endTimeUTCInMs: number;
  statusCode: string;
}

/**
 * This is enum for Type of Metadata lookups possible.
 */
export enum MetadataLookUpType {
  PartitionKeyRangeLookUp = "PARTITION_KEY_RANGE_LOOK_UP",
  ServerAddressLookUp = "SERVER_ADDRESS_LOOK_UP",
  DatabaseAccountLookUp = "DATABASE_ACCOUNT_LOOK_UP",
}

/**
 * This is a collection type for all client side diagnostic information.
 */
export type ClientSideRequestStatistics = {
  /**
   * This is the UTC timestamp for start of client operation.
   */
  requestStartTimeUTCInMs: number;
  /**
   * This is the UTC timestamp for end of client operation.
   */
  requestEndTimeUTCInMs: number;
  /**
   * This is the activityId for request, made to server for fetching the requested resource. (As opposed to other potential meta data requests)
   */
  activityId: string;
  /**
   * This is the list of Location Endpoints contacted during the client operation.
   */
  locationEndpointsContacted: Location[];
  /**
   * This field captures diagnostic information for retries happened during client operation.
   */
  retryDiagnostics: RetryDiagnostics;
  /**
   * This field captures diagnostic information for meta data lookups happened during client operation.
   */
  metadataDiagnostics: MetadataLookUpDiagnostics;
  /**
   * This is the payload length, in bytes made to server for the client operation requested. (This doesn't include payloads for meta data requests)
   */
  requestPayloadLengthInBytes: number;
  /**
   * This is the payload length, in bytes recieved from server for the client operation requested. (This doesn't include payloads for meta data responses)
   */
  responsePayloadLengthInBytes: number;
};

/**
 * @hidden
 * Utility function to create an Empty CosmosDiagnostic object.
 * @returns
 */
export function getEmptyCosmosDiagnostics(): CosmosDiagnostics {
  return new CosmosDiagnostics(
    v4(),
    {
      activityId: "",
      requestEndTimeUTCInMs: 0,
      requestStartTimeUTCInMs: 0,
      locationEndpointsContacted: [],
      retryDiagnostics: {
        failedAttempts: [],
      },
      metadataDiagnostics: {
        metadataLookups: [],
      },
      requestPayloadLengthInBytes: 0,
      responsePayloadLengthInBytes: 0,
    },
    new CosmosDiagnosticContext()
  );
}
