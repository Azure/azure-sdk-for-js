// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { deserializeAtomXmlResponse, serializeToAtomXmlRequest } from "../util/atomXmlHelper.js";
import * as Constants from "../util/constants.js";
import { getAuthorizationRulesOrUndefined, getBoolean, getInteger, getIntegerOrUndefined, getRawAuthorizationRules, getString, getStringOrUndefined, getDate, getMessageCountDetails, } from "../util/utils.js";
/**
 * @internal
 * Builds the topic options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
export function buildTopicOptions(topic) {
    return {
        // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
        // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
        // not picking up on it.
        //
        // The authority on this ordering is here:
        // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/TopicPropertiesExtensions.cs#L175
        DefaultMessageTimeToLive: topic.defaultMessageTimeToLive,
        MaxSizeInMegabytes: getStringOrUndefined(topic.maxSizeInMegabytes),
        RequiresDuplicateDetection: getStringOrUndefined(topic.requiresDuplicateDetection),
        DuplicateDetectionHistoryTimeWindow: topic.duplicateDetectionHistoryTimeWindow,
        EnableBatchedOperations: getStringOrUndefined(topic.enableBatchedOperations),
        AuthorizationRules: getRawAuthorizationRules(topic.authorizationRules),
        Status: getStringOrUndefined(topic.status),
        UserMetadata: getStringOrUndefined(topic.userMetadata),
        SupportOrdering: getStringOrUndefined(topic.supportOrdering),
        AutoDeleteOnIdle: getStringOrUndefined(topic.autoDeleteOnIdle),
        EnablePartitioning: getStringOrUndefined(topic.enablePartitioning),
        EntityAvailabilityStatus: getStringOrUndefined(topic.availabilityStatus),
        EnableExpress: getStringOrUndefined(topic.enableExpress),
        MaxMessageSizeInKilobytes: getStringOrUndefined(topic.maxMessageSizeInKilobytes),
    };
}
/**
 * @internal
 * Builds the topic object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildTopic(rawTopic) {
    return {
        name: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
        maxSizeInMegabytes: getInteger(rawTopic[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),
        enablePartitioning: getBoolean(rawTopic[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
        supportOrdering: getBoolean(rawTopic[Constants.SUPPORT_ORDERING], "supportOrdering"),
        enableBatchedOperations: getBoolean(rawTopic[Constants.ENABLE_BATCHED_OPERATIONS], "enableBatchedOperations"),
        defaultMessageTimeToLive: getString(rawTopic[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE], "defaultMessageTimeToLive"),
        autoDeleteOnIdle: rawTopic[Constants.AUTO_DELETE_ON_IDLE],
        requiresDuplicateDetection: getBoolean(rawTopic[Constants.REQUIRES_DUPLICATE_DETECTION], "requiresDuplicateDetection"),
        duplicateDetectionHistoryTimeWindow: getString(rawTopic[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW], "duplicateDetectionHistoryTimeWindow"),
        authorizationRules: getAuthorizationRulesOrUndefined(rawTopic[Constants.AUTHORIZATION_RULES]),
        userMetadata: rawTopic[Constants.USER_METADATA],
        status: rawTopic[Constants.STATUS],
        enableExpress: getBoolean(rawTopic[Constants.ENABLE_EXPRESS], "enableExpress"),
        availabilityStatus: rawTopic[Constants.ENTITY_AVAILABILITY_STATUS],
        maxMessageSizeInKilobytes: getIntegerOrUndefined(rawTopic[Constants.MAX_MESSAGE_SIZE_IN_KILOBYTES]),
    };
}
/**
 * @internal
 * Builds the topic runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildTopicRuntimeProperties(rawTopic) {
    return {
        name: getString(rawTopic[Constants.TOPIC_NAME], "topicName"),
        sizeInBytes: getIntegerOrUndefined(rawTopic[Constants.SIZE_IN_BYTES]),
        subscriptionCount: getIntegerOrUndefined(rawTopic[Constants.SUBSCRIPTION_COUNT]),
        createdAt: getDate(rawTopic[Constants.CREATED_AT], "createdAt"),
        scheduledMessageCount: getMessageCountDetails(rawTopic[Constants.COUNT_DETAILS])
            .scheduledMessageCount,
        modifiedAt: getDate(rawTopic[Constants.UPDATED_AT], "modifiedAt"),
        accessedAt: getDate(rawTopic[Constants.ACCESSED_AT], "accessedAt"),
    };
}
/**
 * @internal
 * TopicResourceSerializer for serializing / deserializing Topic entities
 */
export class TopicResourceSerializer {
    serialize(resource) {
        return serializeToAtomXmlRequest("TopicDescription", resource);
    }
    async deserialize(response) {
        return deserializeAtomXmlResponse(["TopicName"], response);
    }
}
//# sourceMappingURL=topicResourceSerializer.js.map