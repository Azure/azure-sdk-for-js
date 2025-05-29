import { QueueCreateOptionalParams, QueueCreateResponse, QueueDeleteOptionalParams, QueueDeleteResponse, QueueGetPropertiesOptionalParams, QueueGetPropertiesResponse, QueueSetMetadataOptionalParams, QueueSetMetadataResponse, QueueGetAccessPolicyOptionalParams, QueueGetAccessPolicyResponse, QueueSetAccessPolicyOptionalParams, QueueSetAccessPolicyResponse } from "../models/index.js";
/** Interface representing a Queue. */
export interface Queue {
    /**
     * creates a new queue under the given account.
     * @param options The options parameters.
     */
    create(options?: QueueCreateOptionalParams): Promise<QueueCreateResponse>;
    /**
     * operation permanently deletes the specified queue
     * @param options The options parameters.
     */
    delete(options?: QueueDeleteOptionalParams): Promise<QueueDeleteResponse>;
    /**
     * Retrieves user-defined metadata and queue properties on the specified queue. Metadata is associated
     * with the queue as name-values pairs.
     * @param options The options parameters.
     */
    getProperties(options?: QueueGetPropertiesOptionalParams): Promise<QueueGetPropertiesResponse>;
    /**
     * sets user-defined metadata on the specified queue. Metadata is associated with the queue as
     * name-value pairs.
     * @param options The options parameters.
     */
    setMetadata(options?: QueueSetMetadataOptionalParams): Promise<QueueSetMetadataResponse>;
    /**
     * returns details about any stored access policies specified on the queue that may be used with Shared
     * Access Signatures.
     * @param options The options parameters.
     */
    getAccessPolicy(options?: QueueGetAccessPolicyOptionalParams): Promise<QueueGetAccessPolicyResponse>;
    /**
     * sets stored access policies for the queue that may be used with Shared Access Signatures
     * @param options The options parameters.
     */
    setAccessPolicy(options?: QueueSetAccessPolicyOptionalParams): Promise<QueueSetAccessPolicyResponse>;
}
//# sourceMappingURL=queue.d.ts.map