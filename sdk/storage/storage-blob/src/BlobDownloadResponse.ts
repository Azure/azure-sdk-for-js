// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, isNode } from "@azure/core-http";

import {
  BlobDownloadResponseModel,
  BlobType,
  CopyStatusType,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  BlobDownloadHeaders
} from "./generatedModels";
import { Metadata } from "./models";
import { RetriableReadableStreamOptions } from "./utils/RetriableReadableStream";
import { ReadableStreamGetter, RetriableReadableStream } from "./utils/RetriableReadableStream";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobDownloadResponse implements BlobDownloadResponseModel interface, and in Node.js runtime it will
 * automatically retry when internal read stream unexpected ends. (This kind of unexpected ends cannot
 * trigger retries defined in pipeline retry policy.)
 *
 * The {@link readableStreamBody} stream will retry underlayer, you can just use it as a normal Node.js
 * Readable stream.
 *
 * @export
 * @class BlobDownloadResponse
 * @implements {BlobDownloadResponseModel}
 */
export class BlobDownloadResponse implements BlobDownloadResponseModel {
  /**
   * Indicates that the service supports
   * requests for partial file content.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get acceptRanges(): string | undefined {
    return this.originalResponse.acceptRanges;
  }

  /**
   * Returns if it was previously specified
   * for the file.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get cacheControl(): string | undefined {
    return this.originalResponse.cacheControl;
  }

  /**
   * Returns the value that was specified
   * for the 'x-ms-content-disposition' header and specifies how to process the
   * response.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentDisposition(): string | undefined {
    return this.originalResponse.contentDisposition;
  }

  /**
   * Returns the value that was specified
   * for the Content-Encoding request header.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentEncoding(): string | undefined {
    return this.originalResponse.contentEncoding;
  }

  /**
   * Returns the value that was specified
   * for the Content-Language request header.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentLanguage(): string | undefined {
    return this.originalResponse.contentLanguage;
  }

  /**
   * The current sequence number for a
   * page blob. This header is not returned for block blobs or append blobs.
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get blobSequenceNumber(): number | undefined {
    return this.originalResponse.blobSequenceNumber;
  }

  /**
   * The blob's type. Possible values include:
   * 'BlockBlob', 'PageBlob', 'AppendBlob'.
   *
   * @readonly
   * @type {(BlobType | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get blobType(): BlobType | undefined {
    return this.originalResponse.blobType;
  }

  /**
   * The number of bytes present in the
   * response body.
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentLength(): number | undefined {
    return this.originalResponse.contentLength;
  }

  /**
   * If the file has an MD5 hash and the
   * request is to read the full file, this response header is returned so that
   * the client can check for message content integrity. If the request is to
   * read a specified range and the 'x-ms-range-get-content-md5' is set to
   * true, then the request returns an MD5 hash for the range, as long as the
   * range size is less than or equal to 4 MB. If neither of these sets of
   * conditions is true, then no value is returned for the 'Content-MD5'
   * header.
   *
   * @readonly
   * @type {(Uint8Array | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentMD5(): Uint8Array | undefined {
    return this.originalResponse.contentMD5;
  }

  /**
   * Indicates the range of bytes returned if
   * the client requested a subset of the file by setting the Range request
   * header.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentRange(): string | undefined {
    return this.originalResponse.contentRange;
  }

  /**
   * The content type specified for the file.
   * The default content type is 'application/octet-stream'
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentType(): string | undefined {
    return this.originalResponse.contentType;
  }

  /**
   * Conclusion time of the last attempted
   * Copy File operation where this file was the destination file. This value
   * can specify the time of a completed, aborted, or failed copy attempt.
   *
   * @readonly
   * @type {(Date | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get copyCompletedOn(): Date | undefined {
    return this.originalResponse.copyCompletedOn;
  }

  /**
   * String identifier for the last attempted Copy
   * File operation where this file was the destination file.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get copyId(): string | undefined {
    return this.originalResponse.copyId;
  }

  /**
   * Contains the number of bytes copied and
   * the total bytes in the source in the last attempted Copy File operation
   * where this file was the destination file. Can show between 0 and
   * Content-Length bytes copied.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get copyProgress(): string | undefined {
    return this.originalResponse.copyProgress;
  }

  /**
   * URL up to 2KB in length that specifies the
   * source file used in the last attempted Copy File operation where this file
   * was the destination file.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get copySource(): string | undefined {
    return this.originalResponse.copySource;
  }

  /**
   * State of the copy operation
   * identified by 'x-ms-copy-id'. Possible values include: 'pending',
   * 'success', 'aborted', 'failed'
   *
   * @readonly
   * @type {(CopyStatusType | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get copyStatus(): CopyStatusType | undefined {
    return this.originalResponse.copyStatus;
  }

  /**
   * Only appears when
   * x-ms-copy-status is failed or pending. Describes cause of fatal or
   * non-fatal copy operation failure.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get copyStatusDescription(): string | undefined {
    return this.originalResponse.copyStatusDescription;
  }

  /**
   * When a blob is leased,
   * specifies whether the lease is of infinite or fixed duration. Possible
   * values include: 'infinite', 'fixed'.
   *
   * @readonly
   * @type {(LeaseDurationType | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get leaseDuration(): LeaseDurationType | undefined {
    return this.originalResponse.leaseDuration;
  }

  /**
   * Lease state of the blob. Possible
   * values include: 'available', 'leased', 'expired', 'breaking', 'broken'.
   *
   * @readonly
   * @type {(LeaseStateType | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get leaseState(): LeaseStateType | undefined {
    return this.originalResponse.leaseState;
  }

  /**
   * The current lease status of the
   * blob. Possible values include: 'locked', 'unlocked'.
   *
   * @readonly
   * @type {(LeaseStatusType | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get leaseStatus(): LeaseStatusType | undefined {
    return this.originalResponse.leaseStatus;
  }

  /**
   * A UTC date/time value generated by the service that
   * indicates the time at which the response was initiated.
   *
   * @readonly
   * @type {(Date | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get date(): Date | undefined {
    return this.originalResponse.date;
  }

  /**
   * The number of committed blocks
   * present in the blob. This header is returned only for append blobs.
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get blobCommittedBlockCount(): number | undefined {
    return this.originalResponse.blobCommittedBlockCount;
  }

  /**
   * The ETag contains a value that you can use to
   * perform operations conditionally, in quotes.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get etag(): string | undefined {
    return this.originalResponse.etag;
  }

  /**
   * The number of tags associated with the blob
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get tagCount(): number | undefined {
    return this.originalResponse.tagCount;
  }

  /**
   * The error code.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get errorCode(): string | undefined {
    return this.originalResponse.errorCode;
  }

  /**
   * The value of this header is set to
   * true if the file data and application metadata are completely encrypted
   * using the specified algorithm. Otherwise, the value is set to false (when
   * the file is unencrypted, or if only parts of the file/application metadata
   * are encrypted).
   *
   * @readonly
   * @type {(boolean | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get isServerEncrypted(): boolean | undefined {
    return this.originalResponse.isServerEncrypted;
  }

  /**
   * If the blob has a MD5 hash, and if
   * request contains range header (Range or x-ms-range), this response header
   * is returned with the value of the whole blob's MD5 value. This value may
   * or may not be equal to the value returned in Content-MD5 header, with the
   * latter calculated from the requested range.
   *
   * @readonly
   * @type {(Uint8Array | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get blobContentMD5(): Uint8Array | undefined {
    return this.originalResponse.blobContentMD5;
  }

  /**
   * Returns the date and time the file was last
   * modified. Any operation that modifies the file or its properties updates
   * the last modified time.
   *
   * @readonly
   * @type {(Date | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get lastModified(): Date | undefined {
    return this.originalResponse.lastModified;
  }

  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @readonly
   * @type {(Metadata | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get metadata(): Metadata | undefined {
    return this.originalResponse.metadata;
  }

  /**
   * This header uniquely identifies the request
   * that was made and can be used for troubleshooting the request.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get requestId(): string | undefined {
    return this.originalResponse.requestId;
  }

  /**
   * If a client request id header is sent in the request, this header will be present in the
   * response with the same value.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get clientRequestId(): string | undefined {
    return this.originalResponse.clientRequestId;
  }

  /**
   * Indicates the version of the Blob service used
   * to execute the request.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get version(): string | undefined {
    return this.originalResponse.version;
  }

  /**
   * Indicates the versionId of the downloaded blob version.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get versionId(): string | undefined {
    return this.originalResponse.versionId;
  }

  /**
   * The SHA-256 hash of the encryption key used to encrypt the blob. This value is only returned
   * when the blob was encrypted with a customer-provided key.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get encryptionKeySha256(): string | undefined {
    return this.originalResponse.encryptionKeySha256;
  }

  /**
   * If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to
   * true, then the request returns a crc64 for the range, as long as the range size is less than
   * or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is
   * specified in the same request, it will fail with 400(Bad Request)
   *
   * @type {(Uint8Array | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentCrc64(): Uint8Array | undefined {
    return this.originalResponse.contentCrc64;
  }

  /**
   * The response body as a browser Blob.
   * Always undefined in node.js.
   *
   * @readonly
   * @type {(Promise<Blob> | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get contentAsBlob(): Promise<Blob> | undefined {
    return this.originalResponse.blobBody;
  }

  /**
   * The response body as a node.js Readable stream.
   * Always undefined in the browser.
   *
   * It will automatically retry when internal read stream unexpected ends.
   *
   * @readonly
   * @type {(NodeJS.ReadableStream | undefined)}
   * @memberof BlobDownloadResponse
   */
  public get readableStreamBody(): NodeJS.ReadableStream | undefined {
    return isNode ? this.blobDownloadStream : undefined;
  }

  /**
   * The HTTP response.
   *
   * @type {HttpResponse}
   * @memberof BlobDownloadResponse
   */
  public get _response(): HttpResponse & {
    parsedHeaders: BlobDownloadHeaders;
  } {
    return this.originalResponse._response;
  }

  private originalResponse: BlobDownloadResponseModel;
  private blobDownloadStream?: RetriableReadableStream;

  /**
   * Creates an instance of BlobDownloadResponse.
   *
   * @param {BlobDownloadResponseModel} originalResponse
   * @param {ReadableStreamGetter} getter
   * @param {number} offset
   * @param {number} count
   * @param {RetriableReadableStreamOptions} [options={}]
   * @memberof BlobDownloadResponse
   */
  public constructor(
    originalResponse: BlobDownloadResponseModel,
    getter: ReadableStreamGetter,
    offset: number,
    count: number,
    options: RetriableReadableStreamOptions = {}
  ) {
    this.originalResponse = originalResponse;
    this.blobDownloadStream = new RetriableReadableStream(
      this.originalResponse.readableStreamBody!,
      getter,
      offset,
      count,
      options
    );
  }
}
