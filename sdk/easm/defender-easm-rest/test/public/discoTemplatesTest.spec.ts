// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import EasmDefender, { EasmClient, isUnexpected } from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Discovery Templates Test", () => {
  let recorder: Recorder;
  let client: EasmClient;
  let template_id: string;
  let partial_name: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    const subscription_id = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const resource_group = assertEnvironmentVariable("RESOURCEGROUPNAME");
    const workspace_name = assertEnvironmentVariable("WORKSPACENAME");
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    client = EasmDefender(
      endpoint,
      subscription_id,
      resource_group,
      workspace_name,
      credential,
      recorder.configureClientOptions({}),
    );
    template_id = "43488";
    partial_name = "ku";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should list discovery templates", async () => {
    const discoTemplateResponse = await client.path("/discoTemplates").get({
      queryParameters: {
        filter: partial_name,
        maxpagesize: 25,
        skip: 0,
      },
    });
    if (isUnexpected(discoTemplateResponse)) {
      throw new Error(discoTemplateResponse.body?.error.message);
    }

    assert.strictEqual(discoTemplateResponse.status, "200");

    const disco_template = discoTemplateResponse.body.value![0];
    assert.isTrue(disco_template.name?.toLowerCase().includes(partial_name));
    assert.isNotNull(disco_template.id);
  });

  it("Should get a given discovery template", async () => {
    const discoTemplateResponse = await client
      .path("/discoTemplates/{templateId}", template_id)
      .get();

    if (isUnexpected(discoTemplateResponse)) {
      throw new Error(discoTemplateResponse.body?.error.message);
    }

    const disco_template = discoTemplateResponse.body;

    assert.strictEqual(discoTemplateResponse.status, "200");

    assert.isNotNull(disco_template.name);
    assert.isNotNull(disco_template.id);
  });
});
