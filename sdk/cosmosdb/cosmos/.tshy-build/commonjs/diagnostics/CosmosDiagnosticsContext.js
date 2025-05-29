"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosDiagnosticContext = void 0;
const index_js_1 = require("../common/index.js");
const time_js_1 = require("../utils/time.js");
/**
 * @hidden
 * Internal class to hold CosmosDiagnostic aggregate information all through the lifecycle of a request.
 * This object gathers diagnostic information throughout Client operation which may span across multiple
 * Server call, retries etc.
 * Functions - recordFailedAttempt, recordMetaDataQuery, recordEndpointContactEvent are used to ingest
 * data into the context. At the end of operation, getDiagnostics() is used to
 * get final CosmosDiagnostic object.
 */
class CosmosDiagnosticContext {
    constructor() {
        this.failedAttempts = [];
        this.metadataLookups = [];
        this.gatewayStatistics = [];
        this.locationEndpointsContacted = new Set();
        this.requestStartTimeUTCinMs = (0, time_js_1.getCurrentTimestampInMs)();
    }
    recordFailedAttempt(gatewayStatistics, retryAttemptNumber) {
        const attempt = {
            attemptNumber: retryAttemptNumber,
            startTimeUTCInMs: gatewayStatistics.startTimeUTCInMs,
            durationInMs: gatewayStatistics.durationInMs,
            statusCode: gatewayStatistics.statusCode,
            substatusCode: gatewayStatistics.subStatusCode,
            requestPayloadLengthInBytes: gatewayStatistics.requestPayloadLengthInBytes,
            responsePayloadLengthInBytes: gatewayStatistics.responsePayloadLengthInBytes,
            activityId: gatewayStatistics.activityId,
            operationType: gatewayStatistics.operationType,
            resourceType: gatewayStatistics.resourceType,
        };
        this.failedAttempts.push(attempt);
    }
    recordNetworkCall(gatewayStatistics) {
        this.gatewayStatistics.push(gatewayStatistics);
    }
    recordEncryptionDiagnostics(encryptionDiagnostics) {
        var _a, _b;
        const { encryptContent, decryptContent } = encryptionDiagnostics;
        const encryptionDuration = (_a = encryptContent[index_js_1.Constants.Encryption.DiagnosticsDuration]) !== null && _a !== void 0 ? _a : 0;
        const decryptionDuration = (_b = decryptContent[index_js_1.Constants.Encryption.DiagnosticsDuration]) !== null && _b !== void 0 ? _b : 0;
        encryptionDiagnostics.processingDurationInMs = encryptionDuration + decryptionDuration;
        this.encryptionDiagnostics = encryptionDiagnostics;
    }
    /**
     * Merge given DiagnosticContext to current node's DiagnosticContext, Treating GatewayRequests of
     * given DiagnosticContext, as metadata requests.
     */
    mergeDiagnostics(childDiagnostics, metadataType) {
        // Copy Location endpoints contacted.
        childDiagnostics.locationEndpointsContacted.forEach((endpoint) => this.locationEndpointsContacted.add(endpoint));
        // Copy child nodes's GatewayStatistics to parent's metadata lookups.
        childDiagnostics.gatewayStatistics.forEach((gateway) => this.metadataLookups.push({
            activityId: gateway.activityId,
            requestPayloadLengthInBytes: gateway.requestPayloadLengthInBytes,
            responsePayloadLengthInBytes: gateway.responsePayloadLengthInBytes,
            startTimeUTCInMs: gateway.startTimeUTCInMs,
            operationType: gateway.operationType,
            resourceType: gateway.resourceType,
            durationInMs: gateway.durationInMs,
            metaDataType: metadataType,
        }));
    }
    /**
     * Merge given DiagnosticContext to current node's DiagnosticContext for bulk
     */
    mergeBulkDiagnostics(childDiagnostics) {
        // Copy Location endpoints contacted.
        childDiagnostics.locationEndpointsContacted.forEach((endpoint) => this.locationEndpointsContacted.add(endpoint));
        // Copy child nodes's GatewayStatistics to parent's gateway statistics.
        childDiagnostics.gatewayStatistics.forEach((gateway) => this.gatewayStatistics.push(gateway));
        // merge metadata lookups and failed attempts
        childDiagnostics.metadataLookups.forEach((lookup) => this.metadataLookups.push(lookup));
        childDiagnostics.failedAttempts.forEach((lookup) => this.failedAttempts.push(lookup));
        if (!this.encryptionDiagnostics) {
            this.encryptionDiagnostics = childDiagnostics.encryptionDiagnostics;
        }
        else if (childDiagnostics.encryptionDiagnostics) {
            this.encryptionDiagnostics.decryptContent =
                childDiagnostics.encryptionDiagnostics.decryptContent;
            this.encryptionDiagnostics.processingDurationInMs =
                (this.encryptionDiagnostics.processingDurationInMs || 0) +
                    (childDiagnostics.encryptionDiagnostics.processingDurationInMs || 0);
        }
    }
    getClientSideStats(endTimeUTCInMs = (0, time_js_1.getCurrentTimestampInMs)()) {
        return {
            requestStartTimeUTCInMs: this.requestStartTimeUTCinMs,
            requestDurationInMs: endTimeUTCInMs - this.requestStartTimeUTCinMs,
            totalRequestPayloadLengthInBytes: this.getTotalRequestPayloadLength(),
            totalResponsePayloadLengthInBytes: this.getTotalResponsePayloadLength(),
            locationEndpointsContacted: [...this.locationEndpointsContacted.values()],
            metadataDiagnostics: {
                metadataLookups: [...this.metadataLookups],
            },
            retryDiagnostics: {
                failedAttempts: [...this.failedAttempts],
            },
            gatewayStatistics: this.gatewayStatistics,
            encryptionDiagnostics: this.encryptionDiagnostics,
        };
    }
    getTotalRequestPayloadLength() {
        let totalRequestPayloadLength = 0;
        this.gatewayStatistics.forEach((req) => (totalRequestPayloadLength += req.requestPayloadLengthInBytes));
        this.metadataLookups.forEach((req) => (totalRequestPayloadLength += req.requestPayloadLengthInBytes));
        this.failedAttempts.forEach((req) => (totalRequestPayloadLength += req.requestPayloadLengthInBytes));
        return totalRequestPayloadLength;
    }
    getTotalResponsePayloadLength() {
        let totalResponsePayloadLength = 0;
        this.gatewayStatistics.forEach((req) => (totalResponsePayloadLength += req.responsePayloadLengthInBytes));
        this.metadataLookups.forEach((req) => (totalResponsePayloadLength += req.responsePayloadLengthInBytes));
        this.failedAttempts.forEach((req) => (totalResponsePayloadLength += req.responsePayloadLengthInBytes));
        return totalResponsePayloadLength;
    }
    recordEndpointResolution(location) {
        this.locationEndpointsContacted.add(location);
    }
}
exports.CosmosDiagnosticContext = CosmosDiagnosticContext;
//# sourceMappingURL=CosmosDiagnosticsContext.js.map