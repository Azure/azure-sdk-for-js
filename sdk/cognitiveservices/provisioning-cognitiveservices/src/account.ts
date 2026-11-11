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
  type AccountPropertiesInput,
  accountPropertiesShape,
  type AccountPropertiesView,
  type AgentDeploymentPropertiesInput,
  agentDeploymentPropertiesShape,
  type AgentDeploymentPropertiesView,
  type AgenticApplicationPropertiesInput,
  agenticApplicationPropertiesShape,
  type AgenticApplicationPropertiesView,
  type CapabilityHostPropertiesInput,
  capabilityHostPropertiesShape,
  type CapabilityHostPropertiesView,
  type CognitiveServicesOutboundRuleInput,
  cognitiveServicesOutboundRuleShape,
  type CognitiveServicesOutboundRuleView,
  type CommitmentPlanPropertiesInput,
  commitmentPlanPropertiesShape,
  type CommitmentPlanPropertiesView,
  type ConnectionPropertiesV2Input,
  connectionPropertiesV2Shape,
  type ConnectionPropertiesV2View,
  type DefenderForAiSettingPropertiesInput,
  defenderForAiSettingPropertiesShape,
  type DefenderForAiSettingPropertiesView,
  type DeploymentPropertiesInput,
  deploymentPropertiesShape,
  type DeploymentPropertiesView,
  type EncryptionScopePropertiesInput,
  encryptionScopePropertiesShape,
  type EncryptionScopePropertiesView,
  type IdentityInput,
  identityShape,
  type IdentityView,
  type ManagedNetworkSettingsPropertiesInput,
  managedNetworkSettingsPropertiesShape,
  type ManagedNetworkSettingsPropertiesView,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type ProjectCapabilityHostPropertiesInput,
  projectCapabilityHostPropertiesShape,
  type ProjectCapabilityHostPropertiesView,
  type ProjectPropertiesInput,
  projectPropertiesShape,
  type ProjectPropertiesView,
  type RaiBlocklistItemPropertiesInput,
  raiBlocklistItemPropertiesShape,
  type RaiBlocklistItemPropertiesView,
  type RaiBlocklistPropertiesInput,
  raiBlocklistPropertiesShape,
  type RaiBlocklistPropertiesView,
  type RaiExternalSafetyProviderSchemaPropertiesInput,
  raiExternalSafetyProviderSchemaPropertiesShape,
  type RaiExternalSafetyProviderSchemaPropertiesView,
  type RaiPolicyPropertiesInput,
  raiPolicyPropertiesShape,
  type RaiPolicyPropertiesView,
  type RaiToolLabelPropertiesInput,
  raiToolLabelPropertiesShape,
  type RaiToolLabelPropertiesView,
  type RaiTopicPropertiesInput,
  raiTopicPropertiesShape,
  type RaiTopicPropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
} from "./types.js";

const API_VERSION = "2026-07-01";

export interface AccountProps {
  /**
   * Identity for the resource.
   */
  identity?: IdentityInput | undefined;
  /**
   * The kind (type) of cognitive service account.
   */
  kind?: ExpressionOrValue<string> | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of Cognitive Services account.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services account.
   */
  properties?: AccountPropertiesInput | undefined;
  /**
   * The resource model definition representing SKU
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface AccountCapabilityHostProps {
  /**
   * The name of the capability host associated with the Cognitive Services Resource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * [Required] Additional attributes of the entity.
   */
  properties: CapabilityHostPropertiesInput;
}

/**
 * Azure Resource Manager resource envelope.
 */
