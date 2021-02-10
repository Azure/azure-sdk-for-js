/**
 * This is a helper class to construct a string representing the NTFS attributes to a file or directory.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file#file-system-attributes
 *
 * @export
 * @class FileSystemAttributes
 */
export class FileSystemAttributes {
  /**
   * Creates a FileSystemAttributes from the specified attributes string. This method will throw an
   * Error if it encounters a string that does not correspond to a valid attributes.
   *
   * @static
   * @param fileAttributes - The value of header x-ms-file-attributes.
   *
   * @memberof FileSystemAttributes
   */
  public static parse(fileAttributes: string): FileSystemAttributes {
    if (!fileAttributes) {
      throw new RangeError(`Invalid fileAttributes: '${fileAttributes}'.`);
    }

    const fileSystemAttributes = new FileSystemAttributes();

    const attributes = fileAttributes.trim().split("|");

    for (let str of attributes) {
      str = str.trim();
      switch (str) {
        case "ReadOnly":
          fileSystemAttributes.readonly = true;
          break;
        case "Hidden":
          fileSystemAttributes.hidden = true;
          break;
        case "System":
          fileSystemAttributes.system = true;
          break;
        case "None":
          fileSystemAttributes.none = true;
          break;
        case "Temporary":
          fileSystemAttributes.temporary = true;
          break;
        case "Offline":
          fileSystemAttributes.offline = true;
          break;
        case "Directory":
          fileSystemAttributes.directory = true;
          break;
        case "Archive":
          fileSystemAttributes.archive = true;
          break;
        case "NotContentIndexed":
          fileSystemAttributes.notContentIndexed = true;
          break;
        case "NoScrubData":
          fileSystemAttributes.noScrubData = true;
          break;
        default:
          throw new RangeError(`Invalid attribute: ${str}`);
      }
    }

    return fileSystemAttributes;
  }

  /**
   * Specifies a directory or file that is read-only.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public readonly: boolean = false;

  /**
   * Specifies a directory or file is hidden.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public hidden: boolean = false;

  /**
   * Specifies a directory or file that the operating system uses a part of, or uses exclusively.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public system: boolean = false;

  /**
   * Specifies a directory or file that does not have other attributes set. This attribute is valid only when used alone.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public none: boolean = false;

  /**
   * Specifies the handle identifies a directory.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public directory: boolean = false;

  /**
   * Specifies a directory or file is an archive. Applications typically use this attribute to mark files for backup or removal.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public archive: boolean = false;

  /**
   * Specifies if a file is temporary.
   */
  public temporary: boolean = false;

  /**
   * Specifies the data of a directory or file is not available immediately.
   * This file system attribute is presented primarily to provide compatibility with Windows - Azure Files does not support with offline storage options.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public offline: boolean = false;

  /**
   * Specifies the directory or file is not to be indexed by the content indexing service.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public notContentIndexed: boolean = false;

  /**
   * Specifies the user data stream not to be read by the background data integrity scanner.
   * This file system attribute is presented primarily to provide compatibility with Windows.
   * Applicable to directory or file.
   *
   * @type {boolean}
   * @memberof FileSystemAttributes
   */
  public noScrubData: boolean = false;

  /**
   * Converts the given attributes to a string.
   *
   * @returns A string which represents the FileSystemAttributes
   * @memberof FileSystemAttributes
   */
  public toString(): string {
    const attributes: string[] = [];
    if (this.readonly) {
      attributes.push("ReadOnly");
    }
    if (this.hidden) {
      attributes.push("Hidden");
    }
    if (this.system) {
      attributes.push("System");
    }
    if (this.none) {
      attributes.push("None");
    }
    if (this.temporary) {
      attributes.push("Temporary");
    }
    if (this.directory) {
      attributes.push("Directory");
    }
    if (this.archive) {
      attributes.push("Archive");
    }
    if (this.offline) {
      attributes.push("Offline");
    }
    if (this.notContentIndexed) {
      attributes.push("NotContentIndexed");
    }
    if (this.noScrubData) {
      attributes.push("NoScrubData");
    }
    return attributes.join("|");
  }
}
