// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.JobDefinitionJobRunTests`.
//
// **Row #10 (`JobDefinitionJobRunTest`) is extended beyond .NET** to the
// Python-parity public-bucket Succeeded-poll E2E: source = MCC over the public
// AWS S3 bucket `e2e-sm-rp-bucket`, target = blob container under shared
// `cpmoveraccount` with target-endpoint SystemAssigned MSI granted Storage Blob
// Data Contributor, job-run polled until Succeeded. The original .NET version
// merely asserted that StartJob/StopJob fail without a registered agent; that
// surface is reachable but the data-plane validation provides much stronger
// coverage. Mirrors `test_job_definition_job_run` in
// `azure-sdk-for-python/sdk/storagemover/azure-mgmt-storagemover/tests/test_storage_mover_mgmt_job_definitions_operations_test.py`.
//
// **Row #31 (`StartC2CJobWithPrivateSourceTest`) is the full private-bucket
// E2E**: Storage Mover Connection → cross-sub PE-connection lookup with retries
// → PE-connection approval → poll Storage Mover Connection until `Approved` →
// target blob endpoint with MSI + RBAC → source MCC against the private S3
// bucket → C2C job-definition with `connections: [<conn-id>]` → start →
// poll until Succeeded. Mirrors
// `Storage-XDataMove-RP/test/E2ETest/C2CTest/StartJobTest.cs::StartC2CJobWithPrivateSourceAsyncSuccessPathTest`
// and the Python `test_start_c2c_job_with_private_source` reference impl.
//
// Both tests run in `westcentralus` because the shared `cpmoveraccount` and
// `test-pls-wcs` PLS live there.

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  AWS_PRIVATE_S3_BUCKET_ID,
  AWS_S3_BUCKET_ID,
  MULTI_CLOUD_CONNECTOR_ID,
  PLS_NAME,
  PLS_RESOURCE_GROUP,
  REAL_PRIVATE_LINK_SERVICE_ID,
  SHARED_STORAGE_ACCOUNT_ID,
  SHARED_STORAGE_ACCOUNT_NAME,
  STORAGE_ACCOUNT_RG,
  WCUS_LOCATION,
  blobContainerScope,
  createAuthorizationClient,
  createNetworkClient,
  createProject,
  createStorageClient,
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
  storageBlobDataContributorRoleId,
  uuidFor,
} from "./testHelper.js";

/** Job-run statuses considered terminal for polling purposes. */
const TERMINAL_STATES = new Set([
  "Succeeded",
  "Failed",
  "Canceled",
  // RP can emit "PartialSucceeded" even though it isn't in KnownJobRunStatus.
  "PartialSucceeded",
]);

/** Polling cadence — every 30s up to 30 min. `delay()` is a no-op in playback. */
const POLL_INTERVAL_MS = 30_000;
const POLL_MAX_ITERATIONS = 60;

/** PE-connection lookup cadence — every 15s up to 150s. */
const PE_LOOKUP_INTERVAL_MS = 15_000;
const PE_LOOKUP_MAX_ITERATIONS = 10;

/** Connection-approval cadence — every 30s up to 5 min. */
const APPROVAL_INTERVAL_MS = 30_000;
const APPROVAL_MAX_ITERATIONS = 10;

/**
 * Per-spec resource groups in WCUS. Each big test gets its own RG because
 * each is long-running and we don't want one failure to block the other.
 */
const RG_ROW_10 = "testsmrg-js-jdjr-pub";
const RG_ROW_31 = "testsmrg-js-jdjr-pvt";

