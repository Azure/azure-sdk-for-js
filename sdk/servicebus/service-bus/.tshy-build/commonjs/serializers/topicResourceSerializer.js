"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicResourceSerializer = void 0;
exports.buildTopicOptions = buildTopicOptions;
exports.buildTopic = buildTopic;
exports.buildTopicRuntimeProperties = buildTopicRuntimeProperties;
const tslib_1 = require("tslib");
const atomXmlHelper_js_1 = require("../util/atomXmlHelper.js");
const Constants = tslib_1.__importStar(require("../util/constants.js"));
const utils_js_1 = require("../util/utils.js");
/**
 * @internal
 * Builds the topic options object from the user provided options.
 * Handles the differences in casing for the property names,
 * converts values to string and ensures the right order as expected by the service
 */
function buildTopicOptions(topic) {
    return {
        // NOTE: this ordering is extremely important. As an example, misordering of the ForwardTo property
        // resulted in a customer bug where the Forwarding attributes appeared to be set but the portal was
        // not picking up on it.
        //
        // The authority on this ordering is here:
        // https://github.com/Azure/azure-sdk-for-net/blob/8af2dfc32c96ef3e340f9d20013bf588d97ea756/sdk/servicebus/Azure.Messaging.ServiceBus/src/Administration/TopicPropertiesExtensions.cs#L175
        DefaultMessageTimeToLive: topic.defaultMessageTimeToLive,
        MaxSizeInMegabytes: (0, utils_js_1.getStringOrUndefined)(topic.maxSizeInMegabytes),
        RequiresDuplicateDetection: (0, utils_js_1.getStringOrUndefined)(topic.requiresDuplicateDetection),
        DuplicateDetectionHistoryTimeWindow: topic.duplicateDetectionHistoryTimeWindow,
        EnableBatchedOperations: (0, utils_js_1.getStringOrUndefined)(topic.enableBatchedOperations),
        AuthorizationRules: (0, utils_js_1.getRawAuthorizationRules)(topic.authorizationRules),
        Status: (0, utils_js_1.getStringOrUndefined)(topic.status),
        UserMetadata: (0, utils_js_1.getStringOrUndefined)(topic.userMetadata),
        SupportOrdering: (0, utils_js_1.getStringOrUndefined)(topic.supportOrdering),
        AutoDeleteOnIdle: (0, utils_js_1.getStringOrUndefined)(topic.autoDeleteOnIdle),
        EnablePartitioning: (0, utils_js_1.getStringOrUndefined)(topic.enablePartitioning),
        EntityAvailabilityStatus: (0, utils_js_1.getStringOrUndefined)(topic.availabilityStatus),
        EnableExpress: (0, utils_js_1.getStringOrUndefined)(topic.enableExpress),
        MaxMessageSizeInKilobytes: (0, utils_js_1.getStringOrUndefined)(topic.maxMessageSizeInKilobytes),
    };
}
/**
 * @internal
 * Builds the topic object from the raw json object gotten after deserializing the
 * response from the service
 */
function buildTopic(rawTopic) {
    return {
        name: (0, utils_js_1.getString)(rawTopic[Constants.TOPIC_NAME], "topicName"),
        maxSizeInMegabytes: (0, utils_js_1.getInteger)(rawTopic[Constants.MAX_SIZE_IN_MEGABYTES], "maxSizeInMegabytes"),
        enablePartitioning: (0, utils_js_1.getBoolean)(rawTopic[Constants.ENABLE_PARTITIONING], "enablePartitioning"),
        supportOrdering: (0, utils_js_1.getBoolean)(rawTopic[Constants.SUPPORT_ORDERING], "supportOrdering"),
        enableBatchedOperations: (0, utils_js_1.getBoolean)(rawTopic[Constants.ENABLE_BATCHED_OPERATIONS], "enableBatchedOperations"),
        defaultMessageTimeToLive: (0, utils_js_1.getString)(rawTopic[Constants.DEFAULT_MESSAGE_TIME_TO_LIVE], "defaultMessageTimeToLive"),
        autoDeleteOnIdle: rawTopic[Constants.AUTO_DELETE_ON_IDLE],
        requiresDuplicateDetection: (0, utils_js_1.getBoolean)(rawTopic[Constants.REQUIRES_DUPLICATE_DETECTION], "requiresDuplicateDetection"),
        duplicateDetectionHistoryTimeWindow: (0, utils_js_1.getString)(rawTopic[Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW], "duplicateDetectionHistoryTimeWindow"),
        authorizationRules: (0, utils_js_1.getAuthorizationRulesOrUndefined)(rawTopic[Constants.AUTHORIZATION_RULES]),
        userMetadata: rawTopic[Constants.USER_METADATA],
        status: rawTopic[Constants.STATUS],
        enableExpress: (0, utils_js_1.getBoolean)(rawTopic[Constants.ENABLE_EXPRESS], "enableExpress"),
        availabilityStatus: rawTopic[Constants.ENTITY_AVAILABILITY_STATUS],
        maxMessageSizeInKilobytes: (0, utils_js_1.getIntegerOrUndefined)(rawTopic[Constants.MAX_MESSAGE_SIZE_IN_KILOBYTES]),
    };
}
/**
 * @internal
 * Builds the topic runtime info object from the raw json object gotten after deserializing the
 * response from the service
 */
function buildTopicRuntimeProperties(rawTopic) {
    return {
        name: (0, utils_js_1.getString)(rawTopic[Constants.TOPIC_NAME], "topicName"),
        sizeInBytes: (0, utils_js_1.getIntegerOrUndefined)(rawTopic[Constants.SIZE_IN_BYTES]),
        subscriptionCount: (0, utils_js_1.getIntegerOrUndefined)(rawTopic[Constants.SUBSCRIPTION_COUNT]),
        createdAt: (0, utils_js_1.getDate)(rawTopic[Constants.CREATED_AT], "createdAt"),
        scheduledMessageCount: (0, utils_js_1.getMessageCountDetails)(rawTopic[Constants.COUNT_DETAILS])
            .scheduledMessageCount,
        modifiedAt: (0, utils_js_1.getDate)(rawTopic[Constants.UPDATED_AT], "modifiedAt"),
        accessedAt: (0, utils_js_1.getDate)(rawTopic[Constants.ACCESSED_AT], "accessedAt"),
    };
}
/**
 * @internal
 * TopicResourceSerializer for serializing / deserializing Topic entities
 */
class TopicResourceSerializer {
    serialize(resource) {
        return (0, atomXmlHelper_js_1.serializeToAtomXmlRequest)("TopicDescription", resource);
    }
    async deserialize(response) {
        return (0, atomXmlHelper_js_1.deserializeAtomXmlResponse)(["TopicName"], response);
    }
}
exports.TopicResourceSerializer = TopicResourceSerializer;
//# sourceMappingURL=topicResourceSerializer.js.map