export class AccountCapabilityHost extends Resource<"Microsoft.CognitiveServices/accounts/capabilityHosts"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/capabilityHosts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ch",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9\\-_]{0,254}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => capabilityHostPropertiesShape),
        },
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
      | (AccountCapabilityHostProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/capabilityHosts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: AccountCapabilityHost.resourceType,
      apiVersion: AccountCapabilityHost.apiVersion,
    };
  }

  constructor(
    context: Account,
    props:
      | (AccountCapabilityHostProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, AccountCapabilityHost.buildResourceProps(props), options);
  }

  /**
   * The name of the capability host associated with the Cognitive Services Resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * [Required] Additional attributes of the entity.
   */
  get properties(): CapabilityHostPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CapabilityHostPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface CommitmentPlanProps {
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

/**
 * Cognitive Services account commitment plan.
 */
export class CommitmentPlan extends Resource<"Microsoft.CognitiveServices/accounts/commitmentPlans"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/commitmentPlans" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cp",
    scope: "parent",
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
      (CommitmentPlanProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/commitmentPlans"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CommitmentPlan.resourceType,
      apiVersion: CommitmentPlan.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      (CommitmentPlanProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CommitmentPlan.buildResourceProps(props), options);
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

export interface CognitiveServicesConnectionProps {
  /**
   * Friendly name of the connection
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Connection property base schema.
   */
  properties: ConnectionPropertiesV2Input;
}

/**
 * Connection base resource schema.
 */
export class CognitiveServicesConnection extends Resource<"Microsoft.CognitiveServices/accounts/connections"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/connections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_-]{2,32}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => connectionPropertiesV2Shape),
        },
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
      | (CognitiveServicesConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/connections"> & Record<string, unknown> {
    return {
      ...props,
      type: CognitiveServicesConnection.resourceType,
      apiVersion: CognitiveServicesConnection.apiVersion,
    };
  }

  constructor(
    context: Account,
    props:
      | (CognitiveServicesConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CognitiveServicesConnection.buildResourceProps(props), options);
  }

  /**
   * Friendly name of the connection
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Connection property base schema.
   */
  get properties(): ConnectionPropertiesV2View {
    return this.expr("properties") as any;
  }
  set properties(value: ConnectionPropertiesV2Input) {
    this.setProperty("properties", value);
  }
}

