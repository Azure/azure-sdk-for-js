import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";
import { ContainerRegistryBlobClient, OciManifest } from "@azure/container-registry";
import { assert, versionsToTest } from "@azure/test-utils";
import { Context } from "mocha";
import { createBlobClient, recorderStartOptions, serviceVersions } from "../utils/utils";

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions): void => {
  onVersions({ minVer: "2021-07-01" }).describe("ContainerRegistryBlobClient", function () {
    // Declare the client and recorder instances.  We will set them using the
    // beforeEach hook.
    let client: ContainerRegistryBlobClient;
    let recorder: Recorder;
    const repositoryName = "library/busybox";

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

    const manifest: OciManifest = {
      schemaVersion: 2,
      config: {
        mediaType: "application/vnd.acme.rocket.config",
        digest: "sha256:d25b42d3dbad5361ed2d909624d899e7254a822c9a632b582ebd3a44f9b0dbc8",
        size: 171,
      },
      layers: [
        {
          mediaType: "application/vnd.oci.image.layer.v1.tar",
          digest: "sha256:654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
          size: 28,
          annotations: {
            name: "artifact.txt",
          },
        },
      ],
    };

    it.skip("can upload OCI manifest", async () => {
      const { digest: uploadedDigest } = await client.uploadManifest(manifest);

      const { digest: downloadedDigest, manifest: downloadedManifest } =
        await client.downloadManifest(uploadedDigest);

      assert.equal(uploadedDigest, downloadedDigest);
      assert.deepStrictEqual(downloadedManifest, manifest);

      await client.deleteManifest(uploadedDigest);
    });
  });
});
