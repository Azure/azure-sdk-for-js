"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticNodeType = exports.DiagnosticNodeInternal = void 0;
const CosmosDiagnosticsContext_js_1 = require("./CosmosDiagnosticsContext.js");
const index_js_1 = require("../request/index.js");
const CosmosDiagnostics_js_1 = require("../CosmosDiagnostics.js");
const time_js_1 = require("../utils/time.js");
const CosmosDbDiagnosticLevel_js_1 = require("./CosmosDbDiagnosticLevel.js");
const index_js_2 = require("../common/index.js");
const diagnosticLevelComparator_js_1 = require("./diagnosticLevelComparator.js");
const core_util_1 = require("@azure/core-util");
/**
 * @hidden
 * This is Internal Representation for DiagnosticNode. It contains useful helper functions to collect
 * diagnostic information throughout the lifetime of Diagnostic session.
 * The functions toDiagnosticNode() & toDiagnostic() are given to convert it to public facing counterpart.
 */
class DiagnosticNodeInternal {
    /**
     * @internal
     */
    constructor(diagnosticLevel, type, parent, data = {}, startTimeUTCInMs = (0, time_js_1.getCurrentTimestampInMs)(), ctx = new CosmosDiagnosticsContext_js_1.CosmosDiagnosticContext()) {
        this.id = (0, core_util_1.randomUUID)();
        this.nodeType = type;
        this.startTimeUTCInMs = startTimeUTCInMs;
        this.data = data;
        this.children = [];
        this.durationInMs = 0;
        this.parent = parent;
        this.diagnosticCtx = ctx;
        this.diagnosticLevel = diagnosticLevel;
        // Initialize EncryptionDiagnostics
        this.encryptionDiagnostics = {
            encryptContent: {},
            decryptContent: {},
            processingDurationInMs: 0,
        };
    }
    /**
     * @internal
     */
    addLog(msg) {
        if (!this.data.log) {
            this.data.log = [];
        }
        this.data.log.push(msg);
    }
    /**
     * @internal
     */
    sanitizeHeaders(headers) {
        return headers;
    }
    /**
     * Updated durationInMs for node, based on endTimeUTCInMs provided.
     * @internal
     */
    updateTimestamp(endTimeUTCInMs = (0, time_js_1.getCurrentTimestampInMs)()) {
        this.durationInMs = endTimeUTCInMs - this.startTimeUTCInMs;
    }
    /**
     * @internal
     */
    recordSuccessfulNetworkCall(startTimeUTCInMs, requestContext, pipelineResponse, substatus, url) {
        const responseHeaders = pipelineResponse.headers.toJSON();
        const gatewayRequest = {
            activityId: responseHeaders[index_js_2.Constants.HttpHeaders.ActivityId],
            correlateActivityId: requestContext.headers[index_js_2.Constants.HttpHeaders.CorrelatedActivityId],
            startTimeUTCInMs,
            durationInMs: (0, time_js_1.getCurrentTimestampInMs)() - startTimeUTCInMs,
            statusCode: pipelineResponse.status,
            subStatusCode: substatus,
            requestPayloadLengthInBytes: calculateRequestPayloadLength(requestContext),
            responsePayloadLengthInBytes: calculateResponsePayloadLength(pipelineResponse),
            operationType: requestContext.operationType,
            resourceType: requestContext.resourceType,
            partitionKeyRangeId: requestContext.partitionKeyRangeId,
        };
        let requestData = {
            OperationType: gatewayRequest.operationType,
            resourceType: gatewayRequest.resourceType,
            requestPayloadLengthInBytes: gatewayRequest.requestPayloadLengthInBytes,
        };
        if ((0, diagnosticLevelComparator_js_1.allowTracing)(CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.debugUnsafe, this.diagnosticLevel)) {
            requestData = Object.assign(Object.assign({}, requestData), { headers: this.sanitizeHeaders(requestContext.headers), requestBody: requestContext.body, responseBody: pipelineResponse.bodyAsText, url: url });
        }
        this.addData({
            requestPayloadLengthInBytes: gatewayRequest.requestPayloadLengthInBytes,
            responsePayloadLengthInBytes: gatewayRequest.responsePayloadLengthInBytes,
            startTimeUTCInMs: gatewayRequest.startTimeUTCInMs,
            durationInMs: gatewayRequest.durationInMs,
            requestData,
        });
        this.diagnosticCtx.recordNetworkCall(gatewayRequest);
    }
    /**
     * @internal
     */
    recordFailedNetworkCall(startTimeUTCInMs, requestContext, retryAttemptNumber, statusCode, substatusCode, responseHeaders) {
        this.addData({ failedAttempty: true });
        const requestPayloadLengthInBytes = calculateRequestPayloadLength(requestContext);
        this.diagnosticCtx.recordFailedAttempt({
            activityId: responseHeaders[index_js_2.Constants.HttpHeaders.ActivityId],
            correlatedActivityId: requestContext.headers[index_js_2.Constants.HttpHeaders.CorrelatedActivityId],
            startTimeUTCInMs,
            durationInMs: (0, time_js_1.getCurrentTimestampInMs)() - startTimeUTCInMs,
            statusCode,
            subStatusCode: substatusCode,
            requestPayloadLengthInBytes,
            responsePayloadLengthInBytes: 0,
            operationType: requestContext.operationType,
            resourceType: requestContext.resourceType,
        }, retryAttemptNumber);
        let requestData = {
            OperationType: requestContext.operationType,
            resourceType: requestContext.resourceType,
            requestPayloadLengthInBytes,
        };
        if ((0, diagnosticLevelComparator_js_1.allowTracing)(CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.debugUnsafe, this.diagnosticLevel)) {
            requestData = Object.assign(Object.assign({}, requestData), { headers: this.sanitizeHeaders(requestContext.headers), requestBody: requestContext.body, url: (0, index_js_2.prepareURL)(requestContext.endpoint, requestContext.path) });
        }
        this.addData({
            failedAttempty: true,
            requestData,
        });
    }
    /**
     * @internal
     */
    recordEndpointResolution(location) {
        this.addData({ selectedLocation: location });
        this.diagnosticCtx.recordEndpointResolution(location);
    }
    /**
     * @internal
     */
    addData(data, msg, level = this.diagnosticLevel) {
        if (level !== CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.info) {
            this.data = Object.assign(Object.assign({}, this.data), data);
            if (msg) {
                this.addLog(msg);
            }
        }
    }
    /**
     * Merge given DiagnosticNodeInternal's context to current node's DiagnosticContext, Treating GatewayRequests of
     * given DiagnosticContext, as metadata requests. Given DiagnosticNodeInternal becomes a child of this node.
     * @internal
     */
    addChildNode(child, level, metadataType) {
        this.diagnosticCtx.mergeDiagnostics(child.diagnosticCtx, metadataType);
        if ((0, diagnosticLevelComparator_js_1.allowTracing)(level, this.diagnosticLevel)) {
            child.parent = this;
            this.children.push(child);
        }
        return child;
    }
    /**
     * Merge given DiagnosticNodeInternal's context to current node's DiagnosticContext for bulk.
     * Given DiagnosticNodeInternal becomes a child of this node.
     * @internal
     */
    addBulkChildNode(child, level) {
        this.diagnosticCtx.mergeBulkDiagnostics(child.diagnosticCtx);
        if ((0, diagnosticLevelComparator_js_1.allowTracing)(level, this.diagnosticLevel)) {
            child.parent = this;
            this.children.push(child);
        }
        return child;
    }
    /**
     * @internal
     */
    initializeChildNode(type, level, data = {}) {
        if ((0, diagnosticLevelComparator_js_1.allowTracing)(level, this.diagnosticLevel)) {
            const child = new DiagnosticNodeInternal(this.diagnosticLevel, type, this, data, (0, time_js_1.getCurrentTimestampInMs)(), this.diagnosticCtx);
            this.children.push(child);
            return child;
        }
        else {
            return this;
        }
    }
    /**
     * @internal
     */
    recordQueryResult(resources, level) {
        var _a;
        if ((0, diagnosticLevelComparator_js_1.allowTracing)(level, this.diagnosticLevel)) {
            const previousCount = (_a = this.data.queryRecordsRead) !== null && _a !== void 0 ? _a : 0;
            if (Array.isArray(resources)) {
                this.data.queryRecordsRead = previousCount + resources.length;
            }
        }
    }
    /**
     * @internal
     * record startTime for encryption in an operation
     */
    beginEncryptionDiagnostics(operation) {
        const startTime = (0, time_js_1.getCurrentTimestampInMs)();
        switch (operation) {
            case index_js_2.Constants.Encryption.DiagnosticsEncryptOperation:
                this.encryptionDiagnostics.encryptContent[index_js_2.Constants.Encryption.DiagnosticsStartTime] =
                    startTime;
                break;
            case index_js_2.Constants.Encryption.DiagnosticsDecryptOperation:
                this.encryptionDiagnostics.decryptContent[index_js_2.Constants.Encryption.DiagnosticsStartTime] =
                    startTime;
                break;
            default:
                throw new index_js_1.ErrorResponse("Invalid operation type for encryption diagnostics");
        }
    }
    /**
     * @internal
     * record duration from startTime and properties count for encryption in an operation
     */
    endEncryptionDiagnostics(operation, propertiesCount) {
        const endTime = (0, time_js_1.getCurrentTimestampInMs)();
        let processingDuration = 0;
        switch (operation) {
            case index_js_2.Constants.Encryption.DiagnosticsEncryptOperation:
                processingDuration =
                    endTime -
                        this.encryptionDiagnostics.encryptContent[index_js_2.Constants.Encryption.DiagnosticsStartTime];
                this.encryptionDiagnostics.encryptContent[index_js_2.Constants.Encryption.DiagnosticsDuration] =
                    processingDuration;
                // will be undefined in case of bulk/batch
                if (propertiesCount !== undefined) {
                    this.encryptionDiagnostics.encryptContent[index_js_2.Constants.Encryption.DiagnosticsPropertiesEncryptedCount] = propertiesCount;
                }
                break;
            case index_js_2.Constants.Encryption.DiagnosticsDecryptOperation:
                processingDuration =
                    endTime -
                        this.encryptionDiagnostics.decryptContent[index_js_2.Constants.Encryption.DiagnosticsStartTime];
                this.encryptionDiagnostics.decryptContent[index_js_2.Constants.Encryption.DiagnosticsDuration] =
                    processingDuration;
                if (propertiesCount !== undefined) {
                    this.encryptionDiagnostics.decryptContent[index_js_2.Constants.Encryption.DiagnosticsPropertiesDecryptedCount] = propertiesCount;
                }
                break;
            default:
                throw new index_js_1.ErrorResponse("Invalid operation type for encryption diagnostics");
        }
        this.diagnosticCtx.recordEncryptionDiagnostics(this.encryptionDiagnostics);
    }
    /**
     * Convert DiagnosticNodeInternal (internal representation) to DiagnosticNode (public, sanitized representation)
     * @internal
     */
    toDiagnosticNode() {
        return {
            id: this.id,
            nodeType: this.nodeType,
            children: this.children.map((child) => child.toDiagnosticNode()),
            data: this.data,
            startTimeUTCInMs: this.startTimeUTCInMs,
            durationInMs: this.durationInMs,
        };
    }
    /**
     * Convert to CosmosDiagnostics
     * @internal
     */
    toDiagnostic(clientConfigDiagnostic) {
        const rootNode = (0, CosmosDiagnostics_js_1.getRootNode)(this);
        const diagnostiNode = (0, diagnosticLevelComparator_js_1.allowTracing)(CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.debug, this.diagnosticLevel)
            ? rootNode.toDiagnosticNode()
            : undefined;
        const clientConfig = (0, diagnosticLevelComparator_js_1.allowTracing)(CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.debug, this.diagnosticLevel)
            ? clientConfigDiagnostic
            : undefined;
        const cosmosDiagnostic = new CosmosDiagnostics_js_1.CosmosDiagnostics(this.diagnosticCtx.getClientSideStats(), diagnostiNode, clientConfig);
        return cosmosDiagnostic;
    }
}
exports.DiagnosticNodeInternal = DiagnosticNodeInternal;
/**
 * @hidden
 */
