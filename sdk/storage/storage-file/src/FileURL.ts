import { HttpRequestBody, HttpResponse, isNode, TransferProgressEvent } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import { DirectoryURL } from "./DirectoryURL";
import { FileDownloadResponse } from "./FileDownloadResponse";
import * as Models from "./generated/src/models";
import { File } from "./generated/src/operations";
import { IRange, rangeToString } from "./IRange";
import { 
  IFileHTTPHeaders, 
  IMetadata, 
  IFileAndDirectoryCreateCommonOptions, 
  IFileAndDirectorySetPropertiesCommonOptions,
  validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions,
  validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions,
  fileAttributesToString,
  fileCreationTimeToString,
  fileLastWriteTimeToString,
} from "./models";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";
import { DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS, FILE_MAX_SIZE_BYTES, FILE_RANGE_MAX_SIZE_BYTES } from "./utils/constants";
import { appendToURLPath } from "./utils/utils.common";
import { FileSystemAttributes } from './FileSystemAttributes';

export interface IFileCreateOptions extends IFileAndDirectoryCreateCommonOptions {
  /**
   * File HTTP headers like Content-Type.
   *
   * @type {IFileHTTPHeaders}
   * @memberof IFileCreateOptions
   */
  fileHTTPHeaders?: IFileHTTPHeaders;

  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @type {IMetadata}
   * @memberof IFileCreateOptions
   */
  metadata?: IMetadata;
}

export interface IFileProperties extends IFileAndDirectorySetPropertiesCommonOptions {
  /**
   * File HTTP headers like Content-Type.
   *
   * @type {IFileHTTPHeaders}
   * @memberof IFileCreateOptions
   */
  fileHTTPHeaders?: IFileHTTPHeaders;
}

export interface ISetPropertiesResponse extends Models.FileSetHTTPHeadersResponse {}

export interface IFileDownloadOptions {
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileURL.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   *
   * @type {number}
   * @memberof IFileDownloadOptions
   */
  maxRetryRequests?: number;

  /**
   * When this header is set to true and
   * specified together with the Range header, the service returns the MD5 hash
   * for the range, as long as the range is less than or equal to 4 MB in size.
   *
   * @type {boolean}
   * @memberof IFileDownloadOptions
   */
  rangeGetContentMD5?: boolean;

  /**
   * Download progress updating event handler.
   *
   * @memberof IFileDownloadOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}

export interface IFileUploadRangeOptions {
  /**
   * An MD5 hash of the content. This hash is
   * used to verify the integrity of the data during transport. When the
   * Content-MD5 header is specified, the File service compares the hash of the
   * content that has arrived with the header value that was sent. If the two
   * hashes do not match, the operation will fail with error code 400 (Bad
   * Request).
   *
   * @type {Uint8Array}
   * @memberof IFileUploadRangeOptions
   */
  contentMD5?: Uint8Array;

  /**
   * Progress updating event handler.
   *
   * @memberof IFileUploadRangeOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}

/**
 * The option is defined as parity to REST definition.
 * While it's not ready to be used now, considering Crc64 of source content is 
 * not accessible.
 */
// export interface IFileUploadRangeFromURLOptions {
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
//    * @type {Models.SourceModifiedAccessConditions}
//    * @memberof IFileUploadRangeFromURLOptions
//    */
//   sourceModifiedAccessConditions?: Models.SourceModifiedAccessConditions;
// }

export interface IFileGetRangeListOptions {
  /**
   * Optional. Specifies the range of bytes over which to list ranges, inclusively.
   *
   * @type {IRange}
   * @memberof IFileGetRangeListOptions
   */
  range?: IRange;
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

export interface IFileStartCopyOptions {
  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @type {IMetadata}
   * @memberof IFileCreateOptions
   */
  metadata?: IMetadata;
}

export interface IFileListHandlesSegmentOptions {
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxresults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   */
  maxresults?: number;
}

/**
 * A FileURL represents a URL to an Azure Storage file.
 *
 * @export
 * @class FileURL
 * @extends {StorageURL}
 */
export class FileURL extends StorageURL {
  /**
   * Creates a FileURL object from a DirectoryURL object.
   *
   * @static
   * @param {DirectoryURL} directoryURL A DirectoryURL object
   * @param {string} fileName A file name
   * @returns
   * @memberof FileURL
   */
  public static fromDirectoryURL(directoryURL: DirectoryURL, fileName: string) {
    return new FileURL(
      appendToURLPath(directoryURL.url, encodeURIComponent(fileName)),
      directoryURL.pipeline
    );
  }

  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {File}
   * @memberof FileURL
   */
  private context: File;

  /**
   * Creates an instance of FileURL.
   *
   * @param {string} url A URL string pointing to Azure Storage file, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a file.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a file or directory name includes %, file or directory name must be encoded in the URL.
   *                     Such as a file named "myfile%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydirectory/myfile%25".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof FileURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new File(this.storageClientContext);
  }

  /**
   * Creates a new FileURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {FileURL}
   * @memberof FileURL
   */
  public withPipeline(pipeline: Pipeline): FileURL {
    return new FileURL(this.url, pipeline);
  }

