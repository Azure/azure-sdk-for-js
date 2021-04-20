// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobServiceProperties, ServiceGetPropertiesHeaders } from "@azure/storage-blob";
import * as coreHttp from "@azure/core-http";

export * from "./DataLakeServiceClient";
export * from "./DataLakeFileSystemClient";
export * from "./clients";
export * from "./DataLakeLeaseClient";
export * from "./sas/AccountSASPermissions";
export * from "./sas/AccountSASResourceTypes";
export * from "./sas/AccountSASServices";
export * from "./sas/AccountSASSignatureValues";
export * from "./sas/DataLakeSASPermissions";
export * from "./sas/DataLakeSASSignatureValues";
export * from "./sas/FileSystemSASPermissions";
export * from "./StorageBrowserPolicyFactory";
export * from "./credentials/AnonymousCredential";
export * from "./credentials/Credential";
export * from "./credentials/StorageSharedKeyCredential";
export * from "./Pipeline";
export * from "./policies/AnonymousCredentialPolicy";
export * from "./policies/CredentialPolicy";
export * from "./StorageRetryPolicyFactory";
export * from "./policies/StorageSharedKeyCredentialPolicy";
export * from "./sas/SASQueryParameters";
export * from "./models";
export * from "./utils/DataLakeAclChangeFailedError";
export { CommonOptions } from "./StorageClient";
export { SasIPRange } from "./sas/SasIPRange";
export { ToBlobEndpointHostMappings, ToDfsEndpointHostMappings } from "./utils/constants";
export { RestError } from "@azure/core-http";
export { logger } from "./log";
export * from "./sas/DirectorySASPermissions";

/**
 * the retention policy which determines how long the associated data should persist
 */
export interface DataLakeRetentionPolicy {
  /**
   * Indicates whether a retention policy is enabled for the storage service
   */
  enabled: boolean;
  /**
   * Indicates the number of days that metrics or logging or soft-deleted data should be retained.
   * All data older than this value will be deleted
   */
  days?: number;
}

/**
 * Azure Analytics Logging settings.
 */
export interface DataLakeAnalyticsLogging {
  /** The version of Storage Analytics to configure. */
  version: string;
  /** Indicates whether all delete requests should be logged. */
  deleteProperty: boolean;
  /** Indicates whether all read requests should be logged. */
  read: boolean;
  /** Indicates whether all write requests should be logged. */
  write: boolean;
  /** the retention policy which determines how long the associated data should persist */
  retentionPolicy: DataLakeRetentionPolicy;
}

/**
 * a summary of request statistics grouped by API in hour or minute aggregates for blobs
 */
export interface DataLakeMetrics {
  /** The version of Storage Analytics to configure. */
  version?: string;
  /** Indicates whether metrics are enabled for the Blob service. */
  enabled: boolean;
  /** Indicates whether metrics should generate summary statistics for called API operations. */
  includeAPIs?: boolean;
  /** the retention policy which determines how long the associated data should persist */
  retentionPolicy?: DataLakeRetentionPolicy;
}

/**
 * CORS is an HTTP feature that enables a web application running under one domain to access
 * resources in another domain. Web browsers implement a security restriction known as same-origin
 * policy that prevents a web page from calling APIs in a different domain; CORS provides a secure
 * way to allow one domain (the origin domain) to call APIs in another domain
 */
export interface DataLakeCorsRule {
  /** The origin domains that are permitted to make a request against the storage service via CORS. The origin domain is the domain from which the request originates. Note that the origin must be an exact case-sensitive match with the origin that the user age sends to the service. You can also use the wildcard character '*' to allow all origin domains to make requests via CORS. */
  allowedOrigins: string;
  /** The methods (HTTP request verbs) that the origin domain may use for a CORS request. (comma separated) */
  allowedMethods: string;
  /** the request headers that the origin domain may specify on the CORS request. */
  allowedHeaders: string;
  /** The response headers that may be sent in the response to the CORS request and exposed by the browser to the request issuer */
  exposedHeaders: string;
  /** The maximum amount time that a browser should cache the preflight OPTIONS request. */
  maxAgeInSeconds: number;
}

/** The properties that enable an account to host a static website */
export interface DataLakeStaticWebsite {
  /** Indicates whether this account is hosting a static website */
  enabled: boolean;
  /** The default name of the index page under each directory */
  indexDocument?: string;
  /** The absolute path of the custom 404 page */
  errorDocument404Path?: string;
  /** Absolute path of the default index page */
  defaultIndexDocumentPath?: string;
}

/**
 * Storage Service Properties.
 */
export interface DataLakeServiceProperties {
  /** Azure Analytics Logging settings. */
  analyticsLogging?: DataLakeAnalyticsLogging;
  /** a summary of request statistics grouped by API in hour aggregates for blobs */
  hourMetrics?: DataLakeMetrics;
  /** a summary of request statistics grouped by API in minute aggregates for blobs */
  minuteMetrics?: DataLakeMetrics;
  /** The set of CORS rules. */
  cors?: DataLakeCorsRule[];
  /** The default version to use for requests to the Blob service if an incoming request's version is not specified. Possible values include version 2008-10-27 and all more recent versions */
  defaultServiceVersion?: string;
  /** the retention policy which determines how long the associated data should persist */
  deleteRetentionPolicy?: DataLakeRetentionPolicy;
  /** The properties that enable an account to host a static website */
  staticWebsite?: DataLakeStaticWebsite;
}

/**
 * Contains response data for the getProperties operation.
 */
export type DataLakeServiceGetPropertiesResponse = ServiceGetPropertiesHeaders &
  DataLakeServiceProperties & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
      /** The response body as text (string format) */
      bodyAsText: string;

      /** The response body as parsed JSON or XML */
      parsedBody: BlobServiceProperties;
      /** The parsed HTTP response headers. */
      parsedHeaders: ServiceGetPropertiesHeaders;
    };
  };
