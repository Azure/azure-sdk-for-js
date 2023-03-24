// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

/**
 * Options for configuring the upload manifest operation.
 */
export interface UploadManifestOptions extends OperationOptions {
  /**
   * Media type of the uploaded manifest
   */
  mediaType?: string;

  /**
   * Tag to give the uploaded manifest
   */
  tag?: string;
}

/**
 * The result from uploading a blob to the registry.
 */
export interface UploadBlobResult {
  /**
   * The digest of the uploaded blob.
   */
  digest: string;

  /**
   * The size of the uploaded blob in bytes.
   */
  sizeInBytes: number;
}

/**
 * The result from downloading a manifest from the registry.
 */
export interface DownloadManifestResult {
  /**
   * The digest of the downloaded manifest as calculated by the registry.
   */
  digest: string;

  /**
   * Media type of the downloaded manifest as indicated by the Content-Type response header.
   */
  mediaType: string;

  /**
   * The raw content of the manifest that was downloaded.
   */
  content: Buffer;
}

/**
 * The result from downloading an OCI manifest (a manifest of type {@link KnownManifestMediaType.OciManifest}) from the registry.
 */
export interface DownloadOciImageManifestResult extends DownloadManifestResult {
  /**
   * The media type of the downloaded manifest as indicated by the Content-Type response header is an OCI manifest.
   */
  mediaType: KnownManifestMediaType.OciManifest;

  /**
   * The OCI manifest that was downloaded. If the requested media type was not KnownMediaType.OciManifest, this will be left undefined.
   */
  manifest: OciImageManifest;
}

/**
 * The result from downloading a blob from the registry.
 */
export interface DownloadBlobResult {
  /**
   * The blob's digest, calculated by the resgistry.
   */
  digest: string;

  /**
   * The blob content.
   */
  content: NodeJS.ReadableStream;
}

/**
 * The result from uploading a manifest to the registry.
 */
export interface UploadManifestResult {
  /**
   * The digest of the uploaded manifest, calculated by the registry.
   */
  digest: string;
}

/** Docker V2 image layer descriptor including config and layers. */
export interface OciDescriptor {
  /** Layer media type */
  mediaType: string;
  /** Layer size */
  sizeInBytes: number;
  /** Layer digest */
  digest: string;
  /** Specifies a list of URIs from which this object may be downloaded. */
  urls?: string[];
  /** Additional information provided through arbitrary metadata. */
  annotations?: OciAnnotations;
}

/** Type representing an OCI image manifest (manifest of media type "application/vnd.oci.image.manifest.v1+json"). */
export interface OciImageManifest {
  /** Schema version */
  schemaVersion?: number;
  /** V2 image config descriptor */
  config: OciDescriptor;
  /** List of V2 image layer information */
  layers: OciDescriptor[];
  /** Additional information provided through arbitrary metadata. */
  annotations?: OciAnnotations;
}

/** Additional information provided through arbitrary metadata */
export interface OciAnnotations {
  /** Date and time on which the image was built (string, date-time as defined by https://tools.ietf.org/html/rfc3339#section-5.6) */
  createdOn?: Date;
  /** Contact details of the people or organization responsible for the image. */
  authors?: string;
  /** URL to find more information on the image. */
  url?: string;
  /** URL to get documentation on the image. */
  documentation?: string;
  /** URL to get source code for building the image. */
  source?: string;
  /** Version of the packaged software. The version MAY match a label or tag in the source code repository, may also be Semantic versioning-compatible */
  version?: string;
  /** Source control revision identifier for the packaged software. */
  revision?: string;
  /** Name of the distributing entity, organization or individual. */
  vendor?: string;
  /** License(s) under which contained software is distributed as an SPDX License Expression. */
  licenses?: string;
  /** Name of the reference for a target. */
  name?: string;
  /** Human-readable title of the image */
  title?: string;
  /** Human-readable description of the software packaged in the image */
  description?: string;
  /** Additional properties */
  [additionalProperties: string]: unknown;
}

/**
 * Options for confguring the delete blob operation.
 */
export interface DeleteBlobOptions extends OperationOptions {}

/**
 * Options for confguring the delete manifest operation.
 */
export interface DeleteManifestOptions extends OperationOptions {}

/**
 * Options for configuring the upload blob operation.
 */
export interface UploadBlobOptions extends OperationOptions {}

/**
 * Options for confguring the download blob operation.
 */
export interface DownloadBlobOptions extends OperationOptions {}

/**
 * Options for confguring the download manifest operation.
 */
export interface DownloadManifestOptions extends OperationOptions {
  /**
   * Media type of the manifest to download. Refer to {@link KnownManifestMediaType} for known media types.
   * Defaults to {@link KnownManifestMediaType.OciManifest}.
   */
  mediaType?: string | string[];
}

/**
 * Known media type values for Docker and OCI manifests.
 */
export enum KnownManifestMediaType {
  /**
   * The media type for an OCI image manifest. This format is described at https://github.com/opencontainers/image-spec/blob/main/manifest.md.
   */
  OciManifest = "application/vnd.oci.image.manifest.v1+json",

  /**
   * The media type for a Docker Image Manifest, Version 2, Schema 2. This format is described at https://docs.docker.com/registry/spec/manifest-v2-2/.
   */
  DockerManifest = "application/vnd.docker.distribution.manifest.v2+json",
}
