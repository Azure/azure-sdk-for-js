"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMode = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** Determines the connection behavior of the CosmosClient. Note, we currently only support Gateway Mode. */
var ConnectionMode;
(function (ConnectionMode) {
    /** Gateway mode talks to an intermediate gateway which handles the direct communication with your individual partitions. */
    ConnectionMode[ConnectionMode["Gateway"] = 0] = "Gateway";
})(ConnectionMode || (exports.ConnectionMode = ConnectionMode = {}));
//# sourceMappingURL=ConnectionMode.js.map