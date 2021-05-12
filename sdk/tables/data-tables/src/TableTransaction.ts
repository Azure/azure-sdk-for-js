// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  PipelineRequest,
  createPipelineRequest,
  PipelineResponse,
  RestError,
  createEmptyPipeline
} from "@azure/core-rest-pipeline";
import { ServiceClient, OperationOptions, serializationPolicy } from "@azure/core-client";
import {
  DeleteTableEntityOptions,
  TableEntity,
  UpdateMode,
  UpdateTableEntityOptions,
  TableTransactionResponse,
  TableTransactionEntityResponse
} from "./models";
import { TablesSharedKeyCredentialLike } from "./TablesSharedKeyCredential";
import { getAuthorizationHeader } from "./TablesSharedKeyCredentialPolicy";
import { HeaderConstants } from "./utils/constants";
import { transactionHeaderFilterPolicy, transactionRequestAssemblePolicy } from "./TablePolicies";
import { InnerTransactionRequest, TableClientLike, TableTransaction } from "./utils/internalModels";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { URL } from "./utils/url";
import { TableServiceErrorOdataError } from "./generated";
import { getTransactionHeaders } from "./utils/transactionHeaders";

/**
 * TableTransaction collects sub-operations that can be submitted together via submitTransaction
 */
export class TableTransactionImpl implements TableTransaction {
  /**
   * Table Account URL
   */
  public url: string;
  private interceptClient: TableClientLike;
  private transactionGuid: string;
  private transactionRequest: InnerTransactionRequest;
  private pendingOperations: Promise<any>[];
  private credential?: TablesSharedKeyCredentialLike;

  /**
   * Partition key tagetted by the transaction
   */
  public readonly partitionKey: string;

  /**
   * @param url - Tables account url
   * @param partitionKey - partition key
   * @param credential - credential to authenticate the transaction request
   */
  constructor(
    url: string,
    partitionKey: string,
    interceptClient: TableClientLike,
    transactionGuid: string,
    transactionRequest: InnerTransactionRequest,
    credential?: TablesSharedKeyCredentialLike
  ) {
    this.credential = credential;
    this.partitionKey = partitionKey;
    this.url = url;
    this.transactionGuid = transactionGuid;
    this.transactionRequest = transactionRequest;
    this.pendingOperations = [];

    this.interceptClient = interceptClient;

    // Depending on the auth method used we need to build the url
    if (!credential) {
      // When authenticating with SAS we need to add the SAS token after $batch
      const urlParts = url.split("?");
      this.url = urlParts[0];
      const sas = urlParts.length > 1 ? `?${urlParts[1]}` : "";
      this.url = `${this.url}/$batch${sas}`;
    } else {
      // When using a SharedKey credential no SAS token is needed
      this.url = `${this.url}/$batch`;
    }
  }

  /**
   * Adds a createEntity operation to the transaction
   * @param entity - Entity to create
   */
  public createEntity<T extends object>(entity: TableEntity<T>): void {
    this.checkPartitionKey(entity.partitionKey);
    this.pendingOperations.push(this.interceptClient.createEntity(entity));
  }

  /**
   * Adds a createEntity operation to the transaction per each entity in the entities array
   * @param entities - Array of entities to create
   */
  public createEntities<T extends object>(entities: TableEntity<T>[]): void {
    for (const entity of entities) {
      this.checkPartitionKey(entity.partitionKey);
      this.pendingOperations.push(this.interceptClient.createEntity(entity));
    }
  }

  /**
   * Adds a deleteEntity operation to the transaction
   * @param partitionKey - Partition key of the entity to delete
   * @param rowKey - Row key of the entity to delete
   * @param options - Options for the delete operation
   */
  public deleteEntity(
    partitionKey: string,
    rowKey: string,
    options?: DeleteTableEntityOptions
  ): void {
    this.checkPartitionKey(partitionKey);
    this.pendingOperations.push(this.interceptClient.deleteEntity(partitionKey, rowKey, options));
  }

