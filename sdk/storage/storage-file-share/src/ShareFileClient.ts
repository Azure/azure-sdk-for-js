// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpRequestBody, HttpResponse, isNode, TransferProgressEvent } from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { AbortSignalLike } from "@azure/abort-controller";
import { FileDownloadResponse } from "./FileDownloadResponse";
import {
  FileAbortCopyResponse,
  FileCreateResponse,
  FileDeleteResponse,
  FileDownloadOptionalParams,
  FileDownloadResponseModel,
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
  RangeModel,
  FileForceCloseHandlesHeaders,
  CopyFileSmbInfo,
  LeaseAccessConditions
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
  validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions,
  CloseHandlesInfo
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
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  readStreamToLocalFile,
  streamToBuffer,
  fsStat,
  fsCreateReadStream
} from "./utils/utils.node";
import { FileSystemAttributes } from "./FileSystemAttributes";
import { getShareNameAndPathFromUrl } from "./utils/utils.common";
import { createSpan } from "./utils/tracing";
import { StorageClientContext } from "./generated/src/storageClientContext";
import { SERVICE_VERSION } from "./utils/constants";
import { generateUuid } from "@azure/core-http";

/**
 * Options to configure the {@link ShareFileClient.create} operation.
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
   * @memberof FileCreateOptions
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileCreateOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileProperties
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

export interface SetPropertiesResponse extends FileSetHTTPHeadersResponse {}

/**
 * Options to configure the {@link ShareFileClient.delete} operation.
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
   * @memberof FileDeleteOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileDeleteOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure File - Download operations.
 *
 * See:
 * - {@link ShareFileClient.download}
 * - {@link ShareFileClient.downloadToFile}
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
   * @memberof FileDownloadOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional ShareFileClient.download() request will be made
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileDownloadOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.uploadRange} operation.
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
   * @memberof FileUploadRangeOptions
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileUploadRangeOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.uploadRangeFromURL} operation.
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileUploadRangeFromURLOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
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
 * Options to configure the {@link ShareFileClient.getRangeList} operation.
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
   * @memberof FileGetRangeListOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. Specifies the range of bytes over which to list ranges, inclusively.
   *
   * @type {Range}
   * @memberof FileGetRangeListOptions
   */
  range?: Range;
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileGetRangeListOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.exists} operation.
 *
 * @export
 * @interface FileExistsOptions
 */
export interface FileExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileExistsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareFileClient.getProperties} operation.
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
   * @memberof FileGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileGetPropertiesOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Contains response data for the {@link ShareFileClient.getRangeList} operation.
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
 * Options to configure the {@link ShareFileClient.startCopyFromURL} operation.
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
   * @memberof FileStartCopyOptions
   */
  metadata?: Metadata;
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileStartCopyOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
  /**
   * If specified the permission (security descriptor) shall be set for the directory/file. This
   * header can be used if Permission size is <= 8KB, else x-ms-file-permission-key header shall be
   * used. Default value: Inherit. If SDDL is specified as input, it must have owner, group and
   * dacl. Note: Only one of the x-ms-file-permission or x-ms-file-permission-key should be
   * specified.
   *
   * @type {string}
   * @memberof FileStartCopyOptions
   */
  filePermission?: string;
  /**
   * Key of the permission to be set for the directory/file. Note: Only one of the
   * x-ms-file-permission or x-ms-file-permission-key should be specified.
   *
   * @type {string}
   * @memberof FileStartCopyOptions
   */
  filePermissionKey?: string;
  /**
   * SMB info.
   *
   * @type {CopyFileSmbInfo}
   * @memberof FileStartCopyOptions
   */
  copyFileSmbInfo?: CopyFileSmbInfo;
}

/**
 * Options to configure the {@link ShareFileClient.setMetadata} operation.
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileSetMetadataOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.setHttpHeaders} operation.
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileSetHttpHeadersOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.abortCopyFromURL} operation.
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileAbortCopyFromURLOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.resize} operation.
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileResizeOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.clearRange} operation.
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileClearRangeOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure File - List Handles Segment operations.
 *
 * See:
 * - {@link ShareFileClient.listHandlesSegment}
 * - {@link ShareFileClient.iterateHandleSegments}
 * - {@link ShareFileClient.listHandleItems}
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
 * Options to configure File - Force Close Handles operations.
 *
 * See:
 * - {@link ShareFileClient.forceCloseHandlesSegment}
 * - {@link ShareFileClient.forceCloseAllHandles}
 * - {@link ShareFileClient.forceCloseHandle}
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
 * Additional response header values for close handles request.
 */
