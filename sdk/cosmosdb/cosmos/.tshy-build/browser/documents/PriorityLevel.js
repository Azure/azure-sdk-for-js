// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Represents Priority Level associated with each Azure Cosmos DB client requests.<br>
 * The Low priority requests are always throttled before any High priority requests.
 *
 * By default all requests are considered as High priority requests.
 *
 * See https://aka.ms/CosmosDB/PriorityBasedExecution for more detailed documentation on Priority based throttling.
 */
export var PriorityLevel;
(function (PriorityLevel) {
    /**
     * High Priority requests are throttled after Low priority requests.
     */
    PriorityLevel["High"] = "High";
    /**
     * Low Priority requests are throttled before High priority requests.
     */
    PriorityLevel["Low"] = "Low";
})(PriorityLevel || (PriorityLevel = {}));
//# sourceMappingURL=PriorityLevel.js.map