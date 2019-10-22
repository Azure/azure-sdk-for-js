// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as fs from "fs";
import { HttpRequestBody, HttpResponse, isNode, TransferProgressEvent } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import { AbortSignalLike } from "@azure/abort-controller";
import { FileDownloadResponse } from "./FileDownloadResponse";
import {
  FileAbortCopyResponse,
  FileCreateResponse,
  FileDeleteResponse,
  FileDownloadOptionalParams,
  FileDownloadResponseModel,
  FileForceCloseHandlesResponse,
  FileGetPropertiesResponse,
  FileGetRangeListHeaders,
  FileListHandlesResponse,
  FileSetHTTPHeadersResponse,
  FileSetMetadataResponse,
  FileStartCopyResponse,
  SourceModifiedAccessConditions,
  FileUploadRangeFromURLResponse,
  FileUploadRangeResponse,
  HandleItem,
  RangeModel
} from "./generatedModels";
import { File } from "./generated/src/operations";
import { Range, rangeToString } from "./Range";
import {
  FileHttpHeaders,
  Metadata,
  FileAndDirectoryCreateCommonOptions,
  FileAndDirectorySetPropertiesCommonOptions,
  fileAttributesToString,
  fileCreationTimeToString,
  fileLastWriteTimeToString,
  validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions,
  validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions
} from "./models";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import {
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  FILE_MAX_SIZE_BYTES,
  FILE_RANGE_MAX_SIZE_BYTES,
  DEFAULT_HIGH_LEVEL_CONCURRENCY
} from "./utils/constants";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { Credential } from "./credentials/Credential";
import { Batch } from "./utils/Batch";
import { BufferScheduler } from "./utils/BufferScheduler";
import { Readable } from "stream";
import { streamToBuffer } from "./utils/utils.node";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { readStreamToLocalFile, fsStat } from "./utils/utils.node";
import { FileSystemAttributes } from "./FileSystemAttributes";
import { getShareNameAndPathFromUrl } from "./utils/utils.common";
import { createSpan } from "./utils/tracing";

/**
 * Options to configure File - Create operation.
 *
 * @export
 * @interface FileCreateOptions
 */
export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * File HTTP headers like Content-Type.
   *
   * @type {FileHttpHeaders}
   * @memberof FileCreateOptions
   */
  fileHttpHeaders?: FileHttpHeaders;

  /**
   * A collection of key-value string pair to associate with the file storage object.
   *
   * @type {Metadata}
   * @memberof FileCreateOptions
   */
  metadata?: Metadata;
}

export interface FileProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileProperties
   */
  abortSignal?: AbortSignalLike;
  /**
   * File HTTP headers like Content-Type.
   *
   * @type {FileHttpHeaders}
   * @memberof FileProperties
   */
  fileHttpHeaders?: FileHttpHeaders;
}

export interface SetPropertiesResponse extends FileSetHTTPHeadersResponse {}

/**
 * Options to configure File - Delete operation.
 *
 * @export
 * @interface FileDeleteOptions
 */
export interface FileDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - Download operation.
 *
 * @export
 * @interface FileDownloadOptions
 */
export interface FileDownloadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
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
  onProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Options to configure File - Upload Range operation.
 *
 * @export
 * @interface FileUploadRangeOptions
 */
export interface FileUploadRangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
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
  onProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Options to configure File - Upload Range from URL operation.
 *
 * @export
 * @interface FileUploadRangeFromURLOptions
 */
export interface FileUploadRangeFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileUploadRangeFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * The timeout parameter is expressed in seconds. For more information, see <a
   * href="https://docs.microsoft.com/en-us/rest/api/storageservices/Setting-Timeouts-for-File-Service-Operations?redirectedfrom=MSDN">Setting
   * Timeouts for File Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /**
   * Specify the crc64 calculated for the range of bytes that must be read from the copy source.
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Additional parameters for the operation
   */
  sourceConditions?: SourceModifiedAccessConditions;
}

/**
 * The option is defined as parity to REST definition.
 * While it's not ready to be used now, considering Crc64 of source content is
 * not accessible.
 */
// export interface IFileUploadRangeFromURLOptions extends CommonOptions {
//   /**
//    * Crc64 of the source content.
//    *
//    * @type {Uint8Array}
//    * @memberof IFileUploadRangeFromURLOptions
//    */
//   sourceContentCrc64?: Uint8Array;

//   /**
//    * Source modified access condition.
//    *
//    * @type {SourceModifiedAccessConditions}
//    * @memberof IFileUploadRangeFromURLOptions
//    */
//   sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
// }

/**
 * Options to configure File - Get Range List operation.
 *
 * @export
 * @interface FileGetRangeListOptions
 */
export interface FileGetRangeListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
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
export interface FileGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the getRangeList operation.
 */
export type FileGetRangeListResponse = FileGetRangeListHeaders & {
  /**
   * Range list for an Azure file.
   *
   * @type {RangeModel[]}
   */
  rangeList: RangeModel[];

  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: FileGetRangeListHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: RangeModel[];
  };
};