export interface FileCloseHandlesHeaders {
  /**
   * This header uniquely identifies the request that was made and can be used for troubleshooting
   * the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the File service used to execute the request.
   */
  version?: string;
  /**
   * A UTC date/time value generated by the service that indicates the time at which the response
   * was initiated.
   */
  date?: Date;
  /**
   * A string describing next handle to be closed. It is returned when more handles need to be
   * closed to complete the request.
   */
  marker?: string;
}

/**
 * Response type for {@link ShareFileClient.forceCloseHandle}.
 */
export type FileForceCloseHandlesResponse = CloseHandlesInfo &
  FileCloseHandlesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: FileForceCloseHandlesHeaders;
    };
  };

/**
 * Option interface for ShareFileClient.uploadStream().
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileUploadStreamOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Option interface for File - Upload operations
 *
 * See:
 * - {@link ShareFileClient.uploadFile}
 * - {@link ShareFileClient.uploadSeekableStream}
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileParallelUploadOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Option interface for the {@link ShareFileClient.downloadToBuffer} operation.
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
   * Every small range will be downloaded via a separate request.
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
   * With this option, every additional retry means an additional ShareFileClient.download() request will be made
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
  /**
   * Lease access conditions.
   *
   * @type {LeaseAccessConditions}
   * @memberof FileDownloadToBufferOptions
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Contains response data for the {@link ShareFileClient.deleteIfExists} operation.
 *
 * @export
 * @interface FileDeleteIfExistsResponse
 */
export interface FileDeleteIfExistsResponse extends FileDeleteResponse {
  /**
   * Indicate whether the file is successfully deleted. Is false if the file does not exist in the first place.
   *
   * @type {boolean}
   * @memberof FileDeleteIfExistsResponse
   */
  succeeded: boolean;
}

/**
 * A ShareFileClient represents a URL to an Azure Storage file.
 *
 * @export
 * @class ShareFileClient
 */
export class ShareFileClient extends StorageClient {
  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {File}
   * @memberof ShareFileClient
   */
  private context: File;

  private _shareName: string;
  private _path: string;
  private _name: string;

  /**
   * The share name corresponding to this file client
   *
   * @type {string}
   * @memberof ShareFileClient
   */
  public get shareName(): string {
    return this._shareName;
  }

  /**
   * The full path of the file
   *
   * @type {string}
   * @memberof ShareFileClient
   */
  public get path(): string {
    return this._path;
  }

