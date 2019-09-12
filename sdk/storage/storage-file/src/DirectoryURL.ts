import { Aborter } from "./Aborter";
import * as Models from "./generated/src/models";
import { Directory } from "./generated/src/operations";
import { 
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
import { ShareURL } from "./ShareURL";
import { StorageURL } from "./StorageURL";
import { appendToURLPath } from "./utils/utils.common";
import { FileSystemAttributes } from './FileSystemAttributes';

export interface IDirectoryCreateOptions extends IFileAndDirectoryCreateCommonOptions {
  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @type {IMetadata}
   * @memberof IDirectoryCreateOptions
   */
  metadata?: IMetadata;
}

export interface IDirectoryProperties extends IFileAndDirectorySetPropertiesCommonOptions {}

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

export interface IDirectoryListHandlesSegmentOptions {
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxresults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   */
  maxresults?: number;
  /**
   * Specifies operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   */
  recursive?: boolean;
}

export interface IDirectoryForceCloseHandlesSegmentOptions {
  /**
   * Specifies operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   */
  recursive?: boolean;
}

/**
 * A DirectoryURL represents a URL to the Azure Storage directory allowing you to manipulate its files and directories.
 *
 * @export
 * @class DirectoryURL
 * @extends {StorageURL}
 */
export class DirectoryURL extends StorageURL {
  /**
   * Creates a DirectoryURL object from ShareURL.
   *
   * @param shareURL A ShareURL object
   * @param directoryName A directory name
   */
  public static fromShareURL(shareURL: ShareURL, directoryName: string): DirectoryURL {
    return new DirectoryURL(
      appendToURLPath(shareURL.url, encodeURIComponent(directoryName)),
      shareURL.pipeline
    );
  }

  /**
   * Creates a DirectoryURL object from an existing DirectoryURL.
   *
   * @param directoryURL A DirectoryURL object
   * @param directoryName A subdirectory name
   */
  public static fromDirectoryURL(directoryURL: DirectoryURL, directoryName: string): DirectoryURL {
    return new DirectoryURL(
      appendToURLPath(directoryURL.url, encodeURIComponent(directoryName)),
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
   *                     This method accepts an encoded URL or non-encoded URL pointing to a directory.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a directory name includes %, directory name must be encoded in the URL.
   *                     Such as a directory named "mydir%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydir%25".
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
   * @param {IDirectoryCreateOptions} [options={}]
   * @returns {Promise<Models.DirectoryCreateResponse>}
   * @memberof DirectoryURL
   */
  public async create(
    aborter: Aborter,
    options: IDirectoryCreateOptions = {}
  ): Promise<Models.DirectoryCreateResponse> {
    options = validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(options);

    if (!options.fileAttributes) {
      // By default set it as a directory.
      const attributes: FileSystemAttributes = new FileSystemAttributes();
      attributes.directory = true; 
      options.fileAttributes = attributes;
    }

    return this.context.create(
      fileAttributesToString(options.fileAttributes!),
      fileCreationTimeToString(options.creationTime!),
      fileLastWriteTimeToString(options.lastWriteTime!),
      {
        abortSignal: aborter,
        metadata: options.metadata,
        filePermission: options.filePermission,
        filePermissionKey: options.filePermissionKey
      });
  }

  /**
   * Sets properties on the directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {properties} [IDirectoryProperties] Directory properties. If no values are provided,
   *                                            existing values will be preserved.
   * @returns {Promise<ISetPropertiesResponse>}
   * @memberof FileURL
   */
  public async setProperties(
    aborter: Aborter,
    properties: IDirectoryProperties = {}
  ): Promise<Models.DirectorySetPropertiesResponse> {
    properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

    return this.context.setProperties(
      fileAttributesToString(properties.fileAttributes!),
      fileCreationTimeToString(properties.creationTime!),
      fileLastWriteTimeToString(properties.lastWriteTime!),
      {
        abortSignal: aborter,
        filePermission: properties.filePermission,
        filePermissionKey: properties.filePermissionKey
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
  public async getProperties(aborter: Aborter): Promise<Models.DirectoryGetPropertiesResponse> {
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
  public async delete(aborter: Aborter): Promise<Models.DirectoryDeleteResponse> {
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

  /**
   * Lists handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] Optional. A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {IDirectoryListHandlesSegmentOptions} [options={}]
   * @returns {Promise<Models.DirectoryListHandlesResponse>}
   * @memberof DirectoryURL
   */
  public async listHandlesSegment(
    aborter: Aborter,
    marker?: string,
    options: IDirectoryListHandlesSegmentOptions = {}
  ): Promise<Models.DirectoryListHandlesResponse> {
    marker = marker === "" ? undefined : marker;
    const response = await this.context.listHandles({
      abortSignal: aborter,
      marker,
      ...options
    });

    // TODO: Protocol layer issue that when handle list is in returned XML
    // response.handleList is an empty string
    if ((response.handleList as any) === "") {
      response.handleList = undefined;
    }
    return response;
  }

  /**
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] Optional. A string value that identifies the position of handles that will 
   *                          be closed with the next force close handles operation. 
   *                          The operation returns a marker value within the response 
   *                          body if there are more handles to close. The marker value 
   *                          may then be used in a subsequent call to close the next set of handles.
   * @param {IDirectoryForceCloseHandlesSegmentOptions} [options={}]
   * @returns {Promise<Models.DirectoryForceCloseHandlesResponse>}
   * @memberof DirectoryURL
   */
  public async forceCloseHandlesSegment(
    aborter: Aborter,
    marker?: string,
    options: IDirectoryForceCloseHandlesSegmentOptions = {}
  ): Promise<Models.DirectoryForceCloseHandlesResponse> {
    marker = marker === "" ? undefined : marker;
    return this.context.forceCloseHandles("*", {
      abortSignal: aborter,
      marker,
      ...options
    });
  }

  /**
   * Force close a specific handle for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} handleId Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseHandlesSegment() to close all handles.
   * @returns {Promise<Models.DirectoryForceCloseHandlesResponse>}
   * @memberof DirectoryURL
   */
  public async forceCloseHandle(
    aborter: Aborter,
    handleId: string
  ): Promise<Models.DirectoryForceCloseHandlesResponse> {
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
