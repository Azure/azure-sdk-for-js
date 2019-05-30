// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpRequestBody, HttpResponse, isNode, TransferProgressEvent } from "@azure/ms-rest-js";
import { Aborter } from "./Aborter";
import { FileDownloadResponse } from "./FileDownloadResponse";
import * as Models from "./generated/lib/models";
import { File } from "./generated/lib/operations";
import { Range, rangeToString } from "./Range";
import { FileHTTPHeaders, Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import {
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  FILE_MAX_SIZE_BYTES,
  FILE_RANGE_MAX_SIZE_BYTES
} from "./utils/constants";

/**
 * Options to configure File - Create operation.
 *
 * @export
 * @interface FileCreateOptions
 */
export interface FileCreateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * File HTTP headers like Content-Type.
   *
   * @type {FileHTTPHeaders}
   * @memberof FileCreateOptions
   */
  fileHTTPHeaders?: FileHTTPHeaders;

  /**
   * A collection of key-value string pair to associate with the file storage object.
   *
   * @type {Metadata}
   * @memberof FileCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure File - Delete operation.
 *
 * @export
 * @interface FileDeleteOptions
 */
export interface FileDeleteOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure File - Download operation.
 *
 * @export
 * @interface FileDownloadOptions
 */
export interface FileDownloadOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   *
   * @type {number}
   * @memberof FileDownloadOptions
   */
  maxRetryRequests?: number;

  /**
   * When this header is set to true and
   * specified together with the Range header, the service returns the MD5 hash
   * for the range, as long as the range is less than or equal to 4 MB in size.
   *
   * @type {boolean}
   * @memberof FileDownloadOptions
   */
  rangeGetContentMD5?: boolean;

  /**
   * Download progress updating event handler.
   *
   * @memberof FileDownloadOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}

/**
 * Options to configure File - Upload Range operation.
 *
 * @export
 * @interface FileUploadRangeOptions
 */
export interface FileUploadRangeOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * An MD5 hash of the content. This hash is
   * used to verify the integrity of the data during transport. When the
   * Content-MD5 header is specified, the File service compares the hash of the
   * content that has arrived with the header value that was sent. If the two
   * hashes do not match, the operation will fail with error code 400 (Bad
   * Request).
   *
   * @type {Uint8Array}
   * @memberof FileUploadRangeOptions
   */
  contentMD5?: Uint8Array;

  /**
   * Progress updating event handler.
   *
   * @memberof FileUploadRangeOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}

/**
 * Options to configure File - Get Range List operation.
 *
 * @export
 * @interface FileGetRangeListOptions
 */
export interface FileGetRangeListOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * Optional. Specifies the range of bytes over which to list ranges, inclusively.
   *
   * @type {Range}
   * @memberof FileGetRangeListOptions
   */
  range?: Range;
}

/**
 * Options to configure File - Get Properties operation.
 *
 * @export
 * @interface FileGetPropertiesOptions
 */
export interface FileGetPropertiesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Contains response data for the getRangeList operation.
 */
export type FileGetRangeListResponse = Models.FileGetRangeListHeaders & {
  /**
   * Range list for an Azure file.
   *
   * @type {Models.Range[]}
   */
  rangeList: Models.Range[];

  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Models.FileGetRangeListHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Models.Range[];
  };
};

/**
 * Options to configure File - Start Copy operation.
 *
 * @export
 * @interface FileStartCopyOptions
 */
export interface FileStartCopyOptions {
  abortSignal?: Aborter;
  /**
   * A collection of key-value string pair to associate with the file storage object.
   *
   * @type {Metadata}
   * @memberof FileCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure File - Set Metadata operation.
 *
 * @export
 * @interface FileSetMetadataOptions
 */
export interface FileSetMetadataOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure File - HTTP Headers operation.
 *
 * @export
 * @interface FileHTTPHeadersOptions
 */
export interface FileSetHTTPHeadersOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure File - Abort Copy From URL operation.
 *
 * @export
 * @interface FileAbortCopyFromURLOptions
 */
export interface FileAbortCopyFromURLOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure File - Resize operation.
 *
 * @export
 * @interface FileResizeOptions
 */
export interface FileResizeOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure File - Clear Range operation.
 *
 * @export
 * @interface FileClearRangeOptions
 */
export interface FileClearRangeOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * A FileClient represents a URL to an Azure Storage file.
 *
 * @export
 * @class FileClient
 * @extends {StorageClient}
 */
export class FileClient extends StorageClient {
  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {File}
   * @memberof FileClient
   */
  private context: File;