  /**
   * The name of the file
   *
   * @type {string}
   * @memberof ShareFileClient
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Creates an instance of ShareFileClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a file.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a file or directory name includes %, file or directory name must be encoded in the URL.
   *                     Such as a file named "myfile%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydirectory/myfile%25".
   * @param {Credential} [credential] Such as AnonymousCredential or StorageSharedKeyCredential.
   *                                  If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareFileClient
   */
  constructor(url: string, credential?: Credential, options?: StoragePipelineOptions);
  /**
   * Creates an instance of ShareFileClient.
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
   * @memberof ShareFileClient
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
      baseName: this._name,
      shareName: this._shareName,
      path: this._path
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
   * @memberof ShareFileClient
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   *
   * // Create the file
   * await fileClient.create(content.length);
   * console.log("Created file successfully!");
   *
   * // Then upload data to the file
   * await fileClient.uploadRange(content, 0, content.length);
   * console.log("Updated file successfully!")
   * ```
   */
  public async create(size: number, options: FileCreateOptions = {}): Promise<FileCreateResponse> {
    const { span, spanOptions } = createSpan("ShareFileClient-create", options.tracingOptions);
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

      return await this.context.create(
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
          leaseAccessConditions: options.leaseAccessConditions,
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
   * * In browsers, data returns in a promise `contentAsBlob`
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file
   *
   * @param {number} [offset] From which position of the file to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {FileDownloadOptions} [options] Options to File Download operation.
   * @returns {Promise<FileDownloadResponse>} Response data for the File Download operation.
   * @memberof ShareFileClient
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Download a file to a string
   * const downloadFileResponse = await fileClient.download();
   * console.log(
   *   "Downloaded file content:",
   *   await streamToString(downloadFileResponse.readableStreamBody)}
   * );
   *
   * // A helper method used to read a Node.js readable stream into string
   * async function streamToString(readableStream) {
   *   return new Promise((resolve, reject) => {
   *     const chunks = [];
   *     readableStream.on("data", (data) => {
   *       chunks.push(data.toString());
   *     });
   *     readableStream.on("end", () => {
   *       resolve(chunks.join(""));
   *     });
   *     readableStream.on("error", reject);
   *   });
   * }
   * ```
   *
   * Example usage (browsers):
   *
   * ```js
   * // Download a file to a string
   * const downloadFileResponse = await fileClient.download(0);
   * console.log(
   *   "Downloaded file content:",
   *   await blobToString(await downloadFileResponse.blobBody)}
   * );
   *
   * // A helper method used to convert a browser Blob into string.
   * export async function blobToString(blob: Blob): Promise<string> {
   *   const fileReader = new FileReader();
   *   return new Promise<string>((resolve, reject) => {
   *     fileReader.onloadend = (ev: any) => {
   *       resolve(ev.target!.result);
   *     };
   *     fileReader.onerror = reject;
   *     fileReader.readAsText(blob);
   *   });
   * }
   * ```
   */
  public async download(
    offset: number = 0,
    count?: number,
    options: FileDownloadOptions = {}
  ): Promise<FileDownloadResponseModel> {
    const { span, spanOptions } = createSpan("ShareFileClient-download", options.tracingOptions);
    try {
      if (options.rangeGetContentMD5 && offset === 0 && count === undefined) {
        throw new RangeError(`rangeGetContentMD5 only works with partial data downloading`);
      }

      const downloadFullFile = offset === 0 && !count;
      const res = await this.context.download({
        abortSignal: options.abortSignal,
        onDownloadProgress: isNode ? undefined : options.onProgress, // for Node.js, progress is reported by RetriableReadableStream
        range: downloadFullFile ? undefined : rangeToString({ offset, count }),
        rangeGetContentMD5: options.rangeGetContentMD5,
        leaseAccessConditions: options.leaseAccessConditions,
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

          return (
            await this.context.download({
              abortSignal: options.abortSignal,
              leaseAccessConditions: options.leaseAccessConditions,
              ...updatedOptions,
              spanOptions
            })
          ).readableStreamBody!;
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
   * Returns true if the specified file exists; false otherwise.
   *
   * NOTE: use this function with care since an existing file might be deleted by other clients or
   * applications. Vice versa new files might be added by other clients or applications after this
   * function completes.
   *
   * @param {FileExistsOptions} [options] options to Exists operation.
   * @returns {Promise<boolean>}
   * @memberof ShareFileClient
   */
  public async exists(options: FileExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan("ShareFileClient-exists", options.tracingOptions);
    try {
      await this.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when checking file existence"
        });
        return false;
      }
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
   * @memberof ShareFileClient
   */
  public async getProperties(
    options: FileGetPropertiesOptions = {}
  ): Promise<FileGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-getProperties",
      options.tracingOptions
    );
    try {
      return this.context.getProperties({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.leaseAccessConditions,
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
   * @memberof ShareFileClient
   */
  public async setProperties(properties: FileProperties = {}): Promise<SetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-setProperties",
      properties.tracingOptions
    );
    try {
      properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

      properties.fileHttpHeaders = properties.fileHttpHeaders || {};

      return await this.context.setHTTPHeaders(
        fileAttributesToString(properties.fileAttributes!),
        fileCreationTimeToString(properties.creationTime!),
        fileLastWriteTimeToString(properties.lastWriteTime!),
        {
          abortSignal: properties.abortSignal,
          fileHttpHeaders: properties.fileHttpHeaders,
          filePermission: properties.filePermission,
          filePermissionKey: properties.filePermissionKey,
          leaseAccessConditions: properties.leaseAccessConditions,
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
   * @memberof ShareFileClient
   */
  public async delete(options: FileDeleteOptions = {}): Promise<FileDeleteResponse> {
    const { span, spanOptions } = createSpan("ShareFileClient-delete", options.tracingOptions);
    try {
      return await this.context.deleteMethod({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.leaseAccessConditions,
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
   * Removes the file from the storage account if it exists.
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
   * @param {FileDeleteOptions} [options]
   * @returns {Promise<FileDeleteIfExistsResponse>}
   * @memberof ShareFileClient
   */
  public async deleteIfExists(
    options: FileDeleteOptions = {}
  ): Promise<FileDeleteIfExistsResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-deleteIfExists",
      options.tracingOptions
    );
    try {
      const res = await this.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res
      };
    } catch (e) {
      if (e.details?.errorCode === "ResourceNotFound") {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when deleting a file only if it exists."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
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
   * @memberof ShareFileClient
   */
  public async setHttpHeaders(
    fileHttpHeaders: FileHttpHeaders = {},
    options: FileSetHttpHeadersOptions = {}
  ): Promise<FileSetHTTPHeadersResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-setHTTPHeaders",
      options.tracingOptions
    );
    try {
      // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved
      options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);
      return await this.context.setHTTPHeaders(
        fileAttributesToString(options.fileAttributes!),
        fileCreationTimeToString(options.creationTime!),
        fileLastWriteTimeToString(options.lastWriteTime!),
        {
          abortSignal: options.abortSignal,
          fileHttpHeaders,
          filePermission: options.filePermission,
          filePermissionKey: options.filePermissionKey,
          leaseAccessConditions: options.leaseAccessConditions,
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
   * @memberof ShareFileClient
   */
  public async resize(
    length: number,
    options: FileResizeOptions = {}
  ): Promise<FileSetHTTPHeadersResponse> {
    const { span, spanOptions } = createSpan("ShareFileClient-resize", options.tracingOptions);
    try {
      if (length < 0) {
        throw new RangeError(`Size cannot less than 0 when resizing file.`);
      }
      // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved.
      options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);

      return await this.context.setHTTPHeaders(
        fileAttributesToString(options.fileAttributes!),
        fileCreationTimeToString(options.creationTime!),
        fileLastWriteTimeToString(options.lastWriteTime!),
        {
          abortSignal: options.abortSignal,
          fileContentLength: length,
          filePermission: options.filePermission,
          filePermissionKey: options.filePermissionKey,
          leaseAccessConditions: options.leaseAccessConditions,
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
   * @memberof ShareFileClient
   */
  public async setMetadata(
    metadata: Metadata = {},
    options: FileSetMetadataOptions = {}
  ): Promise<FileSetMetadataResponse> {
    const { span, spanOptions } = createSpan("ShareFileClient-setMetadata", options.tracingOptions);
    try {
      return await this.context.setMetadata({
        abortSignal: options.abortSignal,
        metadata,
        leaseAccessConditions: options.leaseAccessConditions,
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
   * @memberof ShareFileClient
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   *
   * // Create the file
   * await fileClient.create(content.length);
   * console.log("Created file successfully!");
   *
   * // Then upload data to the file
   * await fileClient.uploadRange(content, 0, content.length);
   * console.log("Updated file successfully!")
   * ```
   */
  public async uploadRange(
    body: HttpRequestBody,
    offset: number,
    contentLength: number,
    options: FileUploadRangeOptions = {}
  ): Promise<FileUploadRangeResponse> {
    const { span, spanOptions } = createSpan("ShareFileClient-uploadRange", options.tracingOptions);
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

      return await this.context.uploadRange(
        rangeToString({ count: contentLength, offset }),
        "update",
        contentLength,
        {
          abortSignal: options.abortSignal,
          contentMD5: options.contentMD5,
          onUploadProgress: options.onProgress,
          body: body,
          spanOptions,
          leaseAccessConditions: options.leaseAccessConditions
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
    const { span, spanOptions } = createSpan(
      "ShareFileClient-uploadRangeFromURL",
      options.tracingOptions
    );
    try {
      if (sourceOffset < 0 || destOffset < 0) {
        throw new RangeError(`sourceOffset and destOffset must be >= 0`);
      }

      if (count <= 0 || count > FILE_RANGE_MAX_SIZE_BYTES) {
        throw new RangeError(`count must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
      }

      return await this.context.uploadRangeFromURL(
        rangeToString({ offset: destOffset, count }),
        sourceURL,
        0,
        {
          abortSignal: options.abortSignal,
          sourceRange: rangeToString({ offset: sourceOffset, count }),
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
   * @memberof ShareFileClient
   */
  public async clearRange(
    offset: number,
    contentLength: number,
    options: FileClearRangeOptions = {}
  ): Promise<FileUploadRangeResponse> {
    const { span, spanOptions } = createSpan("ShareFileClient-clearRange", options.tracingOptions);
    try {
      if (offset < 0 || contentLength <= 0) {
        throw new RangeError(`offset must >= 0 and contentLength must be > 0`);
      }

      return await this.context.uploadRange(
        rangeToString({ count: contentLength, offset }),
        "clear",
        0,
        {
          abortSignal: options.abortSignal,
          spanOptions,
          leaseAccessConditions: options.leaseAccessConditions
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
   * Returns the list of valid ranges for a file.
   *
   * @param {FileGetRangeListOptions} [options] Options to File Get range List operation.
   * @returns {Promise<FileGetRangeListResponse>}
   * @memberof ShareFileClient
   */
  public async getRangeList(
    options: FileGetRangeListOptions = {}
  ): Promise<FileGetRangeListResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-getRangeList",
      options.tracingOptions
    );
    try {
      const originalResponse = await this.context.getRangeList({
        abortSignal: options.abortSignal,
        range: options.range ? rangeToString(options.range) : undefined,
        leaseAccessConditions: options.leaseAccessConditions,
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
   * @memberof ShareFileClient
   */
  public async startCopyFromURL(
    copySource: string,
    options: FileStartCopyOptions = {}
  ): Promise<FileStartCopyResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-startCopyFromURL",
      options.tracingOptions
    );
    try {
      return await this.context.startCopy(copySource, {
        abortSignal: options.abortSignal,
        metadata: options.metadata,
        leaseAccessConditions: options.leaseAccessConditions,
        filePermission: options.filePermission,
        filePermissionKey: options.filePermissionKey,
        copyFileSmbInfo: options.copyFileSmbInfo,
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
   * @memberof ShareFileClient
   */
  public async abortCopyFromURL(
    copyId: string,
    options: FileAbortCopyFromURLOptions = {}
  ): Promise<FileAbortCopyResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-abortCopyFromURL",
      options.tracingOptions
    );
    try {
      return await this.context.abortCopy(copyId, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.leaseAccessConditions,
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
   * Uploads a Buffer(Node)/Blob/ArrayBuffer/ArrayBufferView to an Azure File.
   *
   * @param {Buffer | Blob | ArrayBuffer | ArrayBufferView} data Buffer(Node), Blob, ArrayBuffer or ArrayBufferView
   * @param {FileParallelUploadOptions} [options]
   * @returns {Promise<void>}
   */
  public async uploadData(
    data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("ShareFileClient-uploadData", options.tracingOptions);
    try {
      if (isNode && data instanceof Buffer) {
        return this.uploadBuffer(
          (offset, count) => data.slice(offset, offset + count),
          data.byteLength,
          {
            ...options,
            tracingOptions: { ...options!.tracingOptions, spanOptions }
          }
        );
      } else {
        const browserBlob = new Blob([data]);
        return this.uploadSeekableBlob(
          (offset: number, size: number): Blob => {
            return browserBlob.slice(offset, offset + size);
          },
          browserBlob.size,
          { ...options, tracingOptions: { ...options!.tracingOptions, spanOptions } }
        );
      }
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
    const { span, spanOptions } = createSpan(
      "ShareFileClient-UploadSeekableBlob",
      options.tracingOptions
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
        leaseAccessConditions: options.leaseAccessConditions,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
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
              leaseAccessConditions: options.leaseAccessConditions,
              tracingOptions: { ...options!.tracingOptions, spanOptions }
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
      return await batch.do();
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
   * @param {ShareFileClient} fileClient ShareFileClient
   * @param {FileParallelUploadOptions} [options]
   * @returns {(Promise<void>)}
   */
  public async uploadFile(
    filePath: string,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan("ShareFileClient-uploadFile", options.tracingOptions);
    try {
      const size = (await fsStat(filePath)).size;
      return await this.uploadResetableStream(
        (offset, count) =>
          fsCreateReadStream(filePath, {
            autoClose: true,
            end: count ? offset + count - 1 : Infinity,
            start: offset
          }),
        size,
        { ...options, tracingOptions: { ...options!.tracingOptions, spanOptions } }
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
   * @param {ShareFileClient} fileClient ShareFileClient
   * @param {FileParallelUploadOptions} [options]
   * @returns {(Promise<void>)}
   */
  async uploadResetableStream(
    streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
    size: number,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-uploadResetableStream",
      options.tracingOptions
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
        leaseAccessConditions: options.leaseAccessConditions,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
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
                leaseAccessConditions: options.leaseAccessConditions,
                tracingOptions: { ...options!.tracingOptions, spanOptions }
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
      return await batch.do();
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
   * @export
   * @param {(offset: number, count: number) => Buffer} bufferChunk Returns a Node.js Buffer chunk starting
   *                                                                  from the offset defined till the count
   * @param {number} size Size of the Azure file
   * @param {ShareFileClient} fileClient ShareFileClient
   * @param {FileParallelUploadOptions} [options]
   * @returns {(Promise<void>)}
   */
  private async uploadBuffer(
    bufferChunk: (offset: number, count: number) => Buffer,
    size: number,
    options: FileParallelUploadOptions = {}
  ): Promise<void> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-uploadBuffer",
      options.tracingOptions
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
        leaseAccessConditions: options.leaseAccessConditions,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
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
            await this.uploadRange(bufferChunk(start, contentLength), start, contentLength, {
              abortSignal: options.abortSignal,
              leaseAccessConditions: options.leaseAccessConditions,
              tracingOptions: { ...options!.tracingOptions, spanOptions }
            });
            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          }
        );
      }
      return await batch.do();
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
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For files larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param {Buffer} buffer Buffer to be fill, must have length larger than count
   * @param {number} offset From which position of the Azure File to download
   * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined
   * @param {FileDownloadToBufferOptions} [options]
   * @returns {Promise<Buffer>}
   */
  public async downloadToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: FileDownloadToBufferOptions
  ): Promise<Buffer>;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME
   *
   * Downloads an Azure file in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to download the entire file
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For files larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param {number} offset From which position of the Azure file to download
   * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined
   * @param {FileDownloadToBufferOptions} [options]
   * @returns {Promise<Buffer>}
   */
  public async downloadToBuffer(
    offset?: number,
    count?: number,
    options?: FileDownloadToBufferOptions
  ): Promise<Buffer>;

  public async downloadToBuffer(
    bufferOrOffset?: Buffer | number,
    offsetOrCount?: number,
    countOrOptions?: FileDownloadToBufferOptions | number,
    optOptions: FileDownloadToBufferOptions = {}
  ): Promise<Buffer> {
    let buffer: Buffer | undefined = undefined;
    let offset: number;
    let count: number;
    let options: FileDownloadToBufferOptions = optOptions;

    if (bufferOrOffset instanceof Buffer) {
      buffer = bufferOrOffset;
      offset = offsetOrCount || 0;
      count = typeof countOrOptions === "number" ? countOrOptions : 0;
    } else {
      offset = typeof bufferOrOffset === "number" ? bufferOrOffset : 0;
      count = typeof offsetOrCount === "number" ? offsetOrCount : 0;
      options = (countOrOptions as FileDownloadToBufferOptions) || {};
    }

    const { span, spanOptions } = createSpan(
      "ShareFileClient-downloadToBuffer",
      options.tracingOptions
    );

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
          leaseAccessConditions: options.leaseAccessConditions,
          tracingOptions: { ...options!.tracingOptions, spanOptions }
        });
        count = response.contentLength! - offset;
        if (count < 0) {
          throw new RangeError(
            `offset ${offset} shouldn't be larger than file size ${response.contentLength!}`
          );
        }
      }

      if (!buffer) {
        try {
          buffer = Buffer.alloc(count);
        } catch (error) {
          throw new Error(
            `Unable to allocate a buffer of size: ${count} bytes. Please try passing your own Buffer to ` +
              'the "downloadToBuffer method or try using other methods like "download" or "downloadToFile".' +
              `\t ${error.message}`
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
            leaseAccessConditions: options.leaseAccessConditions,
            tracingOptions: { ...options!.tracingOptions, spanOptions }
          });
          const stream = response.readableStreamBody!;
          await streamToBuffer(stream, buffer!, off - offset, chunkEnd - offset);
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
      return buffer;
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
   * @param {number} size Size of file to be created. Maximum size allowed is 1TB.
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
    const { span, spanOptions } = createSpan(
      "ShareFileClient-uploadStream",
      options.tracingOptions
    );
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
        leaseAccessConditions: options.leaseAccessConditions,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
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
            leaseAccessConditions: options.leaseAccessConditions,
            tracingOptions: { ...options!.tracingOptions, spanOptions }
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
      return await scheduler.do();
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
    const { span, spanOptions } = createSpan(
      "ShareFileClient-downloadToFile",
      options.tracingOptions
    );
    try {
      const response = await this.download(offset, count, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
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
    const { span, spanOptions } = createSpan(
      "ShareFileClient-listHandlesSegment",
      options.tracingOptions
    );
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
   * @memberof ShareFileClient
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
   * @memberof ShareFileClient
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
   * @memberof ShareFileClient
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
   * @memberof ShareFileClient
   */
  private async forceCloseHandlesSegment(
    marker?: string,
    options: FileForceCloseHandlesOptions = {}
  ): Promise<FileForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-forceCloseHandlesSegment",
      options.tracingOptions
    );
    try {
      marker = marker === "" ? undefined : marker;
      const rawResponse = await this.context.forceCloseHandles("*", {
        abortSignal: options.abortSignal,
        marker,
        spanOptions
      });
      const response = rawResponse as FileForceCloseHandlesResponse;
      response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
      response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
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
   * Force close all handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {FileForceCloseHandlesOptions} [options] Options to force close handles operation.
   * @returns {Promise<CloseHandlesInfo>}
   * @memberof ShareFileClient
   */
  public async forceCloseAllHandles(
    options: FileForceCloseHandlesOptions = {}
  ): Promise<CloseHandlesInfo> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-forceCloseAllHandles",
      options.tracingOptions
    );
    try {
      let handlesClosed = 0;
      let numberOfHandlesFailedToClose = 0;
      let marker: string | undefined = "";

      do {
        const response: FileForceCloseHandlesResponse = await this.forceCloseHandlesSegment(
          marker,
          { tracingOptions: { ...options!.tracingOptions, spanOptions } }
        );
        marker = response.marker;
        response.closedHandlesCount && (handlesClosed += response.closedHandlesCount);
        response.closeFailureCount && (numberOfHandlesFailedToClose += response.closeFailureCount);
      } while (marker);

      return {
        closedHandlesCount: handlesClosed,
        closeFailureCount: numberOfHandlesFailedToClose
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
   * Force close a specific handle for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {string} handleId Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseAllHandles() to close all handles.
   * @param FileForceCloseHandlesOptions} [options] Options to force close handles operation.
   * @returns {Promise<FileForceCloseHandlesResponse>}
   * @memberof ShareFileClient
   */
  public async forceCloseHandle(
    handleId: string,
    options: FileForceCloseHandlesOptions = {}
  ): Promise<FileForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareFileClient-forceCloseHandle",
      options.tracingOptions
    );
    try {
      if (handleId === "*") {
        throw new RangeError(
          `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`
        );
      }

      const rawResponse = await this.context.forceCloseHandles(handleId, {
        abortSignal: options.abortSignal,
        spanOptions
      });
      const response = rawResponse as FileForceCloseHandlesResponse;
      response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
      response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
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
   * Get a {@link ShareLeaseClient} that manages leases on the file.
   *
   * @param {string} [proposeLeaseId] Initial proposed lease Id.
   * @returns {ShareLeaseClient} A new ShareLeaseClient object for managing leases on the file.
   * @memberof ShareFileClient
   */
  public getShareLeaseClient(proposeLeaseId?: string): ShareLeaseClient {
    return new ShareLeaseClient(this, proposeLeaseId);
  }
}

/**
 * The details of the response for a specific lease operation.
 */
export interface LeaseOperationResponseHeaders {
  /**
   * The ETag contains a value that you can use to perform operations conditionally. If the request
   * version is 2011-08-18 or newer, the ETag value will be in quotes.
   */
  etag?: string;
  /**
   * Returns the date and time the file was last modified. Any operation that modifies the file,
   * including an update of the file's metadata or properties, changes the last-modified time of
   * the file.
   */
  lastModified?: Date;
  /**
   * Uniquely identifies a file's lease, won't be set when returned by releaseLease.
   */
  leaseId?: string;
  /**
   * This header uniquely identifies the request that was made and can be used for troubleshooting
   * the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the Blob service used to execute the request. This header is returned
   * for requests made against version 2009-09-19 and above.
   */
  version?: string;
  /**
   * UTC date/time value generated by the service that indicates the time at which the response was
   * initiated
   */
  date?: Date;
  errorCode?: string;
}

/**
 * Contains the response data for operations that acquire, change, break or release a lease.
 *
 * See {@link ShareLeaseClient}.
 */
export type LeaseOperationResponse = LeaseOperationResponseHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: LeaseOperationResponseHeaders;
  };
};

/**
 * lease operations options.
 *
 * @export
 * @interface LeaseOperationOptions
 */
export interface LeaseOperationOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof LeaseOperationOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * A client that manages leases for a {@link ShareFileClient}.
 *
 * @export
 * @class ShareLeaseClient
 */
export class ShareLeaseClient {
  private _leaseId: string;
  private _url: string;
  private _file: File;
  /**
   * Gets the lease Id.
   *
   * @readonly
   * @memberof ShareLeaseClient
   * @type {string}
   */
  public get leaseId(): string {
    return this._leaseId;
  }

  /**
   * Gets the url.
   *
   * @readonly
   * @memberof ShareLeaseClient
   * @type {string}
   */
  public get url(): string {
    return this._url;
  }

  /**
   * Creates an instance of ShareLeaseClient.
   * @param {ShareFileClient} client The client to make the lease operation requests.
   * @param {string} leaseId Initial proposed lease id.
   * @memberof ShareLeaseClient
   */
  constructor(client: ShareFileClient, leaseId?: string) {
    const clientContext = new StorageClientContext(
      SERVICE_VERSION,
      client.url,
      (client as any).pipeline.toServiceClientOptions()
    );
    this._file = new File(clientContext);

    this._url = client.url;

    if (!leaseId) {
      leaseId = generateUuid();
    }
    this._leaseId = leaseId;
  }

  /**
   * The Lease File operation establishes and manages a lock on a file for write and delete operations.
   *
   * @param {number} duration Specifies the duration of lease. The only allowed value is -1, for a lease that never expires.
   * @param {LeaseOperationOptions} [options={}] Options for the lease management operation.
   * @returns {Promise<LeaseOperationResponse>} Response data for acquire lease operation.
   * @memberof ShareLeaseClient
   */
  public async acquireLease(
    duration = -1,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan(
      "ShareLeaseClient-acquireLease",
      options.tracingOptions
    );
    try {
      return await this._file.acquireLease({
        abortSignal: options.abortSignal,
        duration,
        proposedLeaseId: this._leaseId,
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
   * To change the ID of an existing lease.
   *
   * @param {string} proposedLeaseId the proposed new lease Id.
   * @param {LeaseOperationOptions} [options={}] Options for the lease management operation.
   * @returns {Promise<LeaseOperationResponse>} Response data for change lease operation.
   * @memberof ShareLeaseClient
   */
  public async changeLease(
    proposedLeaseId: string,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan(
      "ShareLeaseClient-changeLease",
      options.tracingOptions
    );
    try {
      const response = await this._file.changeLease(this._leaseId, {
        proposedLeaseId,
        abortSignal: options.abortSignal,
        spanOptions
      });
      this._leaseId = proposedLeaseId;
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
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease against the file.
   *
   * @param {LeaseOperationOptions} [options={}] Options for the lease management operation.
   * @returns {Promise<LeaseOperationResponse>} Response data for release lease operation.
   * @memberof ShareLeaseClient
   */
  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan(
      "ShareLeaseClient-releaseLease",
      options.tracingOptions
    );
    try {
      return await this._file.releaseLease(this._leaseId, {
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
   * To force end the lease.
   *
   * @param {LeaseOperationOptions} [options={}] Options for the lease management operation.
   * @returns {Promise<LeaseOperationResponse>} Response data for break lease operation.
   * @memberof ShareLeaseClient
   */
  public async breakLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("ShareLeaseClient-breakLease", options.tracingOptions);
    try {
      return await this._file.breakLease({
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
