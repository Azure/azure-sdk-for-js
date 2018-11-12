import { HttpResponse, isNode, TransferProgressEvent } from "ms-rest-js";

import { Aborter } from "./Aborter";
import * as Models from "./generated/models";
import { IMetadata } from "./models";
import {
  ReadableStreamGetter,
  RetriableReadableStream
} from "./utils/RetriableReadableStream";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * FileDownloadResponse implements Models.FileDownloadResponse interface, and in Node.js runtime it will
 * automatically retry when internal read stream unexpected ends. (This kind of unexpected ends cannot
 * trigger retries defined in pipeline retry policy.)
 *
 * The readableStreamBody stream will retry underlayer, you can just use it as a normal Node.js
 * Readable stream.
 *
 * @export
 * @class PathReadResponse
 * @implements {Models.FileDownloadResponse}
 */
export class FileDownloadResponse implements Models.FileDownloadResponse {
  /**
   * Indicates that the service supports
   * requests for partial file content.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
   */
  public get acceptRanges(): string | undefined {
    return this.originalResponse.acceptRanges;
  }

  /**
   * Returned if it was previously specified
   * for the file.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
   */
  public get contentLanguage(): string | undefined {
    return this.originalResponse.contentLanguage;
  }

  /**
   * The number of bytes present in the
   * response body.
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
   */
  public get copyCompletionTime(): Date | undefined {
    return this.originalResponse.copyCompletionTime;
  }

  /**
   * String identifier for the last attempted Copy
   * File operation where this file was the destination file.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @memberof FileDownloadResponse
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
   * @type {(Models.CopyStatusType | undefined)}
   * @memberof FileDownloadResponse
   */
  public get copyStatus(): Models.CopyStatusType | undefined {
    return this.originalResponse.copyStatus;
  }

  /**
   * Only appears when
   * x-ms-copy-status is failed or pending. Describes cause of fatal or
   * non-fatal copy operation failure.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
   */
  public get copyStatusDescription(): string | undefined {
    return this.originalResponse.copyStatusDescription;
  }

  /**
   * A UTC date/time value generated by the service that
   * indicates the time at which the response was initiated.
   *
   * @readonly
   * @type {(Date | undefined)}
   * @memberof FileDownloadResponse
   */
  public get date(): Date | undefined {
    return this.originalResponse.date;
  }

  /**
   * The ETag contains a value that you can use to
   * perform operations conditionally, in quotes.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
   */
  public get eTag(): string | undefined {
    return this.originalResponse.eTag;
  }

  public get errorCode(): string | undefined {
    return this.originalResponse.errorCode;
  }

  /**
   * If the file has a MD5 hash, and if
   * request contains range header (Range or x-ms-range), this response header
   * is returned with the value of the whole file's MD5 value. This value may
   * or may not be equal to the value returned in Content-MD5 header, with the
   * latter calculated from the requested range.
   *
   * @readonly
   * @type {(Uint8Array | undefined)}
   * @memberof FileDownloadResponse
   */
  public get fileContentMD5(): Uint8Array | undefined {
    return this.originalResponse.fileContentMD5;
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
   * @memberof FileDownloadResponse
   */
  public get isServerEncrypted(): boolean | undefined {
    return this.originalResponse.isServerEncrypted;
  }

  /**
   * Returns the date and time the file was last
   * modified. Any operation that modifies the file or its properties updates
   * the last modified time.
   *
   * @readonly
   * @type {(Date | undefined)}
   * @memberof FileDownloadResponse
   */
  public get lastModified(): Date | undefined {
    return this.originalResponse.lastModified;
  }

  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @readonly
   * @type {(IMetadata | undefined)}
   * @memberof FileDownloadResponse
   */
  public get metadata(): IMetadata | undefined {
    return this.originalResponse.metadata;
  }

  /**
   * This header uniquely identifies the request
   * that was made and can be used for troubleshooting the request.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
   */
  public get requestId(): string | undefined {
    return this.originalResponse.requestId;
  }

  /**
   * Indicates the version of the File service used
   * to execute the request.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof FileDownloadResponse
   */
  public get version(): string | undefined {
    return this.originalResponse.version;
  }

  /**
   * The response body as a browser Blob.
   * Always undefined in node.js.
   *
   * @readonly
   * @type {(Promise<Blob> | undefined)}
   * @memberof FileDownloadResponse
   */
  public get blobBody(): Promise<Blob> | undefined {
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
   * @memberof FileDownloadResponse
   */
  public get readableStreamBody(): NodeJS.ReadableStream | undefined {
    return isNode ? this.pathReadStream : undefined;
  }

  public get _response(): HttpResponse & {
    parsedHeaders: Models.FileDownloadHeaders;
  } {
    return this.originalResponse._response;
  }

  private originalResponse: Models.FileDownloadResponse;
  private pathReadStream?: RetriableReadableStream;

  /**
   * Creates an instance of FileDownloadResponse.
   *
   * @param {Aborter} aborter
   * @param {Models.FileDownloadResponse} originalResponse
   * @param {ReadableStreamGetter} getter
   * @param {number} start
   * @param {number} end
   * @param {number} [maxRetryRequests]
   * @param {(progress: TransferProgressEvent) => void} [progress]
   * @memberof FileDownloadResponse
   */
  public constructor(
    aborter: Aborter,
    originalResponse: Models.FileDownloadResponse,
    getter: ReadableStreamGetter,
    start: number,
    end: number,
    maxRetryRequests?: number,
    progress?: (progress: TransferProgressEvent) => void
  ) {
    this.originalResponse = originalResponse;
    this.pathReadStream = new RetriableReadableStream(
      aborter,
      getter,
      this.originalResponse.readableStreamBody!,
      start,
      end,
      maxRetryRequests,
      progress
    );
  }
}