  /**
   * Creates an instance of FileClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a file.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a file or directory name includes %, file or directory name must be encoded in the URL.
   *                     Such as a file named "myfile%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydirectory/myfile%25".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof FileClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new File(this.storageClientContext);
  }

  /**
   * Creates a new file or replaces a file. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Optional options to File Create operation.
   * @returns {Promise<Models.FileCreateResponse>}
   * @memberof FileClient
   */
  public async create(
    size: number,
    options: FileCreateOptions = {}
  ): Promise<Models.FileCreateResponse> {
    const aborter = options.abortSignal || Aborter.none;
    if (size < 0 || size > FILE_MAX_SIZE_BYTES) {
      throw new RangeError(`File size must >= 0 and < ${FILE_MAX_SIZE_BYTES}.`);
    }

    options.fileHTTPHeaders = options.fileHTTPHeaders || {};
    return this.context.create(size, {
      abortSignal: aborter,
      ...options.fileHTTPHeaders,
      metadata: options.metadata
    });
  }

  /**
   * Reads or downloads a file from the system, including its metadata and properties.
   *
   * * In Node.js, data returns in a Readable stream `readableStreamBody`
   * * In browsers, data returns in a promise `blobBody`
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file
   *
   * @param {number} offset From which position of the file to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {FileDownloadOptions} [options] Optional options to File Download operation.
   * @returns {Promise<Models.FileDownloadResponse>}
   * @memberof FileClient
   */
  public async download(
    offset: number,
    count?: number,
    options: FileDownloadOptions = {}
  ): Promise<Models.FileDownloadResponse> {
    const aborter = options.abortSignal || Aborter.none;
    if (options.rangeGetContentMD5 && offset === 0 && count === undefined) {
      throw new RangeError(`rangeGetContentMD5 only works with partial data downloading`);
    }

    const downloadFullFile = offset === 0 && !count;
    const res = await this.context.download({
      abortSignal: aborter,
      onDownloadProgress: !isNode ? options.progress : undefined,
      range: downloadFullFile ? undefined : rangeToString({ offset, count }),
      rangeGetContentMD5: options.rangeGetContentMD5
    });

    // Return browser response immediately
    if (!isNode) {
      return res;
    }

    // We support retrying when download stream unexpected ends in Node.js runtime
    // Following code shouldn't be bundled into browser build, however some
    // bundlers may try to bundle following code and "FileReadResponse.ts".
    // In this case, "FileDownloadResponse.browser.ts" will be used as a shim of "FileDownloadResponse.ts"
    // The config is in package.json "browser" field
    if (options.maxRetryRequests === undefined || options.maxRetryRequests < 0) {
      // TODO: Default value or make it a required parameter?
      options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
    }

    if (res.contentLength === undefined) {
      throw new RangeError(`File download response doesn't contain valid content length header`);
    }

    return new FileDownloadResponse(
      res,
      async (start: number): Promise<NodeJS.ReadableStream> => {
        const updatedOptions: Models.FileDownloadOptionalParams = {
          range: rangeToString({
            count: offset + res.contentLength! - start,
            offset: start
          })
        };

        // Debug purpose only
        // console.log(
        //   `Read from internal stream, range: ${
        //     updatedOptions.range
        //   }, options: ${JSON.stringify(updatedOptions)}`
        // );

        return (await this.context.download({
          abortSignal: aborter,
          ...updatedOptions
        })).readableStreamBody!;
      },
      offset,
      res.contentLength!,
      {
        abortSignal: aborter,
        maxRetryRequests: options.maxRetryRequests,
        progress: options.progress
      }
    );
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the file. It does not return the content of the file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-properties
   *
   * @param {FileGetPropertiesOptions} [options] Optional options to File Get Properties operation.
   * @returns {Promise<Models.FileGetPropertiesResponse>}
   * @memberof FileClient
   */
  public async getProperties(
    options: FileGetPropertiesOptions = {}
  ): Promise<Models.FileGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Removes the file from the storage account.
   * When a file is successfully deleted, it is immediately removed from the storage
   * account's index and is no longer accessible to clients. The file's data is later
   * removed from the service during garbage collection.
   *
   * Delete File will fail with status code 409 (Conflict) and error code SharingViolation
   * if the file is open on an SMB client.
   *
   * Delete File is not supported on a share snapshot, which is a read-only copy of
   * a share. An attempt to perform this operation on a share snapshot will fail with 400 (InvalidQueryParameterValue)
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-file2
   *
   * @param {FileDeleteOptions} [options] Optional options to File Delete operation.
   * @returns {Promise<Models.FileDeleteResponse>}
   * @memberof FileClient
   */
  public async delete(options: FileDeleteOptions = {}): Promise<Models.FileDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.deleteMethod({
      abortSignal: aborter
    });
  }