/**
 * Options to configure File - Start Copy operation.
 *
 * @export
 * @interface FileStartCopyOptions
 */
export interface FileStartCopyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileStartCopyOptions
   */
  abortSignal?: AbortSignalLike;
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
export interface FileSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileSetMetadataOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - HTTP Headers operation.
 *
 * @export
 * @interface FileSetHttpHeadersOptions
 */
export interface FileSetHttpHeadersOptions
  extends FileAndDirectorySetPropertiesCommonOptions,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileSetHttpHeadersOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - Abort Copy From URL operation.
 *
 * @export
 * @interface FileAbortCopyFromURLOptions
 */
export interface FileAbortCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileAbortCopyFromURLOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - Resize operation.
 *
 * @export
 * @interface FileResizeOptions
 */
export interface FileResizeOptions
  extends FileAndDirectorySetPropertiesCommonOptions,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileResizeOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - Clear Range operation.
 *
 * @export
 * @interface FileClearRangeOptions
 */
export interface FileClearRangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileClearRangeOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - File List Handles Segment.
 *
 * @export
 * @interface FileListHandlesSegmentOptions
 */
export interface FileListHandlesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileClearRangeOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxResults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof FileListHandlesSegmentOptions
   */
  maxPageSize?: number;
}

export interface FileListHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileClearRangeOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - File Force Close Handles Options.
 *
 * @export
 * @interface FileForceCloseHandlesOptions
 */
export interface FileForceCloseHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileForceCloseHandlesOptions
   */
  abortSignal?: AbortSignalLike;
}
/**
 * Option interface for FileClient.uploadStream().
 *
 * @export
 * @interface FileUploadStreamOptions
 */
export interface FileUploadStreamOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileUploadStreamOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Azure File HTTP Headers.
   *
   * @type {FileHttpHeaders}
   * @memberof FileUploadStreamOptions
   */
  fileHttpHeaders?: FileHttpHeaders;

  /**
   * Metadata of the Azure file.
   *
   * @type {Metadata}
   * @memberof FileUploadStreamOptions
   */
  metadata?: Metadata;

  /**
   * Progress updater.
   *
   * @memberof FileUploadStreamOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Option interface for FileClient.uploadFile() and FileClient.uploadSeekableStream().
 *
 * @export
 * @interface FileParallelUploadOptions
 */
export interface FileParallelUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileParallelUploadOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * RangeSize specifies the range size to use in each parallel upload,
   * the default (and maximum size) is FILE_RANGE_MAX_SIZE_BYTES.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  rangeSize?: number;

  /**
   * Progress updater.
   *
   * @memberof FileParallelUploadOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * File HTTP Headers.
   *
   * @type {FileHttpHeaders}
   * @memberof FileParallelUploadOptions
   */
  fileHttpHeaders?: FileHttpHeaders;

  /**
   * Metadata of an Azure file.
   *
   * @type {Metadata}
   * @memberof FileParallelUploadOptions
   */
  metadata?: Metadata;

  /**
   * Concurrency indicates the maximum number of ranges to upload in parallel.
   * If not provided, 5 concurrency will be used by default.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  concurrency?: number;
}

/**
 * Option interface for DownloadAzurefileToBuffer.
 *
 * @export
 * @interface FileDownloadToBufferOptions
 */
export interface FileDownloadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileDownloadToBufferOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * When downloading Azure files, download method will try to split large file into small ranges.
   * Every small range will be downloaded via a separte request.
   * This option defines size data every small request trying to download.
   * Must be > 0, will use the default value if undefined,
   *
   * @type {number}
   * @memberof FileDownloadToBufferOptions
   */
  rangeSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original range download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or
   * maxRetryRequestsPerRange is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   *
   * @type {number}
   * @memberof FileDownloadToBufferOptions
   */
  maxRetryRequestsPerRange?: number;

  /**
   * Progress updater.
   *
   * @memberof FileDownloadToBufferOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Concurrency indicates the maximum number of ranges to download in parallel.
   * If not provided, 5 concurrency will be used by default.
   *
   * @type {number}
   * @memberof FileDownloadToBufferOptions
   */
  concurrency?: number;
}

