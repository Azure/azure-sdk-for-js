import {
  BaseRequestPolicy,
  deserializationPolicy,
  generateUuid,
  HttpHeaders,
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  WebResource
} from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { BlobURL, IBlobDeleteOptions, IBlobSetTierOptions } from "./BlobURL";
import { Credential } from "./credentials/Credential";
import * as Models from "./generated/src/models";
import { Mutex } from "./utils/Mutex";
import { Pipeline } from "./Pipeline";
import { getURLPath, getURLPathAndQuery, iEqual } from "./utils/utils.common";
import {
  HeaderConstants,
  BATCH_MAX_REQUEST,
  HTTP_VERSION_1_1,
  HTTP_LINE_ENDING
} from "./utils/constants";

export interface BatchSubRequest {
  /**
   * The URL of the resource to request operation.
   */
  url: string;

  /**
   * The credential used for sub request.
   */
  credential: Credential;
}

/**
 * A BatchRequest represents a based class for BatchDeleteRequest and BatchSetTierRequest.
 *
 * @export
 * @class BatchRequest
 */
export abstract class BatchRequest {
  protected batchRequest: InnerBatchRequest;
  protected readonly batch: string = "batch";

  constructor() {
    this.batchRequest = new InnerBatchRequest();
  }

  /**
   * Get the value of Content-Type for a batch request.
   * The value must be multipart/mixed with a batch boundary.
   * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
   */
  public getMultiPartContentType(): string {
    return this.batchRequest.getMultipartContentType();
  }

  /**
   * Get assembled HTTP request body for sub requests.
   */
  public getHttpRequestBody(): string {
    return this.batchRequest.getHttpRequestBody();
  }

  /**
   * Get sub requests that are added into the batch request.
   */
  public getSubRequests(): Map<number, BatchSubRequest> {
    return this.batchRequest.getSubRequests();
  }

  protected async addSubRequestInternal(subRequest: BatchSubRequest, assembleSubRequestFunc: ()=>Promise<void>): Promise<void> {
    await Mutex.lock(this.batch);

    try {
      this.batchRequest.preAddSubRequest(subRequest);
      await assembleSubRequestFunc();
      this.batchRequest.postAddSubRequest(subRequest);
    } finally {
      await Mutex.unlock(this.batch);
    }
  }
}

/**
 * A BatchDeleteRequest represents a batch delete request, which consists of one or more delete operations.
 *
 * @export
 * @class BatchDeleteRequest
 * @extends {BatchRequest}
 */
export class BatchDeleteRequest extends BatchRequest {
  constructor() {
    super();
  }

  /**
   * Add a delete operation(subrequest) to mark the specified blob or snapshot for deletion.
   * Note that in order to delete a blob, you must delete all of its snapshots. 
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation(subrequest) will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {string} url The url of the blob resource to delete.
   * @param {Credential} credential The credential to be used for authentication and authorization.
   * @param {IBlobDeleteOptions} [options]
   * @returns {Promise<void>}
   * @memberof BatchDeleteRequest
   */
  public async addSubRequest(
    url: string,
    credential: Credential,
    options?: IBlobDeleteOptions
  ): Promise<void>;

  /**
   * Add a delete operation(subrequest) to mark the specified blob or snapshot for deletion.
   * Note that in order to delete a blob, you must delete all of its snapshots. 
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation(subrequest) will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {blobUrl} BlobURL The BlobURL.
   * @param {IBlobDeleteOptions} [options]
   * @returns {Promise<void>}
   * @memberof BatchDeleteRequest
   */
  public async addSubRequest(
    blobURL: BlobURL,
    options?: IBlobDeleteOptions
  ): Promise<void>;

  public async addSubRequest(
    urlOrBlobURL: string | BlobURL,
    credentialOrOptions: Credential | IBlobDeleteOptions | undefined,
    options?: IBlobDeleteOptions
  ): Promise<void>{
    let url: string;
    let credential: Credential;

    if (typeof urlOrBlobURL === 'string' && credentialOrOptions instanceof Credential) {
      // First overload
      url = urlOrBlobURL;
      credential = credentialOrOptions;
    } else if (urlOrBlobURL instanceof BlobURL) {
      // Second overload
      url = urlOrBlobURL.url;
      credential = urlOrBlobURL.credential;
      options = credentialOrOptions as IBlobDeleteOptions;
    } else {
      throw new RangeError("Invalid arguments. Either url and credential, or BlobURL need be provided.")
    }

    if (!options) {
      options = {};
    }

    await super.addSubRequestInternal(
      {
        url: url,
        credential: credential
      },
      async () => {
        await new BlobURL(url, this.batchRequest.createPipeline(credential)).delete(
          Aborter.none,
          options
        );
      }
    )
  }
}

