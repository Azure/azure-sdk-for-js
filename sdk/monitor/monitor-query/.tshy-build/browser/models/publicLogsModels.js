// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** Indicates if a query succeeded or failed or partially failed.
 * Represented by PartialFailure" | "Success" | "Failure".
 */
export var LogsQueryResultStatus;
(function (LogsQueryResultStatus) {
    /** Represents Partial Failure scenario where partial data and errors of type {@link LogsQueryPartialResult} is returned for query */
    LogsQueryResultStatus["PartialFailure"] = "PartialFailure";
    /** Represents Failure scenario where only error of type {@link LogsQueryError} is returned for query */
    LogsQueryResultStatus["Failure"] = "Failure";
    /** Represents Success scenario where all data of type {@link LogsQuerySuccessfulResult} is returned for query */
    LogsQueryResultStatus["Success"] = "Success";
})(LogsQueryResultStatus || (LogsQueryResultStatus = {}));
//# sourceMappingURL=publicLogsModels.js.map