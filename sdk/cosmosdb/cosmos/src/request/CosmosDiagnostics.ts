import { Constants } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";


export type CosmosDiagnostics = {
    activityId: string;
    requestStartTimeUTC: number;
    requestEndTimeUTC: number;
    clientSideRequestStatistics: ClientSideRequestStatistics
}

export function getEmptyCosmosDiagnostics(): CosmosDiagnostics {
    return {
        activityId: '',
        requestEndTimeUTC: 0,
        requestStartTimeUTC: 0,
        clientSideRequestStatistics: {
            locationEndpointsContacted: [],
            retryDiagnostics: {
                failedAttempts: []
            },
            metadataDiagnostics: {
                metadataLookups: []
            },
            totalPayloadSizeInBytes: 0
        }
    }
}

export type FailedAttempt = {
    attemptNumber: number;
    startTimeUTC: number;
    endTimeUTC: number;
    statusCode: string;
}

export class GatewayStatistics {

}

export type MetadataDiagnostics = {
    metadataLookups: MetadataLookup[]
}

export type RetryDiagnostics = {
    failedAttempts: FailedAttempt[]
}

export type MetadataLookup = {
    startTimeUTC: number;
    endTimeUTC: number;
    metaDataType: MetadataType;
    activityId: string;
}

export enum MetadataType {
    CONTAINER_LOOK_UP,
    PARTITION_KEY_RANGE_LOOK_UP,
    SERVER_ADDRESS_LOOKUP,
    MASTER_ADDRESS_LOOK_UP,
    DATABASE_ACCOUNT_LOOKUP
}

export class SerializationDiagnosticsContext {

}
export type ClientSideRequestStatistics = {
    locationEndpointsContacted: string[];
    retryDiagnostics: RetryDiagnostics;
    metadataDiagnostics: MetadataDiagnostics;
    totalPayloadSizeInBytes: number;
}

// TODO: check about UTC timestamp.
export function getCurrentTimestamp(): number {
    return Date.now();
}

export class CosmosDiagnosticContext {

    private requestStartTimeUTC: number;
    private requestEndTimeUTC: number;
    private retryStartTimeUTC: number;
    private headers: CosmosHeaders = {}
    private retryAttempNumber: number;
    private failedAttempts: FailedAttempt[] = []
    private locationEndpointsContacted: Set<string> = new Set();
    private metadataLookups: MetadataLookup[] = []
    public constructor () {
        this.requestStartTimeUTC = getCurrentTimestamp();
        this.retryStartTimeUTC = this.requestStartTimeUTC;
    }

    public ingestHeaders(headers: CosmosHeaders) {
        this.headers = {...this.headers, headers};
    }

    public recordFailedAttempt(statusCode: string) {
        const attempt: FailedAttempt = {
            attemptNumber: this.retryAttempNumber,
            startTimeUTC: this.retryStartTimeUTC,
            endTimeUTC: getCurrentTimestamp(),
            statusCode
        }
        this.retryStartTimeUTC = getCurrentTimestamp();
        this.retryAttempNumber++
        this.failedAttempts.push(attempt);
    }

    public recordMetaDataQuery(diagnostics: CosmosDiagnostics, metaDataType: MetadataType) {
        let metaDataRequest = {
            startTimeUTC: diagnostics.requestStartTimeUTC,
            endTimeUTC: diagnostics.requestEndTimeUTC,
            activityId: diagnostics.activityId,
            metaDataType
        };
        this.metadataLookups.push(metaDataRequest);
    }

    public recordSerializationEvent() {

    }

    public recordResponse() {

    }

    public mergeDiagnostics(diagnostics: CosmosDiagnostics) {
        diagnostics.clientSideRequestStatistics.locationEndpointsContacted.forEach(endpoint => this.locationEndpointsContacted.add(endpoint))
        diagnostics.clientSideRequestStatistics.metadataDiagnostics.metadataLookups.forEach(lookup => this.metadataLookups.push(lookup))
        diagnostics.clientSideRequestStatistics.retryDiagnostics.failedAttempts.forEach(lookup => this.failedAttempts.push(lookup))
    }

    public recordEndpointContactEvent(location: string) {
        this.locationEndpointsContacted.add(location);
    }

    public getDiagnostics(): CosmosDiagnostics {
        this.recordSessionEnd();
        return {
            activityId: this.getActivityId(),
            requestStartTimeUTC: this.requestStartTimeUTC,
            requestEndTimeUTC: this.requestEndTimeUTC,
            clientSideRequestStatistics: {
                locationEndpointsContacted: [...this.locationEndpointsContacted],
                metadataDiagnostics: {
                    metadataLookups: [...this.metadataLookups]
                },
                retryDiagnostics: {
                    failedAttempts: [...this.failedAttempts]
                },
                totalPayloadSizeInBytes: 0
            },
        }
    }

    private recordSessionEnd() {
        this.requestEndTimeUTC = getCurrentTimestamp();
    }

    private getActivityId(): string {
        return this.headers[Constants.HttpHeaders.ActivityId] as string
    }
}