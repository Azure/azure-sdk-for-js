// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

/**
 * Options for configuring the upload manifest operation.
 */
export interface SetManifestOptions extends OperationOptions {
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
export interface GetManifestResult {
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

  /**
   * The deserialized manifest
   */
  manifest: Record<string, unknown>;
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
export interface SetManifestResult {
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
  size: number;
  /** Layer digest */
  digest: string;
  /** Specifies a list of URIs from which this object may be downloaded. */
  urls?: string[];
  /** Additional information provided through arbitrary metadata. */
  annotations?: OciAnnotations;
}

/**
 * Helper used to determine whether a given manifest downloaded using ContainerRegistryBlobClient.getManifest() is an OCI image manifest.
 */
export function isOciImageManifest(
  manifest: Record<string, unknown>
): manifest is OciImageManifest {
  return (
    manifest.schemaVersion === 2 &&
    typeof manifest.config === "object" &&
    Array.isArray(manifest.layers)
  );
}

/**
 * Type representing an OCI image manifest (manifest of media type "application/vnd.oci.image.manifest.v1+json").
 * See the specification at https://github.com/opencontainers/image-spec/blob/main/manifest.md for more information.
 */
export interface OciImageManifest extends Record<string, unknown> {
  /** Schema version */
  schemaVersion: 2;
  /** The media type, when used, must be application/vnd.oci.image.manifest.v1+json. */
  mediaType?: `${KnownManifestMediaType.OciImageManifest}`;
  /** When the manifest is used for an artifact, the type of said artifact. */
  artifactType?: string;
  /** V2 image config descriptor */
  config: OciDescriptor;
  /** List of V2 image layer information */
  layers: OciDescriptor[];
  /** Additional information provided through arbitrary metadata. */
  annotations?: OciAnnotations;
}

/** Additional information provided through arbitrary metadata */
export interface OciAnnotations extends Record<string, unknown> {
  /** Date and time on which the image was built (string, date-time as defined by https://tools.ietf.org/html/rfc3339#section-5.6) */
  created?: string;
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
export interface GetManifestOptions extends OperationOptions {}

/**
 * Known media type values for Docker and OCI manifests.
 */
export enum KnownManifestMediaType {
  /**
   * The media type for an OCI image manifest. This format is described at https://github.com/opencontainers/image-spec/blob/main/manifest.md.
   */
  OciImageManifest = "application/vnd.oci.image.manifest.v1+json",

  /**
   * The media type for a Docker Image Manifest, Version 2, Schema 2. This format is described at https://docs.docker.com/registry/spec/manifest-v2-2/.
   */
  DockerManifest = "application/vnd.docker.distribution.manifest.v2+json",
}
