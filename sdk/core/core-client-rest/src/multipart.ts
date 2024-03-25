// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BodyPart,
  MultipartRequestBody,
  RestError,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { stringToUint8Array } from "@azure/core-util";
import { isBinaryBody } from "./helpers/isBinaryBody.js";

/**
 * Describes a single part in a multipart body.
 */
export interface PartDescriptor {
  /**
   * Content type of this part. If set, this value will be used to set the Content-Type MIME header for this part, although explicitly
   * setting the Content-Type header in the headers bag will override this value. If set to `null`, no content type will be inferred from
   * the body field. Otherwise, the value of the Content-Type MIME header will be inferred based on the type of the body.
   */
  contentType?: string | null;

  /**
   * The disposition type of this part (for example, "form-data" for parts making up a multipart/form-data request). If set, this value
   * will be used to set the Content-Disposition MIME header for this part, in addition to the `name` and `filename` properties.
   * Explicitly setting the Content-Disposition header in the headers bag will override this value.
   */
  dispositionType?: string;

  /**
   * The field name associated with this part. This value will be appended to the Content-Disposition header if dispositionType is set.
   */
  name?: string;

  /**
   * The file name of the content if it is a file. This will be appended to the Content-Disposition header value if dispositionType is set.
   */
  filename?: string;

  /**
   * The multipart headers for this part of the multipart body. Values of the Content-Type and Content-Disposition headers set in the headers bag
   * will take precedence over those computed from the request body or the contentType, dispositionType, name, and filename fields on this object.
   */
  headers?: Record<string, string>;

  /**
   * The body of this part of the multipart request. The Co
   */
  body?: unknown;
}

type MultipartBodyType = BodyPart["body"];

/**
 * Get value of a header in the part descriptor ignoring case
 */
function getHeaderValue(descriptor: PartDescriptor, headerName: string): string | undefined {
  if (descriptor.headers) {
    const actualHeaderName = Object.keys(descriptor.headers).find(
      (x) => x.toLowerCase() === headerName.toLowerCase(),
    );
    if (actualHeaderName) {
      return descriptor.headers[actualHeaderName];
    }
  }

  return undefined;
}

function getPartContentType(descriptor: PartDescriptor): string | undefined {
  const contentTypeHeader = getHeaderValue(descriptor, "content-type");
  if (contentTypeHeader) {
    return contentTypeHeader;
  }

  // Special value of null means content type is to be omitted
  if (descriptor.contentType === null) {
    return undefined;
  }

  if (descriptor.contentType) {
    return descriptor.contentType;
  }

  const { body } = descriptor;

  if (body === null || body === undefined) {
    return undefined;
  }

  if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
    return "text/plain; charset=UTF-8";
  }

  if (body instanceof Blob) {
    return body.type || "application/octet-stream";
  }

  if (isBinaryBody(body)) {
    return "application/octet-stream";
  }

  // arbitrary non-text object -> generic JSON content type by default. We will try to JSON.stringify the body.
  return "application/json; charset=UTF-8";
}

function getContentDisposition(descriptor: PartDescriptor): string | undefined {
  const contentDispositionHeader = getHeaderValue(descriptor, "content-disposition");
  if (contentDispositionHeader) {
    return contentDispositionHeader;
  }

  if (
    descriptor.dispositionType === undefined &&
    descriptor.name === undefined &&
    descriptor.filename === undefined
  ) {
    return undefined;
  }

  const dispositionType = descriptor.dispositionType ?? "form-data";

  let disposition = dispositionType;
  if (descriptor.name) {
    disposition += `; name="${descriptor.name}"`;
  }

  const filename =
    descriptor.filename ??
    (typeof File !== "undefined" && descriptor.body instanceof File
      ? descriptor.body.name || undefined
      : undefined);

  if (filename) {
    disposition += `; filename="${filename}"`;
  }

  return disposition;
}

function normalizeBody(body?: unknown, contentType?: string): MultipartBodyType {
  if (body === undefined) {
    // zero-length body
    return new Uint8Array([]);
  }

  // binary and primitives should go straight on the wire regardless of content type
  if (isBinaryBody(body)) {
    return body;
  }
  if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
    return stringToUint8Array(String(body), "utf-8");
  }

  // stringify objects for JSON-ish content types e.g. application/json, application/merge-patch+json, application/vnd.oci.manifest.v1+json, application.json; charset=UTF-8
  if (contentType && /application\/(.+\+)?json(;.+)?/.test(contentType)) {
    return stringToUint8Array(JSON.stringify(body), "utf-8");
  }

  throw new RestError(`Unsupported body/content-type combination: ${body}, ${contentType}`);
}

export function buildBodyPart(descriptor: PartDescriptor): BodyPart {
  const contentType = getPartContentType(descriptor);
  const contentDisposition = getContentDisposition(descriptor);
  const headers = createHttpHeaders(descriptor.headers ?? {});

  if (contentType) {
    headers.set("content-type", contentType);
  }
  if (contentDisposition) {
    headers.set("content-disposition", contentDisposition);
  }

  const body = normalizeBody(descriptor.body, contentType);

  return {
    headers,
    body,
  };
}

export function buildMultipartBody(parts: PartDescriptor[]): MultipartRequestBody {
  return { parts: parts.map(buildBodyPart) };
}
