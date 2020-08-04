// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { createSandbox } from "sinon";
import * as fs from "fs";
import * as path from "path";
import { getTenantIdFromVSCode } from "../../src/credentials/visualStudioCodeCredential";

describe("VisualStudioCodeCredential", function() {
  it("getTenantIdFromVSCode should load the tenant on different OSs", function() {
    const sandbox = createSandbox();
    const stub = sandbox.stub(fs, "readFileSync");
    stub.callsFake(() =>
      JSON.stringify({
        "azure.tenant": "tenant"
      })
    );

    const tenant = getTenantIdFromVSCode();
    assert.equal(tenant, "tenant");

    const calls = stub.getCalls();
    const parsedPath = path.parse(calls[0].args[0] as string);
    assert.equal(parsedPath.base, "settings.json");

    sandbox.restore();
  });
});
