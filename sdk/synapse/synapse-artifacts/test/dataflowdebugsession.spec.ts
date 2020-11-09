// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DataFlowDebugSessionClient } from "../src";
import { assert } from "chai";
import { authenticate, createClient } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";

describe("Synapse DataFlowDebugSession Client", () => {
  let client: DataFlowDebugSessionClient;
  let recorder: Recorder;
  let sessionId: string;
  let sessionCount: number;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = await createClient(DataFlowDebugSessionClient);
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully create data flow debug session", async function() {
    let getResult = await client.beginCreate({});
    const response = await getResult.pollUntilDone();
    sessionId = response.sessionId as string;
  });

  it("successfully list debug session", async function() {
    const list: string[] = [];
    for await (const dataFlowDebugSessionInfo of client.list()) {
        list.push(dataFlowDebugSessionInfo.sessionId!);
      }

      sessionCount = list.length;
    assert.include(
        list,
        sessionId,
      "Unexpected name of dataflow by DataFlowDebugSessionClient.list."
    );
  });

  it("successfully delete debug session", async function() {
    const list: string[] = [];
    await client.delete({sessionId:sessionId});
    for await (const dataFlowDebugSessionInfo of client.list()) {
        list.push(dataFlowDebugSessionInfo.id!);
      }
    assert.equal(
        list.length,
        sessionCount-1,
      "Unexpected name of dataflow by DataFlowDebugSessionClient.list."
    );
  });
});
