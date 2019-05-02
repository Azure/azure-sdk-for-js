import { IHeaders } from "..";
import { PartitionKey } from "../documents";

/**
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.=
 */
export interface RequestOptions {
  /** Conditions Associated with the request. */
  accessCondition?: {
    /** Conditional HTTP method header type (IfMatch or IfNoneMatch). */
    type: string;
    /** Conditional HTTP method header value (the _etag field from the last version you read). */
    condition: string;
  };
  /** Consistency level required by the client. */
  consistencyLevel?: string;
  /**
   * DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity
   * to serve the request if regular provisioned RUs/second is exhausted.
   */
  disableRUPerMinuteUsage?: boolean;
  /** Enables or disables logging in JavaScript stored procedures. */
  enableScriptLogging?: boolean;
  /** Specifies indexing directives (index, do not index .. etc). */
  indexingDirective?: string;
  /** Represents Request Units(RU)/Minute throughput is enabled/disabled for a container. */
  offerEnableRUPerMinuteThroughput?: boolean;
  /** The offer throughput provisioned for a container in measurement of Requests-per-Unit. */
  offerThroughput?: number;
  /**
   * Offer type when creating document containers.
   *
   * This option is only valid when creating a document container.
   */
  offerType?: string;
  /** Specifies a partition key definition for a particular path in the Azure Cosmos DB database service. */
  partitionKey?: PartitionKey | PartitionKey[];
  /** Enables/disables getting document container quota related stats for document container read requests. */
  populateQuotaInfo?: boolean;
  /** Indicates what is the post trigger to be invoked after the operation. */
  postTriggerInclude?: string | string[];
  /** Indicates what is the pre trigger to be invoked before the operation. */
  preTriggerInclude?: string | string[];
  /** Expiry time (in seconds) for resource token associated with permission (applicable only for requests on permissions). */
  resourceTokenExpirySeconds?: number;
  /** Token for use with Session consistency. */
  sessionToken?: string;
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: IHeaders;
  /** (Advanced use case) The url to connect to. */
  urlConnection?: string;
  /** (Advanced use case) Skip getting info on the parititon key from the container. */
  skipGetPartitionKeyDefinition?: boolean;
  /** Disable automatic id generation (will cause creates to fail if id isn't on the definition) */
  disableAutomaticIdGeneration?: boolean;
}