var DiagnosticNodeType;
(function (DiagnosticNodeType) {
    DiagnosticNodeType["CLIENT_REQUEST_NODE"] = "CLIENT_REQUEST_NODE";
    DiagnosticNodeType["METADATA_REQUEST_NODE"] = "METADATA_REQUEST_NODE";
    DiagnosticNodeType["HTTP_REQUEST"] = "HTTP_REQUEST";
    DiagnosticNodeType["BATCH_REQUEST"] = "BATCH_REQUEST";
    DiagnosticNodeType["PARALLEL_QUERY_NODE"] = "PARALLEL_QUERY_NODE";
    DiagnosticNodeType["DEFAULT_QUERY_NODE"] = "DEFAULT_QUERY_NODE";
    DiagnosticNodeType["QUERY_REPAIR_NODE"] = "QUERY_REPAIR_NODE";
    DiagnosticNodeType["BACKGROUND_REFRESH_THREAD"] = "BACKGROUND_REFRESH_THREAD";
    DiagnosticNodeType["REQUEST_ATTEMPTS"] = "REQUEST_ATTEMPTS";
})(DiagnosticNodeType || (exports.DiagnosticNodeType = DiagnosticNodeType = {}));
function calculateResponsePayloadLength(response) {
    var _a;
    return ((_a = response === null || response === void 0 ? void 0 : response.bodyAsText) === null || _a === void 0 ? void 0 : _a.length) || 0;
}
function calculateRequestPayloadLength(requestContext) {
    return requestContext.body ? requestContext.body.length : 0;
}
//# sourceMappingURL=DiagnosticNodeInternal.js.map