export interface DefenderForAiSettingProps {
  /**
   * The name of the defender for AI setting.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The Defender for AI resource properties.
   */
  properties?: DefenderForAiSettingPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The Defender for AI resource.
 */
export class DefenderForAiSetting extends Resource<"Microsoft.CognitiveServices/accounts/defenderForAISettings"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/defenderForAISettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dfa",
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
          value: createDeferredShape(() => defenderForAiSettingPropertiesShape),
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
      | (DefenderForAiSettingProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/defenderForAISettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DefenderForAiSetting.resourceType,
      apiVersion: DefenderForAiSetting.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      | (DefenderForAiSettingProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DefenderForAiSetting.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the defender for AI setting.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The Defender for AI resource properties.
   */
  get properties(): DefenderForAiSettingPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DefenderForAiSettingPropertiesInput | undefined) {
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

export interface DeploymentProps {
  /**
   * The name of the deployment associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services account deployment.
   */
  properties?: DeploymentPropertiesInput | undefined;
  /**
   * The resource model definition representing SKU
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Cognitive Services account deployment.
 */
export class Deployment extends Resource<"Microsoft.CognitiveServices/accounts/deployments"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/deployments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "d",
    pattern: {
      regex: "",
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
          value: createDeferredShape(() => deploymentPropertiesShape),
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
    props?: (DeploymentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/deployments"> & Record<string, unknown> {
    return {
      ...props,
      type: Deployment.resourceType,
      apiVersion: Deployment.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?: (DeploymentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Deployment.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the deployment associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services account deployment.
   */
  get properties(): DeploymentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DeploymentPropertiesInput | undefined) {
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

export interface EncryptionScopeProps {
  /**
   * The name of the encryptionScope associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services EncryptionScope.
   */
  properties?: EncryptionScopePropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Cognitive Services EncryptionScope
 */
export class EncryptionScope extends Resource<"Microsoft.CognitiveServices/accounts/encryptionScopes"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/encryptionScopes" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "es",
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
          value: createDeferredShape(() => encryptionScopePropertiesShape),
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
      (EncryptionScopeProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/encryptionScopes"> &
    Record<string, unknown> {
    return {
      ...props,
      type: EncryptionScope.resourceType,
      apiVersion: EncryptionScope.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      (EncryptionScopeProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, EncryptionScope.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the encryptionScope associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services EncryptionScope.
   */
  get properties(): EncryptionScopePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: EncryptionScopePropertiesInput | undefined) {
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

export interface ManagedNetworkProps {
  /**
   * Name of the managedNetwork associated with the cognitive services account. Only 'default' is supported.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the managed network settings of a cognitive services account.
   */
  properties?: ManagedNetworkSettingsPropertiesInput | undefined;
}

export interface OutboundRuleProps {
  /**
   * Name of the cognitive services account managed network outbound rule
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Outbound Rule for the managed network of a cognitive services account.
   */
  properties: CognitiveServicesOutboundRuleInput;
}

/**
 * Concrete proxy resource types can be created by aliasing this type using a specific property type.
 */
export class OutboundRule extends Resource<"Microsoft.CognitiveServices/accounts/managedNetworks/outboundRules"> {
  static resourceType =
    "Microsoft.CognitiveServices/accounts/managedNetworks/outboundRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "or",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_-]{2,32}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => cognitiveServicesOutboundRuleShape),
        },
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
      (OutboundRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/managedNetworks/outboundRules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: OutboundRule.resourceType,
      apiVersion: OutboundRule.apiVersion,
    };
  }

  constructor(
    context: ManagedNetwork,
    props:
      (OutboundRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, OutboundRule.buildResourceProps(props), options);
  }

  /**
   * Name of the cognitive services account managed network outbound rule
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Outbound Rule for the managed network of a cognitive services account.
   */
  get properties(): CognitiveServicesOutboundRuleView {
    return this.expr("properties") as any;
  }
  set properties(value: CognitiveServicesOutboundRuleInput) {
    this.setProperty("properties", value);
  }
}

/**
 * Concrete proxy resource types can be created by aliasing this type using a specific property type.
 */
export class ManagedNetwork extends Resource<"Microsoft.CognitiveServices/accounts/managedNetworks"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/managedNetworks" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mn",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_-]{2,32}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedNetworkSettingsPropertiesShape),
        },
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
      (ManagedNetworkProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/managedNetworks"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedNetwork.resourceType,
      apiVersion: ManagedNetwork.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      (ManagedNetworkProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedNetwork.buildResourceProps(props), options);
  }

  /**
   * Name of the managedNetwork associated with the cognitive services account. Only 'default' is
   * supported.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the managed network settings of a cognitive services account.
   */
  get properties(): ManagedNetworkSettingsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedNetworkSettingsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * NSP Configuration for an Cognitive Services account.
 */
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.CognitiveServices/accounts/networkSecurityPerimeterConfigurations"> {
  static resourceType =
    "Microsoft.CognitiveServices/accounts/networkSecurityPerimeterConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nspc",
    pattern: {
      regex: "^.*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => networkSecurityPerimeterConfigurationPropertiesShape),
          readOnly: true,
        },
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
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/networkSecurityPerimeterConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NetworkSecurityPerimeterConfiguration.resourceType,
      apiVersion: NetworkSecurityPerimeterConfiguration.apiVersion,
    };
  }

  constructor(
    context: Account,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, NetworkSecurityPerimeterConfiguration.buildResourceProps(props), options);
  }

  /**
   * The name of the NSP Configuration.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * NSP Configuration properties.
   */
  get properties(): Expression<NetworkSecurityPerimeterConfigurationProperties> {
    return this.expr("properties") as any;
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The location of the private endpoint connection
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the private endpoint connection associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * The Private Endpoint Connection resource.
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.CognitiveServices/accounts/privateEndpointConnections"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/privateEndpointConnections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pec",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
        },
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
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The location of the private endpoint connection
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * The name of the private endpoint connection associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ProjectProps {
  /**
   * Identity for the resource.
   */
  identity?: IdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of Cognitive Services account's project.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services project.
   */
  properties?: ProjectPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ApplicationProps {
  /**
   * Name for the Agent Application.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * [Required] Additional attributes of the entity.
   */
  properties: AgenticApplicationPropertiesInput;
}

export interface CognitiveServicesAgentDeploymentProps {
  /**
   * The name of the deployment associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * [Required] Additional attributes of the entity.
   */
  properties: AgentDeploymentPropertiesInput;
}

/**
 * Agent Deployment resource
 */
export class CognitiveServicesAgentDeployment extends Resource<"Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments"> {
  static resourceType =
    "Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ad",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => agentDeploymentPropertiesShape),
        },
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
      | (CognitiveServicesAgentDeploymentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CognitiveServicesAgentDeployment.resourceType,
      apiVersion: CognitiveServicesAgentDeployment.apiVersion,
    };
  }

  constructor(
    context: Application,
    props:
      | (CognitiveServicesAgentDeploymentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CognitiveServicesAgentDeployment.buildResourceProps(props), options);
  }

  /**
   * The name of the deployment associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * [Required] Additional attributes of the entity.
   */
  get properties(): AgentDeploymentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AgentDeploymentPropertiesInput) {
    this.setProperty("properties", value);
  }
}

/**
 * Agent Application resource
 */
export class Application extends Resource<"Microsoft.CognitiveServices/accounts/projects/applications"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/projects/applications" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "a",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => agenticApplicationPropertiesShape),
        },
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
      (ApplicationProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/projects/applications"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Application.resourceType,
      apiVersion: Application.apiVersion,
    };
  }

  constructor(
    context: Project,
    props: (ApplicationProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Application.buildResourceProps(props), options);
  }

  /**
   * Name for the Agent Application.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * [Required] Additional attributes of the entity.
   */
  get properties(): AgenticApplicationPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AgenticApplicationPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface ProjectCapabilityHostProps {
  /**
   * The name of the capability host associated with the Cognitive Services Resource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * [Required] Additional attributes of the entity.
   */
  properties: ProjectCapabilityHostPropertiesInput;
}

