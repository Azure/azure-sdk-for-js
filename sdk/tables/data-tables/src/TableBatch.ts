// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  deserializationPolicy,
  generateUuid,
  HttpHeaders,
  HttpOperationResponse,
  HttpResponse,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  WebResource,
  WebResourceLike,
  URLBuilder,
  ServiceClient,
  RequestPrepareOptions,
  RawHttpHeaders
} from "@azure/core-http";
import {
  DeleteTableEntityOptions,
  TableEntity,
  UpdateMode,
  UpdateTableEntityOptions
} from "./models";
import { TableClient } from "./TableClient";
import { TablesSharedKeyCredentialLike } from "./TablesSharedKeyCredential";
import { getAuthorizationHeader } from "./TablesSharedKeyCredentialPolicy";
import { HeaderConstants } from "./utils/constants";

export interface TableBatch {
  partitionKey: string;
  createEntities: <T extends object>(entitites: TableEntity<T>[]) => void;
  createEntity: <T extends object>(entity: TableEntity<T>) => void;
  deleteEntity: (partitionKey: string, rowKey: string, options?: DeleteTableEntityOptions) => void;
  updateEntity: <T extends object>(
    entity: TableEntity<T>,
    mode: UpdateMode,
    options?: UpdateTableEntityOptions
  ) => Promise<void>;
  submitBatch: () => Promise<TableBatchResponse>;
}

export interface InnerBatchRequest {
  body: string;
  operationCount: number;
  createPipeline(): RequestPolicyFactory[];
  appendSubRequestToBody(request: WebResource): void;
  getHttpRequestBody(): string;
  getMultipartContentType(): string;
  getBatchBoundary(): string;
}

export interface TableBatchResponse {
  responseCount: number;
  getResponseForEntity: (rowKey: string) => HttpResponse;
}

/**
 * Creates a new Batch to collect sub-operations that can be submitted together via submitBatch
 * @param url Tables account url
 * @param tableName name of the table to target the operations
 * @param partitionKey partition key
 * @param credential credential to authenticate the batch request
 */
export function createBatch(
  url: string,
  tableName: string,
  partitionKey: string,
  credential?: TablesSharedKeyCredentialLike
): TableBatch {
  const batchGuid = generateUuid();
  const batchRequest = createInnerBatchRequest(batchGuid);
  const pendingOperations: Promise<any>[] = [];

  // Client used to intercept the requests and add them to the batch instead of sending them to the service
  const interceptClient: TableClient = new TableClient(url, tableName, {
    innerBatchRequest: batchRequest
  });

  let batchUrl = url;

  // Depending on the auth method used we need to build the url
  if (!credential) {
    // When authenticating with SAS we need to add the SAS token after $batch
    const urlParts = url.split("?");
    const baseUrl = urlParts[0];
    const sas = urlParts.length > 1 ? `?${urlParts[1]}` : "";
    batchUrl = `${baseUrl}/$batch${sas}`;
  } else {
    // When using a SharedKey credential no SAS token is needed
    batchUrl = `${batchUrl}/$batch`;
  }

  return {
    partitionKey,
    createEntity<T extends object>(entity: TableEntity<T>): void {
      if (entity.partitionKey !== this.partitionKey) {
        throw new Error("All operations in a batch must target the same partitionKey");
      }
      pendingOperations.push(interceptClient.createEntity(entity));
    },
    createEntities<T extends object>(entitites: TableEntity<T>[]): void {
      for (const entity of entitites) {
        if (entity.partitionKey !== this.partitionKey) {
          throw new Error("All operations in a batch must target the same partitionKey");
        }
        pendingOperations.push(interceptClient.createEntity(entity));
      }
    },
    async deleteEntity(
      partitionKey: string,
      rowKey: string,
      options?: DeleteTableEntityOptions
    ): Promise<void> {
      if (partitionKey !== this.partitionKey) {
        throw new Error("All operations in a batch must target the same partitionKey");
      }
      pendingOperations.push(interceptClient.deleteEntity(partitionKey, rowKey, options));
    },
    async updateEntity<T extends object>(
      entity: TableEntity<T>,
      mode: UpdateMode,
      options?: UpdateTableEntityOptions
    ): Promise<void> {
      if (entity.partitionKey !== this.partitionKey) {
        throw new Error("All operations in a batch must target the same partitionKey");
      }
      pendingOperations.push(interceptClient.updateEntity(entity, mode, options));
    },
    async submitBatch(): Promise<any> {
      await Promise.all(pendingOperations);
      const body = batchRequest.getHttpRequestBody();
      const client = new ServiceClient();
      const headers: RawHttpHeaders = {
        accept: "application/json",
        "x-ms-version": "2019-02-02",
        "Accept-Charset": "UTF-8",
        DataServiceVersion: "3.0;",
        MaxDataServiceVersion: "3.0;NetFx",
        "Content-Type": `multipart/mixed; boundary=batch_${batchGuid}`,
        Connection: "Keep-Alive"
      };

      const request = new WebResource(batchUrl, "POST", body, undefined, new HttpHeaders(headers));

      if (credential) {
        const authHeader = getAuthorizationHeader(request, credential);
        request.headers.set("Authorization", authHeader);
      }

      const requestOptions: RequestPrepareOptions = {
        method: "POST",
        url: batchUrl,
        headers: request.headers.rawHeaders(),
        body,
        disableJsonStringifyOnBody: true
      };
      console.log(body);
      const rawBatchResponse = await client.sendRequest(requestOptions);
      console.log(rawBatchResponse.bodyAsText);
      return rawBatchResponse;
    }
  };
}