  /**
   * Sets HTTP headers on the file.
   *
   * If no option provided, or no value provided for the file HTTP headers in the options,
   * these file HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {fileHTTPHeaders} [FileHTTPHeaders] File HTTP headers like Content-Type.
   *                                             Provide undefined will remove existing HTTP headers.
   * @param {FileSetHTTPHeadersOptions} [options] Optional options to File Set HTTP Headers operation.
   * @returns {Promise<Models.FileSetHTTPHeadersResponse>}
   * @memberof FileClient
   */
  public async setHTTPHeaders(
    fileHTTPHeaders: FileHTTPHeaders = {},
    options: FileSetHTTPHeadersOptions = {}
  ): Promise<Models.FileSetHTTPHeadersResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.setHTTPHeaders({
      abortSignal: aborter,
      ...fileHTTPHeaders
    });
  }

  /**
   * Resize file.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {number} length Resizes a file to the specified size in bytes.
   *                        If the specified byte value is less than the current size of the file,
   *                        then all ranges above the specified byte value are cleared.
   * @param {FileResizeOptions} [options] Optional options to File Resize operation.
   * @returns {Promise<Models.FileSetHTTPHeadersResponse>}
   * @memberof FileClient
   */
  public async resize(
    length: number,
    options: FileResizeOptions = {}
  ): Promise<Models.FileSetHTTPHeadersResponse> {
    const aborter = options.abortSignal || Aborter.none;
    if (length < 0) {
      throw new RangeError(`Size cannot less than 0 when resizing file.`);
    }
    return this.context.setHTTPHeaders({
      abortSignal: aborter,
      fileContentLength: length
    });
  }

