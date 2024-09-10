// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BodyPart, MultipartRequestBody, RawHttpHeadersInput } from "../interfaces.js";
import { RestError } from "../restError.js";
import { createHttpHeaders } from "../httpHeaders.js";
import { stringToUint8Array } from "../util/bytesEncoding.js";
import { isBinaryBody } from "../util/typeGuards.js";

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
   * If the `name` or `filename` properties are set while `dispositionType` is left undefined, `dispositionType` will default to "form-data".
   *
   * Explicitly setting the Content-Disposition header in the headers bag will override this value.
   */
  dispositionType?: string;

  /**
   * The field name associated with this part. This value will be used to construct the Content-Disposition header,
   * along with the `dispositionType` and `filename` properties, if the header has not been set in the `headers` bag.
   */
  name?: string;

  /**
   * The file name of the content if it is a file. This value will be used to construct the Content-Disposition header,
   * along with the `dispositionType` and `name` properties, if the header has not been set in the `headers` bag.
   */
  filename?: string;

  /**
   * The multipart headers for this part of the multipart body. Values of the Content-Type and Content-Disposition headers set in the headers bag
   * will take precedence over those computed from the request body or the contentType, dispositionType, name, and filename fields on this object.
   */
  headers?: RawHttpHeadersInput;

  /**
   * The body of this part of the multipart request.
   */
  body?: unknown;
}

type MultipartBodyType = BodyPart["body"];

type HeaderValue = RawHttpHeadersInput[string];

/**
 * Get value of a header in the part descriptor ignoring case
 */
function getHeaderValue(descriptor: PartDescriptor, headerName: string): HeaderValue | undefined {
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

function getPartContentType(descriptor: PartDescriptor): HeaderValue | undefined {
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

/**
 * Enclose value in quotes and escape special characters, for use in the Content-Disposition header
 */
function escapeDispositionField(value: string): string {
  return JSON.stringify(value);
}

function getContentDisposition(descriptor: PartDescriptor): HeaderValue | undefined {
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
    disposition += `; name=${escapeDispositionField(descriptor.name)}`;
  }

  let filename: string | undefined = undefined;
  if (descriptor.filename) {
    filename = descriptor.filename;
  } else if (typeof File !== "undefined" && descriptor.body instanceof File) {
    const filenameFromFile = (descriptor.body as File).name;
    if (filenameFromFile !== "") {
      filename = filenameFromFile;
    }
  }

  if (filename) {
    disposition += `; filename=${escapeDispositionField(filename)}`;
  }

  return disposition;
}

function normalizeBody(body?: unknown, contentType?: HeaderValue): MultipartBodyType {
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
  if (contentType && /application\/(.+\+)?json(;.+)?/i.test(String(contentType))) {
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
