"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsQueryResultStatus = void 0;
/** Indicates if a query succeeded or failed or partially failed.
 * Represented by PartialFailure" | "Success" | "Failure".
 */
var LogsQueryResultStatus;
(function (LogsQueryResultStatus) {
    /** Represents Partial Failure scenario where partial data and errors of type {@link LogsQueryPartialResult} is returned for query */
    LogsQueryResultStatus["PartialFailure"] = "PartialFailure";
    /** Represents Failure scenario where only error of type {@link LogsQueryError} is returned for query */
    LogsQueryResultStatus["Failure"] = "Failure";
    /** Represents Success scenario where all data of type {@link LogsQuerySuccessfulResult} is returned for query */
    LogsQueryResultStatus["Success"] = "Success";
})(LogsQueryResultStatus || (exports.LogsQueryResultStatus = LogsQueryResultStatus = {}));
//# sourceMappingURL=publicLogsModels.js.map