// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FileContents, createFilePartDescriptor } from "../static-helpers/multipartHelpers.js";
import {
  searchIndexResponseArrayDeserializer,
  SearchIndexResponse,
} from "./azure/search/documents/indexes/models.js";

/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesSelectedResult {
  /** The total count of indexes in the service, or null if the count was not requested. */
  readonly count?: number;
  /** The indexes in the Search service. */
  readonly value: SearchIndexResponse[];
  /** The URL that can be used to fetch the next set of results. */
  readonly nextLink?: string;
}

export function _listIndexesSelectedResultDeserializer(item: any): _ListIndexesSelectedResult {
  return {
    count: item["@odata.count"],
    value: searchIndexResponseArrayDeserializer(item["value"]),
    nextLink: item["@odata.nextLink"],
  };
}

/** Persisted request-wide defaults for knowledge base retrieve requests. Each value provides the default for the matching retrieve-request field; service defaults apply when unset, and request-time values take precedence when present. */
export interface KnowledgeBaseRetrieveDefaults {
  /** The default maximum runtime in seconds for a retrieve request. */
  maxRuntimeInSeconds?: number;
  /** The default maximum number of documents in the retrieve output. */
  maxOutputDocuments?: number;
  /** The default maximum size, in tokens, of the content in the retrieve output. */
  maxOutputSizeInTokens?: number;
}

export function knowledgeBaseRetrieveDefaultsSerializer(item: KnowledgeBaseRetrieveDefaults): any {
  return {
    maxRuntimeInSeconds: item["maxRuntimeInSeconds"],
    maxOutputDocuments: item["maxOutputDocuments"],
    maxOutputSizeInTokens: item["maxOutputSizeInTokens"],
  };
}

export function knowledgeBaseRetrieveDefaultsDeserializer(
  item: any,
): KnowledgeBaseRetrieveDefaults {
  return {
    maxRuntimeInSeconds: item["maxRuntimeInSeconds"],
    maxOutputDocuments: item["maxOutputDocuments"],
    maxOutputSizeInTokens: item["maxOutputSizeInTokens"],
  };
}

/** Specifies the network access mode for knowledge source ingestion. Default is 'public'. */
export enum KnownKnowledgeSourceNetworkAccessMode {
  /** Ingestion runs in the standard, publicly reachable execution environment. This is the default. */
  Public = "public",
  /** Ingestion runs in a private execution environment so it can reach data sources and dependencies over a private network (private endpoint / shared private link). */
  Private = "private",
}

/**
 * Specifies the network access mode for knowledge source ingestion. Default is 'public'. \
 * {@link KnownKnowledgeSourceNetworkAccessMode} can be used interchangeably with KnowledgeSourceNetworkAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **public**: Ingestion runs in the standard, publicly reachable execution environment. This is the default. \
 * **private**: Ingestion runs in a private execution environment so it can reach data sources and dependencies over a private network (private endpoint \/ shared private link).
 */
export type KnowledgeSourceNetworkAccessMode = string;

/** Parameters for a WorkIQ knowledge source. */
export interface WorkIQKnowledgeSourceParameters {
  /** The customer-owned Microsoft Entra app registration configuration used for on-behalf-of authentication to the Work IQ API. The customer registers a tenant-owned Entra app, grants it the WorkIQAgent.Ask delegated permission, and configures a federated credential so Azure AI Search can authenticate as that app without a stored client secret. */
  entraAppAuthentication: EntraAppAuthentication;
}

export function workIQKnowledgeSourceParametersSerializer(
  item: WorkIQKnowledgeSourceParameters,
): any {
  return {
    entraAppAuthentication: entraAppAuthenticationSerializer(item["entraAppAuthentication"]),
  };
}

export function workIQKnowledgeSourceParametersDeserializer(
  item: any,
): WorkIQKnowledgeSourceParameters {
  return {
    entraAppAuthentication: entraAppAuthenticationDeserializer(item["entraAppAuthentication"]),
  };
}

