import { CosmosHeaders } from "../index";

/**
 * Options associated with upload media.
 */
export interface MediaOptions {
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: CosmosHeaders;
  /** HTTP Slug header value. */
  slug?: string;
  /** HTTP ContentType header value. */
  contentType?: string;
}
