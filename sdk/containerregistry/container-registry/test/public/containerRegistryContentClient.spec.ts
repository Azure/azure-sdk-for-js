// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  assertEnvironmentVariable,
  isPlaybackMode,
  isLiveMode,
} from "@azure-tools/test-recorder";
import {
  ContainerRegistryContentClient,
  KnownManifestMediaType,
  OciImageManifest,
} from "../../src";
import { assert, versionsToTest } from "@azure/test-utils";
import { Context } from "mocha";
import { createBlobClient, recorderStartOptions, serviceVersions } from "../utils/utils";
import fs from "fs";
import { Readable } from "stream";
import { readStreamToEnd } from "../../src/utils/helpers";

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions): void => {
  onVersions({ minVer: "2021-07-01" }).describe("ContainerRegistryContentClient", function () {
    // Declare the client and recorder instances.  We will set them using the
    // beforeEach hook.
    let client: ContainerRegistryContentClient;
    let recorder: Recorder;
    const repositoryName = "oci-artifact";

    // NOTE: use of "function" and not ES6 arrow-style functions with the
    // beforeEach hook is IMPORTANT due to the use of `this` in the function
    // body.
    beforeEach(async function (this: Context) {
      // The recorder has some convenience methods, and we need to store a
      // reference to it so that we can `stop()` the recorder later in the
      // `afterEach` hook.
      recorder = new Recorder(this.currentTest);

      await recorder.start(recorderStartOptions);

      // We'll be able to refer to the instantiated `client` in tests, since we
      // initialize it before each test
      client = createBlobClient(
        assertEnvironmentVariable("CONTAINER_REGISTRY_ENDPOINT"),
        repositoryName,
        serviceVersion,
        recorder
      );
    });

    // After each test, we need to stop the recording.
    afterEach(async function () {
      await recorder.stop();
    });

    const manifest: OciImageManifest = {
      schemaVersion: 2,
      config: {
        mediaType: "application/vnd.oci.image.config.v1+json",
        digest: "sha256:d25b42d3dbad5361ed2d909624d899e7254a822c9a632b582ebd3a44f9b0dbc8",
        size: 171,
      },
      layers: [
        {
          mediaType: "application/vnd.oci.image.layer.v1.tar",
          digest: "sha256:654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
          size: 28,
          annotations: {
            title: "artifact.txt",
          },
        },
      ],
    };

    const uploadManifestPrerequisites = async () => {
      const layer = fs.createReadStream(
        "test/data/oci-artifact/654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed"
      );
      await client.uploadBlob(layer);
      const config = fs.createReadStream("test/data/oci-artifact/config.json");
      await client.uploadBlob(config);
    };

    it("can upload OCI manifest", async () => {
      await uploadManifestPrerequisites();

      const uploadResult = await client.setManifest(manifest);
      const downloadResult = await client.getManifest(uploadResult.digest);
      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);

      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await client.deleteManifest(uploadResult.digest);
    });

    it("can upload OCI manifest from stream", async function (this: Mocha.Context) {
      if (isPlaybackMode()) {
        // Temporarily skip during playback while dealing with recorder issue: https://github.com/Azure/azure-sdk-tools/issues/3015
        this.skip();
      }

      await uploadManifestPrerequisites();

      const manifestStream = fs.createReadStream("test/data/oci-artifact/manifest.json");
      const uploadResult = await client.setManifest(manifestStream);
      const downloadResult = await client.getManifest(uploadResult.digest);

      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);

      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await client.deleteManifest(uploadResult.digest);
    });

    it("can upload OCI manifest from buffer", async function (this: Mocha.Context) {
      if (isPlaybackMode()) {
        // Temporarily skip during playback while dealing with recorder issue: https://github.com/Azure/azure-sdk-tools/issues/3015
        this.skip();
      }

      await uploadManifestPrerequisites();

      const manifestBuffer = await readStreamToEnd(
        fs.createReadStream("test/data/oci-artifact/manifest.json")
      );
      const uploadResult = await client.setManifest(manifestBuffer);
      const downloadResult = await client.getManifest(uploadResult.digest);
      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);

      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await client.deleteManifest(uploadResult.digest);
    });

    it("can upload OCI manifest with tag", async () => {
      await uploadManifestPrerequisites();

      const uploadResult = await client.setManifest(manifest, { tag: "my_artifact" });
      const downloadResult = await client.getManifest("my_artifact");
      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);

      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await client.deleteManifest(uploadResult.digest);
    });

    it("can upload Docker manifest", async () => {
      const helloWorldClient = createBlobClient(
        assertEnvironmentVariable("CONTAINER_REGISTRY_ENDPOINT"),
        "library/hello-world",
        serviceVersion,
        recorder
      );

      const manifestStream = () =>
        fs.createReadStream("test/data/docker/hello-world/manifest.json");
      await helloWorldClient.setManifest(manifestStream(), {
        mediaType: KnownManifestMediaType.DockerManifest,
      });

      try {
        // Need to provide the correct media type.
        await helloWorldClient.setManifest(manifestStream());
        assert.fail("Expected exception to be thrown");
      } catch {
        // ignore expected exception
      }
    });

    it("can download Docker manifest", async function (this: Mocha.Context) {
      if (isPlaybackMode()) {
        // Temporarily skip during playback while dealing with recorder issue: https://github.com/Azure/azure-sdk-tools/issues/3015
        this.skip();
      }

      const helloWorldClient = createBlobClient(
        assertEnvironmentVariable("CONTAINER_REGISTRY_ENDPOINT"),
        "library/hello-world",
        serviceVersion,
        recorder
      );

      const digest = "sha256:f54a58bc1aac5ea1a25d796ae155dc228b3f0e11d046ae276b39c4bf2f13d8c4";

      const result = await helloWorldClient.getManifest(digest);

      assert.equal(result.digest, digest);

      // Since this is not an OCI manifest we expect `manifest` to be undefined.
      assert.doesNotHaveAnyKeys(result, ["manifest"]);
    });

    it.skip("can upload OCI manifest stream with tag", async function (this: Mocha.Context) {
      if (isPlaybackMode()) {
        // Temporarily skip during playback while dealing with recorder issue
        this.skip();
      }

      await uploadManifestPrerequisites();

      const manifestStream = fs.createReadStream("test/data/oci-artifact/manifest.json");
      const uploadResult = await client.setManifest(manifestStream, { tag: "my_artifact" });
      const downloadResult = await client.getManifest("my_artifact");
      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);

      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await client.deleteManifest(uploadResult.digest);
    });

    it("can upload blob", async () => {
      const blob = fs.createReadStream(
        "test/data/oci-artifact/654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed"
      );
      const { digest, sizeInBytes } = await client.uploadBlob(blob);
      const downloadResult = await client.downloadBlob(
        "sha256:654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed"
      );
      assert.equal(digest, downloadResult.digest);
      assert.equal(sizeInBytes, 28);
    });

    it("can upload blob from a buffer", async () => {
      const blob = Buffer.alloc(1024, 0x00);
      const { digest } = await client.uploadBlob(blob);
      const downloadResult = await client.downloadBlob(digest);
      assert.equal(digest, downloadResult.digest);
    });

    it("can upload a big blob with size not a multiple of 4MB", async function (this: Mocha.Context) {
      // Skip in record and playback due to large recording size
      if (!isLiveMode()) {
        this.skip();
      }

      // 64 MiB plus extra offset to have a smaller chunk at the end
      const bufferSize = 64 * 1024 * 1024 + 321;
      const bigBlob = Buffer.alloc(bufferSize, 0x00);
      const { digest, sizeInBytes } = await client.uploadBlob(Readable.from(bigBlob));
      assert.equal(sizeInBytes, bufferSize);
      await client.deleteBlob(digest);
    });

    it("can upload a big blob with size a multiple of 4MB", async function (this: Mocha.Context) {
      // Skip in record and playback due to large recording size
      if (!isLiveMode()) {
        this.skip();
      }

      // Skip in record and playback due to large recording size
      if (!isLiveMode()) {
        this.skip();
      }

      // 64 MiB exactly
      const bufferSize = 64 * 1024 * 1024;

      const bigBlob = Buffer.alloc(bufferSize, 0x00);
      const { digest, sizeInBytes } = await client.uploadBlob(Readable.from(bigBlob));
      assert.equal(sizeInBytes, bufferSize);
      await client.deleteBlob(digest);
    });

    it("deleteBlob should succeed when trying to delete a nonexistent blob", async function () {
      // Digest is just the shasum of the string "i dont exist"
      const digest = "sha256:b76ba664a289336a4af5d4e262d691dbc2940576dca60a71dfe1b6f73b44658a";
      await client.deleteBlob(digest);
    });
  });
});