/** Configuration for a customer-owned Microsoft Entra app registration used for federated credential-based on-behalf-of authentication. */
export interface EntraAppAuthentication {
  /** The application (client) ID of the customer-owned Entra app registration. */
  applicationId: string;
  /** The federated credential ID configured on the app registration, enabling the search service to authenticate as the app without a stored client secret. */
  federatedCredentialId: string;
  /** The tenant ID of the app registration. Required when the app registration is in a different tenant than the search service. If omitted, the search service's tenant is used. */
  tenantId?: string;
}

export function entraAppAuthenticationSerializer(item: EntraAppAuthentication): any {
  return {
    applicationId: item["applicationId"],
    federatedCredentialId: item["federatedCredentialId"],
    tenantId: item["tenantId"],
  };
}

export function entraAppAuthenticationDeserializer(item: any): EntraAppAuthentication {
  return {
    applicationId: item["applicationId"],
    federatedCredentialId: item["federatedCredentialId"],
    tenantId: item["tenantId"],
  };
}

/** The extraction effort applied to an individual file. 'minimal' (the default) uses built-in extraction; 'standard' uses Content Understanding. */
export enum KnownFileKnowledgeSourceExtractionMode {
  /** Built-in extraction was performed. */
  Minimal = "minimal",
  /** Content Understanding extraction was performed. */
  Standard = "standard",
}

/**
 * The extraction effort applied to an individual file. 'minimal' (the default) uses built-in extraction; 'standard' uses Content Understanding. \
 * {@link KnownFileKnowledgeSourceExtractionMode} can be used interchangeably with FileKnowledgeSourceExtractionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal**: Built-in extraction was performed. \
 * **standard**: Content Understanding extraction was performed.
 */
export type FileKnowledgeSourceExtractionMode = string;

/** model interface _UploadKnowledgeSourceFileMultipartRequest */
export interface _UploadKnowledgeSourceFileMultipartRequest {
  /** The JSON metadata part describing the file. */
  metadata: FileUploadMetadata;
  /** The raw file content part. */
  content: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function _uploadKnowledgeSourceFileMultipartRequestSerializer(
  item: _UploadKnowledgeSourceFileMultipartRequest,
): any {
  return [
    { name: "metadata", body: fileUploadMetadataSerializer(item["metadata"]) },
    createFilePartDescriptor("content", item["content"]),
  ];
}

/** The JSON 'metadata' part of a multipart/form-data file upload: the full file name/path and custom key/value metadata. The parsing mode and extraction mode are both chosen by the service and are not supplied by the caller. */
export interface FileUploadMetadata {
  /** The full relative file name/path to store the file under (prefixes are derived from it). */
  fileName?: string;
  /** Custom key/value metadata to store with the file. */
  metadata?: Record<string, string>;
}

export function fileUploadMetadataSerializer(item: FileUploadMetadata): any {
  return { fileName: item["fileName"], metadata: item["metadata"] };
}

/** model interface _UpdateKnowledgeSourceFileRequest */
export interface _UpdateKnowledgeSourceFileRequest {
  /** The JSON metadata part describing the file. */
  metadata: FileUploadMetadata;
  /** The raw file content part. */
  content: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function _updateKnowledgeSourceFileRequestSerializer(
  item: _UpdateKnowledgeSourceFileRequest,
): any {
  return [
    { name: "metadata", body: fileUploadMetadataSerializer(item["metadata"]) },
    createFilePartDescriptor("content", item["content"]),
  ];
}

/** Specifies how the search parameter is interpreted when narrowing down a listing result set. Currently only 'prefix' is supported. */
export enum KnownListingSearchType {
  /** Matches items whose name starts with the value of the search parameter. */
  Prefix = "prefix",
}

/**
 * Specifies how the search parameter is interpreted when narrowing down a listing result set. Currently only 'prefix' is supported. \
 * {@link KnownListingSearchType} can be used interchangeably with ListingSearchType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **prefix**: Matches items whose name starts with the value of the search parameter.
 */
export type ListingSearchType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
  /** The 2026-08-01-preview API version. */
  V20260801Preview = "2026-08-01-preview",
}
