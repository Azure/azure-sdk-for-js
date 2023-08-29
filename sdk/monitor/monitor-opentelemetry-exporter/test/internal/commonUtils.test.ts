// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import os from "os";
import * as assert from "assert";
import { Resource } from "@opentelemetry/resources";
import { Tags } from "../../src/types";
import { createTagsFromResource } from "../../src/utils/common";

describe("commonUtils.ts", () => {
  describe("#createTagsFromResource", () => {
    it("default values", () => {
      let resource: Resource = Resource.EMPTY;
      const tags: Tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "");
      assert.strictEqual(tags["ai.cloud.roleInstance"], os.hostname());
      assert.strictEqual(tags["ai.user.id"], undefined);
    });

    it("should create Tags using custom Service attributes", () => {
      let resource = new Resource({
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

      resource = new Resource({
        "service.name": "testServiceName",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testServiceName");
    });

    it("should create Tags using Kubernetes attributes if available", () => {
      let resource = new Resource({
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

      resource = new Resource({
        "k8s.replicaset.name": "testK8sReplicaset",
        "k8s.statefulset.name": "testK8sStatefulSet",
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sReplicaset");
      resource = new Resource({
        "k8s.statefulset.name": "testK8sStatefulSet",
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sStatefulSet");
      resource = new Resource({
        "k8s.job.name": "testK8sJob",
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sJob");
      resource = new Resource({
        "k8s.cronjob.name": "testK8sCronJob",
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sCronJob");
      resource = new Resource({
        "k8s.daemonset.name": "testK8sDaemonset",
      });
      tags = createTagsFromResource(resource);
      assert.strictEqual(tags["ai.cloud.role"], "testK8sDaemonset");
    });

    it("should create Tags using default Resource", () => {
      let resource = Resource.default();
      let tags: Tags = createTagsFromResource(resource);
      assert.ok(tags["ai.cloud.role"].startsWith("unknown_service"), "wrong ai.cloud.role");
    });
  });
});