/**
 * Azure Resource Manager resource envelope for Project CapabilityHost.
 */
export class ProjectCapabilityHost extends Resource<"Microsoft.CognitiveServices/accounts/projects/capabilityHosts"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/projects/capabilityHosts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ch",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9\\-_]{0,254}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => projectCapabilityHostPropertiesShape),
        },
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
      | (ProjectCapabilityHostProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/projects/capabilityHosts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ProjectCapabilityHost.resourceType,
      apiVersion: ProjectCapabilityHost.apiVersion,
    };
  }

  constructor(
    context: Project,
    props:
      | (ProjectCapabilityHostProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ProjectCapabilityHost.buildResourceProps(props), options);
  }

  /**
   * The name of the capability host associated with the Cognitive Services Resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * [Required] Additional attributes of the entity.
   */
  get properties(): ProjectCapabilityHostPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ProjectCapabilityHostPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface CognitiveServicesProjectConnectionProps {
  /**
   * Friendly name of the connection
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Connection property base schema.
   */
  properties: ConnectionPropertiesV2Input;
}

/**
 * Connection base resource schema.
 */
export class CognitiveServicesProjectConnection extends Resource<"Microsoft.CognitiveServices/accounts/projects/connections"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/projects/connections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_-]{2,32}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => connectionPropertiesV2Shape),
        },
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
      | (CognitiveServicesProjectConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/projects/connections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CognitiveServicesProjectConnection.resourceType,
      apiVersion: CognitiveServicesProjectConnection.apiVersion,
    };
  }

  constructor(
    context: Project,
    props:
      | (CognitiveServicesProjectConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CognitiveServicesProjectConnection.buildResourceProps(props), options);
  }

  /**
   * Friendly name of the connection
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Connection property base schema.
   */
  get properties(): ConnectionPropertiesV2View {
    return this.expr("properties") as any;
  }
  set properties(value: ConnectionPropertiesV2Input) {
    this.setProperty("properties", value);
  }
}

