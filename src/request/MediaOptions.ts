import { IHeaders } from "..";

/**
 * Options associated with upload media.
 */
export interface MediaOptions {
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: IHeaders;
  /** HTTP Slug header value. */
  slug?: string;
  /** HTTP ContentType header value. */
  contentType?: string;
}
