import { HttpResponse } from "ms-rest-js";
import * as Models from "../lib/generated/models";
import { Aborter } from "./Aborter";
import { Queue } from "./generated/operations";
import { IMetadata } from "./models";
import { Pipeline } from "./Pipeline";
import { ServiceURL } from "./ServiceURL";
import { StorageURL } from "./StorageURL";
import { appendToURLPath, truncatedISO8061Date } from "./utils/utils.common";

export interface IQueueCreateOptions {
  metadata?: IMetadata;
}

export interface ISignedIdentifier {
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
    signedIdentifiers: ISignedIdentifier[];
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
 * @extends {StorageURL}
 */
export class QueueURL extends StorageURL {
  /**
   * Creates a QueueURL object from ServiceURL
   * @param serviceURL
   * @param queueName
   */
  public static fromServiceURL(
    serviceURL: ServiceURL,
    queueName: string
  ): QueueURL {
    return new QueueURL(
      appendToURLPath(serviceURL.url, queueName),
      serviceURL.pipeline
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
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
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
   * @returns {QueueURL}
   * @memberof QueueURL
   */
  public withPipeline(pipeline: Pipeline): QueueURL {
    return new QueueURL(this.url, pipeline);
  }

  /**
   * Creates a new queue under the specified account. 
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IQueueCreateOptions} [options]
   * @returns {Promise<Models.QueueCreateResponse>}
   * @memberof QueueURL
   */
  public async create(
    aborter: Aborter,
    options: IQueueCreateOptions = {}
  ): Promise<Models.QueueCreateResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.QueueGetPropertiesResponse>}
   * @memberof QueueURL
   */
  public async getProperties(
    aborter: Aborter
  ): Promise<Models.QueueGetPropertiesResponse> {
    return this.queueContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.QueueDeleteResponse>}
   * @memberof QueueURL
   */
  public async delete(
    aborter: Aborter
  ): Promise<Models.QueueDeleteResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IMetadata} [metadata] If no metadata provided, all existing metadata will be removed.
   * @returns {Promise<Models.QueueSetMetadataResponse>}
   * @memberof QueueURL
   */
  public async setMetadata(
    aborter: Aborter,
    metadata?: IMetadata
  ): Promise<Models.QueueSetMetadataResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IQueueGetAccessPolicyOptions} [options]
   * @returns {Promise<QueueGetAccessPolicyResponse>}
   * @memberof QueueURL
   */
  public async getAccessPolicy(
    aborter: Aborter,
  ): Promise<QueueGetAccessPolicyResponse> {

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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {PublicAccessType} [access]
   * @param {ISignedIdentifier[]} [queueAcl]
   * @param {IQueueSetAccessPolicyOptions} [options]
   * @returns {Promise<Models.QueueSetAccessPolicyResponse>}
   * @memberof QueueURL
   */
  public async setAccessPolicy(
    aborter: Aborter,
    queueAcl?: ISignedIdentifier[]
  ): Promise<Models.QueueSetAccessPolicyResponse> {
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
