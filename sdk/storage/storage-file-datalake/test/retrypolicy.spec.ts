// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URLBuilder } from "@azure/core-http";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { AbortController } from "@azure/abort-controller";
import { DataLakeFileSystemClient, RestError, DataLakeServiceClient } from "../src";
import { newPipeline, Pipeline } from "../src/Pipeline";
import { getDataLakeServiceClient, recorderEnvSetup } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import { record, Recorder } from "@azure/test-utils-recorder";

dotenv.config();

describe("RetryPolicy", () => {
  let fileSystemName: string;
  let dataLakeFileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("container");
    dataLakeFileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await dataLakeFileSystemClient.create();
  });

  afterEach(async function() {
    await dataLakeFileSystemClient.delete();
    await recorder.stop();
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
      return;
    });
    const factories = (dataLakeFileSystemClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new DataLakeFileSystemClient(
      dataLakeFileSystemClient.url,
      pipeline
    );

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectContainerClient.setMetadata(metadata);

    const result = await dataLakeFileSystemClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should abort when abort event trigger during retry interval", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter < 2) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
      return;
    });

    const factories = (dataLakeFileSystemClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new DataLakeFileSystemClient(
      dataLakeFileSystemClient.url,
      pipeline
    );

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };

    let hasError = false;
    try {
      // Default exponential retry delay is 4000ms. Wait for 2000ms to abort which makes sure the aborter
      // happens between 2 requests
      await injectContainerClient.setMetadata(metadata, {
        abortSignal: AbortController.timeout(2 * 1000)
      });
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = (dataLakeFileSystemClient as any).pipeline.factories[
      (dataLakeFileSystemClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new DataLakeFileSystemClient(
      dataLakeFileSystemClient.url,
      pipeline
    );

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectContainerClient.setMetadata(metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should work for secondary endpoint", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter++ < 1) {
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
      return;
    });

    const url = serviceClient.url;
    const urlParsed = URLBuilder.parse(url);
    const host = urlParsed.getHost()!;
    const hostParts = host.split(".");
    const account = hostParts.shift();
    const secondaryAccount = `${account}-secondary`;
    hostParts.unshift(secondaryAccount);
    const secondaryHost = hostParts.join(".");

    const credential = (dataLakeFileSystemClient as any).pipeline.factories[
      (dataLakeFileSystemClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 2, secondaryHost }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new DataLakeFileSystemClient(
      dataLakeFileSystemClient.url,
      pipeline
    );

    let finalRequestURL = "";
    try {
      const response = await injectContainerClient.getProperties();
      finalRequestURL = response._response.request.url;
    } catch (err) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(URLBuilder.parse(finalRequestURL).getHost(), secondaryHost);
  });
});