/**
 * A BatchSetTierRequest represents a batch set tier request, which consists of one or more set tier operations.
 *
 * @export
 * @class BatchSetTierRequest
 * @extends {BatchRequest}
 */
export class BatchSetTierRequest extends BatchRequest {
  constructor() {
    super();
  }

  /**
   * Add a set tier operation(subrequest) to set the tier on a blob.
   * The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
   * The operation(subrequest) will be authenticated and authorized
   * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {string} url The url of the blob resource to delete.
   * @param {Credential} credential The credential to be used for authentication and authorization.
   * @param {Models.AccessTier} tier
   * @param {IBlobSetTierOptions} [options]
   * @returns {Promise<void>}
   * @memberof BatchSetTierRequest
   */
  public async addSubRequest(
    url: string,
    credential: Credential,
    tier: Models.AccessTier,
    options?: IBlobSetTierOptions
  ): Promise<void>;

  /**
   * Add a set tier operation(subrequest) to set the tier on a blob.
   * The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
   * The operation(subrequest) will be authenticated and authorized
   * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {blobUrl} BlobURL The BlobURL.
   * @param {Models.AccessTier} tier
   * @param {IBlobSetTierOptions} [options]
   * @returns {Promise<void>}
   * @memberof BatchSetTierRequest
   */
  public async addSubRequest(
    blobURL: BlobURL,
    tier: Models.AccessTier,
    options?: IBlobSetTierOptions
  ): Promise<void>;

  public async addSubRequest(
    urlOrBlobURL: string | BlobURL,
    credentialOrTier: Credential | Models.AccessTier,
    tierOrOptions?: Models.AccessTier | IBlobSetTierOptions,
    options?: IBlobSetTierOptions
  ): Promise<void>{
    let url: string;
    let credential: Credential;
    let tier: Models.AccessTier;

    if (typeof urlOrBlobURL === 'string' && credentialOrTier instanceof Credential) {
      // First overload
      url = urlOrBlobURL;
      credential = credentialOrTier as Credential;
      tier = tierOrOptions as Models.AccessTier;
    } else if (urlOrBlobURL instanceof BlobURL) {
      // Second overload
      url = urlOrBlobURL.url;
      credential = urlOrBlobURL.credential;
      tier = credentialOrTier as Models.AccessTier;
      options = tierOrOptions as IBlobSetTierOptions;
    } else {
      throw new RangeError("Invalid arguments. Either url and credential, or BlobURL need be provided.")
    }

    if (!options) {
      options = {};
    }

    await super.addSubRequestInternal(
      {
        url: url,
        credential: credential
      },
      async () => {
        await new BlobURL(url, this.batchRequest.createPipeline(credential)).setTier(
          Aborter.none,
          tier,
          options
        );
      }
    )
  }
}

/**
 * Inner batch request class which is responsible for assembling and serializing sub requests.
 * See https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#request-body for how request get assembled.
 */
class InnerBatchRequest {
  private operationCount: number;
  private body: string;
  private subRequests: Map<number, BatchSubRequest>;
  private readonly boundary: string;
  private readonly subRequestPrefix: string;
  private readonly multipartContentType: string;
  private readonly batchRequestEnding: string;

  constructor() {
    this.operationCount = 0;
    this.body = "";

    let tempGuid = generateUuid();

    // batch_{batchid}
    this.boundary = `batch_${tempGuid}`;
    // --batch_{batchid}
    // Content-Type: application/http
    // Content-Transfer-Encoding: binary
    this.subRequestPrefix = `--${this.boundary}${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TYPE}: application/http${HTTP_LINE_ENDING}${HeaderConstants.CONTENT_TRANSFER_ENCODING}: binary`;
    // multipart/mixed; boundary=batch_{batchid}
    this.multipartContentType = `multipart/mixed; boundary=${this.boundary}`;
    // --batch_{batchid}--
    this.batchRequestEnding = `--${this.boundary}--`;

    this.subRequests = new Map();
  }

