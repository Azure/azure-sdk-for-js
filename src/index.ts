import * as DocumentBase from "./documents";

export { DocumentClient, DocumentClient as CosmosClient } from "./documentclient";
export { DocumentBase, DocumentBase as AzureDocuments };
export { Range, RangePartitionResolver } from "./range";
export { HashPartitionResolver } from "./hash";
export { Constants, UriFactory } from "./common";
export { Base } from "./base";
export { RetryOptions } from "./retry";
export { Response } from "./request";

export { IHeaders } from "./queryExecutionContext";
export { QueryIterator } from "./queryIterator";
