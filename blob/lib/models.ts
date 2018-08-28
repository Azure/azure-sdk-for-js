import { HttpHeaders, WebResource } from "ms-rest-js";

import * as Models from "./generated/models";

export interface IMetadata {
  [propertyName: string]: string;
}

export interface IContainerAccessConditions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IBlobAccessConditions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IPageBlobAccessConditions extends IBlobAccessConditions {
  sequenceNumberAccessConditions?: Models.SequenceNumberAccessConditions;
}

export interface IAppendBlobAccessConditions extends IBlobAccessConditions {
  appendPositionAccessConditions?: Models.AppendPositionAccessConditions;
}

export interface ICommonResponse {
  /**
   * The raw request
   */
  request: WebResource;
  /**
   * The HTTP response status (e.g. 200)
   */
  status: number;
  /**
   * The HTTP response headers.
   */
  headers: HttpHeaders;
}

export interface IDownloadResponse extends ICommonResponse {
  /**
   * The response body as a Blob.
   * Always undefined in node.js.
   */
  blobBody?: (() => Promise<Blob>);
  /**
   * The response body as a node.js Readable stream.
   * Always undefined in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
}