describe("JobDefinitionJobRunTests", () => {
  let recorder: Recorder;
  let client: StorageMoverClient;
  let subscriptionId: string;

  beforeAll(async () => {
    subscriptionId = getSubscriptionId();
    await provisionResourceGroup(subscriptionId, RG_ROW_10, WCUS_LOCATION);
    await provisionResourceGroup(subscriptionId, RG_ROW_31, WCUS_LOCATION);
  });

  afterAll(async () => {
    await deleteResourceGroup(subscriptionId, RG_ROW_10);
    await deleteResourceGroup(subscriptionId, RG_ROW_31);
  });

  beforeEach(async (ctx) => {
    ({ recorder, client } = await setupRecorder(ctx));
  });

  afterEach(async () => {
    if (recorder) {
      await recorder.stop();
    }
  });

  // ---------------------------------------------------------------------------
  // Row #10 (extended): public-bucket C2C — start, poll until Succeeded
  // ---------------------------------------------------------------------------
  it("starts a public-bucket C2C job and polls until Succeeded (matrix #10)", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-jdjr-");
    const projectName = nameFor(recorder, "projectName", "testproj-jdjr-");
    const sourceEndpointName = nameFor(recorder, "sourceEndpointName", "testsrc-mcc-pub-");
    const targetEndpointName = nameFor(recorder, "targetEndpointName", "testtgt-blob-pub-");
    const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "testjobdef-pub-");
    // Per-run container under the shared storage account — keeps test runs
    // isolated. Round-tripped via recorder.variable so playback sees the
    // recorded value.
    const containerName = recorder.variable(
      "containerName",
      `tc${Math.random().toString(16).slice(2, 12)}`,
    );
    const roleAssignmentName = uuidFor(recorder, "roleAssignmentName");

    const storageClient = createStorageClient(recorder);
    const authClient = createAuthorizationClient(recorder);

    await createStorageMover(
      client,
      RG_ROW_10,
      storageMoverName,
      "scenario-test storage mover (#10 extended)",
      undefined,
      WCUS_LOCATION,
    );
    await createProject(client, RG_ROW_10, storageMoverName, projectName);

    // Source MCC endpoint over the PUBLIC AWS S3 bucket.
    await client.endpoints.createOrUpdate(RG_ROW_10, storageMoverName, sourceEndpointName, {
      properties: {
        endpointType: "AzureMultiCloudConnector",
        multiCloudConnectorId: MULTI_CLOUD_CONNECTOR_ID,
        awsS3BucketId: AWS_S3_BUCKET_ID,
        endpointKind: "Source",
        description: "publicMccSourceForJobRun",
      },
    });

    // Target blob endpoint with explicit SystemAssigned MSI. The raw SDK PUT
    // does NOT auto-inject identity (unlike the CLI's `endpoint
    // create-for-storage-container` command) — must request it explicitly so
    // the RP returns a principalId we can grant data-plane RBAC to.
    const target = await client.endpoints.createOrUpdate(
      RG_ROW_10,
      storageMoverName,
      targetEndpointName,
      {
        identity: { type: "SystemAssigned" },
        properties: {
          endpointType: "AzureStorageBlobContainer",
          storageAccountResourceId: SHARED_STORAGE_ACCOUNT_ID,
          blobContainerName: containerName,
          description: "blobTargetForJobRun",
        },
      },
    );
    assert.ok(
      target.identity?.principalId,
      "Target blob endpoint did not get an auto-assigned MSI principalId",
    );
    const targetMsiPrincipalId = target.identity!.principalId!;

    let containerCreated = false;
    let rbacCreated = false;
    const containerScope = blobContainerScope(containerName);
    const roleDefinitionId = storageBlobDataContributorRoleId();

    try {
      // Cross-sub: create the target container under cpmoveraccount.
      await storageClient.blobContainers.create(
        STORAGE_ACCOUNT_RG,
        SHARED_STORAGE_ACCOUNT_NAME,
        containerName,
        {},
      );
      containerCreated = true;

      // Cross-sub: grant the endpoint MSI Storage Blob Data Contributor on the
      // container scope.
      await authClient.roleAssignments.create(containerScope, roleAssignmentName, {
        roleDefinitionId,
        principalId: targetMsiPrincipalId,
        principalType: "ServicePrincipal",
      });
      rbacCreated = true;

      // Create the C2C job definition (no `connections` — public bucket needs
      // no PLS).
      const jd = await client.jobDefinitions.createOrUpdate(
        RG_ROW_10,
        storageMoverName,
        projectName,
        jobDefinitionName,
        {
          properties: {
            copyMode: "Additive",
            sourceName: sourceEndpointName,
            targetName: targetEndpointName,
            jobType: "CloudToCloud",
            sourceSubpath: "/",
            targetSubpath: "/",
            description: "JobDefForJobRunTest",
          },
        },
      );
      assert.equal(jd.name, jobDefinitionName);
      assert.equal(jd.properties.sourceName, sourceEndpointName);
      assert.equal(jd.properties.targetName, targetEndpointName);
      assert.equal(jd.properties.copyMode, "Additive");

      // get-then-get equivalence (mirrors .NET).
      const jdGet = await client.jobDefinitions.get(
        RG_ROW_10,
        storageMoverName,
        projectName,
        jobDefinitionName,
      );
      assert.equal(jdGet.id, jd.id);

      // List must contain ours.
      const names: string[] = [];
      for await (const item of client.jobDefinitions.list(
        RG_ROW_10,
        storageMoverName,
        projectName,
      )) {
        if (item.name) names.push(item.name);
      }
      assert.include(names, jobDefinitionName);

      // Start the job. The RP returns the job-run resource id; extract basename.
      const startResult = await client.jobDefinitions.startJob(
        RG_ROW_10,
        storageMoverName,
        projectName,
        jobDefinitionName,
      );
      assert.ok(startResult.jobRunResourceId, "startJob did not return jobRunResourceId");
      const jobRunName = startResult.jobRunResourceId!.replace(/\/+$/, "").split("/").pop()!;

      // Poll jobRuns.get every 30s up to 30 min until terminal. `delay()` is
      // a no-op in playback so the cassette plays back fast.
      let finalStatus: string | undefined;
      for (let i = 0; i < POLL_MAX_ITERATIONS; i++) {
        const run = await client.jobRuns.get(
          RG_ROW_10,
          storageMoverName,
          projectName,
          jobDefinitionName,
          jobRunName,
        );
        const status = run.properties?.status;
        if (status && TERMINAL_STATES.has(status)) {
          finalStatus = status;
          break;
        }
        await delay(POLL_INTERVAL_MS);
      }
      assert.ok(finalStatus, "Job run did not reach a terminal state within 30 min");
      assert.equal(
        finalStatus,
        "Succeeded",
        `Expected job-run to Succeed with public bucket + target MSI RBAC, got: ${finalStatus}`,
      );

      // Cleanup the job definition (other resources rolled back in finally).
      await client.jobDefinitions
        .delete(RG_ROW_10, storageMoverName, projectName, jobDefinitionName)
        .pollUntilDone();
    } finally {
      // Best-effort cleanup of cross-sub side effects in shared infra.
      // Order matters: RBAC then container (container can't be deleted while
      // it has active RBAC pinning the principal).
      if (rbacCreated) {
        try {
          await authClient.roleAssignments.delete(containerScope, roleAssignmentName);
        } catch {
          /* best-effort */
        }
      }
      if (containerCreated) {
        try {
          await storageClient.blobContainers.delete(
            STORAGE_ACCOUNT_RG,
            SHARED_STORAGE_ACCOUNT_NAME,
            containerName,
          );
        } catch {
          /* best-effort */
        }
      }
    }

    // Tear down the parent mover.
    await client.storageMovers.delete(RG_ROW_10, storageMoverName).pollUntilDone();
  });

  // ---------------------------------------------------------------------------
  // Row #31: private-bucket C2C — full PLS approval + RBAC + Succeeded
  // ---------------------------------------------------------------------------
  it(
    "starts a private-bucket C2C job via approved Connection and polls until Succeeded (matrix #31)",
    async () => {
      const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-c2cpvt-");
      const projectName = nameFor(recorder, "projectName", "testproj-c2cpvt-");
      // Connection names max 20 chars (letters/digits/underscore/hyphen, must
      // start with letter/digit). Short prefix + 8-hex suffix fits.
      const connectionName = recorder.variable(
        "connectionName",
        `conn${Math.random().toString(16).slice(2, 10)}`,
      );
      const sourceEndpointName = nameFor(recorder, "sourceEndpointName", "testsrc-mcc-pvt-");
      const targetEndpointName = nameFor(recorder, "targetEndpointName", "testtgt-blob-pvt-");
      const jobDefinitionName = nameFor(recorder, "jobDefinitionName", "testjobdef-c2cpvt-");
      const containerName = recorder.variable(
        "containerName",
        `tc${Math.random().toString(16).slice(2, 12)}`,
      );
      const roleAssignmentName = uuidFor(recorder, "roleAssignmentName");

      const networkClient = createNetworkClient(recorder);
      const storageClient = createStorageClient(recorder);
      const authClient = createAuthorizationClient(recorder);

      let connectionCreated = false;
      let containerCreated = false;
      let rbacCreated = false;
      const containerScope = blobContainerScope(containerName);
      const roleDefinitionId = storageBlobDataContributorRoleId();

      try {
        // 1. Self-provision mover + project (WCUS — required by the shared PLS).
        await createStorageMover(
          client,
          RG_ROW_31,
          storageMoverName,
          "scenario-test storage mover (#31)",
          undefined,
          WCUS_LOCATION,
        );
        await createProject(client, RG_ROW_31, storageMoverName, projectName);

        // 2. Create the Storage Mover Connection. The RP synchronously
        //    provisions a private endpoint on the PLS in Pending state and
        //    returns its id in `properties.privateEndpointResourceId`.
        const connection = await client.connections.createOrUpdate(
          RG_ROW_31,
          storageMoverName,
          connectionName,
          {
            properties: {
              privateLinkServiceId: REAL_PRIVATE_LINK_SERVICE_ID,
              description: "ConnectionForPrivateBucketJobRun",
            },
          },
        );
        connectionCreated = true;
        const peResourceId = connection.properties?.privateEndpointResourceId;
        assert.ok(peResourceId, "Connection create did not return privateEndpointResourceId");

        // 3. Wait for the auto-created PE-connection to appear on the PLS,
        //    then approve it via PLS PEC update (cross-sub call).
        let peConnectionName: string | undefined;
        for (let i = 0; i < PE_LOOKUP_MAX_ITERATIONS; i++) {
          for await (const pec of networkClient.privateLinkServices.listPrivateEndpointConnections(
            PLS_RESOURCE_GROUP,
            PLS_NAME,
          )) {
            const pecPeId = pec.privateEndpoint?.id ?? "";
            if (pecPeId.toLowerCase() === peResourceId!.toLowerCase()) {
              peConnectionName = pec.name;
              break;
            }
          }
          if (peConnectionName) break;
          await delay(PE_LOOKUP_INTERVAL_MS);
        }
        assert.ok(
          peConnectionName,
          `PE-connection for ${peResourceId} did not appear on PLS ${PLS_NAME} within ${
            (PE_LOOKUP_MAX_ITERATIONS * PE_LOOKUP_INTERVAL_MS) / 1000
          }s`,
        );

        await networkClient.privateLinkServices.updatePrivateEndpointConnection(
          PLS_RESOURCE_GROUP,
          PLS_NAME,
          peConnectionName!,
          {
            privateLinkServiceConnectionState: {
              status: "Approved",
              description: "approved by storage-mover SDK live test",
              actionsRequired: "None",
            },
          },
        );

        // 4. Poll Storage Mover Connection until connection_status == Approved.
        //    The storage-mover side mirrors PLS state with up to ~5 min lag.
        let approved = false;
        for (let i = 0; i < APPROVAL_MAX_ITERATIONS; i++) {
          const connShow = await client.connections.get(
            RG_ROW_31,
            storageMoverName,
            connectionName,
          );
          if (connShow.properties?.connectionStatus === "Approved") {
            approved = true;
            break;
          }
          await delay(APPROVAL_INTERVAL_MS);
        }
        assert.ok(
          approved,
          `Storage Mover Connection did not reach Approved within ${
            (APPROVAL_MAX_ITERATIONS * APPROVAL_INTERVAL_MS) / 1000
          }s`,
        );

        // 5. Create the target blob endpoint. Explicitly request a
        //    SystemAssigned MSI (see #10 commentary).
        const target = await client.endpoints.createOrUpdate(
          RG_ROW_31,
          storageMoverName,
          targetEndpointName,
          {
            identity: { type: "SystemAssigned" },
            properties: {
              endpointType: "AzureStorageBlobContainer",
              storageAccountResourceId: SHARED_STORAGE_ACCOUNT_ID,
              blobContainerName: containerName,
              description: "blobTargetForJobRunWait",
            },
          },
        );
        assert.ok(
          target.identity?.principalId,
          "Target blob endpoint did not get an auto-assigned MSI principalId",
        );
        const targetMsiPrincipalId = target.identity!.principalId!;

        // 6. Cross-sub: create the target blob container under cpmoveraccount.
        await storageClient.blobContainers.create(
          STORAGE_ACCOUNT_RG,
          SHARED_STORAGE_ACCOUNT_NAME,
          containerName,
          {},
        );
        containerCreated = true;

        // 7. Cross-sub: grant the endpoint MSI Storage Blob Data Contributor
        //    on the container scope.
        await authClient.roleAssignments.create(containerScope, roleAssignmentName, {
          roleDefinitionId,
          principalId: targetMsiPrincipalId,
          principalType: "ServicePrincipal",
        });
        rbacCreated = true;

        // 8. Source MCC endpoint over the PRIVATE AWS S3 bucket.
        await client.endpoints.createOrUpdate(RG_ROW_31, storageMoverName, sourceEndpointName, {
          properties: {
            endpointType: "AzureMultiCloudConnector",
            multiCloudConnectorId: MULTI_CLOUD_CONNECTOR_ID,
            awsS3BucketId: AWS_PRIVATE_S3_BUCKET_ID,
            endpointKind: "Source",
            description: "privateMccSourceForJobRunWait",
          },
        });

        // 9. C2C job definition wired to the approved connection.
        await client.jobDefinitions.createOrUpdate(
          RG_ROW_31,
          storageMoverName,
          projectName,
          jobDefinitionName,
          {
            properties: {
              copyMode: "Additive",
              sourceName: sourceEndpointName,
              targetName: targetEndpointName,
              jobType: "CloudToCloud",
              sourceSubpath: "/",
              targetSubpath: "/",
              connections: [connection.id!],
              description: "JobDefForJobRunWaitTest",
            },
          },
        );

        // 10. Start the job. Extract job-run basename from the returned id.
        const startResult = await client.jobDefinitions.startJob(
          RG_ROW_31,
          storageMoverName,
          projectName,
          jobDefinitionName,
        );
        assert.ok(startResult.jobRunResourceId, "startJob did not return jobRunResourceId");
        const jobRunName = startResult.jobRunResourceId!.replace(/\/+$/, "").split("/").pop()!;

        // 11. Poll jobRuns.get every 30s up to 30 min until terminal.
        let finalStatus: string | undefined;
        for (let i = 0; i < POLL_MAX_ITERATIONS; i++) {
          const run = await client.jobRuns.get(
            RG_ROW_31,
            storageMoverName,
            projectName,
            jobDefinitionName,
            jobRunName,
          );
          const status = run.properties?.status;
          if (status && TERMINAL_STATES.has(status)) {
            finalStatus = status;
            break;
          }
          await delay(POLL_INTERVAL_MS);
        }
        assert.ok(finalStatus, "Job run did not reach a terminal state within 30 min");
        assert.equal(
          finalStatus,
          "Succeeded",
          `Expected job-run to Succeed with approved connection + target MSI RBAC, got: ${finalStatus}`,
        );

        // 12. Cleanup the job-definition (other resources rolled back in finally).
        await client.jobDefinitions
          .delete(RG_ROW_31, storageMoverName, projectName, jobDefinitionName)
          .pollUntilDone();
      } finally {
        // Best-effort cleanup of cross-sub side effects in shared infra.
        // Order matters: RBAC then container then Connection (container can't
        // be deleted while it has active RBAC pinning the principal).
        if (rbacCreated) {
          try {
            await authClient.roleAssignments.delete(containerScope, roleAssignmentName);
          } catch {
            /* best-effort */
          }
        }
        if (containerCreated) {
          try {
            await storageClient.blobContainers.delete(
              STORAGE_ACCOUNT_RG,
              SHARED_STORAGE_ACCOUNT_NAME,
              containerName,
            );
          } catch {
            /* best-effort */
          }
        }
        if (connectionCreated) {
          try {
            await client.connections
              .delete(RG_ROW_31, storageMoverName, connectionName)
              .pollUntilDone();
          } catch {
            /* best-effort */
          }
        }
      }

      // Tear down the parent mover.
      try {
        await client.storageMovers.delete(RG_ROW_31, storageMoverName).pollUntilDone();
      } catch {
        /* best-effort */
      }
    },
    // Vitest per-test timeout — 35 min covers polling worst case + cleanup.
    35 * 60 * 1000,
  );
});
