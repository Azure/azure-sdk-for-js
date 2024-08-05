// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as zlib from "zlib";
import { promisify } from "util";
import * as http from "http";

// currently support the following encoding types
export enum contentEncodingMethod {
  GZIP = "gzip",
  DEFLATE = "deflate",
  BR = "br",
}

// current supported encoding types
export const bufferEncodingTypes = [
  "utf8",
  "utf16le",
  "latin1",
  "base64",
  "hex",
  "ascii",
  "binary",
  "ucs2",
];

// for node version under 10, Brotli compression is not supported.
export const isBrotliSupported = (): boolean => {
  const majVer = process.versions.node.split(".")[0];
  return parseInt(majVer) >= 10;
};

export const gzipAsync = promisify(zlib.gzip);
export const gunzipAsync = promisify(zlib.gunzip);
export const deflateAsync = promisify(zlib.deflate);
export const inflateAsync = promisify(zlib.inflate);

export const getBrotliCompressAsync = (zlibObject: any): Function | null => {
  const isMajorVer = isBrotliSupported();
  if (isMajorVer && typeof zlibObject.brotliCompress === "function") {
    return promisify(zlibObject.brotliCompress);
  }
  return null;
};

export const getBrotliCompressSync = (zlibObject: any): Function | null => {
  const isMajorVer = isBrotliSupported();
  if (isMajorVer && typeof zlibObject.brotliCompressSync === "function") {
    return zlibObject.brotliCompressSync;
  }
  return null;
};

export const getBrotliDecompressAsync = (zlibObject: any): Function | null => {
  const isMajorVer = isBrotliSupported();
  if (isMajorVer && typeof zlibObject.brotliDecompress === "function") {
    return promisify(zlibObject.brotliDecompress);
  }
  return null;
};

export const getBrotliDecompressSync = (zlibObject: any): Function | null => {
  const isMajorVer = isBrotliSupported();
  if (isMajorVer && typeof zlibObject.brotliDecompressSync === "function") {
    return zlibObject.brotliDecompressSync;
  }
  return null;
};

export const isBufferType = (buffer: Buffer, type?: string): boolean | null => {
  const encodingType = type ? type : "utf8";
  let result = false;
  if (Buffer.isEncoding(encodingType)) {
    const newBuffer = Buffer.from(buffer.toString(encodingType), encodingType);
    result = newBuffer.toJSON().data.toString() === buffer.toJSON().data.toString();
  }

  return result;
};

export const findBufferEncodingType = (buffer: Buffer): string | null => {
  let bufferType = null;
  for (const key in bufferEncodingTypes) {
    const type = bufferEncodingTypes[key];
    if (Buffer.isEncoding(type) && isBufferType(buffer, type)) {
      bufferType = type;
      break;
    }
  }
  return bufferType;
};

export const isSupportedContentEncoding = (
  encodingMethod: string,
): contentEncodingMethod | null => {
  let encodingType = null;
  switch (encodingMethod) {
    case "gzip":
      encodingType = contentEncodingMethod.GZIP;
      break;
    case "br":
      encodingType = contentEncodingMethod.BR;
      break;
    case "deflate":
      encodingType = contentEncodingMethod.DEFLATE;
      break;
    default:
  }
  return encodingType;
};

// mutiple content-encoding is not supported
// for mutiple content-encoding, this method will return any empty array
export const getContentEncodingFromHeaders = (
  response: http.ServerResponse,
): contentEncodingMethod[] | null => {
  const headers: contentEncodingMethod[] = [];
  const contentEncodingHeaders = response.getHeader("Content-Encoding");
  if (!contentEncodingHeaders) return null;
  if (typeof contentEncodingHeaders === "string") {
    const supportedContentEncoding = isSupportedContentEncoding(contentEncodingHeaders);
    if (supportedContentEncoding) {
      headers.push(supportedContentEncoding);
    }
  }
  return headers;
};

export const insertBrowserSdkLoaderByIndex = (
  index: number,
  html: string,
  snippet: string,
): string | null => {
  if (index < 0) return null;
  let newHtml = null;
  const subStart = html.substring(0, index);
  const subEnd = html.substring(index);
  newHtml = subStart + '<script type="text/javascript">' + snippet + "</script>" + subEnd;
  return newHtml;
};

export const isContentTypeHeaderHtml = (response: http.ServerResponse): boolean => {
  let isHtml = false;
  const contentType = response.getHeader("Content-Type");
  if (contentType) {
    if (typeof contentType === "string") {
      isHtml = contentType.indexOf("html") >= 0;
    } else {
      isHtml = contentType.toString().indexOf("html") >= 0;
    }
  }
  return isHtml;
};
