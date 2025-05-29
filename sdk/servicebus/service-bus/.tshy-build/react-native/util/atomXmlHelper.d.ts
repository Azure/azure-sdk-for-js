import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { RestError } from "@azure/core-rest-pipeline";
import type { ServiceClient, OperationOptions, FullOperationResponse } from "@azure/core-client";
import type { InternalQueueOptions } from "../serializers/queueResourceSerializer.js";
import type { InternalTopicOptions } from "../serializers/topicResourceSerializer.js";
import type { InternalSubscriptionOptions } from "../serializers/subscriptionResourceSerializer.js";
import type { CreateRuleOptions } from "../serializers/ruleResourceSerializer.js";
/**
 * @internal
 * Represents the internal ATOM XML serializer interface
 */
export interface AtomXmlSerializer {
    serialize(requestBodyInJson: object): Record<string, unknown>;
    deserialize(response: FullOperationResponse): Promise<FullOperationResponse>;
}
/**
 * @internal
 * Utility to execute Atom XML operations as HTTP requests
 */
export declare function executeAtomXmlOperation(serviceBusAtomManagementClient: ServiceClient, request: PipelineRequest, serializer: AtomXmlSerializer, operationOptions: OperationOptions, requestObject?: InternalQueueOptions | InternalTopicOptions | InternalSubscriptionOptions | CreateRuleOptions): Promise<FullOperationResponse>;
/**
 * @internal
 * The key-value pairs having undefined/null as the values would lead to the empty tags in the serialized XML request.
 * Empty tags in the request body is problematic because of the following reasons.
 * - ATOM based management operations throw a "Bad Request" error if empty tags are included in the XML request body at top level.
 * - At the inner levels, Service assigns the empty strings as values to the empty tags instead of throwing an error.
 *
 * This method recursively removes the key-value pairs with undefined/null as the values from the request object that is to be serialized.
 *
 */
export declare function sanitizeSerializableObject(resource: {
    [key: string]: any;
}): void;
/**
 * @internal
 * Serializes input information to construct the Atom XML request
 * @param resourceName - Name of the resource to be serialized like `QueueDescription`
 * @param resource - The entity details
 * @param allowedProperties - The set of properties that are allowed by the service for the
 * associated operation(s);
 */
export declare function serializeToAtomXmlRequest(resourceName: string, resource: unknown): Record<string, unknown>;
/**
 * @internal
 * Transforms response to contain the parsed data.
 * @param nameProperties - The set of 'name' properties to be constructed on the
 * resultant object e.g., QueueName, TopicName, etc.
 */
export declare function deserializeAtomXmlResponse(nameProperties: string[], response: FullOperationResponse): Promise<FullOperationResponse>;
/**
 * @internal
 * Utility to help construct the normalized `RestError` object based on given error
 * information and other data present in the received `response` object.
 */
export declare function buildError(response: FullOperationResponse): RestError;
//# sourceMappingURL=atomXmlHelper.d.ts.map