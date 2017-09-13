// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { BaseFilter } from "./filters/baseFilter";
import * as utils from "./util/utils";

export interface RequestFunction {
  (webResource: WebResource): Promise<HttpOperationResponse>;
}
export class RequestPipeline {
  filters: BaseFilter[];
  requestOptions: RequestInit;

  constructor(filters?: BaseFilter[], requestOptions?: RequestInit) {
    this.filters = filters || [];
    this.requestOptions = requestOptions || {};
  }

  addFilter(f: BaseFilter): void {
    this.filters.push(f);
    return;
  }

  create(): RequestFunction {
    const self = this;
    let pipeline: Array<Function> = [];
    if (self.filters && self.filters.length) {
      const beforeFilters: Array<Function> = [];
      const afterFilters: Array<Function> = [];
      for (let i = 0; i < self.filters.length; i++) {
        const filter = self.filters[i];
        if (filter.before && typeof filter.before === "function") {
          beforeFilters.push(filter.before.bind(filter));
        }
        if (filter.after && typeof filter.after === "function") {
          afterFilters.push(filter.after.bind(filter));
        }
      }// end-of-for-loop
      // add the request sink
      beforeFilters.push(self.requestSink.bind(self));
      pipeline = beforeFilters.concat(afterFilters);
    } else {
      pipeline.push(self.requestSink.bind(self));
    }
    const requestFun: RequestFunction = (request: WebResource): Promise<HttpOperationResponse> => {
      if (!request.headers) request.headers = {};
      return utils.executePromisesSequentially(pipeline, request);
    };
    return requestFun;
  }

  requestSink(options: WebResource): Promise<HttpOperationResponse> {
    if (this.requestOptions.method) delete this.requestOptions.method;
    return utils.dispatchRequest(options);
  }
}
