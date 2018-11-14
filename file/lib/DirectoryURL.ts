import { Aborter } from "./Aborter";
import * as Models from "./generated/models";
import { Directory } from "./generated/operations";
import { IMetadata } from "./models";
import { Pipeline } from "./Pipeline";
import { ShareURL } from "./ShareURL";
import { StorageURL } from "./StorageURL";
import { appendToURLPath } from "./utils/utils.common";

export interface IDirectoryCreateOptions {
  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @type {IMetadata}
   * @memberof IDirectoryCreateOptions
   */
  metadata?: IMetadata;
}

export interface IDirectoryListFilesAndDirectoriesSegmentOptions {
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof IDirectoryListFilesAndDirectoriesSegmentOptions
   */
  prefix?: string;

  /**
   * Specifies the maximum number of entries to
   * return. If the request does not specify maxresults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof IDirectoryListFilesAndDirectoriesSegmentOptions
   */
  maxresults?: number;
}

/**
 * A DirectoryURL represents a URL to the Azure Storage directory allowing you to manipulate its files.
 *
 * @export
 * @class DirectoryURL
 * @extends {StorageURL}
 */
export class DirectoryURL extends StorageURL {
  /**
   * Creates a DirectoryURL object from ShareURL
   *
   * @param shareURL
   * @param directoryName
   */
  public static fromShareURL(
    shareURL: ShareURL,
    directoryName: string
  ): DirectoryURL {
    return new DirectoryURL(
      appendToURLPath(shareURL.url, directoryName),
      shareURL.pipeline
    );
  }

  /**
   * Creates a DirectoryURL object from an existing DirectoryURL
   *
   * @param directoryURL
   * @param directoryName
   */
  public static fromDirectoryURL(
    directoryURL: DirectoryURL,
    directoryName: string
  ): DirectoryURL {
    return new DirectoryURL(
      appendToURLPath(directoryURL.url, directoryName),
      directoryURL.pipeline
    );
  }

  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {Directory}
   * @memberof DirectoryURL
   */
  private context: Directory;

  /**
   * Creates an instance of DirectoryURL.
   *
   * @param {string} url A URL string pointing to Azure Storage file directory, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory?sasString".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof DirectoryURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new Directory(this.storageClientContext);
  }

  /**
   * Creates a new DirectoryURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {DirectoryURL}
   * @memberof DirectoryURL
   */
  public withPipeline(pipeline: Pipeline): DirectoryURL {
    return new DirectoryURL(this.url, pipeline);
  }

  /**
   * Creates a new directory under the specified share or parent directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IDirectoryCreateOptions} [options]
   * @returns {Promise<Models.DirectoryCreateResponse>}
   * @memberof DirectoryURL
   */
  public async create(
    aborter: Aborter,
    options: IDirectoryCreateOptions = {}
  ): Promise<Models.DirectoryCreateResponse> {
    return this.context.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Returns all system properties for the specified directory, and can also be used to check the
   * existence of a directory. The data returned does not include the files in the directory or any
   * subdirectories.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-directory-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.DirectoryGetPropertiesResponse>}
   * @memberof DirectoryURL
   */
  public async getProperties(
    aborter: Aborter
  ): Promise<Models.DirectoryGetPropertiesResponse> {
    return this.context.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Removes the specified empty directory. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.DirectoryDeleteResponse>}
   * @memberof DirectoryURL
   */
  public async delete(
    aborter: Aborter
  ): Promise<Models.DirectoryDeleteResponse> {
    return this.context.deleteMethod({
      abortSignal: aborter
    });
  }

  /**
   * Updates user defined metadata for the specified directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-metadata
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IMetadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @returns {Promise<Models.DirectorySetMetadataResponse>}
   * @memberof DirectoryURL
   */
  public async setMetadata(
    aborter: Aborter,
    metadata?: IMetadata
  ): Promise<Models.DirectorySetMetadataResponse> {
    return this.context.setMetadata({
      abortSignal: aborter,
      metadata
    });
  }

  /**
   * Returns a list of files or directories under the specified share or directory. It lists the
   * contents only for a single level of the directory hierarchy.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-directories-and-files
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker]
   * @param {IDirectoryListFilesAndDirectoriesSegmentOptions} [options]
   * @returns {Promise<Models.DirectoryListFilesAndDirectoriesSegmentResponse>}
   * @memberof DirectoryURL
   */
  public async listFilesAndDirectoriesSegment(
    aborter: Aborter,
    marker?: string,
    options: IDirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): Promise<Models.DirectoryListFilesAndDirectoriesSegmentResponse> {
    return this.context.listFilesAndDirectoriesSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
