// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { deserializeAtomXmlResponse, serializeToAtomXmlRequest } from "../util/atomXmlHelper.js";
import * as Constants from "../util/constants.js";
import { getAuthorizationRulesOrUndefined, getBoolean, getMessageCountDetails, getInteger, getIntegerOrUndefined, getRawAuthorizationRules, getString, getStringOrUndefined, getDate, } from "../util/utils.js";
/**
 * @internal
 * Builds the queue options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export function buildQueueOptions(queue) {
    return {
        // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
        // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
        // not picking up on it.
        //
        // The authority on this ordering is here:
        // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/QueuePropertiesExtensions.cs#L20
        LockDuration: queue.lockDuration,
        MaxSizeInMegabytes: getStringOrUndefined(queue.maxSizeInMegabytes),
        RequiresDuplicateDetection: getStringOrUndefined(queue.requiresDuplicateDetection),
        RequiresSession: getStringOrUndefined(queue.requiresSession),
        DefaultMessageTimeToLive: queue.defaultMessageTimeToLive,
        DeadLetteringOnMessageExpiration: getStringOrUndefined(queue.deadLetteringOnMessageExpiration),
        DuplicateDetectionHistoryTimeWindow: queue.duplicateDetectionHistoryTimeWindow,
        MaxDeliveryCount: getStringOrUndefined(queue.maxDeliveryCount),
        EnableBatchedOperations: getStringOrUndefined(queue.enableBatchedOperations),
        AuthorizationRules: getRawAuthorizationRules(queue.authorizationRules),
        Status: getStringOrUndefined(queue.status),
        ForwardTo: getStringOrUndefined(queue.forwardTo),
        UserMetadata: getStringOrUndefined(queue.userMetadata),
        AutoDeleteOnIdle: getStringOrUndefined(queue.autoDeleteOnIdle),
        EnablePartitioning: getStringOrUndefined(queue.enablePartitioning),
        ForwardDeadLetteredMessagesTo: getStringOrUndefined(queue.forwardDeadLetteredMessagesTo),
        EntityAvailabilityStatus: getStringOrUndefined(queue.availabilityStatus),
        EnableExpress: getStringOrUndefined(queue.enableExpress),
        MaxMessageSizeInKilobytes: getStringOrUndefined(queue.maxMessageSizeInKilobytes),
    };
}
/**
 * @internal
 * Builds the queue object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildQueue(rawQueue) {
    return {
        name: getString(rawQueue[Constants.QUEUE_NAME], "queueName"),
        forwardTo: getStringOrUndefined(rawQueue[Constants.FORWARD_TO]),
        userMetadata: rawQueue[Constants.USER_METADATA],
        lockDuration: getString(rawQueue[Constants.LOCK_DURATION], "lockDuration"),
        maxSizeInMegabytes: getInteger(rawQueue[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),
        maxDeliveryCount: getInteger(rawQueue[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),
        enablePartitioning: getBoolean(rawQueue[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
        requiresSession: getBoolean(rawQueue[Constants.REQUIRES_SESSION], "requiresSession"),
        enableBatchedOperations: getBoolean(rawQueue[Constants.ENABLE_BATCHED_OPERATIONS], "enableBatchedOperations"),
        defaultMessageTimeToLive: getString(rawQueue[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE], "defaultMessageTimeToLive"),
        autoDeleteOnIdle: rawQueue[Constants.AUTO_DELETE_ON_IDLE],
        requiresDuplicateDetection: getBoolean(rawQueue[Constants.REQUIRES_DUPLICATE_DETECTION], "requiresDuplicateDetection"),
        duplicateDetectionHistoryTimeWindow: getString(rawQueue[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW], "duplicateDetectionHistoryTimeWindow"),
        deadLetteringOnMessageExpiration: getBoolean(rawQueue[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION], "deadLetteringOnMessageExpiration"),
        forwardDeadLetteredMessagesTo: getStringOrUndefined(rawQueue[Constants.FORWARD_DEADLETTERED_MESSAGES_TO]),
        authorizationRules: getAuthorizationRulesOrUndefined(rawQueue[Constants.AUTHORIZATION_RULES]),
        status: rawQueue[Constants.STATUS],
        enableExpress: getBoolean(rawQueue[Constants.ENABLE_EXPRESS], "enableExpress"),
        availabilityStatus: rawQueue[Constants.ENTITY_AVAILABILITY_STATUS],
        maxMessageSizeInKilobytes: getIntegerOrUndefined(rawQueue[Constants.MAX_MESSAGE_SIZE_IN_KILOBYTES]),
    };
}
/**
 * @internal
 * Builds the queue runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildQueueRuntimeProperties(rawQueue) {
    const messageCountDetails = getMessageCountDetails(rawQueue[Constants.COUNT_DETAILS]);
    return Object.assign(Object.assign({ name: getString(rawQueue[Constants.QUEUE_NAME], "queueName"), sizeInBytes: getIntegerOrUndefined(rawQueue[Constants.SIZE_IN_BYTES]), totalMessageCount: getIntegerOrUndefined(rawQueue[Constants.MESSAGE_COUNT]) }, messageCountDetails), { createdAt: getDate(rawQueue[Constants.CREATED_AT], "createdAt"), modifiedAt: getDate(rawQueue[Constants.UPDATED_AT], "modifiedAt"), accessedAt: getDate(rawQueue[Constants.ACCESSED_AT], "accessedAt") });
}
/**
 * @internal
 * Atom XML Serializer for Queues.
 */
export class QueueResourceSerializer {
    serialize(resource) {
        return serializeToAtomXmlRequest("QueueDescription", resource);
    }
    async deserialize(response) {
        return deserializeAtomXmlResponse(["QueueName"], response);
    }
}
//# sourceMappingURL=queueResourceSerializer.js.map