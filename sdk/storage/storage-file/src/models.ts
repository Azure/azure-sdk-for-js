export interface IMetadata {
  [propertyName: string]: string;
}

export interface IFileHTTPHeaders {
  /**
   * @member {string} [fileCacheControl] Optional. Sets the file's cache
   * control. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileCacheControl?: string;
  /**
   * @member {string} [fileContentType] Optional. Sets the file's content type.
   * If specified, this property is stored with the file and returned with a
   * read request.
   */
  fileContentType?: string;
  /**
   * @member {Uint8Array} [fileContentMD5] Optional. An MD5 hash of the file
   * content. Note that this hash is not validated, as the hashes for the
   * individual blocks were validated when each was uploaded.
   */
  fileContentMD5?: Uint8Array;
  /**
   * @member {string} [fileContentEncoding] Optional. Sets the file's content
   * encoding. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentEncoding?: string;
  /**
   * @member {string} [fileContentLanguage] Optional. Set the file's content
   * language. If specified, this property is stored with the file and returned
   * with a read request.
   */
  fileContentLanguage?: string;
  /**
   * @member {string} [fileContentDisposition] Optional. Sets the file's
   * Content-Disposition header.
   */
  fileContentDisposition?: string;
}
