"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueResourceSerializer = void 0;
exports.buildQueueOptions = buildQueueOptions;
exports.buildQueue = buildQueue;
exports.buildQueueRuntimeProperties = buildQueueRuntimeProperties;
const tslib_1 = require("tslib");
const atomXmlHelper_js_1 = require("../util/atomXmlHelper.js");
const Constants = tslib_1.__importStar(require("../util/constants.js"));
const utils_js_1 = require("../util/utils.js");
/**
 * @internal
 * Builds the queue options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
function buildQueueOptions(queue) {
    return {
        // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
        // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
        // not picking up on it.
        //
        // The authority on this ordering is here:
        // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/QueuePropertiesExtensions.cs#L20
        LockDuration: queue.lockDuration,
        MaxSizeInMegabytes: (0, utils_js_1.getStringOrUndefined)(queue.maxSizeInMegabytes),
        RequiresDuplicateDetection: (0, utils_js_1.getStringOrUndefined)(queue.requiresDuplicateDetection),
        RequiresSession: (0, utils_js_1.getStringOrUndefined)(queue.requiresSession),
        DefaultMessageTimeToLive: queue.defaultMessageTimeToLive,
        DeadLetteringOnMessageExpiration: (0, utils_js_1.getStringOrUndefined)(queue.deadLetteringOnMessageExpiration),
        DuplicateDetectionHistoryTimeWindow: queue.duplicateDetectionHistoryTimeWindow,
        MaxDeliveryCount: (0, utils_js_1.getStringOrUndefined)(queue.maxDeliveryCount),
        EnableBatchedOperations: (0, utils_js_1.getStringOrUndefined)(queue.enableBatchedOperations),
        AuthorizationRules: (0, utils_js_1.getRawAuthorizationRules)(queue.authorizationRules),
        Status: (0, utils_js_1.getStringOrUndefined)(queue.status),
        ForwardTo: (0, utils_js_1.getStringOrUndefined)(queue.forwardTo),
        UserMetadata: (0, utils_js_1.getStringOrUndefined)(queue.userMetadata),
        AutoDeleteOnIdle: (0, utils_js_1.getStringOrUndefined)(queue.autoDeleteOnIdle),
        EnablePartitioning: (0, utils_js_1.getStringOrUndefined)(queue.enablePartitioning),
        ForwardDeadLetteredMessagesTo: (0, utils_js_1.getStringOrUndefined)(queue.forwardDeadLetteredMessagesTo),
        EntityAvailabilityStatus: (0, utils_js_1.getStringOrUndefined)(queue.availabilityStatus),
        EnableExpress: (0, utils_js_1.getStringOrUndefined)(queue.enableExpress),
        MaxMessageSizeInKilobytes: (0, utils_js_1.getStringOrUndefined)(queue.maxMessageSizeInKilobytes),
    };
}
/**
 * @internal
 * Builds the queue object from the raw json object gotten after deserializing the
 * response from the service
 */
function buildQueue(rawQueue) {
    return {
        name: (0, utils_js_1.getString)(rawQueue[Constants.QUEUE_NAME], "queueName"),
        forwardTo: (0, utils_js_1.getStringOrUndefined)(rawQueue[Constants.FORWARD_TO]),
        userMetadata: rawQueue[Constants.USER_METADATA],
        lockDuration: (0, utils_js_1.getString)(rawQueue[Constants.LOCK_DURATION], "lockDuration"),
        maxSizeInMegabytes: (0, utils_js_1.getInteger)(rawQueue[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),
        maxDeliveryCount: (0, utils_js_1.getInteger)(rawQueue[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),
        enablePartitioning: (0, utils_js_1.getBoolean)(rawQueue[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
        requiresSession: (0, utils_js_1.getBoolean)(rawQueue[Constants.REQUIRES_SESSION], "requiresSession"),
        enableBatchedOperations: (0, utils_js_1.getBoolean)(rawQueue[Constants.ENABLE_BATCHED_OPERATIONS], "enableBatchedOperations"),
        defaultMessageTimeToLive: (0, utils_js_1.getString)(rawQueue[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE], "defaultMessageTimeToLive"),
        autoDeleteOnIdle: rawQueue[Constants.AUTO_DELETE_ON_IDLE],
        requiresDuplicateDetection: (0, utils_js_1.getBoolean)(rawQueue[Constants.REQUIRES_DUPLICATE_DETECTION], "requiresDuplicateDetection"),
        duplicateDetectionHistoryTimeWindow: (0, utils_js_1.getString)(rawQueue[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW], "duplicateDetectionHistoryTimeWindow"),
        deadLetteringOnMessageExpiration: (0, utils_js_1.getBoolean)(rawQueue[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION], "deadLetteringOnMessageExpiration"),
        forwardDeadLetteredMessagesTo: (0, utils_js_1.getStringOrUndefined)(rawQueue[Constants.FORWARD_DEADLETTERED_MESSAGES_TO]),
        authorizationRules: (0, utils_js_1.getAuthorizationRulesOrUndefined)(rawQueue[Constants.AUTHORIZATION_RULES]),
        status: rawQueue[Constants.STATUS],
        enableExpress: (0, utils_js_1.getBoolean)(rawQueue[Constants.ENABLE_EXPRESS], "enableExpress"),
        availabilityStatus: rawQueue[Constants.ENTITY_AVAILABILITY_STATUS],
        maxMessageSizeInKilobytes: (0, utils_js_1.getIntegerOrUndefined)(rawQueue[Constants.MAX_MESSAGE_SIZE_IN_KILOBYTES]),
    };
}
/**
 * @internal
 * Builds the queue runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
function buildQueueRuntimeProperties(rawQueue) {
    const messageCountDetails = (0, utils_js_1.getMessageCountDetails)(rawQueue[Constants.COUNT_DETAILS]);
    return Object.assign(Object.assign({ name: (0, utils_js_1.getString)(rawQueue[Constants.QUEUE_NAME], "queueName"), sizeInBytes: (0, utils_js_1.getIntegerOrUndefined)(rawQueue[Constants.SIZE_IN_BYTES]), totalMessageCount: (0, utils_js_1.getIntegerOrUndefined)(rawQueue[Constants.MESSAGE_COUNT]) }, messageCountDetails), { createdAt: (0, utils_js_1.getDate)(rawQueue[Constants.CREATED_AT], "createdAt"), modifiedAt: (0, utils_js_1.getDate)(rawQueue[Constants.UPDATED_AT], "modifiedAt"), accessedAt: (0, utils_js_1.getDate)(rawQueue[Constants.ACCESSED_AT], "accessedAt") });
}
/**
 * @internal
 * Atom XML Serializer for Queues.
 */
class QueueResourceSerializer {
    serialize(resource) {
        return (0, atomXmlHelper_js_1.serializeToAtomXmlRequest)("QueueDescription", resource);
    }
    async deserialize(response) {
        return (0, atomXmlHelper_js_1.deserializeAtomXmlResponse)(["QueueName"], response);
    }
}
exports.QueueResourceSerializer = QueueResourceSerializer;
//# sourceMappingURL=queueResourceSerializer.js.map