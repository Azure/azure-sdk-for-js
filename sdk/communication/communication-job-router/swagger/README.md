# Azure Communication Services Job Router

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: azure-communication-jobrouter
title: JobRouterApiClient
description: JobRouter Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: V2021_10_20_preview2
input-file: swagger.json
model-date-time-as-string: false
optional-response-headers: true
use-extension:
  "@autorest/typescript": "latest"
  "@autorest/modelerfour": "4.15.442"
azure-arm: false
add-credentials: false
use-core-v2: false
```

# Remove "x-ms-parameterized-host" section when copying swagger.json

# No empty classes anymore in mapper.ts after assigning ref

# Remove readOnly flag so that child class objectType value can update and pass to endpoint instead of missing

# Change imcompatible TimeSpan type to String which can be parsed by .Net Core TimeSpan system class

# Keep current definition of CommunicationErrorResponse in swagger.json

# Manually add type for repeatabilityHeaders in generated index.ts, should try to find auto solution in future

```yaml
directive:

  - from: swagger-document
    where: "$.definitions.DistributionPolicy.properties.mode"
    transform: >
      $["$ref"] = "#/definitions/DistributionMode";

  - from: swagger-document
    where: "$.definitions.PagedDistributionPolicy.properties.mode"
    transform: >
      $["$ref"] = "#/definitions/DistributionMode";
      
  - from: swagger-document
    where: "$.definitions.CompositeModeIteration.properties.mode"
    transform: >
      $["$ref"] = "#/definitions/DistributionMode";

  - from: swagger-document
    where: "$.definitions.ClassificationPolicy.properties"
    transform: >
      $.queueSelectors.items["$ref"] = "#/definitions/LabelSelectorAttachment";
      $.workerSelectors.items["$ref"] = "#/definitions/LabelSelectorAttachment";
      $.prioritizationRule["$ref"] = "#/definitions/RouterRule";
      
  - from: swagger-document
    where: "$.definitions.CreateClassificationPolicyRequest.properties"
    transform: >
      $.queueSelectors.items["$ref"] = "#/definitions/LabelSelectorAttachment";
      $.workerSelectors.items["$ref"] = "#/definitions/LabelSelectorAttachment";
      $.prioritizationRule["$ref"] = "#/definitions/RouterRule";

  - from: swagger-document
    where: "$.definitions.PagedClassificationPolicy.properties"
    transform: >
      $.queueSelectors.items["$ref"] = "#/definitions/LabelSelectorAttachment";
      $.workerSelectors.items["$ref"] = "#/definitions/LabelSelectorAttachment";
      $.prioritizationRule["$ref"] = "#/definitions/RouterRule";

  - from: swagger-document
    where: "$.definitions.ExceptionRule.properties.trigger"
    transform: >
      $["$ref"] = "#/definitions/JobExceptionTrigger";
  - from: swagger-document
    where: "$.definitions.ExceptionRule.properties.actions.items"
    transform: >
      $["$ref"] = "#/definitions/ExceptionAction";

  - from: swagger-document
    where: "$.definitions.CompositeExceptionTrigger.properties.exceptionTriggers.items"
    transform: >
      $["$ref"] = "#/definitions/JobExceptionTrigger";

  - from: swagger-document
    where: "$.definitions.CompositeExceptionAction.properties.exceptionActions.items"
    transform: >
      $["$ref"] = "#/definitions/ExceptionAction";

  - from: swagger-document
    where: "$.definitions.RegisterWorkerRequest.properties.queueAssignments.items"
    transform: >
      $["$ref"] = "#/definitions/QueueAssignment";

  - from: swagger-document
    where: "$.definitions.Worker.properties.queueAssignments.items"
    transform: >
      $["$ref"] = "#/definitions/QueueAssignment";

  - from: swagger-document
    where: "$.definitions.RuleLabelSelector.properties.rule"
    transform: >
      $["$ref"] = "#/definitions/RouterRule";
  - from: swagger-document
    where: "$.definitions.ConditionalLabelSelector.properties.condition"
    transform: >
      $["$ref"] = "#/definitions/RouterRule";

  - from: swagger-document
    where: "$.definitions.QueueLabelSelector.properties.labelSelectors.items"
    transform: >
      $["$ref"] = "#/definitions/LabelSelectorAttachment";
  - from: swagger-document
    where: "$.definitions.QueueIdSelector.properties.rule"
    transform: >
      $["$ref"] = "#/definitions/RouterRule";
  - from: swagger-document
    where: "$.definitions.NearestQueueLabelSelector.properties.rule"
    transform: >
      $["$ref"] = "#/definitions/RouterRule";

  - from: swagger-document
    where: "$.definitions.BestWorkerMode.properties.scoringRule"
    transform: >
      $["$ref"] = "#/definitions/RouterRule";

  - from: swagger-document
    where: "$.definitions.TimeSpan"
    transform: >
      $["type"] = string

  - from: swagger-document
    where: "$.definitions.CompositeModeIteration.properties.timeout"
    transform: >
      $["type"] = string

  - from: swagger-document
    where: $.definitions[*]["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
```
