// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * An enum representing the different reasons for an `EventHubConsumerClient` to stop processing
 * events from a partition in a consumer group of an Event Hub.
 */
export var CloseReason;
(function (CloseReason) {
    /**
     * Ownership of the partition was lost or transitioned to a new processor instance.
     */
    CloseReason["OwnershipLost"] = "OwnershipLost";
    /**
     * The EventProcessor was shutdown.
     */
    CloseReason["Shutdown"] = "Shutdown";
})(CloseReason || (CloseReason = {}));
//# sourceMappingURL=public.js.map