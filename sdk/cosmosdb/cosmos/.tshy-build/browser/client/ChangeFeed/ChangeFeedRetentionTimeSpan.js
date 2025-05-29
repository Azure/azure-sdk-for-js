// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ErrorResponse } from "../../request/index.js";
/*
 * Represents the change feed policy configuration for a container in the Azure Cosmos DB service.
 */
export class ChangeFeedRetentionTimeSpan {
    /**
     * @internal
     */
    constructor(minutes) {
        if (typeof minutes !== "number") {
            throw new ErrorResponse("ChangeFeedRetentionTimeSpan must be a number.");
        }
        if (minutes < 0) {
            throw new ErrorResponse("ChangeFeedRetentionTimeSpan must be a positive number.");
        }
        if (minutes % 1 !== 0) {
            throw new ErrorResponse("Retention's granularity is minutes.");
        }
        this.retentionInMinutes = minutes;
    }
    /**
     * Specifies the retention window in minutes for which processing the change feed with allVersionsAndDeletes mode will be available.
     */
    static fromMinutes(minutes) {
        return new ChangeFeedRetentionTimeSpan(minutes);
    }
    /**
     * @internal
     */
    getRetentionInMinutes() {
        return this.retentionInMinutes;
    }
}
//# sourceMappingURL=ChangeFeedRetentionTimeSpan.js.map