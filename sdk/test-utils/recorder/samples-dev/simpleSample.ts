// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";
import { ServiceClient } from "@azure/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert } from "chai";

/**
 * @azsdk-weight 80
 */
async function main() {
  const recorder = new Recorder({ filePath: "azure-sdk-for-js/sdk/test-utils/recorder/temp/samples-dev/abcd.json" });
  await recorder.start({ envSetupForPlayback: {} });

  const client = new ServiceClient(recorder.configureClientOptions({}));
  const request = createPipelineRequest({ url: "https://example.com/", method: "GET" });
  const response = await client.sendRequest(request);
  assert.equal(response.bodyAsText?.includes("<title>Example Domain</title>"), true, "Failure: Unexpected string observed");

  await recorder.stop();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
