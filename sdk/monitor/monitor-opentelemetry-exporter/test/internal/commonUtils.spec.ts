// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import os from "node:os";
import type { Resource } from "@opentelemetry/resources";
import { defaultResource, resourceFromAttributes } from "@opentelemetry/resources";
import type { Tags } from "../../src/types.js";
import {
  createResourceMetricEnvelope,
  createTagsFromResource,
  ensureApplicationIdResource,
  serializeAttribute,
} from "../../src/utils/common.js";
import { APPLICATION_ID_RESOURCE_KEY } from "../../src/Declarations/Constants.js";
import { describe, it, assert } from "vitest";

describe("commonUtils.ts", () => {
  describe("#createTagsFromResource", () => {
    it("default values", () => {
      const resource: Resource = resourceFromAttributes({});
      const tags: Tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "");
      assert.strictEqual(tags["ai.cloud.roleInstance"], os.hostname());
      assert.strictEqual(tags["ai.user.id"], undefined);
    });

    it("should create Tags using custom Service attributes", () => {
      let resource = resourceFromAttributes({
        "service.name": "testServiceName",
        "service.namespace": "testServiceNamespace",
        "service.instance.id": "testServiceInstanceId",
        "k8s.deployment.name": "testK8sDeployment",
        "k8s.replicaset.name": "testK8sReplicaset",
        "k8s.statefulset.name": "testK8sStatefulSet",
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
        "k8s.pod.name": "testK8sPod",
      });
      let tags: Tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testServiceNamespace.testServiceName");
      assert.strictEqual(tags["ai.cloud.roleInstance"], "testK8sPod");

      resource = resourceFromAttributes({
        "service.name": "testServiceName",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testServiceName");
    });

    it("should create Tags using Kubernetes attributes if available", () => {
      let resource = resourceFromAttributes({
        "k8s.deployment.name": "testK8sDeployment",
        "k8s.replicaset.name": "testK8sReplicaset",
        "k8s.statefulset.name": "testK8sStatefulSet",
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
        "k8s.pod.name": "testK8sPod",
      });
      let tags: Tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sDeployment");
      assert.strictEqual(tags["ai.cloud.roleInstance"], "testK8sPod");

      resource = resourceFromAttributes({
        "k8s.replicaset.name": "testK8sReplicaset",
        "k8s.statefulset.name": "testK8sStatefulSet",
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sReplicaset");
      resource = resourceFromAttributes({
        "k8s.statefulset.name": "testK8sStatefulSet",
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sStatefulSet");
      resource = resourceFromAttributes({
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sJob");
      resource = resourceFromAttributes({
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sCronJob");
      resource = resourceFromAttributes({
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sDaemonset");
    });

    it("should create Tags using default Resource", () => {
      const defResource = defaultResource();
      const resource = resourceFromAttributes({ ...defResource.attributes });
      const tags: Tags = createTagsFromResource(resource);
      assert.isTrue(tags["ai.cloud.role"].startsWith("unknown_service"), "wrong ai.cloud.role");
    });

    describe("#createProperties", () => {
      it("should serialize attributes", () => {
        let attr = serializeAttribute("test");
        assert.strictEqual(attr, "test");
        attr = serializeAttribute(false);
        assert.strictEqual(attr, "false");
        attr = serializeAttribute("123");
        assert.strictEqual(attr, "123");
        attr = serializeAttribute({ test: "value" });
        assert.strictEqual(attr, '{"test":"value"}');
        attr = serializeAttribute(new Error("testError") as any);
        assert.isTrue(attr.includes('"stack":"Error: testError'));
        assert.isTrue(attr.includes('"message":"testError"'));
      });
    });

    describe("#createResourceMetricEnvelope", () => {
      it("adds applicationId from connection string when resource is missing it", () => {
        const resource = resourceFromAttributes({ "service.name": "svc" });

        const envelope = createResourceMetricEnvelope(resource, "ikey", "my-app-id");

        assert.ok(envelope);
        assert.strictEqual(
          envelope?.data?.baseData?.properties?.[APPLICATION_ID_RESOURCE_KEY],
          "my-app-id",
        );
      });
    });

    describe("#ensureApplicationIdResource", () => {
      it("adds applicationId when missing", () => {
        const resource = resourceFromAttributes({ "service.name": "svc" });

        const merged = ensureApplicationIdResource(resource, "my-app-id");

        assert.strictEqual(merged.attributes[APPLICATION_ID_RESOURCE_KEY], "my-app-id");
      });

      it("does not overwrite existing applicationId", () => {
        const resource = resourceFromAttributes({
          [APPLICATION_ID_RESOURCE_KEY]: "existing-app-id",
          "service.name": "svc",
        });

        const merged = ensureApplicationIdResource(resource, "ignored-app-id");

        assert.strictEqual(merged.attributes[APPLICATION_ID_RESOURCE_KEY], "existing-app-id");
      });
    });
  });
});