  /**
   * Updates user-defined metadata for the specified file.
   *
   * If no metadata defined in the option parameter, the file
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @param {FileSetMetadataOptions} [options] Optional options to File Set Metadata operation.
   * @returns {Promise<Models.FileSetMetadataResponse>}
   * @memberof FileClient
   */
  public async setMetadata(
    metadata: Metadata = {},
    options: FileSetMetadataOptions = {}
  ): Promise<Models.FileSetMetadataResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.setMetadata({
      abortSignal: aborter,
      metadata
    });
  }

  /**
   * Upload a range of bytes to a file. Both the start and count of the
   * range must be specified. The range can be up to 4 MB in size.
   *
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} offset Offset position of the destination Azure File to upload.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {FileUploadRangeOptions} [options] Optional options to File Upload Range operation.
   * @returns {Promise<Models.FileUploadRangeResponse>}
   * @memberof FileClient
   */
  public async uploadRange(
    body: HttpRequestBody,
    offset: number,
    contentLength: number,
    options: FileUploadRangeOptions = {}
  ): Promise<Models.FileUploadRangeResponse> {
    const aborter = options.abortSignal || Aborter.none;
    if (offset < 0 || contentLength <= 0) {
      throw new RangeError(`offset must >= 0 and contentLength must be > 0`);
    }

    if (contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
      throw new RangeError(`offset must be < ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
    }

    return this.context.uploadRange(
      rangeToString({ count: contentLength, offset }),
      "update",
      contentLength,
      {
        abortSignal: aborter,
        contentMD5: options.contentMD5,
        onUploadProgress: options.progress,
        optionalbody: body
      }
    );
  }

  /**
   * Clears the specified range and
   * releases the space used in storage for that range.
   *
   * @param {number} offset
   * @param {number} contentLength
   * @param {FileClearRangeOptions} [options] Optional options to File Clear Range operation.
   * @returns {Promise<Models.FileUploadRangeResponse>}
   * @memberof FileClient
   */
  public async clearRange(
    offset: number,
    contentLength: number,
    options: FileClearRangeOptions = {}
  ): Promise<Models.FileUploadRangeResponse> {
    const aborter = options.abortSignal || Aborter.none;
    if (offset < 0 || contentLength <= 0) {
      throw new RangeError(`offset must >= 0 and contentLength must be > 0`);
    }

    return this.context.uploadRange(rangeToString({ count: contentLength, offset }), "clear", 0, {
      abortSignal: aborter
    });
  }

  /**
   * Returns the list of valid ranges for a file.
   *
   * @param {FileGetRangeListOptions} [options] Optional options to File Get range List operation.
   * @returns {Promise<FileGetRangeListResponse>}
   * @memberof FileClient
   */
  public async getRangeList(
    options: FileGetRangeListOptions = {}
  ): Promise<FileGetRangeListResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const originalResponse = await this.context.getRangeList({
      abortSignal: aborter,
      range: options.range ? rangeToString(options.range) : undefined
    });
    return {
      _response: originalResponse._response,
      date: originalResponse.date,
      eTag: originalResponse.eTag,
      errorCode: originalResponse.errorCode,
      fileContentLength: originalResponse.fileContentLength,
      lastModified: originalResponse.lastModified,
      rangeList: originalResponse.filter(() => {
        return true;
      }),
      requestId: originalResponse.requestId,
      version: originalResponse.version
    };
  }

  /**
   * Copies a blob or file to a destination file within the storage account.
   *
   * @param {string} copySource Specifies the URL of the source file or blob, up to 2 KB in length.
   * To copy a file to another file within the same storage account, you may use Shared Key to
   * authenticate the source file. If you are copying a file from another storage account, or if you
   * are copying a blob from the same storage account or another storage account, then you must
   * authenticate the source file or blob using a shared access signature. If the source is a public
   * blob, no authentication is required to perform the copy operation. A file in a share snapshot
   * can also be specified as a copy source.
   * @param {FileStartCopyOptions} [options] Optional options to File Start Copy operation.
   * @returns {Promise<Models.FileStartCopyResponse>}
   * @memberof FileClient
   */
  public async startCopyFromURL(
    copySource: string,
    options: FileStartCopyOptions = {}
  ): Promise<Models.FileStartCopyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.startCopy(copySource, {
      abortSignal: aborter,
      metadata: options.metadata
    });
  }

  /**
   * Aborts a pending Copy File operation, and leaves a destination file with zero length and full
   * metadata.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-file
   *
   * @param {string} copyId Id of the Copy File operation to abort.
   * @param {FileAbortCopyFromURLOptions} [options] Optional options to File Abort Copy From URL operation.
   * @returns {Promise<Models.FileAbortCopyResponse>}
   * @memberof FileClient
   */
  public async abortCopyFromURL(
    copyId: string,
    options: FileAbortCopyFromURLOptions = {}
  ): Promise<Models.FileAbortCopyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.abortCopy(copyId, {
      abortSignal: aborter
    });
  }
}
