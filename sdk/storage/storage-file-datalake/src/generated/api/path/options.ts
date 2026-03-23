// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PathResourceType,
  PathRenameMode,
  EncryptionAlgorithmType,
  PathExpiryOptions,
  PathSetAccessControlRecursiveMode,
  PathGetPropertiesAction,
  LeaseAction,
} from "../../models/azure/storage/files/dataLake/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PathUndeleteOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Only for hierarchical namespace enabled accounts. Optional. The path of the soft deleted blob to undelete. */
  undeleteSource?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathSetExpiryOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** The time to set the blob to expiry. */
  expiresOn?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathAppendDataOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** This parameter allows the caller to upload data in parallel and control the order in which it is appended to the file. It is required when uploading data to be appended to the file and when flushing previously uploaded data to the file. The value must be the position where the data is to be appended. Uploaded data is not immediately flushed, or written, to the file. To flush, the previously uploaded data must be contiguous, the position parameter must be specified and equal to the length of the file after all data has been written, and there must not be a request entity body included with the request. */
  position?: number;
  /** Required for "Append Data" and "Flush Data". Must be 0 for "Flush Data". Must be the length of the request content in bytes for "Append Data". */
  contentLength?: number;
  /** Specify the transactional md5 for the body, to be validated by the service. */
  transactionalContentHash?: Uint8Array;
  /** Specify the transactional crc64 for the body, to be validated by the service. */
  transactionalContentCrc64?: Uint8Array;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. If "acquire" it will acquire the lease. If "auto-renew" it will renew the lease. If "release" it will release the lease only on flush. If "acquire-release" it will acquire & complete the operation & release the lease once operation is done. */
  leaseAction?: LeaseAction;
  /** The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds. The lease duration must be between 15 and 60 seconds or -1 for infinite lease. */
  leaseDuration?: number;
  /** Proposed lease ID, in a GUID string format. */
  proposedLeaseId?: string;
  /** Optional. Specifies the encryption key to use to encrypt the data provided in the request. If not specified, encryption is performed with the root account encryption key. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key header is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-encryption-key header is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** If file should be flushed after the append. */
  flush?: boolean;
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathFlushDataOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** This parameter allows the caller to upload data in parallel and control the order in which it is appended to the file. It is required when uploading data to be appended to the file and when flushing previously uploaded data to the file. The value must be the position where the data is to be appended. Uploaded data is not immediately flushed, or written, to the file. To flush, the previously uploaded data must be contiguous, the position parameter must be specified and equal to the length of the file after all data has been written, and there must not be a request entity body included with the request. */
  position?: number;
  /** Valid only for flush operations. If "true", uncommitted data is retained after the flush operation completes; otherwise, the uncommitted data is deleted after the flush operation. The default is false. Data at offsets less than the specified position are written to the file when flush succeeds, but this optional parameter allows data after the flush position to be retained for a future flush operation. */
  retainUncommittedData?: boolean;
  /** Azure Storage Events allow applications to receive notifications when files change. When Azure Storage Events are enabled, a file changed event is raised. This event has a property indicating whether this is the final change to distinguish the difference between an intermediate flush to a file stream and the final close of a file stream. The close query parameter is valid only when the action is "flush" and change notifications are enabled. If the value of close is "true" and the flush operation completes successfully, the service raises a file change notification with a property indicating that this is the final update (the file stream has been closed). If "false" a change notification is raised indicating the file has changed. The default is false. This query parameter is set to true by the Hadoop ABFS driver to indicate that the file stream has been closed. */
  close?: boolean;
  /** Required for "Append Data" and "Flush Data". Must be 0 for "Flush Data". Must be the length of the request content in bytes for "Append Data". */
  contentLength?: number;
  /** Specify the transactional md5 for the body, to be validated by the service. */
  contentMD5?: Uint8Array;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. If "acquire" it will acquire the lease. If "auto-renew" it will renew the lease. If "release" it will release the lease only on flush. If "acquire-release" it will acquire & complete the operation & release the lease once operation is done. */
  leaseAction?: LeaseAction;
  /** The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds. The lease duration must be between 15 and 60 seconds or -1 for infinite lease. */
  leaseDuration?: number;
  /** Proposed lease ID, in a GUID string format. */
  proposedLeaseId?: string;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  cacheControl?: string;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  contentType?: string;
  /** Optional. Sets the blob's Content-Disposition header. */
  contentDisposition?: string;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  contentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  contentLanguage?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Optional. Specifies the encryption key to use to encrypt the data provided in the request. If not specified, encryption is performed with the root account encryption key. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key header is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-encryption-key header is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathSetAccessControlRecursiveOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Optional. When deleting a directory, the number of paths that are deleted with each invocation is limited. If the number of paths to be deleted exceeds this limit, a continuation token is returned in this response header. When a continuation token is returned in the response, it must be specified in a subsequent invocation of the delete operation to continue deleting the directory. */
  continuation?: string;
  /** Optional. Valid for "SetAccessControlRecursive" operation. If set to false, the operation will terminate quickly on encountering user errors (4XX). If true, the operation will ignore user errors and proceed with the operation on other sub-entities of the directory. Continuation token will only be returned when forceFlag is true in case of user errors. If not set the default value is false for this. */
  forceFlag?: boolean;
  /** Optional. It specifies the maximum number of files or directories on which the acl change will be applied. If omitted or greater than 2,000, the request will process up to 2,000 items. */
  maxRecords?: number;
  /** Sets POSIX access control rights on files and directories. The value is a comma-separated list of access control entries. Each access control entry (ACE) consists of a scope, a type, a user or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]". */
  acl?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathSetAccessControlOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. The owner of the blob or directory. */
  owner?: string;
  /** Optional. The owning group of the blob or directory. */
  group?: string;
  /** Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX access permissions for the file owner, the file owning group, and others. Each class may be granted read, write, or execute permission. The sticky bit is also supported. Both symbolic (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported. */
  permissions?: string;
  /** Sets POSIX access control rights on files and directories. The value is a comma-separated list of access control entries. Each access control entry (ACE) consists of a scope, a type, a user or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]". */
  acl?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathDeleteOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Required */
  recursive?: boolean;
  /** Optional. When deleting a directory, the number of paths that are deleted with each invocation is limited. If the number of paths to be deleted exceeds this limit, a continuation token is returned in this response header. When a continuation token is returned in the response, it must be specified in a subsequent invocation of the delete operation to continue deleting the directory. */
  continuation?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** If true, paginated behavior will be seen. Pagination is for the recursive ACL checks as a POSIX requirement in the server and Delete in an atomic operation once the ACL checks are completed. If false or missing, normal default behavior will kick in, which may timeout in case of very large directories due to recursive ACL checks. This new parameter is introduced for backward compatibility. */
  paginated?: boolean;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathGetPropertiesOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Optional. If the value is "getStatus" only the system defined properties for the path are returned. If the value is "getAccessControl" the access control list is returned in the response headers (Hierarchical Namespace must be enabled for the account), otherwise the properties are returned. */
  action?: PathGetPropertiesAction;
  /** Optional. Valid only when Hierarchical Namespace is enabled for the account. If "true", the user identity values returned in the x-ms-owner, x-ms-group, and x-ms-acl response headers will be transformed from Azure Active Directory Object IDs to User Principal Names. If "false", the values will be returned as Azure Active Directory Object IDs. The default value is false. Note that group and application Object IDs are not translated because they do not have unique friendly names. */
  upn?: boolean;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathReadOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** The HTTP Range request header specifies one or more byte ranges of the resource to be retrieved. */
  range?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. When this header is set to "true" and specified together with the Range header, the service returns the MD5 hash for the range, as long as the range is less than or equal to 4MB in size. */
  rangeGetContentMD5?: boolean;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Optional. Specifies the encryption key to use to encrypt the data provided in the request. If not specified, encryption is performed with the root account encryption key. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key header is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-encryption-key header is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathLeaseOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds. The lease duration must be between 15 and 60 seconds or -1 for infinite lease. */
  leaseDuration?: number;
  /** The lease break period duration is optional to break a lease, and specifies the break period of the lease in seconds. The lease break duration must be between 0 and 60 seconds. */
  leaseBreakPeriod?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Proposed lease ID, in a GUID string format. */
  proposedLeaseId?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathUpdateOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Optional. Valid for "SetAccessControlRecursive" operation. It specifies the maximum number of files or directories on which the acl change will be applied. If omitted or greater than 2,000, the request will process up to 2,000 items. */
  maxRecords?: number;
  /** Optional. The number of paths processed with each invocation is limited. If the number of paths to be processed exceeds this limit, a continuation token is returned in the response header x-ms-continuation. When a continuation token is returned in the response, it must be percent-encoded and specified in a subsequent invocation of setAccessControlRecursive operation. */
  continuation?: string;
  /** Mode for set access control recursive. */
  mode?: PathSetAccessControlRecursiveMode;
  /** Optional. Valid for "SetAccessControlRecursive" operation. If set to false, the operation will terminate quickly on encountering user errors (4XX). If true, the operation will ignore user errors and proceed with the operation on other sub-entities of the directory. Continuation token will only be returned when forceFlag is true in case of user errors. If not set the default value is false for this. */
  forceFlag?: boolean;
  /** This parameter allows the caller to upload data in parallel and control the order in which it is appended to the file. It is required when uploading data to be appended to the file and when flushing previously uploaded data to the file. The value must be the position where the data is to be appended. Uploaded data is not immediately flushed, or written, to the file. To flush, the previously uploaded data must be contiguous, the position parameter must be specified and equal to the length of the file after all data has been written, and there must not be a request entity body included with the request. */
  position?: number;
  /** Valid only for flush operations. If "true", uncommitted data is retained after the flush operation completes; otherwise, the uncommitted data is deleted after the flush operation. The default is false. Data at offsets less than the specified position are written to the file when flush succeeds, but this optional parameter allows data after the flush position to be retained for a future flush operation. */
  retainUncommittedData?: boolean;
  /** Azure Storage Events allow applications to receive notifications when files change. When Azure Storage Events are enabled, a file changed event is raised. This event has a property indicating whether this is the final change to distinguish the difference between an intermediate flush to a file stream and the final close of a file stream. The close query parameter is valid only when the action is "flush" and change notifications are enabled. If the value of close is "true" and the flush operation completes successfully, the service raises a file change notification with a property indicating that this is the final update (the file stream has been closed). If "false" a change notification is raised indicating the file has changed. The default is false. This query parameter is set to true by the Hadoop ABFS driver to indicate that the file stream has been closed. */
  close?: boolean;
  /** Required for "Append Data" and "Flush Data". Must be 0 for "Flush Data". Must be the length of the request content in bytes for "Append Data". */
  contentLength?: number;
  /** Specify the transactional md5 for the body, to be validated by the service. */
  contentMD5?: Uint8Array;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  cacheControl?: string;
  /** Optional. Sets the blob's Content-Disposition header. */
  contentDisposition?: string;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  contentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  contentLanguage?: string;
  /** Optional. User-defined properties to be stored with the filesystem, in the format of a comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is a base64 encoded string. Note that the string may only contain ASCII characters in the ISO-8859-1 character set. If the filesystem exists, any properties not included in the list will be removed. All properties are removed if the header is omitted. To merge new and existing properties, first get all existing properties and the current E-Tag, then make a conditional request with the E-Tag and include values for all properties. */
  properties?: string;
  /** Optional. The owner of the blob or directory. */
  owner?: string;
  /** Optional. The owning group of the blob or directory. */
  group?: string;
  /** Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX access permissions for the file owner, the file owning group, and others. Each class may be granted read, write, or execute permission. The sticky bit is also supported. Both symbolic (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported. */
  permissions?: string;
  /** Sets POSIX access control rights on files and directories. The value is a comma-separated list of access control entries. Each access control entry (ACE) consists of a scope, a type, a user or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]". */
  acl?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface PathCreateOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Required only for Create File and Create Directory. The value must be "file" or "directory". */
  resource?: PathResourceType;
  /** Optional. Valid only when namespace is enabled. This parameter determines the behavior of the rename operation. The value must be "legacy" or "posix", and the default value will be "posix". */
  mode?: PathRenameMode;
  /** Optional. When deleting a directory, the number of paths that are deleted with each invocation is limited. If the number of paths to be deleted exceeds this limit, a continuation token is returned in this response header. When a continuation token is returned in the response, it must be specified in a subsequent invocation of the delete operation to continue deleting the directory. */
  continuation?: string;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  cacheControl?: string;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  contentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  contentLanguage?: string;
  /** Optional. Sets the blob's Content-Disposition header. */
  contentDisposition?: string;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  contentType?: string;
  /** An optional file or directory to be renamed. The value must have the following format: "/{filesystem}/{path}". If "x-ms-properties" is specified, the properties will overwrite the existing properties; otherwise, the existing properties will be preserved. This value must be a URL percent-encoded string. Note that the string may only contain ASCII characters in the ISO-8859-1 character set. */
  renameSource?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** A lease ID for the source path. If specified, the source path must have an active lease and the lease ID must match. */
  sourceLeaseId?: string;
  /** Optional. User-defined properties to be stored with the filesystem, in the format of a comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is a base64 encoded string. Note that the string may only contain ASCII characters in the ISO-8859-1 character set. If the filesystem exists, any properties not included in the list will be removed. All properties are removed if the header is omitted. To merge new and existing properties, first get all existing properties and the current E-Tag, then make a conditional request with the E-Tag and include values for all properties. */
  properties?: string;
  /** Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX access permissions for the file owner, the file owning group, and others. Each class may be granted read, write, or execute permission. The sticky bit is also supported. Both symbolic (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported. */
  permissions?: string;
  /** Optional and only valid if Hierarchical Namespace is enabled for the account. When creating a file or directory and the parent folder does not have a default ACL, the umask restricts the permissions of the file or directory to be created. The resulting permission is given by p bitwise and not u, where p is the permission and u is the umask. For example, if p is 0777 and u is 0057, then the resulting permission is 0720. The default permission is 0777 for a directory and 0666 for a file. The default umask is 0027. The umask must be specified in 4-digit octal notation (e.g. 0766). */
  umask?: string;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  sourceIfMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  sourceIfNoneMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  sourceIfUnmodifiedSince?: Date;
  /** Optional. Specifies the encryption key to use to encrypt the data provided in the request. If not specified, encryption is performed with the root account encryption key. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key header is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-encryption-key header is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional. The owner of the blob or directory. */
  owner?: string;
  /** Optional. The owning group of the blob or directory. */
  group?: string;
  /** Sets POSIX access control rights on files and directories. The value is a comma-separated list of access control entries. Each access control entry (ACE) consists of a scope, a type, a user or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]". */
  acl?: string;
  /** Proposed lease ID, in a GUID string format. */
  proposedLeaseId?: string;
  /** The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds. The lease duration must be between 15 and 60 seconds or -1 for infinite lease. */
  leaseDuration?: number;
  /** Required. Indicates mode of the expiry time. */
  expiryOptions?: PathExpiryOptions;
  /** The time to set the blob to expiry. */
  expiresOn?: string;
  /** Specifies the encryption context to set on the file. */
  encryptionContext?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}
