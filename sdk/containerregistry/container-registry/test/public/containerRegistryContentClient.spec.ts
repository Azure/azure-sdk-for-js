// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
import { assert, versionsToTest } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createBlobClient, recorderStartOptions, serviceVersions } from "../utils/utils";
import fs from "fs";
import { Readable } from "stream";
import { readStreamToEnd } from "../../src/utils/helpers";

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions): void => {
  onVersions({ minVer: "2021-07-01" }).describe("ContainerRegistryContentClient", function () {
    // Declare the client and recorder instances.  We will set them using the
    // beforeEach hook.
    let ociArtifactClient: ContainerRegistryContentClient;
    let helloWorldClient: ContainerRegistryContentClient;
    let recorder: Recorder;

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
      ociArtifactClient = createBlobClient(
        assertEnvironmentVariable("CONTAINER_REGISTRY_ENDPOINT"),
        "oci-artifact",
        serviceVersion,
        recorder,
      );

      helloWorldClient = createBlobClient(
        assertEnvironmentVariable("CONTAINER_REGISTRY_ENDPOINT"),
        "library/hello-world",
        serviceVersion,
        recorder,
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
            "org.opencontainers.image.title": "artifact.txt",
          },
        },
      ],
    };

    async function uploadOciManifestPrerequisites() {
      const layer = fs.createReadStream(
        "test/data/oci-artifact/654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
      );
      await ociArtifactClient.uploadBlob(layer);
      const config = fs.createReadStream("test/data/oci-artifact/config.json");
      await ociArtifactClient.uploadBlob(config);
    }

    async function uploadDockerManifestPrerequisites() {
      const layer = fs.createReadStream(
        "test/data/docker/ec0488e025553d34358768c43e24b1954e0056ec4700883252c74f3eec273016",
      );
      await helloWorldClient.uploadBlob(layer);
      const config = fs.createReadStream("test/data/docker/config.json");
      await helloWorldClient.uploadBlob(config);
    }

    it("can upload OCI manifest", async () => {
      await uploadOciManifestPrerequisites();

      const uploadResult = await ociArtifactClient.setManifest(manifest);
      const downloadResult = await ociArtifactClient.getManifest(uploadResult.digest);
      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);
      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await ociArtifactClient.deleteManifest(uploadResult.digest);
    });

    it("can upload OCI manifest from stream", async function (this: Mocha.Context) {
      if (isPlaybackMode()) {
        // Temporarily skip during playback while dealing with recorder issue: https://github.com/Azure/azure-sdk-tools/issues/3015
        this.skip();
      }

      await uploadOciManifestPrerequisites();

      const manifestStream = fs.createReadStream("test/data/oci-artifact/manifest.json");
      const uploadResult = await ociArtifactClient.setManifest(manifestStream);
      const downloadResult = await ociArtifactClient.getManifest(uploadResult.digest);

      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);
      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await ociArtifactClient.deleteManifest(uploadResult.digest);
    });

    it("can upload OCI manifest from buffer", async function (this: Mocha.Context) {
      if (isPlaybackMode()) {
        // Temporarily skip during playback while dealing with recorder issue: https://github.com/Azure/azure-sdk-tools/issues/3015
        this.skip();
      }

      await uploadOciManifestPrerequisites();

      const manifestBuffer = await readStreamToEnd(
        fs.createReadStream("test/data/oci-artifact/manifest.json"),
      );
      const uploadResult = await ociArtifactClient.setManifest(manifestBuffer);
      const downloadResult = await ociArtifactClient.getManifest(uploadResult.digest);

      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);
      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await ociArtifactClient.deleteManifest(uploadResult.digest);
    });

    it("can upload OCI manifest with tag", async () => {
      await uploadOciManifestPrerequisites();

      const uploadResult = await ociArtifactClient.setManifest(manifest, { tag: "my_artifact" });
      const downloadResult = await ociArtifactClient.getManifest("my_artifact");

      assert.equal(downloadResult.mediaType, KnownManifestMediaType.OciImageManifest);
      assert.equal(downloadResult.digest, uploadResult.digest);
      assert.deepStrictEqual(downloadResult.manifest, manifest);

      await ociArtifactClient.deleteManifest(uploadResult.digest);
    });

    it("can upload Docker manifest", async () => {
      await uploadDockerManifestPrerequisites();

      const manifestStream = fs.createReadStream("test/data/docker/manifest.json");
      await helloWorldClient.setManifest(manifestStream, {
        mediaType: KnownManifestMediaType.DockerManifest,
      });
    });

    it("must specify media type when uploading Docker manifest", async () => {
      await uploadDockerManifestPrerequisites();

      const configStream = fs.createReadStream("test/data/docker/config.json");
      await helloWorldClient.uploadBlob(configStream);
      const blobStream = fs.createReadStream(
        "test/data/docker/ec0488e025553d34358768c43e24b1954e0056ec4700883252c74f3eec273016",
      );
      await helloWorldClient.uploadBlob(blobStream);

      const manifestStream = fs.createReadStream("test/data/docker/hello-world/manifest.json");

      try {
        // Need to provide the correct media type.
        await helloWorldClient.setManifest(manifestStream);
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

      await uploadDockerManifestPrerequisites();

      const digest = "sha256:c001493ce924aece0d2cf422ee838bbc90fd6f91a3827dad26f84c3dc762fab2";

      const result = await helloWorldClient.getManifest(digest);

      assert.equal(result.digest, digest);
    });

    it("can upload blob", async () => {
      const blob = fs.createReadStream(
        "test/data/oci-artifact/654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
      );
      const { digest, sizeInBytes } = await ociArtifactClient.uploadBlob(blob);
      const downloadResult = await ociArtifactClient.downloadBlob(
        "sha256:654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
      );
      assert.equal(digest, downloadResult.digest);
      assert.equal(sizeInBytes, 28);
    });

    it("can upload blob from a buffer", async () => {
      const blob = Buffer.alloc(1024, 0x00);
      const { digest } = await ociArtifactClient.uploadBlob(blob);
      const downloadResult = await ociArtifactClient.downloadBlob(digest);
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
      const { digest, sizeInBytes } = await ociArtifactClient.uploadBlob(Readable.from(bigBlob));
      assert.equal(sizeInBytes, bufferSize);
      await ociArtifactClient.deleteBlob(digest);
    });

    it("can upload a big blob with size a multiple of 4MB", async function (this: Mocha.Context) {
      // Skip in record and playback due to large recording size
      if (!isLiveMode()) {
        this.skip();
      }

      // 64 MiB exactly
      const bufferSize = 64 * 1024 * 1024;

      const bigBlob = Buffer.alloc(bufferSize, 0x00);
      const { digest, sizeInBytes } = await ociArtifactClient.uploadBlob(Readable.from(bigBlob));
      assert.equal(sizeInBytes, bufferSize);
      await ociArtifactClient.deleteBlob(digest);
    });

    it("deleteBlob should succeed when trying to delete a nonexistent blob", async function () {
      // Digest is just the shasum of the string "i dont exist"
      const digest = "sha256:b76ba664a289336a4af5d4e262d691dbc2940576dca60a71dfe1b6f73b44658a";
      await ociArtifactClient.deleteBlob(digest);
    });
  });
});