  /**
   * Create pipeline to assemble sub requests. The idea here is to use exising
   * credential and serialization/deserialization components, with additional policies to 
   * filter unnecessary headers, assemble sub requests into request's body 
   * and intercept request from going to wire.
   * @param credential
   */
  public createPipeline(credential: Credential): Pipeline {
    const isAnonymousCreds = credential instanceof AnonymousCredential;
    const policyFactoryLength = 3 + (isAnonymousCreds ? 0 : 1); // [deserilizationPolicy, BatchHeaderFilterPolicyFactory, (Optional)Credential, BatchRequestAssemblePolicyFactory]
    let factories: RequestPolicyFactory[] = new Array(policyFactoryLength);

    factories[0] = deserializationPolicy(); // Default deserializationPolicy is provided by protocol layer
    factories[1] = new BatchHeaderFilterPolicyFactory(); // Use batch header filter policy to exclude unnecessary headers
    if (!isAnonymousCreds) {
      factories[2] = credential;
    }
    factories[policyFactoryLength - 1] = new BatchRequestAssemblePolicyFactory(this); // Use batch assemble policy to assemble request and intercept request from going to wire

    return new Pipeline(factories, {});
  }

  public appendSubRequestToBody(request: WebResource) {
    // Start to assemble sub request
    this.body +=
      [
        this.subRequestPrefix, // sub request constant prefix
        `${HeaderConstants.CONTENT_ID}: ${this.operationCount}`, // sub request's content ID
        "", // empty line after sub request's content ID
        `${request.method.toString()} ${getURLPathAndQuery(request.url)} ${HTTP_VERSION_1_1}${HTTP_LINE_ENDING}` // sub request start line with method
      ].join(HTTP_LINE_ENDING);

    for (const header of request.headers.headersArray()) {
      this.body += `${header.name}: ${header.value}${HTTP_LINE_ENDING}`;
    }

    this.body += HTTP_LINE_ENDING; // sub request's headers need be ending with an empty line
    // No body to assemble for current batch request support
    // End to assemble sub request
  }

  public preAddSubRequest(subRequest: BatchSubRequest) {
    if (this.operationCount >= BATCH_MAX_REQUEST) {
      throw new RangeError(`Cannot exceed ${BATCH_MAX_REQUEST} sub requests in a single batch`);
    }

    // Fast fail if url for sub request is invalid
    const path = getURLPath(subRequest.url);
    if ( !path || path == "") {
      throw new RangeError(`Invalid url for sub request: '${subRequest.url}'`);
    }
  }

  public postAddSubRequest(subRequest: BatchSubRequest) {
    this.subRequests.set(this.operationCount, subRequest);
    this.operationCount++;
  }

  // Return the http request body with assembling the ending line to the sub request body.
  public getHttpRequestBody(): string {
    return `${this.body}${this.batchRequestEnding}${HTTP_LINE_ENDING}`;
  }

  public getMultipartContentType(): string {
    return this.multipartContentType;
  }

  public getSubRequests(): Map<number, BatchSubRequest> {
    return this.subRequests;
  }
}

class BatchRequestAssemblePolicy extends BaseRequestPolicy {
  private batchRequest: InnerBatchRequest;
  private readonly dummyResponse: HttpOperationResponse = {
    request: new WebResource(),
    status: 200,
    headers: new HttpHeaders()
  };;

  constructor(
    batchRequest: InnerBatchRequest,
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ) {
    super(nextPolicy, options);

    this.batchRequest = batchRequest;
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    await this.batchRequest.appendSubRequestToBody(request);

    return this.dummyResponse; // Intercept request from going to wire
  }
}

class BatchRequestAssemblePolicyFactory implements RequestPolicyFactory {
  private batchRequest: InnerBatchRequest;

  constructor(batchRequest: InnerBatchRequest) {
    this.batchRequest = batchRequest;
  }

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BatchRequestAssemblePolicy {
    return new BatchRequestAssemblePolicy(this.batchRequest, nextPolicy, options);
  }
}

class BatchHeaderFilterPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    let xMsHeaderName = "";

    for (const header of request.headers.headersArray()) {
      if (iEqual(header.name, HeaderConstants.X_MS_VERSION)) {
        xMsHeaderName = header.name;
      }
    }

    if (xMsHeaderName !== "")
    {
      request.headers.remove(xMsHeaderName); // The subrequests should not have the x-ms-version header.
    }

    return this._nextPolicy.sendRequest(request);
  }
}

class BatchHeaderFilterPolicyFactory implements RequestPolicyFactory {
  constructor() {}

  public create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BatchHeaderFilterPolicy {
    return new BatchHeaderFilterPolicy(nextPolicy, options);
  }
}