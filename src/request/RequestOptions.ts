import { IHeaders } from "..";
import { PartitionKey } from "../documents";

/**
 * The request options
 * @typedef {Object} RequestOptions                          -         \
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.
 * @property {object} [accessCondition]                      -         \
 * Conditions Associated with the request.
 * @property {string} accessCondition.type                   -         \
 * Conditional HTTP method header type (IfMatch or IfNoneMatch).
 * @property {string} accessCondition.condition              -         \
 * Conditional HTTP method header value (the _etag field from the last version you read).
 * @property {string} [consistencyLevel]                     -         \
 * Consistency level required by the client.
 * @property {boolean} [disableRUPerMinuteUsage]             -         \
 * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to \
 * serve the request if regular provisioned RUs/second is exhausted.
 * @property {boolean} [enableScriptLogging]                 -         \
 * Enables or disables logging in JavaScript stored procedures.
 * @property {string} [indexingDirective]                    -         \
 * Specifies indexing directives (index, do not index .. etc).
 * @property {boolean} [offerEnableRUPerMinuteThroughput]    -         \
 * Represents Request Units(RU)/Minute throughput is enabled/disabled for a container \
 * in the Azure Cosmos DB database service.
 * @property {number} [offerThroughput]                      -         \
 * The offer throughput provisioned for a container in measurement of Requests-per-Unit \
 * in the Azure Cosmos DB database service.
 * @property {string} [offerType]                            -         Offer type when creating document containers.
 * <p>This option is only valid when creating a document container.</p>
 * @property {string} [partitionKey]                         -         \
 * Specifies a partition key definition for a particular path in the Azure Cosmos DB database service.
 * @property {boolean} [populateQuotaInfo]                   -         \
 * Enables/disables getting document container quota related stats for document container read requests.
 * @property {string} [postTriggerInclude]                   -         \
 * Indicates what is the post trigger to be invoked after the operation.
 * @property {string} [preTriggerInclude]                    -         \
 * Indicates what is the pre trigger to be invoked before the operation.
 * @property {number} [resourceTokenExpirySeconds]           -         \
 * Expiry time (in seconds) for resource token associated with permission (applicable only for requests on permissions).
 * @property {string} [sessionToken]                         -         Token for use with Session consistency.
 */

export interface RequestOptions {
    accessCondition?: {
        type: string;
        condition: string;
    };
    consistencyLevel?: string;
    disableRUPerMinuteUsage?: boolean;
    enableScriptLogging?: boolean;
    indexingDirective?: string;
    offerEnableRUPerMinuteThroughput?: boolean;
    offerThroughput?: number;
    offerType?: string;
    partitionKey?: PartitionKey;
    populateQuotaInfo?: boolean;
    postTriggerInclude?: string | string[];
    preTriggerInclude?: string | string[];
    resourceTokenExpirySeconds?: number;
    sessionToken?: string;
    initialHeaders?: IHeaders;
    urlConnection?: string;
    skipGetPartitionKeyDefinition?: boolean;
    disableAutomaticIdGeneration?: boolean;
}
