"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseReason = void 0;
/**
 * An enum representing the different reasons for an `EventHubConsumerClient` to stop processing
 * events from a partition in a consumer group of an Event Hub.
 */
var CloseReason;
(function (CloseReason) {
    /**
     * Ownership of the partition was lost or transitioned to a new processor instance.
     */
    CloseReason["OwnershipLost"] = "OwnershipLost";
    /**
     * The EventProcessor was shutdown.
     */
    CloseReason["Shutdown"] = "Shutdown";
})(CloseReason || (exports.CloseReason = CloseReason = {}));
//# sourceMappingURL=public.js.map