/**
 * This method creates a batch request object that provides functions to build the envelope and body for a batch request
 * @param batchGuid Id of the batch
 */
function createInnerBatchRequest(batchGuid: string): InnerBatchRequest {
  const HTTP_LINE_ENDING = "\r\n";
  const HTTP_VERSION_1_1 = "HTTP/1.1";
  const changesetGuid = generateUuid();

  // batch_{batchid}
  const batchBoundary = `batch_${batchGuid}`;
  const changesetBoundary = `changeset_${changesetGuid}`;

  const subRequestPrefix = `--${changesetBoundary}${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: application/http${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TRANSFER_ENCODING}: binary`;
  // Content-Type: multipart/mixed; boundary=changeset_{changesetGuid}
  const multipartContentType = `multipart/mixed; boundary=changeset_${changesetGuid}`;
  const chaangesetEnding = `--${changesetBoundary}--`;
  const batchEnding = `--${batchBoundary}`;

  return {
    body: `--${batchBoundary}${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: multipart/mixed; boundary=changeset_${changesetGuid}${HTTP_LINE_ENDING}${HTTP_LINE_ENDING}`,
    operationCount: 0,
    createPipeline() {
      const policyFactoryLength = 3;
      const factories: RequestPolicyFactory[] = new Array(policyFactoryLength);

      factories[0] = deserializationPolicy();
      factories[1] = new BatchHeaderFilterPolicyFactory();

      factories[policyFactoryLength - 1] = new BatchRequestAssemblePolicyFactory(this); // Use batch assemble policy to assemble request and intercept request from going to wire
      return factories;
    },
    appendSubRequestToBody(request: WebResource) {
      // Start to assemble sub request
      this.body += [
        subRequestPrefix, // sub request constant prefix
        "", // empty line after sub request's content ID
        `${request.method.toString()} ${getURLPathAndQuery(
          request.url
        )} ${HTTP_VERSION_1_1}${HTTP_LINE_ENDING}` // sub request start line with method,
      ].join(HTTP_LINE_ENDING);

      for (const header of request.headers.headersArray()) {
        this.body += `${header.name}: ${header.value}${HTTP_LINE_ENDING}`;
      }

      this.body += `${HTTP_LINE_ENDING}${request.body}${HTTP_LINE_ENDING}`; // sub request's headers need end with an empty line
      this.operationCount++;
    },
    getHttpRequestBody(): string {
      return `${this.body}${HTTP_LINE_ENDING}${chaangesetEnding}${HTTP_LINE_ENDING}${batchEnding}${HTTP_LINE_ENDING}`;
    },
    getMultipartContentType(): string {
      return multipartContentType;
    },
    getBatchBoundary(): string {
      return batchBoundary;
    }
  };
}

/**
 * Get URL path and query from an URL string.
 *
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export function getURLPathAndQuery(url: string): string | undefined {
  const urlParsed = URLBuilder.parse(url);
  const pathString = urlParsed.getPath();
  if (!pathString) {
    throw new RangeError("Invalid url without valid path.");
  }

  let queryString = urlParsed.getQuery() || "";
  queryString = queryString.trim();
  if (queryString !== "") {
    queryString = queryString.startsWith("?") ? queryString : `?${queryString}`; // Ensure query string start with '?'
  }

  return `${urlParsed.getScheme()}://${urlParsed.getHost()}${urlParsed.getPath()}`;
}

class BatchHeaderFilterPolicy extends BaseRequestPolicy {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }
  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    let xMsHeaderName = "";

    for (const header of request.headers.headersArray()) {
      if (header.name.toLowerCase() === HeaderConstants.X_MS_VERSION) {
        xMsHeaderName = header.name;
      }
    }

    if (xMsHeaderName !== "") {
      request.headers.remove(xMsHeaderName); // The subrequests should not have the x-ms-version header.
    }

    return this._nextPolicy.sendRequest(request);
  }
}

class BatchHeaderFilterPolicyFactory implements RequestPolicyFactory {
  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BatchHeaderFilterPolicy {
    return new BatchHeaderFilterPolicy(nextPolicy, options);
  }
}

class BatchRequestAssemblePolicy extends BaseRequestPolicy {
  private batchRequest: InnerBatchRequest;
  private readonly dummyResponse: HttpOperationResponse = {
    request: new WebResource(),
    status: 200,
    headers: new HttpHeaders()
  };

  constructor(
    batchRequest: InnerBatchRequest,
    nextPolicy: RequestPolicy,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    options: RequestPolicyOptions
  ) {
    super(nextPolicy, options);

    this.batchRequest = batchRequest;
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    this.batchRequest.appendSubRequestToBody(request);

    return this.dummyResponse; // Intercept request from going to wire
  }
}

class BatchRequestAssemblePolicyFactory implements RequestPolicyFactory {
  private batchRequest: InnerBatchRequest;

  constructor(batchRequest: InnerBatchRequest) {
    this.batchRequest = batchRequest;
  }

  public create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): BatchRequestAssemblePolicy {
    return new BatchRequestAssemblePolicy(this.batchRequest, nextPolicy, options);
  }
}
