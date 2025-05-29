// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** Determines the connection behavior of the CosmosClient. Note, we currently only support Gateway Mode. */
export var ConnectionMode;
(function (ConnectionMode) {
    /** Gateway mode talks to an intermediate gateway which handles the direct communication with your individual partitions. */
    ConnectionMode[ConnectionMode["Gateway"] = 0] = "Gateway";
})(ConnectionMode || (ConnectionMode = {}));
//# sourceMappingURL=ConnectionMode.js.map