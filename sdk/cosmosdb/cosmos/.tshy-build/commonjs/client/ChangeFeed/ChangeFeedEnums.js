"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedResourceType = void 0;
/**
 * Enum to specify the resource for which change feed is being fetched.
 */
var ChangeFeedResourceType;
(function (ChangeFeedResourceType) {
    ChangeFeedResourceType[ChangeFeedResourceType["FeedRange"] = 0] = "FeedRange";
    ChangeFeedResourceType[ChangeFeedResourceType["PartitionKey"] = 1] = "PartitionKey";
})(ChangeFeedResourceType || (exports.ChangeFeedResourceType = ChangeFeedResourceType = {}));
//# sourceMappingURL=ChangeFeedEnums.js.map