import { HttpRequestBody, isNode, TransferProgressEvent } from "ms-rest-js";
import { Aborter } from "./Aborter";
import { ContainerURL } from "./ContainerURL";
import { FileDownloadResponse } from "./FileDownloadResponse";
import * as Models from "./generated/models";
import { File } from "./generated/operations";
import { IRange, rangeToString } from "./IRange";
import { IFileHTTPHeaders, IMetadata } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";
import { FILE_RANGE_MAX_SIZE_BYTES } from "./utils/constants";
import { appendToURLPath } from "./utils/utils.common";

export interface IFileCreateOptions {
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

export interface IFileDownloadOptions {
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of end will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
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

export interface IFileSetHTTPHeadersOptions {
  /**
   * File HTTP headers like Content-Type.
   *
   * @type {IFileHTTPHeaders}
   * @memberof IFileCreateOptions
   */
  fileHTTPHeaders?: IFileHTTPHeaders;
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

export interface IFileGetRangeListOptions {
  /**
   * Optional. Specifies the range of bytes over which to list ranges, inclusively.
   *
   * @type {IRange}
   * @memberof IFileGetRangeListOptions
   */
  range?: IRange;
}

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
   * @param {DirectoryURL} directoryURL
   * @param {string} fileName
   * @returns
   * @memberof FileURL
   */
  public static fromDirectoryURL(directoryURL: ContainerURL, fileName: string) {
    return new FileURL(
      appendToURLPath(directoryURL.url, fileName),
      directoryURL.pipeline
    );
  }

  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {Blobs}
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
      throw new RangeError(
        `rangeGetContentMD5 only work with partial data downloading`
      );
    }

    const res = await this.context.download({
      abortSignal: aborter,
      onDownloadProgress: !isNode ? options.progress : undefined,
      range:
        offset === 0 && !count ? undefined : rangeToString({ offset, count }),
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
    if (!options.maxRetryRequests) {
      options.maxRetryRequests = 5; // TODO: Default value or make it a required parameter?
    }

    if (!res.contentLength) {
      throw new RangeError(
        `File download response doesn't contain valid content length header`
      );
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

        return (await this.context.download({
          abortSignal: aborter,
          ...updatedOptions
        })).readableStreamBody!;
      },
      offset,
      offset + res.contentLength! - 1,
      options.maxRetryRequests,
      options.progress
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
  public async getProperties(
    aborter: Aborter
  ): Promise<Models.FileGetPropertiesResponse> {
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
   * @param {IFileSetHTTPHeadersOptions} [options]
   * @returns {Promise<Models.FileSetHTTPHeadersResponse>}
   * @memberof FileURL
   */
  public async setHTTPHeaders(
    aborter: Aborter,
    options: IFileSetHTTPHeadersOptions = {}
  ): Promise<Models.FileSetHTTPHeadersResponse> {
    options.fileHTTPHeaders = options.fileHTTPHeaders || {};
    return this.context.setHTTPHeaders({
      abortSignal: aborter,
      ...options
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
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {HttpRequestBody} body
   * @param {number} offset
   * @param {number} contentLength
   * @param {IFileUploadRangeOptions} [options]
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
    if (offset < 0 || contentLength <= 0) {
      throw new RangeError(`offset must >= 0 and contentLength must be > 0`);
    }

    if (contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
      throw new RangeError(
        `offset must be < ${FILE_RANGE_MAX_SIZE_BYTES} bytes`
      );
    }

    return this.context.uploadRange(
      rangeToString({ count: contentLength, offset }),
      Models.FileRangeWriteType.Update,
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

    return this.context.uploadRange(
      rangeToString({ count: contentLength, offset }),
      Models.FileRangeWriteType.Clear,
      0,
      {
        abortSignal: aborter
      }
    );
  }

  /**
   * Returns the list of valid ranges for a file.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IFileGetRangeListOptions} [options]
   * @returns {Promise<Models.FileGetRangeListResponse>}
   * @memberof FileURL
   */
  public async getRangeList(
    aborter: Aborter,
    options: IFileGetRangeListOptions = {}
  ): Promise<Models.FileGetRangeListResponse> {
    return this.context.getRangeList({
      abortSignal: aborter,
      range: options.range ? rangeToString(options.range) : undefined
    });
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
}