/**
 * A FileClient represents a URL to an Azure Storage file.
 *
 * @export
 * @class FileClient
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
  private _shareName: string;
  private _path: string;

  public get shareName(): string {
    return this._shareName;
  }

  public get path(): string {
    return this._path;
  }

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
   * @param {Credential} [credential] Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   *                                  If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof FileClient
   */
  constructor(url: string, credential?: Credential, options?: StoragePipelineOptions);
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
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof FileClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?: Credential | Pipeline,
    options?: StoragePipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipeline instanceof Pipeline) {
      pipeline = credentialOrPipeline;
    } else if (credentialOrPipeline instanceof Credential) {
      pipeline = newPipeline(credentialOrPipeline, options);
    } else {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    }

    super(url, pipeline);
    ({
      shareName: this._shareName,
      filePathOrDirectoryPath: this._path
    } = getShareNameAndPathFromUrl(this.url));
    this.context = new File(this.storageClientContext);
  }

  /**
   * Creates a new file or replaces a file. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Options to File Create operation.
   * @returns {Promise<FileCreateResponse>} Response data for the File Create  operation.
   * @memberof FileClient
   */
  public async create(size: number, options: FileCreateOptions = {}): Promise<FileCreateResponse> {
    const { span, spanOptions } = createSpan("FileClient-create", options.spanOptions);
    try {
      if (size < 0 || size > FILE_MAX_SIZE_BYTES) {
        throw new RangeError(`File size must >= 0 and < ${FILE_MAX_SIZE_BYTES}.`);
      }
      options = validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(options);

      if (!options.fileAttributes) {
        // Note: It would be Archive in service side if None is set.
        const attributes: FileSystemAttributes = new FileSystemAttributes();
        attributes.none = true;
        options.fileAttributes = attributes;
      }

      options.fileHttpHeaders = options.fileHttpHeaders || {};

      return this.context.create(
        size,
        fileAttributesToString(options.fileAttributes!),
        fileCreationTimeToString(options.creationTime!),
        fileLastWriteTimeToString(options.lastWriteTime!),
        {
          abortSignal: options.abortSignal,
          fileHttpHeaders: options.fileHttpHeaders,
          metadata: options.metadata,
          filePermission: options.filePermission,
          filePermissionKey: options.filePermissionKey,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Reads or downloads a file from the system, including its metadata and properties.
   *
   * * In Node.js, data returns in a Readable stream `readableStreamBody`
   * * In browsers, data returns in a promise `blobBody`
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file
   *
   * @param {number} [offset] From which position of the file to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {FileDownloadOptions} [options] Options to File Download operation.
   * @returns {Promise<FileDownloadResponse>} Response data for the File Download operation.
   * @memberof FileClient
   */
  public async download(
    offset: number = 0,
    count?: number,
    options: FileDownloadOptions = {}
  ): Promise<FileDownloadResponseModel> {
    const { span, spanOptions } = createSpan("FileClient-download", options.spanOptions);
    try {
      if (options.rangeGetContentMD5 && offset === 0 && count === undefined) {
        throw new RangeError(`rangeGetContentMD5 only works with partial data downloading`);
      }

      const downloadFullFile = offset === 0 && !count;
      const res = await this.context.download({
        abortSignal: options.abortSignal,
        onDownloadProgress: !isNode ? options.onProgress : undefined,
        range: downloadFullFile ? undefined : rangeToString({ offset, count }),
        rangeGetContentMD5: options.rangeGetContentMD5,
        spanOptions
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
          const updatedOptions: FileDownloadOptionalParams = {
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
            abortSignal: options.abortSignal,
            ...updatedOptions,
            spanOptions
          })).readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          abortSignal: options.abortSignal,
          maxRetryRequests: options.maxRetryRequests,
          onProgress: options.onProgress
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the file. It does not return the content of the file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-properties
   *
   * @param {FileGetPropertiesOptions} [options] Options to File Get Properties operation.
   * @returns {Promise<FileGetPropertiesResponse>} Response data for the File Get Properties operation.
   * @memberof FileClient
   */
  public async getProperties(
    options: FileGetPropertiesOptions = {}
  ): Promise<FileGetPropertiesResponse> {
    const { span, spanOptions } = createSpan("FileClient-getProperties", options.spanOptions);
    try {
      return this.context.getProperties({
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets properties on the file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {FileProperties} [properties] File properties. For file HTTP headers(e.g. Content-Type),
   *                                       if no values are provided, existing HTTP headers will be removed.
   *                                       For other file properties(e.g. fileAttributes), if no values are provided,
   *                                       existing values will be preserved.
   * @returns {Promise<SetPropertiesResponse>}
   * @memberof FileClient
   */
  public async setProperties(properties: FileProperties = {}): Promise<SetPropertiesResponse> {
    const { span, spanOptions } = createSpan("FileClient-setProperties", properties.spanOptions);
    try {
      properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

      properties.fileHttpHeaders = properties.fileHttpHeaders || {};

      return this.context.setHTTPHeaders(
        fileAttributesToString(properties.fileAttributes!),
        fileCreationTimeToString(properties.creationTime!),
        fileLastWriteTimeToString(properties.lastWriteTime!),
        {
          abortSignal: properties.abortSignal,
          fileHttpHeaders: properties.fileHttpHeaders,
          filePermission: properties.filePermission,
          filePermissionKey: properties.filePermissionKey,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @param {FileDeleteOptions} [options] Options to File Delete operation.
   * @returns {Promise<FileDeleteResponse>} Response data for the File Delete operation.
   * @memberof FileClient
   */
  public async delete(options: FileDeleteOptions = {}): Promise<FileDeleteResponse> {
    const { span, spanOptions } = createSpan("FileClient-delete", options.spanOptions);
    try {
      return this.context.deleteMethod({
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets HTTP headers on the file.
   *
   * If no option provided, or no value provided for the file HTTP headers in the options,
   * these file HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {fileHttpHeaders} [FileHttpHeaders] File HTTP headers like Content-Type.
   *                                             Provide undefined will remove existing HTTP headers.
   * @param {FileSetHttpHeadersOptions} [options] Options to File Set HTTP Headers operation.
   * @returns {Promise<FileSetHTTPHeadersResponse>} Response data for the File Set HTTP Headers operation.
   * @memberof FileClient
   */
  public async setHttpHeaders(
    fileHttpHeaders: FileHttpHeaders = {},
    options: FileSetHttpHeadersOptions = {}
  ): Promise<FileSetHTTPHeadersResponse> {
    const { span, spanOptions } = createSpan("FileClient-setHTTPHeaders", options.spanOptions);
    try {
      // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved
      options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);
      return this.context.setHTTPHeaders(
        fileAttributesToString(options.fileAttributes!),
        fileCreationTimeToString(options.creationTime!),
        fileLastWriteTimeToString(options.lastWriteTime!),
        {
          abortSignal: options.abortSignal,
          fileHttpHeaders,
          filePermission: options.filePermission,
          filePermissionKey: options.filePermissionKey,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resize file.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {number} length Resizes a file to the specified size in bytes.
   *                        If the specified byte value is less than the current size of the file,
   *                        then all ranges above the specified byte value are cleared.
   * @param {FileResizeOptions} [options] Options to File Resize operation.
   * @returns {Promise<FileSetHTTPHeadersResponse>} Response data for the File Set HTTP Headers operation.
   * @memberof FileClient
   */
  public async resize(
    length: number,
    options: FileResizeOptions = {}
  ): Promise<FileSetHTTPHeadersResponse> {
    const { span, spanOptions } = createSpan("FileClient-resize", options.spanOptions);
    try {
      if (length < 0) {
        throw new RangeError(`Size cannot less than 0 when resizing file.`);
      }
      // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved.
      options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);

      return this.context.setHTTPHeaders(
        fileAttributesToString(options.fileAttributes!),
        fileCreationTimeToString(options.creationTime!),
        fileLastWriteTimeToString(options.lastWriteTime!),
        {
          abortSignal: options.abortSignal,
          fileContentLength: length,
          filePermission: options.filePermission,
          filePermissionKey: options.filePermissionKey,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates user-defined metadata for the specified file.
   *
   * If no metadata defined in the option parameter, the file
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @param {FileSetMetadataOptions} [options] Options to File Set Metadata operation.
   * @returns {Promise<FileSetMetadataResponse>} Response data for the File Set Metadata operation.
   * @memberof FileClient
   */
  public async setMetadata(
    metadata: Metadata = {},
    options: FileSetMetadataOptions = {}
  ): Promise<FileSetMetadataResponse> {
    const { span, spanOptions } = createSpan("FileClient-setMetadata", options.spanOptions);
    try {
      return this.context.setMetadata({
        abortSignal: options.abortSignal,
        metadata,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @param {FileUploadRangeOptions} [options={}] Options to File Upload Range operation.
   * @returns {Promise<FileUploadRangeResponse>} Response data for the File Upload Range operation.
   * @memberof FileClient
   */
  public async uploadRange(
    body: HttpRequestBody,
    offset: number,
    contentLength: number,
    options: FileUploadRangeOptions = {}
  ): Promise<FileUploadRangeResponse> {
    const { span, spanOptions } = createSpan("FileClient-uploadRange", options.spanOptions);
    try {
      if (offset < 0) {
        throw new RangeError(`offset must be >= 0`);
      }

      if (contentLength <= 0 || contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`contentLength must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
      }

      if (contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`offset must be < ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
      }

      return this.context.uploadRange(
        rangeToString({ count: contentLength, offset }),
        "update",
        contentLength,
        {
          abortSignal: options.abortSignal,
          contentMD5: options.contentMD5,
          onUploadProgress: options.onProgress,
          optionalbody: body,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Upload a range of bytes to a file where the contents are read from a another file's URL.
   * The range can be up to 4 MB in size.
   *
   * @param {string} sourceURL Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication.
   * @param {number} sourceOffset The source offset to copy from. Pass 0 to copy from the beginning of source file.
   * @param {number} destOffset Offset of destination file.
   * @param {number} count Number of bytes to be uploaded from source file.
   * @param {FileUploadRangeFromURLOptions} [options={}] Options to configure File - Upload Range from URL operation.
   * @returns {Promise<FileUploadRangeFromURLResponse>}
   * @memberof FileURL
   */
  public async uploadRangeFromURL(
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number,
    options: FileUploadRangeFromURLOptions = {}
  ): Promise<FileUploadRangeFromURLResponse> {
    const { span, spanOptions } = createSpan("FileClient-uploadRangeFromURL", options.spanOptions);
    try {
      if (sourceOffset < 0 || destOffset < 0) {
        throw new RangeError(`sourceOffset and destOffset must be >= 0`);
      }

      if (count <= 0 || count > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`count must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
      }

      return this.context.uploadRangeFromURL(
        rangeToString({ offset: destOffset, count }),
        sourceURL,
        rangeToString({ offset: sourceOffset, count }),
        0,
        {
          abortSignal: options.abortSignal,
          sourceModifiedAccessConditions: options.sourceConditions,
          ...options,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
  /**
   * Clears the specified range and
   * releases the space used in storage for that range.
   *
   * @param {number} offset
   * @param {number} contentLength
   * @param {FileClearRangeOptions} [options] Options to File Clear Range operation.
   * @returns {Promise<FileUploadRangeResponse>}
   * @memberof FileClient
   */
  public async clearRange(
    offset: number,
    contentLength: number,
    options: FileClearRangeOptions = {}
  ): Promise<FileUploadRangeResponse> {
    const { span, spanOptions } = createSpan("FileClient-clearRange", options.spanOptions);
    try {
      if (offset < 0 || contentLength <= 0) {
        throw new RangeError(`offset must >= 0 and contentLength must be > 0`);
      }

      return this.context.uploadRange(rangeToString({ count: contentLength, offset }), "clear", 0, {
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the list of valid ranges for a file.
   *
   * @param {FileGetRangeListOptions} [options] Options to File Get range List operation.
   * @returns {Promise<FileGetRangeListResponse>}
   * @memberof FileClient
   */
  public async getRangeList(
    options: FileGetRangeListOptions = {}
  ): Promise<FileGetRangeListResponse> {
    const { span, spanOptions } = createSpan("FileClient-getRangeList", options.spanOptions);
    try {
      const originalResponse = await this.context.getRangeList({
        abortSignal: options.abortSignal,
        range: options.range ? rangeToString(options.range) : undefined,
        spanOptions
      });
      return {
        _response: originalResponse._response,
        date: originalResponse.date,
        etag: originalResponse.etag,
        errorCode: originalResponse.errorCode,
        fileContentLength: originalResponse.fileContentLength,
        lastModified: originalResponse.lastModified,
        rangeList: originalResponse.filter(() => {
          return true;
        }),
        requestId: originalResponse.requestId,
        version: originalResponse.version
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @param {FileStartCopyOptions} [options] Options to File Start Copy operation.
   * @returns {Promise<FileStartCopyResponse>}
   * @memberof FileClient
   */
  public async startCopyFromURL(
    copySource: string,
    options: FileStartCopyOptions = {}
  ): Promise<FileStartCopyResponse> {
    const { span, spanOptions } = createSpan("FileClient-startCopyFromURL", options.spanOptions);
    try {
      return this.context.startCopy(copySource, {
        abortSignal: options.abortSignal,
        metadata: options.metadata,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Aborts a pending Copy File operation, and leaves a destination file with zero length and full
   * metadata.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-file
   *
   * @param {string} copyId Id of the Copy File operation to abort.
   * @param {FileAbortCopyFromURLOptions} [options] Options to File Abort Copy From URL operation.
   * @returns {Promise<FileAbortCopyResponse>}
   * @memberof FileClient
   */
  public async abortCopyFromURL(
    copyId: string,
    options: FileAbortCopyFromURLOptions = {}
  ): Promise<FileAbortCopyResponse> {
    const { span, spanOptions } = createSpan("FileClient-abortCopyFromURL", options.spanOptions);
    try {
      return this.context.abortCopy(copyId, {
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  // High Level functions

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to an Azure File.
   *
   * @param {Blob | ArrayBuffer | ArrayBufferView} browserData Blob, File, ArrayBuffer or ArrayBufferView
   * @param {FileParallelUploadOptions} [options]
   * @returns {Promise<void>}
   */
  public async uploadBrowserData(
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("FileClient-uploadBrowserData", options.spanOptions);
    try {
      const browserBlob = new Blob([browserData]);
      return this.uploadSeekableBlob(
        (offset: number, size: number): Blob => {
          return browserBlob.slice(offset, offset + size);
        },
        browserBlob.size,
        { ...options, spanOptions }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob object to an Azure file. Requires a blobFactory as the data source,
   * which need to return a Blob object with the offset and size provided.
   *
   * @param {(offset: number, size: number) => Blob} blobFactory
   * @param {number} size
   * @param {FileParallelUploadOptions} [options]
   * @returns {Promise<void>}
   */
  async uploadSeekableBlob(
    blobFactory: (offset: number, size: number) => Blob,
    size: number,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("FileClient-UploadSeekableBlob", options.spanOptions);
    try {
      if (!options.rangeSize) {
        options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
      }
      if (options.rangeSize < 0 || options.rangeSize > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`options.rangeSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`);
      }

      if (!options.fileHttpHeaders) {
        options.fileHttpHeaders = {};
      }

      if (!options.concurrency) {
        options.concurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
      }
      if (options.concurrency < 0) {
        throw new RangeError(`options.concurrency cannot less than 0.`);
      }

      // Create the file
      await this.create(size, {
        abortSignal: options.abortSignal,
        fileHttpHeaders: options.fileHttpHeaders,
        metadata: options.metadata,
        spanOptions
      });

      const numBlocks: number = Math.floor((size - 1) / options.rangeSize) + 1;
      let transferProgress: number = 0;

      const batch = new Batch(options.concurrency);
      for (let i = 0; i < numBlocks; i++) {
        batch.addOperation(
          async (): Promise<any> => {
            const start = options.rangeSize! * i;
            const end = i === numBlocks - 1 ? size : start + options.rangeSize!;
            const contentLength = end - start;
            await this.uploadRange(blobFactory(start, contentLength), start, contentLength, {
              abortSignal: options.abortSignal,
              spanOptions
            });
            // Update progress after block is successfully uploaded to server, in case of block trying
            // TODO: Hook with convenience layer progress event in finer level
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          }
        );
      }
      return batch.do();
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a local file to an Azure file.
   *
   * @param {string} filePath Full path of local file
   * @param {FileClient} fileClient FileClient
   * @param {FileParallelUploadOptions} [options]
   * @returns {(Promise<void>)}
   */
  public async uploadFile(
    filePath: string,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("FileClient-uploadFile", options.spanOptions);
    try {
      const size = (await fsStat(filePath)).size;
      return this.uploadResetableStream(
        (offset, count) =>
          fs.createReadStream(filePath, {
            autoClose: true,
            end: count ? offset + count - 1 : Infinity,
            start: offset
          }),
        size,
        { ...options, spanOptions }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Accepts a Node.js Readable stream factory, and uploads in blocks to an Azure File.
   * The Readable stream factory must returns a Node.js Readable stream starting from the offset defined. The offset
   * is the offset in the Azure file to be uploaded.
   *
   * @export
   * @param {(offset: number) => NodeJS.ReadableStream} streamFactory Returns a Node.js Readable stream starting
   *                                                                  from the offset defined
   * @param {number} size Size of the Azure file
   * @param {FileClient} fileClient FileClient
   * @param {FileParallelUploadOptions} [options]
   * @returns {(Promise<void>)}
   */
  async uploadResetableStream(
    streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
    size: number,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan(
      "FileClient-uploadResetableStream",
      options.spanOptions
    );
    try {
      if (!options.rangeSize) {
        options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
      }
      if (options.rangeSize < 0 || options.rangeSize > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`options.rangeSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`);
      }

      if (!options.fileHttpHeaders) {
        options.fileHttpHeaders = {};
      }

      if (!options.concurrency) {
        options.concurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
      }
      if (options.concurrency < 0) {
        throw new RangeError(`options.concurrency cannot less than 0.`);
      }

      // Create the file
      await this.create(size, {
        abortSignal: options.abortSignal,
        fileHttpHeaders: options.fileHttpHeaders,
        metadata: options.metadata,
        spanOptions
      });

      const numBlocks: number = Math.floor((size - 1) / options.rangeSize) + 1;
      let transferProgress: number = 0;
      const batch = new Batch(options.concurrency);

      for (let i = 0; i < numBlocks; i++) {
        batch.addOperation(
          async (): Promise<any> => {
            const start = options.rangeSize! * i;
            const end = i === numBlocks - 1 ? size : start + options.rangeSize!;
            const contentLength = end - start;
            await this.uploadRange(
              () => streamFactory(start, contentLength),
              start,
              contentLength,
              {
                abortSignal: options.abortSignal,
                spanOptions
              }
            );
            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          }
        );
      }
      return batch.do();
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure file in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to download the entire file.
   *
   * @param {Buffer} buffer Buffer to be fill, must have length larger than count
   * @param {number} offset From which position of the Azure File to download
   * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined
   * @param {FileDownloadToBufferOptions} [options]
   * @returns {Promise<void>}
   */
  public async downloadToBuffer(
    buffer: Buffer,
    offset: number = 0,
    count?: number,
    options: FileDownloadToBufferOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("FileClient-downloadToBuffer", options.spanOptions);
    try {
      if (!options.rangeSize) {
        options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
      }
      if (options.rangeSize < 0) {
        throw new RangeError("rangeSize option must be > 0");
      }

      if (offset < 0) {
        throw new RangeError("offset option must be >= 0");
      }

      if (count && count <= 0) {
        throw new RangeError("count option must be > 0");
      }

      if (!options.concurrency) {
        options.concurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
      }
      if (options.concurrency < 0) {
        throw new RangeError(`options.concurrency cannot less than 0.`);
      }

      // Customer doesn't specify length, get it
      if (!count) {
        const response = await this.getProperties({
          abortSignal: options.abortSignal,
          spanOptions
        });
        count = response.contentLength! - offset;
        if (count < 0) {
          throw new RangeError(
            `offset ${offset} shouldn't be larger than file size ${response.contentLength!}`
          );
        }
      }

      if (buffer.length < count) {
        throw new RangeError(
          `The buffer's size should be equal to or larger than the request count of bytes: ${count}`
        );
      }

      let transferProgress: number = 0;
      const batch = new Batch(options.concurrency);
      for (let off = offset; off < offset + count; off = off + options.rangeSize) {
        batch.addOperation(async () => {
          // Exclusive chunk end position
          let chunkEnd = offset + count!;
          if (off + options.rangeSize! < chunkEnd) {
            chunkEnd = off + options.rangeSize!;
          }
          const response = await this.download(off, chunkEnd - off, {
            abortSignal: options.abortSignal,
            maxRetryRequests: options.maxRetryRequestsPerRange,
            spanOptions
          });
          const stream = response.readableStreamBody!;
          await streamToBuffer(stream, buffer, off - offset, chunkEnd - offset);
          // Update progress after block is downloaded, in case of block trying
          // Could provide finer grained progress updating inside HTTP requests,
          // only if convenience layer download try is enabled
          transferProgress += chunkEnd - off;
          if (options.onProgress) {
            options.onProgress({ loadedBytes: transferProgress });
          }
        });
      }
      await batch.do();
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a Node.js Readable stream into an Azure file.
   * This method will try to create an Azure, then starts uploading chunk by chunk.
   * Size of chunk is defined by `bufferSize` parameter.
   * Please make sure potential size of stream doesn't exceed file size.
   *
   * PERFORMANCE IMPROVEMENT TIPS:
   * * Input stream highWaterMark is better to set a same value with bufferSize
   *   parameter, which will avoid Buffer.concat() operations.
   *
   * @param {Readable} stream Node.js Readable stream. Must be less or equal than file size.
   * @param {number} size Size of file to be created. Maxium size allowed is 1TB.
   *                      If this value is larger than stream size, there will be empty bytes in file tail.
   * @param {number} bufferSize Size of every buffer allocated in bytes, also the chunk/range size during
   *                            the uploaded file. Size must be > 0 and <= 4 * 1024 * 1024 (4MB)
   * @param {number} maxBuffers Max buffers will allocate during uploading, positive correlation
   *                            with max uploading concurrency
   * @param {FileUploadStreamOptions} [options]
   * @returns {Promise<void>}
   */
  public async uploadStream(
    stream: Readable,
    size: number,
    bufferSize: number,
    maxBuffers: number,
    options: FileUploadStreamOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("FileClient-uploadStream", options.spanOptions);
    try {
      if (!options.fileHttpHeaders) {
        options.fileHttpHeaders = {};
      }

      if (bufferSize <= 0 || bufferSize > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`bufferSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`);
      }

      if (maxBuffers < 0) {
        throw new RangeError(`maxBuffers must be > 0.`);
      }

      // Create the file
      await this.create(size, {
        abortSignal: options.abortSignal,
        fileHttpHeaders: options.fileHttpHeaders,
        metadata: options.metadata,
        spanOptions
      });

      let transferProgress: number = 0;
      const scheduler = new BufferScheduler(
        stream,
        bufferSize,
        maxBuffers,
        async (buffer: Buffer, offset?: number) => {
          if (transferProgress + buffer.length > size) {
            throw new RangeError(
              `Stream size is larger than file size ${size} bytes, uploading failed. ` +
                `Please make sure stream length is less or equal than file size.`
            );
          }

          await this.uploadRange(buffer, offset!, buffer.length, {
            abortSignal: options.abortSignal,
            spanOptions
          });

          // Update progress after block is successfully uploaded to server, in case of block trying
          transferProgress += buffer.length;
          if (options.onProgress) {
            options.onProgress({ loadedBytes: transferProgress });
          }
        },
        // Concurrency should set a smaller value than maxBuffers, which is helpful to
        // reduce the possibility when a outgoing handler waits for stream data, in
        // this situation, outgoing handlers are blocked.
        // Outgoing queue shouldn't be empty.
        Math.ceil((maxBuffers / 4) * 3)
      );
      return scheduler.do();
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
   *
   * @param {string} filePath
   * @param {number} [offset] From which position of the block blob to download.
   * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined.
   * @param {BlobDownloadOptions} [options] Options to Blob download options.
   * @returns {Promise<FileDownloadResponse>} The response data for blob download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   * @memberof BlobClient
   */
  public async downloadToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options: FileDownloadOptions = {}
  ): Promise<FileDownloadResponseModel> {
    const { span, spanOptions } = createSpan("FileClient-downloadToFile", options.spanOptions);
    try {
      const response = await this.download(offset, count, { ...options, spanOptions });
      if (response.readableStreamBody) {
        await readStreamToLocalFile(response.readableStreamBody, filePath);
      }

      // The stream is no longer accessible so setting it to undefined.
      (response as any).fileDownloadStream = undefined;
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Lists handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-handles
   *
   * @param {string} [marker] Optional. A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {FileListHandlesSegmentOptions} [options={}]
   * @returns {Promise<FileListHandlesResponse>}
   * @memberof FileURL
   */
  private async listHandlesSegment(
    marker?: string,
    options: FileListHandlesSegmentOptions = {}
  ): Promise<FileListHandlesResponse> {
    const { span, spanOptions } = createSpan("FileClient-listHandlesSegment", options.spanOptions);
    try {
      marker = marker === "" ? undefined : marker;
      const response = await this.context.listHandles({
        abortSignal: options.abortSignal,
        marker,
        ...options,
        spanOptions
      });

      // TODO: Protocol layer issue that when handle list is in returned XML
      // response.handleList is an empty string
      if ((response.handleList as any) === "") {
        response.handleList = undefined;
      }
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an AsyncIterableIterator for FileListHandlesResponse
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {FileListHandlesSegmentOptions} [options] Options to list handles operation.
   * @returns {AsyncIterableIterator<FileListHandlesResponse>}
   * @memberof FileClient
   */
  private async *iterateHandleSegments(
    marker?: string,
    options: FileListHandlesSegmentOptions = {}
  ): AsyncIterableIterator<FileListHandlesResponse> {
    let listHandlesResponse;
    if (!!marker || marker === undefined) {
      do {
        listHandlesResponse = await this.listHandlesSegment(marker, options);
        marker = listHandlesResponse.continuationToken;
        yield listHandlesResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for handles
   *
   * @private
   * @param {FileListHandlesSegmentOptions} [options] Options to list handles operation.
   * @returns {AsyncIterableIterator<HandleItem>}
   * @memberof FileClient
   */
  private async *listHandleItems(
    options: FileListHandlesSegmentOptions = {}
  ): AsyncIterableIterator<HandleItem> {
    let marker: string | undefined;
    for await (const listHandlesResponse of this.iterateHandleSegments(marker, options)) {
      if (listHandlesResponse.handleList) {
        for (const handle of listHandlesResponse.handleList) {
          yield handle;
        }
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the handles.
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the handles in pages.
   *
   * @param {FileListHandlesOptions} [options] Options to list handles operation.
   * @memberof FileClient
   * @returns {PagedAsyncIterableIterator<HandleItem, FileListHandlesResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listHandles(
    options: FileListHandlesOptions = {}
  ): PagedAsyncIterableIterator<HandleItem, FileListHandlesResponse> {
    // an AsyncIterableIterator to iterate over handles
    const iter = this.listHandleItems(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      async next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.iterateHandleSegments(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Force close all handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {string} [marker] Optional. A string value that identifies the position of handles that will
   *                          be closed with the next force close handles operation.
   *                          The operation returns a marker value within the response
   *                          body if there are more handles to close. The marker value
   *                          may then be used in a subsequent call to close the next set of handles.
   * @param {FileForceCloseHandlesOptions} [options] Options to force close handles operation.
   * @returns {Promise<FileForceCloseHandlesResponse>}
   * @memberof FileClient
   */
  private async forceCloseHandlesSegment(
    marker?: string,
    options: FileForceCloseHandlesOptions = {}
  ): Promise<FileForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "FileClient-forceCloseHandlesSegment",
      options.spanOptions
    );
    try {
      marker = marker === "" ? undefined : marker;
      return this.context.forceCloseHandles("*", {
        abortSignal: options.abortSignal,
        marker,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Force close all handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {FileForceCloseHandlesOptions} [options] Options to force close handles operation.
   * @returns {Promise<number>}
   * @memberof FileClient
   */
  public async forceCloseAllHandles(options: FileForceCloseHandlesOptions = {}): Promise<number> {
    const { span, spanOptions } = createSpan(
      "FileClient-forceCloseAllHandles",
      options.spanOptions
    );
    try {
      let handlesClosed = 0;
      let marker: string | undefined = "";

      do {
        const response: FileForceCloseHandlesResponse = await this.forceCloseHandlesSegment(
          marker,
          { spanOptions }
        );
        marker = response.marker;
        response.numberOfHandlesClosed && (handlesClosed += response.numberOfHandlesClosed);
      } while (marker);

      return handlesClosed;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Force close a specific handle for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {string} handleId Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseAllHandles() to close all handles.
   * @param {FileForceCloseHandlesOptions} [options] Options to force close handles operation.
   * @returns {Promise<FileForceCloseHandlesResponse>}
   * @memberof FileClient
   */
  public async forceCloseHandle(
    handleId: string,
    options: FileForceCloseHandlesOptions = {}
  ): Promise<FileForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan("FileClient-forceCloseHandle", options.spanOptions);
    try {
      if (handleId === "*") {
        throw new RangeError(
          `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`
        );
      }

      return this.context.forceCloseHandles(handleId, {
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
