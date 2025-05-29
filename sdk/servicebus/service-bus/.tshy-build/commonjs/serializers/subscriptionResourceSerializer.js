"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionResourceSerializer = void 0;
exports.buildSubscriptionOptions = buildSubscriptionOptions;
exports.buildSubscription = buildSubscription;
exports.buildSubscriptionRuntimeProperties = buildSubscriptionRuntimeProperties;
const tslib_1 = require("tslib");
const atomXmlHelper_js_1 = require("../util/atomXmlHelper.js");
const Constants = tslib_1.__importStar(require("../util/constants.js"));
const utils_js_1 = require("../util/utils.js");
const ruleResourceSerializer_js_1 = require("./ruleResourceSerializer.js");
/**
 * @internal
 * Builds the subscription options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
function buildSubscriptionOptions(subscription) {
    return {
        // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
        // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
        // not picking up on it.
        //
        // The authority on this ordering is here:
        // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/SubscriptionPropertiesExtensions.cs#L191
        LockDuration: subscription.lockDuration,
        RequiresSession: (0, utils_js_1.getStringOrUndefined)(subscription.requiresSession),
        DefaultMessageTimeToLive: (0, utils_js_1.getStringOrUndefined)(subscription.defaultMessageTimeToLive),
        DeadLetteringOnMessageExpiration: (0, utils_js_1.getStringOrUndefined)(subscription.deadLetteringOnMessageExpiration),
        DeadLetteringOnFilterEvaluationExceptions: (0, utils_js_1.getStringOrUndefined)(subscription.deadLetteringOnFilterEvaluationExceptions),
        DefaultRuleDescription: subscription.defaultRuleOptions
            ? (0, ruleResourceSerializer_js_1.buildInternalRuleResource)(subscription.defaultRuleOptions)
            : undefined,
        MaxDeliveryCount: (0, utils_js_1.getStringOrUndefined)(subscription.maxDeliveryCount),
        EnableBatchedOperations: (0, utils_js_1.getStringOrUndefined)(subscription.enableBatchedOperations),
        Status: (0, utils_js_1.getStringOrUndefined)(subscription.status),
        ForwardTo: (0, utils_js_1.getStringOrUndefined)(subscription.forwardTo),
        UserMetadata: (0, utils_js_1.getStringOrUndefined)(subscription.userMetadata),
        ForwardDeadLetteredMessagesTo: (0, utils_js_1.getStringOrUndefined)(subscription.forwardDeadLetteredMessagesTo),
        AutoDeleteOnIdle: (0, utils_js_1.getStringOrUndefined)(subscription.autoDeleteOnIdle),
        EntityAvailabilityStatus: (0, utils_js_1.getStringOrUndefined)(subscription.availabilityStatus),
    };
}
/**
 * @internal
 * Builds the subscription object from the raw json object gotten after deserializing
 * the response from the service
 */
function buildSubscription(rawSubscription) {
    return {
        subscriptionName: (0, utils_js_1.getString)(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
        topicName: (0, utils_js_1.getString)(rawSubscription[Constants.TOPIC_NAME], "topicName"),
        lockDuration: (0, utils_js_1.getString)(rawSubscription[Constants.LOCK_DURATION], "lockDuration"),
        maxDeliveryCount: (0, utils_js_1.getInteger)(rawSubscription[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),
        requiresSession: (0, utils_js_1.getBoolean)(rawSubscription[Constants.REQUIRES_SESSION], "requiresSession"),
        enableBatchedOperations: (0, utils_js_1.getBoolean)(rawSubscription[Constants.ENABLE_BATCHED_OPERATIONS], "enableBatchedOperations"),
        defaultMessageTimeToLive: (0, utils_js_1.getString)(rawSubscription[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE], "defaultMessageTimeToLive"),
        autoDeleteOnIdle: (0, utils_js_1.getString)(rawSubscription[Constants.AUTO_DELETE_ON_IDLE], "autoDeleteOnIdle"),
        deadLetteringOnMessageExpiration: (0, utils_js_1.getBoolean)(rawSubscription[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION], "deadLetteringOnMessageExpiration"),
        deadLetteringOnFilterEvaluationExceptions: (0, utils_js_1.getBoolean)(rawSubscription[Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS], "deadLetteringOnFilterEvaluationExceptions"),
        forwardDeadLetteredMessagesTo: (0, utils_js_1.getStringOrUndefined)(rawSubscription[Constants.FORWARD_DEADLETTERED_MESSAGES_TO]),
        forwardTo: (0, utils_js_1.getStringOrUndefined)(rawSubscription[Constants.FORWARD_TO]),
        userMetadata: rawSubscription[Constants.USER_METADATA],
        status: (0, utils_js_1.getString)(rawSubscription[Constants.STATUS], "status"),
        availabilityStatus: (0, utils_js_1.getString)(rawSubscription[Constants.ENTITY_AVAILABILITY_STATUS], "availabilityStatus"),
    };
}
/**
 * @internal
 * Builds the subscription runtime info object from the raw json object gotten after deserializing
 * the response from the service
 */
function buildSubscriptionRuntimeProperties(rawSubscription) {
    const messageCountDetails = (0, utils_js_1.getMessageCountDetails)(rawSubscription[Constants.COUNT_DETAILS]);
    return {
        subscriptionName: (0, utils_js_1.getString)(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
        topicName: (0, utils_js_1.getString)(rawSubscription[Constants.TOPIC_NAME], "topicName"),
        totalMessageCount: (0, utils_js_1.getInteger)(rawSubscription[Constants.MESSAGE_COUNT], "messageCount"),
        activeMessageCount: messageCountDetails.activeMessageCount,
        deadLetterMessageCount: messageCountDetails.deadLetterMessageCount,
        transferDeadLetterMessageCount: messageCountDetails.transferDeadLetterMessageCount,
        transferMessageCount: messageCountDetails.transferMessageCount,
        createdAt: (0, utils_js_1.getDate)(rawSubscription[Constants.CREATED_AT], "createdAt"),
        modifiedAt: (0, utils_js_1.getDate)(rawSubscription[Constants.UPDATED_AT], "modifiedAt"),
        accessedAt: (0, utils_js_1.getDate)(rawSubscription[Constants.ACCESSED_AT], "accessedAt"),
    };
}
/**
 * @internal
 * SubscriptionResourceSerializer for serializing / deserializing Subscription entities
 */
class SubscriptionResourceSerializer {
    serialize(resource) {
        return (0, atomXmlHelper_js_1.serializeToAtomXmlRequest)("SubscriptionDescription", resource);
    }
    async deserialize(response) {
        return (0, atomXmlHelper_js_1.deserializeAtomXmlResponse)(["TopicName", "SubscriptionName"], response);
    }
}
exports.SubscriptionResourceSerializer = SubscriptionResourceSerializer;
//# sourceMappingURL=subscriptionResourceSerializer.js.map