/**
 * Cognitive Services project is an Azure resource representing the provisioned account's project, it's type, location and SKU.
 */
export class Project extends Resource<"Microsoft.CognitiveServices/accounts/projects"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/projects" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "p",
    minLength: 2,
    maxLength: 64,
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        identity: { armPath: ["identity"], value: createDeferredShape(() => identityShape) },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => projectPropertiesShape),
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
    props?: (ProjectProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/projects"> & Record<string, unknown> {
    return {
      ...props,
      type: Project.resourceType,
      apiVersion: Project.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?: (ProjectProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Project.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * Identity for the resource.
   */
  get identity(): IdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: IdentityInput | undefined) {
    this.setProperty("identity", value);
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
   * The name of Cognitive Services account's project.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services project.
   */
  get properties(): ProjectPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ProjectPropertiesInput | undefined) {
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

export interface RaiBlocklistProps {
  /**
   * The name of the RaiBlocklist associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services RaiBlocklist.
   */
  properties?: RaiBlocklistPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface RaiBlocklistItemProps {
  /**
   * The name of the RaiBlocklist Item associated with the custom blocklist
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services RaiBlocklist Item.
   */
  properties?: RaiBlocklistItemPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Cognitive Services RaiBlocklist Item.
 */
export class RaiBlocklistItem extends Resource<"Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems"> {
  static resourceType =
    "Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rbi",
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
          value: createDeferredShape(() => raiBlocklistItemPropertiesShape),
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
      (RaiBlocklistItemProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RaiBlocklistItem.resourceType,
      apiVersion: RaiBlocklistItem.apiVersion,
    };
  }

  constructor(
    context: RaiBlocklist,
    props?:
      (RaiBlocklistItemProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiBlocklistItem.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the RaiBlocklist Item associated with the custom blocklist
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services RaiBlocklist Item.
   */
  get properties(): RaiBlocklistItemPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RaiBlocklistItemPropertiesInput | undefined) {
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
 * Cognitive Services RaiBlocklist.
 */
export class RaiBlocklist extends Resource<"Microsoft.CognitiveServices/accounts/raiBlocklists"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/raiBlocklists" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rb",
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
          value: createDeferredShape(() => raiBlocklistPropertiesShape),
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
      (RaiBlocklistProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/raiBlocklists"> & Record<string, unknown> {
    return {
      ...props,
      type: RaiBlocklist.resourceType,
      apiVersion: RaiBlocklist.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      (RaiBlocklistProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiBlocklist.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the RaiBlocklist associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services RaiBlocklist.
   */
  get properties(): RaiBlocklistPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RaiBlocklistPropertiesInput | undefined) {
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

export interface AccountRaiPolicyProps {
  /**
   * The name of the RaiPolicy associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services RaiPolicy.
   */
  properties?: RaiPolicyPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Cognitive Services RaiPolicy.
 */
export class AccountRaiPolicy extends Resource<"Microsoft.CognitiveServices/accounts/raiPolicies"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/raiPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rp",
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
          value: createDeferredShape(() => raiPolicyPropertiesShape),
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
      (AccountRaiPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/raiPolicies"> & Record<string, unknown> {
    return {
      ...props,
      type: AccountRaiPolicy.resourceType,
      apiVersion: AccountRaiPolicy.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      (AccountRaiPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, AccountRaiPolicy.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the RaiPolicy associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services RaiPolicy.
   */
  get properties(): RaiPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RaiPolicyPropertiesInput | undefined) {
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

export interface RaiToolLabelProps {
  /**
   * The name of the Rai Tool Label
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the RAI Tool Label.
   */
  properties?: RaiToolLabelPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Cognitive Services RAI Tool Label resource.
 */
export class RaiToolLabel extends Resource<"Microsoft.CognitiveServices/accounts/raiToolLabels"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/raiToolLabels" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rtl",
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
          value: createDeferredShape(() => raiToolLabelPropertiesShape),
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
      (RaiToolLabelProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/raiToolLabels"> & Record<string, unknown> {
    return {
      ...props,
      type: RaiToolLabel.resourceType,
      apiVersion: RaiToolLabel.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      (RaiToolLabelProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiToolLabel.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the Rai Tool Label
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the RAI Tool Label.
   */
  get properties(): RaiToolLabelPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RaiToolLabelPropertiesInput | undefined) {
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

export interface RaiTopicProps {
  /**
   * The name of the Rai Topic associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services Rai Topic.
   */
  properties?: RaiTopicPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Cognitive Services Rai Topic.
 */
export class RaiTopic extends Resource<"Microsoft.CognitiveServices/accounts/raitopics"> {
  static resourceType = "Microsoft.CognitiveServices/accounts/raitopics" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
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
          value: createDeferredShape(() => raiTopicPropertiesShape),
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
    props?: (RaiTopicProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/raitopics"> & Record<string, unknown> {
    return {
      ...props,
      type: RaiTopic.resourceType,
      apiVersion: RaiTopic.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?: (RaiTopicProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiTopic.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the Rai Topic associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services Rai Topic.
   */
  get properties(): RaiTopicPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RaiTopicPropertiesInput | undefined) {
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

export interface RaiExternalSafetyProviderSchemaProps {
  /**
   * The name of the Rai External Safety Provider associated with the Cognitive Services Account
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Cognitive Services Rai External Safety provider.
   */
  properties?: RaiExternalSafetyProviderSchemaPropertiesInput | undefined;
}

/**
 * Cognitive Services Rai External Safety provider Schema.
 */
export class RaiExternalSafetyProviderSchema extends Resource<"Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider"> {
  static resourceType =
    "Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "tresp",
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
          value: createDeferredShape(() => raiExternalSafetyProviderSchemaPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()), readOnly: true },
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
      | (RaiExternalSafetyProviderSchemaProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RaiExternalSafetyProviderSchema.resourceType,
      apiVersion: RaiExternalSafetyProviderSchema.apiVersion,
    };
  }

  constructor(
    context: Account,
    props?:
      | (RaiExternalSafetyProviderSchemaProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiExternalSafetyProviderSchema.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the Rai External Safety Provider associated with the Cognitive Services Account
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services Rai External Safety provider.
   */
  get properties(): RaiExternalSafetyProviderSchemaPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RaiExternalSafetyProviderSchemaPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}

/**
 * Cognitive Services account is an Azure resource representing the provisioned account, it's type, location and SKU.
 */
export class Account extends Resource<"Microsoft.CognitiveServices/accounts"> {
  static resourceType = "Microsoft.CognitiveServices/accounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cog",
    minLength: 2,
    maxLength: 64,
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    scope: "resourceGroup",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        identity: { armPath: ["identity"], value: createDeferredShape(() => identityShape) },
        kind: { armPath: ["kind"], value: createStringShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => accountPropertiesShape),
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
    props?: (AccountProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/accounts"> & Record<string, unknown> {
    return {
      ...props,
      type: Account.resourceType,
      apiVersion: Account.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (AccountProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Account.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * Identity for the resource.
   */
  get identity(): IdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: IdentityInput | undefined) {
    this.setProperty("identity", value);
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
   * The name of Cognitive Services account.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Cognitive Services account.
   */
  get properties(): AccountPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AccountPropertiesInput | undefined) {
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