  /**
   * Creates a new file or replaces a file. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {IFileCreateOptions} [options]
   * @returns {Promise<Models.FileCreateResponse>}
   * @memberof FileURL
   */
  public async create(
    aborter: Aborter,
    size: number,
    options: IFileCreateOptions = {}
  ): Promise<Models.FileCreateResponse> {
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

    options.fileHTTPHeaders = options.fileHTTPHeaders || {};

    return this.context.create(
      size, 
      fileAttributesToString(options.fileAttributes!),
      fileCreationTimeToString(options.creationTime!),
      fileLastWriteTimeToString(options.lastWriteTime!),
      {
        abortSignal: aborter,
        fileHTTPHeaders: options.fileHTTPHeaders,
        metadata: options.metadata,
        filePermission: options.filePermission,
        filePermissionKey: options.filePermissionKey
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset From which position of the file to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {IFileDownloadOptions} [options]
   * @returns {Promise<Models.FileDownloadResponse>}
   * @memberof FileURL
   */
  public async download(
    aborter: Aborter,
    offset: number,
    count?: number,
    options: IFileDownloadOptions = {}
  ): Promise<Models.FileDownloadResponse> {
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
      aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.FileGetPropertiesResponse>}
   * @memberof FileURL
   */
  public async getProperties(aborter: Aborter): Promise<Models.FileGetPropertiesResponse> {
    return this.context.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Sets properties on the file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {properties} [IFileProperties] File properties. For file HTTP headers(e.g. Content-Type),
   *                                       if no values are provided, existing HTTP headers will be removed.
   *                                       For other file properties(e.g. fileAttributes), if no values are provided,
   *                                       existing values will be preserved.
   * @returns {Promise<ISetPropertiesResponse>}
   * @memberof FileURL
   */
  public async setProperties(
    aborter: Aborter,
    properties: IFileProperties = {}
  ): Promise<ISetPropertiesResponse> {
    properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

    properties.fileHTTPHeaders = properties.fileHTTPHeaders || {};

    return this.context.setHTTPHeaders(
      fileAttributesToString(properties.fileAttributes!),
      fileCreationTimeToString(properties.creationTime!),
      fileLastWriteTimeToString(properties.lastWriteTime!),
      {
        abortSignal: aborter,
        fileHTTPHeaders: properties.fileHTTPHeaders,
        filePermission: properties.filePermission,
        filePermissionKey: properties.filePermissionKey
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.FileDeleteResponse>}
   * @memberof FileURL
   */
  public async delete(aborter: Aborter): Promise<Models.FileDeleteResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {fileHTTPHeaders} [IFileHTTPHeaders] File HTTP headers like Content-Type.
   *                                             Provide undefined will remove existing HTTP headers.
   * @returns {Promise<Models.FileSetHTTPHeadersResponse>}
   * @memberof FileURL
   */
  public async setHTTPHeaders(
    aborter: Aborter,
    fileHTTPHeaders: IFileHTTPHeaders = {}
  ): Promise<Models.FileSetHTTPHeadersResponse> {
    let options: IFileAndDirectorySetPropertiesCommonOptions = {};
    // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved.
    options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);

    return this.context.setHTTPHeaders(
      fileAttributesToString(options.fileAttributes!),
      fileCreationTimeToString(options.creationTime!),
      fileLastWriteTimeToString(options.lastWriteTime!),
      {
        abortSignal: aborter,
        fileHTTPHeaders: fileHTTPHeaders,
        filePermission: options.filePermission,
        filePermissionKey: options.filePermissionKey
      });
  }

  /**
   * Resize file.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} length Resizes a file to the specified size in bytes.
   *                        If the specified byte value is less than the current size of the file,
   *                        then all ranges above the specified byte value are cleared.
   * @returns {Promise<Models.FileSetHTTPHeadersResponse>}
   * @memberof FileURL
   */
  public async resize(
    aborter: Aborter,
    length: number
  ): Promise<Models.FileSetHTTPHeadersResponse> {
    if (length < 0) {
      throw new RangeError(`Size cannot less than 0 when resizing file.`);
    }

    let options: IFileAndDirectorySetPropertiesCommonOptions = {};
    // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved.
    options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);

    return this.context.setHTTPHeaders(
      fileAttributesToString(options.fileAttributes!),
      fileCreationTimeToString(options.creationTime!),
      fileLastWriteTimeToString(options.lastWriteTime!),
      {
        abortSignal: aborter,
        fileContentLength: length,
        filePermission: options.filePermission,
        filePermissionKey: options.filePermissionKey
      });
  }

  /**
   * Updates user-defined metadata for the specified file.
   *
   * If no metadata defined in the option parameter, the file
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-metadata
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IMetadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @returns {Promise<Models.FileSetMetadataResponse>}
   * @memberof FileURL
   */
  public async setMetadata(
    aborter: Aborter,
    metadata: IMetadata = {}
  ): Promise<Models.FileSetMetadataResponse> {
    return this.context.setMetadata({
      abortSignal: aborter,
      metadata
    });
  }

  /**
   * Upload a range of bytes to a file. Both the start and count of the
   * range must be specified. The range can be up to 4 MB in size.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation.
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} offset Offset position of the destination Azure File to upload.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {IFileUploadRangeOptions} [options={}]
   * @returns {Promise<Models.FileUploadRangeResponse>}
   * @memberof FileURL
   */
  public async uploadRange(
    aborter: Aborter,
    body: HttpRequestBody,
    offset: number,
    contentLength: number,
    options: IFileUploadRangeOptions = {}
  ): Promise<Models.FileUploadRangeResponse> {
    if (offset < 0) {
      throw new RangeError(`offset must be >= 0`);
    }

    if (contentLength <= 0 || contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
      throw new RangeError(`contentLength must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
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
   * Upload a range of bytes to a file where the contents are read from a another file's URL.
   * The range can be up to 4 MB in size.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation.
   * @param {string} sourceURL Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication.
   * @param {number} sourceOffset The source offset to copy from. Pass 0 to copy from the beginning of source file.
   * @param {number} destOffset Offset of destination file.
   * @param {number} count Number of bytes to be uploaded from source file.
   * @returns {Promise<Models.FileUploadRangeFromURLResponse>}
   * @memberof FileURL
   */
  public async uploadRangeFromURL(
    aborter: Aborter,
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number
  ): Promise<Models.FileUploadRangeFromURLResponse> {
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
        abortSignal: aborter
      }
    );
  }

  /**
   * Clears the specified range and
   * releases the space used in storage for that range.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset
   * @param {number} contentLength
   * @returns {Promise<Models.FileUploadRangeResponse>}
   * @memberof FileURL
   */
  public async clearRange(
    aborter: Aborter,
    offset: number,
    contentLength: number
  ): Promise<Models.FileUploadRangeResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IFileGetRangeListOptions} [options]
   * @returns {Promise<FileGetRangeListResponse>}
   * @memberof FileURL
   */
  public async getRangeList(
    aborter: Aborter,
    options: IFileGetRangeListOptions = {}
  ): Promise<FileGetRangeListResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copySource Specifies the URL of the source file or blob, up to 2 KB in length.
   * To copy a file to another file within the same storage account, you may use Shared Key to
   * authenticate the source file. If you are copying a file from another storage account, or if you
   * are copying a blob from the same storage account or another storage account, then you must
   * authenticate the source file or blob using a shared access signature. If the source is a public
   * blob, no authentication is required to perform the copy operation. A file in a share snapshot
   * can also be specified as a copy source.
   * @param {IFileStartCopyOptions} [options]
   * @returns {Promise<Models.FileStartCopyResponse>}
   * @memberof FileURL
   */
  public async startCopyFromURL(
    aborter: Aborter,
    copySource: string,
    options: IFileStartCopyOptions = {}
  ): Promise<Models.FileStartCopyResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copyId
   * @returns {Promise<Models.FileAbortCopyResponse>}
   * @memberof FileURL
   */
  public async abortCopyFromURL(
    aborter: Aborter,
    copyId: string
  ): Promise<Models.FileAbortCopyResponse> {
    return this.context.abortCopy(copyId, {
      abortSignal: aborter
    });
  }

  /**
   * Lists handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] Optional. A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {IFileListHandlesSegmentOptions} [options={}]
   * @returns {Promise<Models.FileListHandlesResponse>}
   * @memberof FileURL
   */
  public async listHandlesSegment(
    aborter: Aborter,
    marker?: string,
    options: IFileListHandlesSegmentOptions = {}
  ): Promise<Models.FileListHandlesResponse> {
    marker = marker === "" ? undefined : marker;
    const response = await this.context.listHandles({
      abortSignal: aborter,
      marker,
      ...options
    });

    // TODO: Protocol layer issue that when handle list is in returned XML
    // response.handleList is an empty string
    if (response.handleList as any === "") {
      response.handleList = undefined;
    }
    return response;
  }

  /**
   * Force close all handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   * 
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] Optional. A string value that identifies the position of handles that will 
   *                          be closed with the next force close handles operation. 
   *                          The operation returns a marker value within the response 
   *                          body if there are more handles to close. The marker value 
   *                          may then be used in a subsequent call to close the next set of handles.
   * @returns {Promise<Models.FileForceCloseHandlesResponse>}
   * @memberof FileURL
   */
  public async forceCloseHandlesSegment(
    aborter: Aborter,
    marker?: string,
  ): Promise<Models.FileForceCloseHandlesResponse> {
    marker = marker === "" ? undefined : marker;
    return this.context.forceCloseHandles("*", {
      abortSignal: aborter,
      marker,
    });
  }

  /**
   * Force close a specific handle for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} handleId Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseHandlesSegment() to close all handles.
   * @returns {Promise<Models.FileForceCloseHandlesResponse>}
   * @memberof FileURL
   */
  public async forceCloseHandle(
    aborter: Aborter,
    handleId: string
  ): Promise<Models.FileForceCloseHandlesResponse> {
    if (handleId === "*") {
      throw new RangeError(
        `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`
      );
    }

    return this.context.forceCloseHandles(handleId, {
      abortSignal: aborter
    });
  }
}
