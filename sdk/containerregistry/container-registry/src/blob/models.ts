import { OperationOptions } from "@azure/core-client";

export interface UploadManifestOptions extends OperationOptions {
  tag: string;
}

export interface UploadBlobResult {
  digest: string;
}

export interface DownloadManifestResult {
  digest: string;
  manifest: OciManifest;
  manifestStream: NodeJS.ReadableStream;
}

export interface OciBlobDescriptor {
  /** Layer media type */
  mediaType?: string;
  /** Layer size */
  size?: number;
  /** Layer digest */
  digest?: string;
  /** Specifies a list of URIs from which this object may be downloaded. */
  urls?: string[];
  /** Additional information provided through arbitrary metadata. */
  annotations?: OciAnnotations;
}

export interface OciManifest {
  /** Schema version */
  schemaVersion: number;
  /** V2 image config descriptor */
  config?: OciBlobDescriptor;
  /** List of V2 image layer information */
  layers?: OciBlobDescriptor[];
  /** Additional information provided through arbitrary metadata. */
  annotations?: OciAnnotations;
}

export interface OciAnnotations {
  /** Date and time on which the image was built (string, date-time as defined by https://tools.ietf.org/html/rfc3339#section-5.6) */
  createdAt?: Date;
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

  additionalProperties: Record<string, unknown>;
}

export interface DeleteBlobOptions extends OperationOptions {}

export interface DeleteManifestOptions extends OperationOptions {}

export interface DownloadBlobOptions extends OperationOptions {}

export interface DownloadManifestOptions extends OperationOptions {}

export interface DownloadBlobResult {
  digest: string;
  content: NodeJS.ReadableStream;
}

export interface UploadManifestResult {
  digest: string;
}
