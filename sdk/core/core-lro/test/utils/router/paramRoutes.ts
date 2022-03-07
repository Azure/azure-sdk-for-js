// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, createHttpHeaders } from "@azure/core-rest-pipeline";
import { buildResponse, getPascalCase, parseUri } from "./utils";

export interface Processor {
  process: (request: PipelineRequest) => PipelineResponse | undefined;
}

interface Options {
  headerName: string;
  rootPrefix: string;
}

function createPutBody(): Processor {
  return {
    process,
  };
  function process(request: PipelineRequest): PipelineResponse | undefined {
    function isValidRequest(
      initialCode: number,
      initialState: string,
      finalState: string,
      finalCode: number
    ): boolean {
      return (
        (initialCode === 201 &&
          initialState === "Creating" &&
          finalState === "Succeeded" &&
          finalCode === 200) ||
        (initialCode === 200 &&
          initialState === "Updating" &&
          finalState === "Succeeded" &&
          finalCode === 200) ||
        (initialCode === 201 &&
          initialState === "Created" &&
          finalState === "Failed" &&
          finalCode === 200) ||
        (initialCode === 200 &&
          initialState === "Accepted" &&
          finalState === "Canceled" &&
          finalCode === 200)
      );
    }
    const path = request.url;
    const pieces = path.substr(1).split("/");
    if (pieces.length === 5) {
      try {
        const initialCode: number = JSON.parse(pieces[1]);
        const initialState = getPascalCase(pieces[2]);
        const finalState = getPascalCase(pieces[3]);
        const finalCode: number = JSON.parse(pieces[4]);
        if (!isValidRequest(initialCode, initialState, finalState, finalCode)) {
          return undefined;
        }
        if (request.method === "PUT") {
          return buildResponse(
            request,
            initialCode,
            `{ "properties": { "provisioningState": "` +
              initialState +
              `"}, "id": "100", "name": "foo" }`
          );
        } else if (request.method === "GET") {
          return buildResponse(
            request,
            finalCode,
            `{ "properties": { "provisioningState": "` +
              finalState +
              `"}, "id": "100", "name": "foo" }`
          );
        }
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  }
}

function createRetries(): Processor {
  return {
    process,
  };
  function process(request: PipelineRequest): PipelineResponse | undefined {
    function isValidRequest(initialCode: number, retry: string, finalCode: number): boolean {
      return (
        (initialCode === 202 && retry === "retry" && finalCode === 200) ||
        (initialCode === 202 && retry === "noretry" && finalCode === 204)
      );
    }
    const pieces = parseUri(request.url);
    try {
      if (pieces.length === 4) {
        const methodInUri = pieces[0];
        const initialCode: number = JSON.parse(pieces[1]);
        const retry = pieces[2];
        const finalCode: number = JSON.parse(pieces[3]);
        if (!isValidRequest(initialCode, retry, finalCode)) return undefined;
        const method = request.method.toLowerCase();
        const headers = createHttpHeaders({
          Location: `/${methodInUri}${
            method === "get" ? "/newuri" : ""
          }/${initialCode}/${retry}/${finalCode}`,
        });
        if (retry === "retry") {
          headers.set("Retry-After", "0");
        }
        return {
          request: request,
          headers: headers,
          status: initialCode,
        };
      } else if (pieces.length === 5 && pieces[1] === "newuri") {
        const methodInUri = pieces[0];
        const initialCode: number = JSON.parse(pieces[2]);
        const retry = pieces[3];
        const finalCode: number = JSON.parse(pieces[4]);
        if (!isValidRequest(initialCode, retry, finalCode)) return undefined;
        if (request.method === "GET") {
          if (finalCode === 200) {
            if (methodInUri === "post") {
              return buildResponse(
                request,
                200,
                `{ "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`
              );
            } else if (methodInUri === "delete") {
              return buildResponse(request, 200);
            }
          }
          return buildResponse(request, finalCode);
        }
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  }
}

function createDeleteProvisioning(): Processor {
  return {
    process,
  };
  function process(request: PipelineRequest): PipelineResponse | undefined {
    function isValidRequest(
      initialCode: number,
      initialState: string,
      finalState: string,
      finalCode: number
    ): boolean {
      return (
        (initialCode === 202 &&
          initialState === "Accepted" &&
          finalState === "Succeeded" &&
          finalCode === 200) ||
        (initialCode === 202 &&
          initialState === "Deleting" &&
          finalState === "Failed" &&
          finalCode === 200) ||
        (initialCode === 202 &&
          initialState === "Deleting" &&
          finalState === "Canceled" &&
          finalCode === 200)
      );
    }
    const pieces = parseUri(request.url);
    try {
      if (pieces.length === 6 && pieces[0] === "delete" && pieces[1] === "provisioning") {
        const initialCode = JSON.parse(pieces[2]);
        const initialState = getPascalCase(pieces[3]);
        const finalCode = JSON.parse(pieces[4]);
        const finalState = getPascalCase(pieces[5]);
        if (!isValidRequest(initialCode, initialState, finalState, finalCode)) return undefined;
        if (request.method === "DELETE") {
          return {
            request: request,
            headers: createHttpHeaders({
              Location: `/delete/provisioning/${initialCode}/${initialState.toLowerCase()}/${finalCode}/${finalState.toLowerCase()}`,
              "Retry-After": "0",
            }),
            status: initialCode,
            bodyAsText: `{ "properties": { "provisioningState": "${initialState}"}, "id": "100", "name": "foo" }`,
          };
        } else if (request.method === "GET") {
          return buildResponse(
            request,
            finalCode,
            `{ "properties": { "provisioningState": "${finalState}"}, "id": "100", "name": "foo" }`
          );
        }
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  }
}

function createDeleteAsyncRetry(options: Options): Processor {
  let internalCounter = 1;
  return {
    process,
  };
  function process(request: PipelineRequest): PipelineResponse | undefined {
    function isValidRequest(retry: string, finalState: string): boolean {
      return (
        (retry === "retry" || retry === "noretry") &&
        (finalState === "succeeded" || finalState === "canceled" || finalState === "failed")
      );
    }
    const root = `delete${options.rootPrefix}`;
    const pieces = parseUri(request.url);
    if (pieces[0] !== root) {
      return undefined;
    }
    const retry = pieces[1];
    const finalState = pieces[2];
    if (!isValidRequest(retry, finalState)) return undefined;
    if (pieces.length === 3) {
      const pollingUri = `/${root}/${retry}/${finalState.toLowerCase()}/operationResults/200/`;
      const headers = createHttpHeaders({
        Location: pollingUri,
      });
      headers.set(options.headerName, pollingUri);
      if (retry === "retry") {
        headers.set("Retry-After", "0");
      }
      return buildResponse(request, 202, undefined, headers);
    } else if (pieces[3] === "operationResults") {
      try {
        const finalCode: number = JSON.parse(pieces[4]);
        if (internalCounter === 0) {
          return buildResponse(request, finalCode, `{ "status": "${getPascalCase(finalState)}"}`);
        } else {
          --internalCounter;
          const pollingUri = `/${root}/${retry}/${finalState.toLowerCase()}/operationResults/${finalCode}`;
          const headers = createHttpHeaders({
            Location: pollingUri,
          });
          headers.set(options.headerName, pollingUri);
          if (retry === "retry") {
            headers.set("Retry-After", "0");
          }
          return buildResponse(request, 202, `{ "status": "Accepted"}`, headers);
        }
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  }
}

function createPutAsyncRetry(options: Options): Processor {
  let internalCounter = 1;
  return {
    process,
  };
  function process(request: PipelineRequest): PipelineResponse | undefined {
    function isValidRequest(retry: string, finalState: string): boolean {
      return (
        (retry === "retry" || retry === "noretry") &&
        (finalState === "succeeded" || finalState === "canceled" || finalState === "failed")
      );
    }
    const pieces = parseUri(request.url);
    const root = `put${options.rootPrefix}`;
    if (pieces[0] !== root) {
      return undefined;
    }
    const retry = pieces[1];
    const finalState = pieces[2];
    if (!isValidRequest(retry, finalState)) return undefined;
    if (pieces.length === 3) {
      const method = request.method;
      if (method === "GET") {
        return buildResponse(
          request,
          200,
          `{ "properties": { "provisioningState": "${getPascalCase(
            finalState
          )}"}, "id": "100", "name": "foo" }`
        );
      } else if (method === "PUT") {
        const pollingUri = `/${root}/${retry}/${finalState.toLowerCase()}/operationResults/200/`;
        const headers = createHttpHeaders({
          Location: pollingUri,
        });
        headers.set(options.headerName, pollingUri);
        if (retry === "retry") {
          headers.set("Retry-After", "0");
        }
        return buildResponse(
          request,
          200,
          `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
          headers
        );
      }
    } else if (pieces[3] === "operationResults") {
      try {
        const finalCode: number = JSON.parse(pieces[4]);
        if (internalCounter === 0) {
          return buildResponse(request, finalCode, `{ "status": "${getPascalCase(finalState)}"}`);
        } else {
          --internalCounter;
          const pollingUri = `/${root}/${retry}/${finalState.toLowerCase()}/operationResults/${finalCode}`;
          const headers = createHttpHeaders({
            Location: pollingUri,
          });
          headers.set(options.headerName, pollingUri);
          if (retry === "retry") {
            headers.set("Retry-After", "0");
          }
          return buildResponse(request, 202, `{ "status": "Accepted"}`, headers);
        }
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  }
}

function createPostasyncRetry(options: Options): Processor {
  let internalCounter = 1;
  return {
    process,
  };
  function process(request: PipelineRequest): PipelineResponse | undefined {
    function isValidRequest(retry: string, finalState: string): boolean {
      return (
        (retry === "retry" || retry === "noretry") &&
        (finalState === "succeeded" || finalState === "canceled" || finalState === "failed")
      );
    }
    const pieces = parseUri(request.url);
    const root = `post${options.rootPrefix}`;
    if (pieces[0] !== root) {
      return undefined;
    }
    const retry = pieces[1];
    const finalState = pieces[2];
    if (!isValidRequest(retry, finalState)) return undefined;
    if (pieces.length === 3) {
      const method = request.method;
      if (method === "GET") {
        return buildResponse(
          request,
          200,
          finalState === "Failed"
            ? `{ "status": "${finalState}", "error": { "code": 500, "message": "Internal Server Error"}}`
            : `{ "status": "${finalState}", "properties": { "provisioningState": "Succeeded"}, "id": "100", "name": "foo" }`
        );
      } else if (method === "POST") {
        const headers = createHttpHeaders({
          Location: `/${root}/${retry}/succeeded/operationResults/foo/200/`,
        });
        headers.set(
          options.headerName,
          `/${root}/${retry}/${finalState.toLowerCase()}/operationResults/200/`
        );
        if (retry === "retry") {
          headers.set("Retry-After", "0");
        }
        return buildResponse(
          request,
          202,
          `{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }`,
          headers
        );
      }
    } else if (pieces[4] === "foo") {
      const finalCode: number = JSON.parse(pieces[5]);
      return buildResponse(
        request,
        finalCode,
        `{ "properties": { "provisioningState": "${getPascalCase(
          finalState
        )}"}, "id": "100", "name": "foo" }`
      );
    } else if (pieces[3] === "operationResults") {
      try {
        const finalCode: number = JSON.parse(pieces[4]);
        if (internalCounter === 0) {
          return buildResponse(request, finalCode, `{ "status": "${getPascalCase(finalState)}"}`);
        } else {
          --internalCounter;
          const headers = createHttpHeaders({
            Location: `/${root}/${retry}/succeeded/operationResults/foo/200/`,
          });
          headers.set(
            options.headerName,
            `/${root}/${retry}/${finalState.toLowerCase()}/operationResults/foo/${finalCode}`
          );
          if (retry === "retry") {
            headers.set("Retry-After", "0");
          }
          return buildResponse(request, 202, `{ "status": "Accepted"}`, headers);
        }
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  }
}

const asyncOptions = {
  headerName: "Azure-AsyncOperation",
  rootPrefix: "async",
};
const locationsOptions = {
  headerName: "Operation-Location",
  rootPrefix: "location",
};
export const paramRoutes = [
  createPutBody(),
  createRetries(),
  createDeleteProvisioning(),
  createDeleteAsyncRetry(asyncOptions),
  createPutAsyncRetry(asyncOptions),
  createPostasyncRetry(asyncOptions),
  createDeleteAsyncRetry(locationsOptions),
  createPutAsyncRetry(locationsOptions),
  createPostasyncRetry(locationsOptions),
];
