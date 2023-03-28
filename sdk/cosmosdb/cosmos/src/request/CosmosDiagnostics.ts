// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 } from "uuid";
import { Location } from "../documents";
import { CosmosDiagnosticContext } from "./CosmosDiagnosticsContext";

/**
 * Cosmos Diagnostic type. It contains diagnostic information during a client operation. ie. Item.read().
 * This `clientSideRequestStatistics` member all the diagnostic information related to client process. i.e
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
    public readonly clientSideRequestStatistics: ClientSideRequestStatistics,
    private readonly cosmosDiagnosticContext: CosmosDiagnosticContext
  ) {}

  public get getContactedRegionNames(): Set<string> {
    const locations = this.cosmosDiagnosticContext.locationEndpointsContacted.values();
    return new Set([...locations].map((location) => location.name));
  }
}

/**
 * This type contains diagnostic information regarding all metadata request to server during an CosmosDB client operation.
 */
export type MetadataDiagnostics = {
  metadataLookups: MetadataLookupDiagnostic[];
};

/**
 * This type captures diagnostic information regarding retries attempty during an CosmosDB client operation.
 */
export type RetryDiagnostics = {
  failedAttempts: FailedRequestAttemptDiagnostic[];
};

/**
 * This type contains diagnostic information regarding a single metadata request to server.
 */
export interface MetadataLookupDiagnostic {
  id: string;
  startTimeUTC: number;
  endTimeUTC: number;
  metaDataType: MetadataType;
  activityId: string;
}

/**
 * This type captures diagnostic information regarding a failed request to server api.
 */
export interface FailedRequestAttemptDiagnostic {
  id: string;
  attemptNumber: number;
  startTimeUTC: number;
  endTimeUTC: number;
  statusCode: string;
}

export enum MetadataType {
  CONTAINER_LOOK_UP,
  PARTITION_KEY_RANGE_LOOK_UP,
  SERVER_ADDRESS_LOOKUP,
  DATABASE_ACCOUNT_LOOKUP,
}

export type ClientSideRequestStatistics = {
  requestStartTimeUTC: number;
  requestEndTimeUTC: number;
  activityId: string;
  locationEndpointsContacted: Location[];
  retryDiagnostics: RetryDiagnostics;
  metadataDiagnostics: MetadataDiagnostics;
  requestPayloadLength: number;
  responsePayloadLength: number;
};

/**
 * Utility function to create an Empty CosmosDiagnostic object.
 * @returns
 */
export function getEmptyCosmosDiagnostics(): CosmosDiagnostics {
  return new CosmosDiagnostics(
    v4(),
    {
      activityId: "",
      requestEndTimeUTC: 0,
      requestStartTimeUTC: 0,
      locationEndpointsContacted: [],
      retryDiagnostics: {
        failedAttempts: [],
      },
      metadataDiagnostics: {
        metadataLookups: [],
      },
      requestPayloadLength: 0,
      responsePayloadLength: 0,
    },
    new CosmosDiagnosticContext()
  );
}
