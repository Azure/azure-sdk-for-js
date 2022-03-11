import { createPipelineRequest, HttpMethods, PipelineResponse } from "@azure/core-rest-pipeline";
import { expect } from "chai";
import { env } from "../../src";
import { isLiveMode, TestMode } from "../../src/utils/utils";
import { ServiceClient } from "@azure/core-client";

export const setTestMode = (mode: TestMode): TestMode => {
  env.TEST_MODE = mode;
  console.log(`==== setting TEST_MODE = ${mode} ====`);
  return mode;
};

/**
 * Returns the test server url
 * Acts as the endpoint [ Works as a substitute to the actual Azure Services ]
 */
export function getTestServerUrl(): string {
  // utils/server.ts creates a localhost server at port 8080
  // - In "live" mode, we are hitting directly the localhost endpoint
  // - In "record" and "playback" modes, we need to hit the localhost of the host network
  //   from the proxy tool running in the docker container.
  //   `host.docker.internal` alias can be used in the docker container to access host's network(localhost)
  //
  // if PROXY_MANUAL_START=true, we start the proxy tool using the dotnet tool instead of the `docker run` command
  //  - in this case, we don't need to hit the localhost using the alias
  //  - needed for the CI since we have difficulties with the mac machines
  return !isLiveMode() && !(env.PROXY_MANUAL_START === "true")
    ? `http://host.docker.internal:8080` // Accessing host's network(localhost) through docker container
    : `http://127.0.0.1:8080`;
}

export async function makeRequestAndVerifyResponse(
  client: ServiceClient,
  request: {
    url?: string;
    path: string;
    body?: string;
    headers?: { headerName: string; value: string }[];
    method: HttpMethods;
  },
  expectedResponse: { [key: string]: unknown } | undefined,
  expectedHeaders?: { [key: string]: string }
): Promise<PipelineResponse> {
  const req = createPipelineRequest({
    url: request.url ?? getTestServerUrl() + request.path,
    body: request.body,
    method: request.method,
    allowInsecureConnection: isLiveMode(),
  });
  request.headers?.forEach(({ headerName, value }) => {
    req.headers.set(headerName, value);
  });
  const response = await client.sendRequest(req);
  if (expectedResponse) {
    if (!response.bodyAsText) {
      throw new Error("Expected response.bodyAsText to be defined");
    }

    expect(JSON.parse(response.bodyAsText)).to.deep.equal(expectedResponse);
  }

  if (expectedHeaders) {
    for (const [headerName, headerValue] of Object.entries(expectedHeaders)) {
      expect(response.headers.get(headerName)).to.equal(headerValue);
    }
  }

  return response;
}
