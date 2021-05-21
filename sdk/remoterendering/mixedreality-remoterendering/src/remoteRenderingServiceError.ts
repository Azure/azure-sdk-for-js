// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RemoteRenderingServiceErrorInternal } from "./generated";

/** Error object containing details about a conversion or session failure. */
export class RemoteRenderingServiceError extends Error {
    constructor(serviceError: RemoteRenderingServiceErrorInternal) {
      super(serviceError.message);
      Object.setPrototypeOf(this, RemoteRenderingServiceError.prototype);
      this.code = serviceError.code;
      this.details = serviceError.details?.map(x => new RemoteRenderingServiceError(x));
      this.target = serviceError.target;
      this.innerError = (serviceError.innerError === undefined) ? undefined : new RemoteRenderingServiceError(serviceError.innerError!);
    }
  
    /** Error code. */
    code: string;
    /**
     * An array of details about specific errors that led to this reported error.
     */
    readonly details?: RemoteRenderingServiceError[];
    /**
     * The target of the particular error (e.g., the name of the property in error).
     */
    readonly target?: string;
    /**
     * An object containing more specific information than the current object about the error.
     */
    readonly innerError?: RemoteRenderingServiceError;
  }
  