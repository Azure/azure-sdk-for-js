import { HttpResponse } from "@azure/ms-rest-js";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { Queue } from "./generated/lib/operations";
import { Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { QueueServiceClient } from "./QueueServiceClient";
import { StorageClient } from "./StorageClient";
import { appendToURLPath, truncatedISO8061Date } from "./utils/utils.common";

export interface QueueCreateOptions {
  abortSignal?: Aborter;
  metadata?: Metadata;
}

export interface QueueGetPropertiesOptions {
  abortSignal?: Aborter;
}

export interface QueueDeleteOptions {
  abortSignal?: Aborter;
}

export interface QueueGetAccessPolicyOptions {
  abortSignal?: Aborter;
}

export interface QueueSetAccessPolicyOptions {
  abortSignal?: Aborter;
}

export interface QueueSetMetadataOptions {
  abortSignal?: Aborter;
}

export interface SignedIdentifier {
  /**
   * @member {string} id a unique id
   */
  id: string;
  /**
   * @member {AccessPolicy} accessPolicy
   */
  accessPolicy: {
    /**
     * @member {Date} start the date-time the policy is active.
     */
    start: Date;
    /**
     * @member {string} expiry the date-time the policy expires.
     */
    expiry: Date;
    /**
     * @member {string} permission the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     */
    permission: string;
  };
}

export declare type QueueGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & Models.QueueGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.QueueGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Models.SignedIdentifier[];
    };
  };

/**
 * A QueueURL represents a URL to the Azure Storage queue.
 *
 * @export
 * @class QueueURL
 * @extends {StorageClient}
 */
export class QueueClient extends StorageClient {
  /**
   * Creates a QueueURL object from QueueServiceClient
   * @param queueServiceClient
   * @param queueName
   */
  public static fromQueueServiceClient(
    queueServiceClient: QueueServiceClient,
    queueName: string
  ): QueueClient {
    return new QueueClient(
      appendToURLPath(queueServiceClient.url, queueName),
      queueServiceClient.pipeline
    );
  }

  /**
   * queueContext provided by protocol layer.
   *
   * @private
   * @type {Queue}
   * @memberof QueueURL
   */
  private queueContext: Queue;

  /**
   * Creates an instance of QueueURL.
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof QueueURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.queueContext = new Queue(this.storageClientContext);
  }

  /**
   * Creates a new QueueURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {QueueClient}
   * @memberof QueueURL
   */
  public withPipeline(pipeline: Pipeline): QueueClient {
    return new QueueClient(this.url, pipeline);
  }

  /**
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {QueueCreateOptions} [options] Optional options to Queue create operation.
   * @returns {Promise<Models.QueueCreateResponse>}
   * @memberof QueueURL
   */
  public async create(
    options: QueueCreateOptions = {}
  ): Promise<Models.QueueCreateResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.queueContext.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Gets all user-defined metadata and system properties for the specified
   * queue. Metadata is associated with the queue as name-values pairs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-metadata
   *
   * @param {QueueGetPropertiesOptions} [options] Optional options to Queue get properties operation.
   * @returns {Promise<Models.QueueGetPropertiesResponse>}
   * @memberof QueueURL
   */
  public async getProperties(
    options: QueueGetPropertiesOptions = {}
  ): Promise<Models.QueueGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.queueContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {QueueDeleteOptions} [options] Optional options to Queue delete operation.
   * @returns {Promise<Models.QueueDeleteResponse>}
   * @memberof QueueURL
   */
  public async delete(
    options: QueueDeleteOptions = {}
  ): Promise<Models.QueueDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.queueContext.deleteMethod({
      abortSignal: aborter
    });
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified queue.
   *
   * If no option provided, or no metadata defined in the option parameter, the queue
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing metadata will be removed.
   * @param {QueueSetMetadataOptions} [options] Optional options to Queue set metadata operation.
   * @returns {Promise<Models.QueueSetMetadataResponse>}
   * @memberof QueueURL
   */
  public async setMetadata(
    metadata?: Metadata,
    options: QueueSetMetadataOptions = {}
  ): Promise<Models.QueueSetMetadataResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.queueContext.setMetadata({
      abortSignal: aborter,
      metadata
    });
  }

  /**
   * Gets details about any stored access policies specified on the queue that may be used with Shared Access Signatures.
   *
   * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-acl
   *
   * @param {QueueGetAccessPolicyOptions} [options] Optional options to Queue get access policy operation.
   * @returns {Promise<QueueGetAccessPolicyResponse>}
   * @memberof QueueURL
   */
  public async getAccessPolicy(
    options: QueueGetAccessPolicyOptions = {}
  ): Promise<QueueGetAccessPolicyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.queueContext.getAccessPolicy({
      abortSignal: aborter
    });

    const res: QueueGetAccessPolicyResponse = {
      _response: response._response,
      date: response.date,
      requestId: response.requestId,
      signedIdentifiers: [],
      version: response.version,
      errorCode: response.errorCode
    };

    for (const identifier of response) {
      res.signedIdentifiers.push({
        accessPolicy: {
          expiry: new Date(identifier.accessPolicy.expiry),
          permission: identifier.accessPolicy.permission,
          start: new Date(identifier.accessPolicy.start)
        },
        id: identifier.id
      });
    }

    return res;
  }

  /**
   * Sets stored access policies for the queue that may be used with Shared Access Signatures.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
   *
   * @param {PublicAccessType} [access]
   * @param {SignedIdentifier[]} [queueAcl]
   * @param {QueueSetAccessPolicyOptions} [options] Optional options to Queue set access policy operation.
   * @returns {Promise<Models.QueueSetAccessPolicyResponse>}
   * @memberof QueueURL
   */
  public async setAccessPolicy(
    queueAcl?: SignedIdentifier[],
    options: QueueSetAccessPolicyOptions = {}
  ): Promise<Models.QueueSetAccessPolicyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const acl: Models.SignedIdentifier[] = [];
    for (const identifier of queueAcl || []) {
      acl.push({
        accessPolicy: {
          expiry: truncatedISO8061Date(identifier.accessPolicy.expiry),
          permission: identifier.accessPolicy.permission,
          start: truncatedISO8061Date(identifier.accessPolicy.start)
        },
        id: identifier.id
      });
    }

    return this.queueContext.setAccessPolicy({
      abortSignal: aborter,
      queueAcl: acl
    });
  }
}
