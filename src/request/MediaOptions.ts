import { IHeaders } from "..";

/**
 * The media options
 * @typedef {Object} MediaOptions                                   -         Options associated with upload media.
 * @property {string} [slug]                                        -         HTTP Slug header value.
 * @property {string} [contentType=application/octet-stream]        -         HTTP ContentType header value.
 *
 */
export interface MediaOptions {
  initialHeaders?: IHeaders;
  slug?: string;
  contentType?: string;
}
