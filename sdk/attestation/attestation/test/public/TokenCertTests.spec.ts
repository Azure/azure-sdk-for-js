// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient } from "../utils/recordedClient";
import { AttestationClient } from "../../src";

describe("TokenCertTests", function() {
  let recorder: Recorder;
  let client: AttestationClient;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ client, recorder } = createRecordedClient(this, "AAD"));
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#GetCertificates", async () => {
    const signingCertificates = await client.signingCertificates.get();
    const certs = signingCertificates.keys!;
    assert(certs.length > 0);
  });
});
