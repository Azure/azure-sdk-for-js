// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isRecordMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { DataLakeFileSystemClient, FileReadOptions } from "../../src/index.js";
import {
  AnonymousCredential,
  DataLakeFileClient,
  DataLakeServiceClient,
  newPipeline,
} from "../../src/index.js";
import { configureStorageClient, createAndStartRecorder, getUniqueName } from "../utils/index.js";

function newFileClient(): DataLakeFileClient {
  return new DataLakeFileClient(
    "https://myaccount.dfs.core.windows.net/filesystem/file.txt",
    new AnonymousCredential(),
  );
}

describe("DataLake read option pass-through", () => {
  it("forwards layoutAwareRouting from readToBuffer", async () => {
    const client = newFileClient();
    let received: any;
    (client as any).blockBlobClientInternal = {
      downloadToBuffer: async (_offset: number, _count: number, options: any) => {
        received = options;
        return Buffer.alloc(0);
      },
    };

    await client.readToBuffer(0, 1024, { layoutAwareRouting: "disabled" });

    assert.equal(received.layoutAwareRouting, "disabled");
  });
});

interface SentRequest {
  host: string;
  hostHeader?: string;
}

/** The parts of a Get Blob Layout page the routed read needs, as the generated layer returns it. */
interface LayoutPage {
  ranges?: { range: Array<{ start: number; end: number; endpointIndex: number }> };
  endpoints?: { endpoint: Array<{ index: number; value: string }> };
}

/**
 * Records where each request went. Registered after the data locality policy, so it sees the
 * routed host. In record mode it also passes the account `Host` on to the test proxy, which
 * would otherwise send the routed host instead.
 */
function createRoutingSpy(): { policy: PipelinePolicy; sent: SentRequest[] } {
  const sent: SentRequest[] = [];
  const policy: PipelinePolicy = {
    name: "layoutRoutingSpyPolicy",
    sendRequest(request, next) {
      const hostHeader = request.headers.get("host");
      sent.push({ host: new URL(request.url).host, hostHeader });
      if (hostHeader && isRecordMode()) {
        request.headers.set("x-recording-upstream-host-header", hostHeader);
      }
      return next(request);
    },
  };
  return { policy, sent };
}

describe("Data locality Node.js only", () => {
  let recorder: Recorder;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileClient: DataLakeFileClient;
  let spy: ReturnType<typeof createRoutingSpy>;
  // Never repeats within the range read, so bytes from the wrong offset cannot go unnoticed.
  const content = Buffer.from(Array.from({ length: 4096 }, (_, i) => i % 251));

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    const service = new DataLakeServiceClient(
      `https://${env.DFS_ACCOUNT_NAME}.dfs.core.windows.net/`,
      newPipeline(createTestCredential()),
    );
    // DataLake clients share one core pipeline, so both policies reach the blob calls too.
    spy = createRoutingSpy();
    service["storageClientContext"].pipeline.addPolicy(spy.policy, { afterPhase: "Sign" });
    configureStorageClient(recorder, service);
    fileSystemClient = service.getFileSystemClient(
      recorder.variable("filesystem", getUniqueName("layoutrouting")),
    );
    await fileSystemClient.create();
    fileClient = fileSystemClient.getFileClient(recorder.variable("file", getUniqueName("file")));
    await fileClient.upload(content);
  });

  afterEach(async () => {
    await fileSystemClient?.delete();
    await recorder.stop();
  });

  // Proves the Data Lake pipeline routes the reads readToBuffer sends through the blob client. The
  // layout and the endpoint of a single read are internal, so they are reached directly.
  it("reads a range from the endpoint the file's layout names", async () => {
    const offset = 1024;
    const count = 1024;
    const page: LayoutPage = await (
      fileClient as any
    ).blockBlobClientInternal.blobContext.getLayout({});
    const range = page.ranges!.range.find((r) => r.start <= offset && offset <= r.end)!;
    const endpoint = page.endpoints!.endpoint.find((e) => e.index === range.endpointIndex)!;
    spy.sent.length = 0;

    const response = await fileClient.read(offset, count, {
      layoutEndpoint: endpoint.value,
    } as FileReadOptions);
    const chunks: Buffer[] = [];
    for await (const chunk of response.readableStreamBody!) {
      chunks.push(chunk as Buffer);
    }

    assert.isTrue(Buffer.concat(chunks).equals(content.subarray(offset, offset + count)));
    assert.deepEqual(spy.sent, [
      {
        host: new URL(endpoint.value).host,
        hostHeader: new URL(fileClient.url.replace(".dfs.", ".blob.")).host,
      },
    ]);
  });
});
