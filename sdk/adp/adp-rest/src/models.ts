/** A discovery resource. */
export interface Discovery {
  /** The discovery identifier. */
  discoveryId: string;
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload */
  externalPackageId?: string;
  /**
   * SAS signed URI for uploading or reading the discovery manifest file on Azure Storage.
   * Note, if the discovery status is 'Created' then the URI is signed with 'Write' permissions, otherwise with 'Read' permission.
   * This URI expires in 24 hours.
   */
  manifestUploadUri?: string;
  /**
   * The discovery status.
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
}

/** An upload resource. */
export interface Upload {
  /** ID of the external package (for example, the disk which contained data) which was used upon the creation of upload. */
  externalPackageId?: string;
  /** The discovery identifier. */
  discoveryId?: string;
  /**
   * SAS signed URI for uploading or reading the upload manifest file on Azure Storage.
   * Note, if the upload status is 'Created' then the URI is signed with 'Write' permissions, otherwise with 'Read' permission.
   * This URI expires in 24 hours.
   */
  manifestUploadUri?: string;
  /**
   * The upload state
   *
   * Possible values: Created, GeneratingSpecialFilesUploadInfo, GeneratedSpecialFilesUploadInfo, GeneratingDataFilesUploadInfo, GeneratedDataFilesUploadInfo, Completing, Completed, Aborting, Aborted, Failed
   */
  status?: string;
  /** The endpoint uri of the owning resource */
  resourceEndpoint?: string;
}
