import * as DocumentBase from "./documents";

export { DocumentClient } from "./documentclient";
export { DocumentBase, DocumentBase as AzureDocuments };
export { Range, RangePartitionResolver } from "./range";
export { HashPartitionResolver } from "./hash";
export { Constants, UriFactory } from "./common";
export { Base } from "./base";
export { RetryOptions } from "./retry";
export { Response, RequestOptions, FeedOptions, MediaOptions, ErrorResponse } from "./request/";

export { IHeaders } from "./queryExecutionContext";
export { QueryIterator } from "./queryIterator";

export { CosmosClient } from "./CosmosClient";
export { CosmosClientOptions } from "./CosmosClientOptions";
export * from "./client/";
