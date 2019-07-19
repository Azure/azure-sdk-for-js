// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, TokenCredential, isTokenCredential, isNode } from "@azure/core-http";
import * as Models from "./generated/lib/models";
import { AbortSignal } from "@azure/abort-controller";
import { Queue } from "./generated/lib/operations";
import { Metadata } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import {
  appendToURLPath,
  truncatedISO8061Date,
  extractConnectionStringParts
} from "./utils/utils.common";
import { MessagesClient } from "./MessagesClient";
import { Credential } from "./credentials/Credential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

/**
 * Options to configure Queue - Create operation
 *
 * @export
 * @interface QueueCreateOptions
 */
export interface QueueCreateOptions {
  /**
   * AbortSignal instance to cancel request. It can be created with AbortSignal.none
   * or AbortSignal.timeout(). Go to documents of {@link AbortSignal} for more examples
   * about request cancellation.
   *
   * @type {AbortSignal}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignal;
  /**
   * A collection of key-value string pair to associate with the queue object.
   * The keys need to be lower-case.
   *
   * @type {Metadata}
   * @memberof QueueCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure Queue - Get Properties operation
 *
 * @export
 * @interface QueueGetPropertiesOptions
 */
export interface QueueGetPropertiesOptions {
  /**
   * AbortSignal instance to cancel request. It can be created with AbortSignal.none
   * or AbortSignal.timeout(). Go to documents of {@link AbortSignal} for more examples
   * about request cancellation.
   *
   * @type {AbortSignal}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to configure Queue - Delete operation
 *
 * @export
 * @interface QueueDeleteOptions
 */
export interface QueueDeleteOptions {
  /**
   * AbortSignal instance to cancel request. It can be created with AbortSignal.none
   * or AbortSignal.timeout(). Go to documents of {@link AbortSignal} for more examples
   * about request cancellation.
   *
   * @type {AbortSignal}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to configure Queue - Get Access Policy operation
 *
 * @export
 * @interface QueueGetAccessPolicyOptions
 */
export interface QueueGetAccessPolicyOptions {
  /**
   * AbortSignal instance to cancel request. It can be created with AbortSignal.none
   * or AbortSignal.timeout(). Go to documents of {@link AbortSignal} for more examples
   * about request cancellation.
   *
   * @type {AbortSignal}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to configure Queue - Set Access Policy operation
 *
 * @export
 * @interface QueueSetAccessPolicyOptions
 */
export interface QueueSetAccessPolicyOptions {
  /**
   * AbortSignal instance to cancel request. It can be created with AbortSignal.none
   * or AbortSignal.timeout(). Go to documents of {@link AbortSignal} for more examples
   * about request cancellation.
   *
   * @type {AbortSignal}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to configure Queue - Set Metadata operation
 *
 * @export
 * @interface QueueSetMetadataOptions
 */
export interface QueueSetMetadataOptions {
  /**
   * AbortSignal instance to cancel request. It can be created with AbortSignal.none
   * or AbortSignal.timeout(). Go to documents of {@link AbortSignal} for more examples
   * about request cancellation.
   *
   * @type {AbortSignal}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignal;
}

/**
 * Signed identifier.
 *
 * @export
 * @interface SignedIdentifier
 */
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
 * A QueueClient represents a URL to the Azure Storage queue.
 *
 * @export
 * @class QueueClient
 */
export class QueueClient extends StorageClient {
  /**
   * queueContext provided by protocol layer.
   *
   * @private
   * @type {Queue}
   * @memberof QueueClient
   */
  private queueContext: Queue;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of QueueClient.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {string} queueName Queue name.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueClient
   */
  constructor(connectionString: string, queueName: string, options?: NewPipelineOptions);
  /**
   * Creates an instance of QueueClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueClient
   */
  constructor(url: string, credential?: Credential | TokenCredential, options?: NewPipelineOptions);
  /**
   * Creates an instance of QueueClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof QueueClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrQueueName?: Credential | TokenCredential | Pipeline | string,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipelineOrQueueName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrQueueName;
    } else if (
      credentialOrPipelineOrQueueName instanceof Credential ||
      isTokenCredential(credentialOrPipelineOrQueueName)
    ) {
      pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
    } else if (
      !credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName !== "string"
    ) {
      // The second paramter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string"
    ) {
      if (isNode) {
        const queueName = credentialOrPipelineOrQueueName;

        const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
        const sharedKeyCredential = new SharedKeyCredential(
          extractedCreds.accountName,
          extractedCreds.accountKey
        );
        urlOrConnectionString = extractedCreds.url + "/" + queueName;
        pipeline = newPipeline(sharedKeyCredential, options);
      } else {
        throw new Error("Connection string is only supported in Node.js environment");
      }
    } else {
      throw new Error("Expecting non-empty strings for queueName parameter");
    }
    super(urlOrConnectionString, pipeline);
    this.queueContext = new Queue(this.storageClientContext);
  }

  /**
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {QueueCreateOptions} [options] Options to Queue create operation.
   * @returns {Promise<Models.QueueCreateResponse>} Response data for the Queue create operation.
   * @memberof QueueClient
   */
  public async create(options: QueueCreateOptions = {}): Promise<Models.QueueCreateResponse> {
    const aborter = options.abortSignal || AbortSignal.none;
    return this.queueContext.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Creates a MessagesClient object.
   * @param queueName
   */
  public getMessagesClient(): MessagesClient {
    return new MessagesClient(appendToURLPath(this.url, "messages"), this.pipeline);
  }

  /**
   * Gets all user-defined metadata and system properties for the specified
   * queue. Metadata is associated with the queue as name-values pairs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-metadata
   *
   * @param {QueueGetPropertiesOptions} [options] Options to Queue get properties operation.
   * @returns {Promise<Models.QueueGetPropertiesResponse>} Response data for the Queue get properties operation.
   * @memberof QueueClient
   */
  public async getProperties(
    options: QueueGetPropertiesOptions = {}
  ): Promise<Models.QueueGetPropertiesResponse> {
    const aborter = options.abortSignal || AbortSignal.none;
    return this.queueContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {QueueDeleteOptions} [options] Options to Queue delete operation.
   * @returns {Promise<Models.QueueDeleteResponse>} Response data for the Queue delete operation.
   * @memberof QueueClient
   */
  public async delete(options: QueueDeleteOptions = {}): Promise<Models.QueueDeleteResponse> {
    const aborter = options.abortSignal || AbortSignal.none;
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
   * @param {QueueSetMetadataOptions} [options] Options to Queue set metadata operation.
   * @returns {Promise<Models.QueueSetMetadataResponse>} Response data for the Queue set metadata operation.
   * @memberof QueueClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: QueueSetMetadataOptions = {}
  ): Promise<Models.QueueSetMetadataResponse> {
    const aborter = options.abortSignal || AbortSignal.none;
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
   * @param {QueueGetAccessPolicyOptions} [options] Options to Queue get access policy operation.
   * @returns {Promise<QueueGetAccessPolicyResponse>} Response data for the Queue get access policy operation.
   * @memberof QueueClient
   */
  public async getAccessPolicy(
    options: QueueGetAccessPolicyOptions = {}
  ): Promise<QueueGetAccessPolicyResponse> {
    const aborter = options.abortSignal || AbortSignal.none;
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
   * @param {QueueSetAccessPolicyOptions} [options] Options to Queue set access policy operation.
   * @returns {Promise<Models.QueueSetAccessPolicyResponse>} Response data for the Queue set access policy operation.
   * @memberof QueueClient
   */
  public async setAccessPolicy(
    queueAcl?: SignedIdentifier[],
    options: QueueSetAccessPolicyOptions = {}
  ): Promise<Models.QueueSetAccessPolicyResponse> {
    const aborter = options.abortSignal || AbortSignal.none;
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
