import { PartitionKey } from "../documents";
import { CosmosHeaders } from "../index";
import { RequestContext } from "./RequestContext";

interface BeforeOperationArgs {
  endpoint: string;
  request: RequestContext;
  headers: CosmosHeaders;
}

/**
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.=
 */
export interface SharedOptions {
  /** Specifies a partition key definition for a particular path in the Azure Cosmos DB database service. */
  partitionKey?: PartitionKey | PartitionKey[];
  /** Enables/disables getting document container quota related stats for document container read requests. */
  sessionToken?: string;
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: CosmosHeaders;
  /** (Advanced use case) TODO: Document */
  beforeOperation?: (args: BeforeOperationArgs) => Promise<BeforeOperationArgs>;
}
