// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { deserializeAtomXmlResponse, serializeToAtomXmlRequest } from "../util/atomXmlHelper.js";
import * as Constants from "../util/constants.js";
import { getBoolean, getMessageCountDetails, getInteger, getString, getStringOrUndefined, getDate, } from "../util/utils.js";
import { buildInternalRuleResource } from "./ruleResourceSerializer.js";
/**
 * @internal
 * Builds the subscription options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export function buildSubscriptionOptions(subscription) {
    return {
        // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
        // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
        // not picking up on it.
        //
        // The authority on this ordering is here:
        // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/SubscriptionPropertiesExtensions.cs#L191
        LockDuration: subscription.lockDuration,
        RequiresSession: getStringOrUndefined(subscription.requiresSession),
        DefaultMessageTimeToLive: getStringOrUndefined(subscription.defaultMessageTimeToLive),
        DeadLetteringOnMessageExpiration: getStringOrUndefined(subscription.deadLetteringOnMessageExpiration),
        DeadLetteringOnFilterEvaluationExceptions: getStringOrUndefined(subscription.deadLetteringOnFilterEvaluationExceptions),
        DefaultRuleDescription: subscription.defaultRuleOptions
            ? buildInternalRuleResource(subscription.defaultRuleOptions)
            : undefined,
        MaxDeliveryCount: getStringOrUndefined(subscription.maxDeliveryCount),
        EnableBatchedOperations: getStringOrUndefined(subscription.enableBatchedOperations),
        Status: getStringOrUndefined(subscription.status),
        ForwardTo: getStringOrUndefined(subscription.forwardTo),
        UserMetadata: getStringOrUndefined(subscription.userMetadata),
        ForwardDeadLetteredMessagesTo: getStringOrUndefined(subscription.forwardDeadLetteredMessagesTo),
        AutoDeleteOnIdle: getStringOrUndefined(subscription.autoDeleteOnIdle),
        EntityAvailabilityStatus: getStringOrUndefined(subscription.availabilityStatus),
    };
}
/**
 * @internal
 * Builds the subscription object from the raw json object gotten after deserializing
 * the response from the service
 */
export function buildSubscription(rawSubscription) {
    return {
        subscriptionName: getString(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
        topicName: getString(rawSubscription[Constants.TOPIC_NAME], "topicName"),
        lockDuration: getString(rawSubscription[Constants.LOCK_DURATION], "lockDuration"),
        maxDeliveryCount: getInteger(rawSubscription[Constants.MAX_DELIVERY_COUNT], "maxDeliveryCount"),
        requiresSession: getBoolean(rawSubscription[Constants.REQUIRES_SESSION], "requiresSession"),
        enableBatchedOperations: getBoolean(rawSubscription[Constants.ENABLE_BATCHED_OPERATIONS], "enableBatchedOperations"),
        defaultMessageTimeToLive: getString(rawSubscription[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE], "defaultMessageTimeToLive"),
        autoDeleteOnIdle: getString(rawSubscription[Constants.AUTO_DELETE_ON_IDLE], "autoDeleteOnIdle"),
        deadLetteringOnMessageExpiration: getBoolean(rawSubscription[Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION], "deadLetteringOnMessageExpiration"),
        deadLetteringOnFilterEvaluationExceptions: getBoolean(rawSubscription[Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS], "deadLetteringOnFilterEvaluationExceptions"),
        forwardDeadLetteredMessagesTo: getStringOrUndefined(rawSubscription[Constants.FORWARD_DEADLETTERED_MESSAGES_TO]),
        forwardTo: getStringOrUndefined(rawSubscription[Constants.FORWARD_TO]),
        userMetadata: rawSubscription[Constants.USER_METADATA],
        status: getString(rawSubscription[Constants.STATUS], "status"),
        availabilityStatus: getString(rawSubscription[Constants.ENTITY_AVAILABILITY_STATUS], "availabilityStatus"),
    };
}
/**
 * @internal
 * Builds the subscription runtime info object from the raw json object gotten after deserializing
 * the response from the service
 */
export function buildSubscriptionRuntimeProperties(rawSubscription) {
    const messageCountDetails = getMessageCountDetails(rawSubscription[Constants.COUNT_DETAILS]);
    return {
        subscriptionName: getString(rawSubscription[Constants.SUBSCRIPTION_NAME], "subscriptionName"),
        topicName: getString(rawSubscription[Constants.TOPIC_NAME], "topicName"),
        totalMessageCount: getInteger(rawSubscription[Constants.MESSAGE_COUNT], "messageCount"),
        activeMessageCount: messageCountDetails.activeMessageCount,
        deadLetterMessageCount: messageCountDetails.deadLetterMessageCount,
        transferDeadLetterMessageCount: messageCountDetails.transferDeadLetterMessageCount,
        transferMessageCount: messageCountDetails.transferMessageCount,
        createdAt: getDate(rawSubscription[Constants.CREATED_AT], "createdAt"),
        modifiedAt: getDate(rawSubscription[Constants.UPDATED_AT], "modifiedAt"),
        accessedAt: getDate(rawSubscription[Constants.ACCESSED_AT], "accessedAt"),
    };
}
/**
 * @internal
 * SubscriptionResourceSerializer for serializing / deserializing Subscription entities
 */
export class SubscriptionResourceSerializer {
    serialize(resource) {
        return serializeToAtomXmlRequest("SubscriptionDescription", resource);
    }
    async deserialize(response) {
        return deserializeAtomXmlResponse(["TopicName", "SubscriptionName"], response);
    }
}
//# sourceMappingURL=subscriptionResourceSerializer.js.map