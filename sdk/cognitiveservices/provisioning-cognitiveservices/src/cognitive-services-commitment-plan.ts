// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ExistingResourceProps,
  type Expression,
  type ExpressionOrValue,
  type ProvisioningComponent,
  Resource,
  type ResourceOptions,
} from "@azure/provisioning-core";
import {
  createDeferredShape,
  createFlatModelShape,
  createRecordShape,
  createStringShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type CommitmentPlanAccountAssociationPropertiesInput,
  commitmentPlanAccountAssociationPropertiesShape,
  type CommitmentPlanAccountAssociationPropertiesView,
  type CommitmentPlanPropertiesInput,
  commitmentPlanPropertiesShape,
  type CommitmentPlanPropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
} from "./types.js";

const API_VERSION = "2026-07-01";

export interface CognitiveServicesCommitmentPlanProps {
  /**
   * The kind (type) of cognitive service account.
   */
  kind?: ExpressionOrValue<string> | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the commitmentPlan associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services account commitment plan.
   */
  properties?: CommitmentPlanPropertiesInput | undefined;
  /**
   * The resource model definition representing SKU
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface AccountAssociationProps {
  /**
   * The name of the commitment plan association with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services account commitment plan association.
   */
  properties?: CommitmentPlanAccountAssociationPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The commitment plan association.
 */
export class AccountAssociation extends Resource<"Microsoft.CognitiveServices/commitmentPlans/accountAssociations"> {
  static resourceType = "Microsoft.CognitiveServices/commitmentPlans/accountAssociations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "aa",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => commitmentPlanAccountAssociationPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (AccountAssociationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/commitmentPlans/accountAssociations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: AccountAssociation.resourceType,
      apiVersion: AccountAssociation.apiVersion,
    };
  }

  constructor(
    context: CognitiveServicesCommitmentPlan,
    props?:
      | (AccountAssociationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, AccountAssociation.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the commitment plan association with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services account commitment plan association.
   */
  get properties(): CommitmentPlanAccountAssociationPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CommitmentPlanAccountAssociationPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * Cognitive Services account commitment plan.
 */
export class CognitiveServicesCommitmentPlan extends Resource<"Microsoft.CognitiveServices/commitmentPlans"> {
  static resourceType = "Microsoft.CognitiveServices/commitmentPlans" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cp",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        kind: { armPath: ["kind"], value: createStringShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => commitmentPlanPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CognitiveServicesCommitmentPlanProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/commitmentPlans"> & Record<string, unknown> {
    return {
      ...props,
      type: CognitiveServicesCommitmentPlan.resourceType,
      apiVersion: CognitiveServicesCommitmentPlan.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      | (CognitiveServicesCommitmentPlanProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CognitiveServicesCommitmentPlan.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The kind (type) of cognitive service account.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("kind", value);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * The name of the commitmentPlan associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services account commitment plan.
   */
  get properties(): CommitmentPlanPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CommitmentPlanPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The resource model definition representing SKU
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
    this.setProperty("sku", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