  /**
   * Adds an updateEntity operation to the transaction
   * @param entity - Entity to update
   * @param mode - Update mode (Merge or Replace)
   * @param options - Options for the update operation
   */
  public updateEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: UpdateTableEntityOptions
  ): void {
    this.checkPartitionKey(entity.partitionKey);
    this.pendingOperations.push(this.interceptClient.updateEntity(entity, mode, options));
  }

  /**
   * Adds an upsertEntity operation to the transaction
   * @param entity - The properties for the table entity.
   * @param mode   - The different modes for updating the entity:
   *               - Merge: Updates an entity by updating the entity's properties without replacing the existing entity.
   *               - Replace: Updates an existing entity by replacing the entire entity.
   * @param options - The options parameters.
   */
  public upsertEntity<T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: OperationOptions
  ): void {
    this.checkPartitionKey(entity.partitionKey);
    this.pendingOperations.push(this.interceptClient.upsertEntity(entity, mode, options));
  }

  /**
   * Submits the operations in the transaction
   */
  public async submitTransaction(): Promise<TableTransactionResponse> {
    await Promise.all(this.pendingOperations);
    const body = this.transactionRequest.getHttpRequestBody();
    const client = new ServiceClient();
    const headers = getTransactionHeaders(this.transactionGuid);

    const { span, updatedOptions } = createSpan(
      "TableTransaction-submitTransaction",
      {} as OperationOptions
    );
    const request = createPipelineRequest({
      url: this.url,
      method: "POST",
      body,
      headers: createHttpHeaders(headers),
      tracingOptions: updatedOptions.tracingOptions
    });

    if (this.credential) {
      const authHeader = getAuthorizationHeader(request, this.credential);
      request.headers.set("Authorization", authHeader);
    }

    try {
      const rawTransactionResponse = await client.sendRequest(request);
      return parseTransactionResponse(rawTransactionResponse);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private checkPartitionKey(partitionKey: string): void {
    if (this.partitionKey !== partitionKey) {
      throw new Error("All operations in a transaction must target the same partitionKey");
    }
  }
}

function parseTransactionResponse(transactionResponse: PipelineResponse): TableTransactionResponse {
  const subResponsePrefix = `--changesetresponse_`;
  const status = transactionResponse.status;
  const rawBody = transactionResponse.bodyAsText || "";
  const splitBody = rawBody.split(subResponsePrefix);
  // Droping the first and last elemets as they are the boundaries
  // we just care about sub request content
  const subResponses = splitBody.slice(1, splitBody.length - 1);

  const responses: TableTransactionEntityResponse[] = subResponses.map((subResponse) => {
    const statusMatch = subResponse.match(/HTTP\/1.1 ([0-9]*)/);
    if (statusMatch?.length !== 2) {
      throw new Error(`Couldn't extract status from sub-response:\n ${subResponse}`);
    }
    const subResponseStatus = Number.parseInt(statusMatch[1]);
    if (!Number.isInteger(subResponseStatus)) {
      throw new Error(`Expected sub-response status to be an integer ${subResponseStatus}`);
    }

    const bodyMatch = subResponse.match(/\{(.*)\}/);
    if (bodyMatch?.length === 2) {
      const parsedError = JSON.parse(bodyMatch[0]);
      // Only transaction sub-responses return body
      if (parsedError && parsedError["odata.error"]) {
        const error: TableServiceErrorOdataError = parsedError["odata.error"];
        const message = error.message?.value || "One of the transaction operations failed";
        throw new RestError(message, {
          code: error.code,
          statusCode: subResponseStatus,
          request: transactionResponse.request,
          response: transactionResponse
        });
      }
    }

    const etagMatch = subResponse.match(/ETag: (.*)/);
    const rowKeyMatch = subResponse.match(/RowKey='(.*)'/);

    return {
      status: subResponseStatus,
      ...(rowKeyMatch?.length === 2 && { rowKey: rowKeyMatch[1] }),
      ...(etagMatch?.length === 2 && { etag: etagMatch[1] })
    };
  });

  return {
    status,
    subResponses: responses,
    getResponseForEntity: (rowKey: string) => responses.find((r) => r.rowKey === rowKey)
  };
}

/**
 * Prepares the operation url to be added to the body, removing the SAS token if present
 * @param url - Source URL string
 */
function getSubRequestUrl(url: string): string {
  const sasTokenParts = ["sv", "ss", "srt", "sp", "se", "st", "spr", "sig"];
  const urlParsed = new URL(url);
  sasTokenParts.forEach((part) => urlParsed.searchParams.delete(part));
  return urlParsed.toString();
}

/**
 * This method creates a transaction request object that provides functions to build the envelope and body for a transaction request
 * @param transactionGuid - Id of the transaction
 */
export function createInnerTransactionRequest(
  transactionGuid: string,
  changesetId: string
): InnerTransactionRequest {
  const HTTP_LINE_ENDING = "\r\n";
  const HTTP_VERSION_1_1 = "HTTP/1.1";
  const transactionBoundary = `batch_${transactionGuid}`;
  const changesetBoundary = `changeset_${changesetId}`;

  const subRequestPrefix = `--${changesetBoundary}${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: application/http${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TRANSFER_ENCODING}: binary`;
  const changesetEnding = `--${changesetBoundary}--`;
  const transactionEnding = `--${transactionBoundary}`;

  return {
    body: [
      `--${transactionBoundary}${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: multipart/mixed; boundary=changeset_${changesetId}${HTTP_LINE_ENDING}${HTTP_LINE_ENDING}`
    ],
    createPipeline() {
      // Use transaction assemble policy to assemble request and intercept request from going to wire
      const pipeline = createEmptyPipeline();
      pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
      pipeline.addPolicy(transactionHeaderFilterPolicy());
      pipeline.addPolicy(transactionRequestAssemblePolicy(this));
      return pipeline;
    },
    appendSubRequestToBody(request: PipelineRequest) {
      const subRequestUrl = getSubRequestUrl(request.url);
      // Start to assemble sub request
      const subRequest = [
        subRequestPrefix, // sub request constant prefix
        "", // empty line after sub request's content ID
        `${request.method.toString()} ${subRequestUrl} ${HTTP_VERSION_1_1}` // sub request start line with method,
      ];

      // Add required headers
      for (const [name, value] of request.headers) {
        subRequest.push(`${name}: ${value}`);
      }

      // Append sub-request body
      subRequest.push(`${HTTP_LINE_ENDING}`); // sub request's headers need end with an empty line
      if (request.body) {
        subRequest.push(String(request.body));
      }

      // Add subrequest to transaction body
      this.body.push(subRequest.join(HTTP_LINE_ENDING));
    },
    getHttpRequestBody(): string {
      const bodyContent = this.body.join(HTTP_LINE_ENDING);
      return `${bodyContent}${HTTP_LINE_ENDING}${changesetEnding}${HTTP_LINE_ENDING}${transactionEnding}${HTTP_LINE_ENDING}`;
    }
  };
}
