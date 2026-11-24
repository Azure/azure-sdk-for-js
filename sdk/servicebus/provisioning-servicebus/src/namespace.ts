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
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
  type SingletonExistingResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type ArmDisasterRecoveryPropertiesInput,
  armDisasterRecoveryPropertiesShape,
  type ArmDisasterRecoveryPropertiesView,
  type IdentityInput,
  identityShape,
  type IdentityView,
  type MigrationConfigPropertiesPropertiesInput,
  migrationConfigPropertiesPropertiesShape,
  type MigrationConfigPropertiesPropertiesView,
  type MigrationConfigurationName,
  type NetworkRuleSetPropertiesInput,
  networkRuleSetPropertiesShape,
  type NetworkRuleSetPropertiesView,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type RulepropertiesInput,
  rulepropertiesShape,
  type RulepropertiesView,
  type SbAuthorizationRuleProperties,
  type SbAuthorizationRulePropertiesInput,
  sbAuthorizationRulePropertiesShape,
  type SbAuthorizationRulePropertiesView,
  type SbNamespacePropertiesInput,
  sbNamespacePropertiesShape,
  type SbNamespacePropertiesView,
  type SbQueuePropertiesInput,
  sbQueuePropertiesShape,
  type SbQueuePropertiesView,
  type SbSkuInput,
  sbSkuShape,
  type SbSkuView,
  type SbSubscriptionPropertiesInput,
  sbSubscriptionPropertiesShape,
  type SbSubscriptionPropertiesView,
  type SbTopicPropertiesInput,
  sbTopicPropertiesShape,
  type SbTopicPropertiesView,
} from "./types.js";

const API_VERSION = "2026-01-01";

export interface NamespaceProps {
  /**
   * Properties of BYOK Identity description
   */
  identity?: IdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The namespace name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the namespace.
   */
  properties?: SbNamespacePropertiesInput | undefined;
  /**
   * Properties of SKU
   */
  sku?: SbSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ServiceBusNamespaceAuthorizationRuleProps {
  /**
   * The authorization rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * AuthorizationRule properties.
   */
  properties?: SbAuthorizationRulePropertiesInput | undefined;
}

/**
 * Description of a namespace authorization rule.
 */
export class ServiceBusNamespaceAuthorizationRule extends Resource<"Microsoft.ServiceBus/namespaces/AuthorizationRules"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/AuthorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    maxLength: 50,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbAuthorizationRulePropertiesShape),
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
      | (ServiceBusNamespaceAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/AuthorizationRules"> & Record<string, unknown> {
    return {
      ...props,
      type: ServiceBusNamespaceAuthorizationRule.resourceType,
      apiVersion: ServiceBusNamespaceAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      | (ServiceBusNamespaceAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServiceBusNamespaceAuthorizationRule.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The authorization rule name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * AuthorizationRule properties.
   */
  get properties(): SbAuthorizationRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbAuthorizationRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ArmDisasterRecoveryProps {
  /**
   * The Disaster Recovery configuration name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties required to the Create Or Update Alias(Disaster Recovery configurations)
   */
  properties?: ArmDisasterRecoveryPropertiesInput | undefined;
}

/**
 * Description of a namespace authorization rule.
 */
export class ServiceBusDisasterRecoveryAuthorizationRule extends Resource<"Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs/authorizationRules"> {
  static resourceType =
    "Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs/authorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    maxLength: 50,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbAuthorizationRulePropertiesShape),
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
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs/authorizationRules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServiceBusDisasterRecoveryAuthorizationRule.resourceType,
      apiVersion: ServiceBusDisasterRecoveryAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: ArmDisasterRecovery,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ServiceBusDisasterRecoveryAuthorizationRule.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The authorization rule name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * AuthorizationRule properties.
   */
  get properties(): Expression<SbAuthorizationRuleProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * Single item in List or Get Alias(Disaster Recovery configuration) operation
 */
export class ArmDisasterRecovery extends Resource<"Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "drc",
    minLength: 1,
    maxLength: 50,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => armDisasterRecoveryPropertiesShape),
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
      | (ArmDisasterRecoveryProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ArmDisasterRecovery.resourceType,
      apiVersion: ArmDisasterRecovery.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      | (ArmDisasterRecoveryProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ArmDisasterRecovery.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The Disaster Recovery configuration name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties required to the Create Or Update Alias(Disaster Recovery configurations)
   */
  get properties(): ArmDisasterRecoveryPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ArmDisasterRecoveryPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface MigrationConfigPropertiesProps {
  /**
   * The configuration name. Should always be $default.
   */
  name?: ExpressionOrValue<MigrationConfigurationName> | undefined;
  /**
   * Properties required to the Create Migration Configuration
   */
  properties?: MigrationConfigPropertiesPropertiesInput | undefined;
}

/**
 * Single item in List or Get Migration Config operation
 */
export class MigrationConfigProperties extends Resource<"Microsoft.ServiceBus/namespaces/migrationConfigurations"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/migrationConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mc",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => migrationConfigPropertiesPropertiesShape),
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
      | (MigrationConfigPropertiesProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/migrationConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MigrationConfigProperties.resourceType,
      apiVersion: MigrationConfigProperties.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      | (MigrationConfigPropertiesProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MigrationConfigProperties.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The configuration name. Should always be $default.
   */
  get name(): Expression<MigrationConfigurationName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<MigrationConfigurationName>) {
    this.setProperty("name", value);
  }

  /**
   * Properties required to the Create Migration Configuration
   */
  get properties(): MigrationConfigPropertiesPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MigrationConfigPropertiesPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface NetworkRuleSetProps {
  /**
   * NetworkRuleSet properties
   */
  properties?: NetworkRuleSetPropertiesInput | undefined;
}

/**
 * Description of NetworkRuleSet resource.
 */
export class NetworkRuleSet extends Resource<"Microsoft.ServiceBus/namespaces/networkRuleSets"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/networkRuleSets" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => networkRuleSetPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (NetworkRuleSetProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/networkRuleSets"> & Record<string, unknown> {
    return {
      ...props,
      type: NetworkRuleSet.resourceType,
      apiVersion: NetworkRuleSet.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: Namespace,
    props?:
      | (NetworkRuleSetProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, NetworkRuleSet.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * NetworkRuleSet properties
   */
  get properties(): NetworkRuleSetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: NetworkRuleSetPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Network Security Perimeter related configurations of a given namespace
 */
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.ServiceBus/namespaces/networkSecurityPerimeterConfigurations"> {
  static resourceType =
    "Microsoft.ServiceBus/namespaces/networkSecurityPerimeterConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nspc",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
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
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/networkSecurityPerimeterConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NetworkSecurityPerimeterConfiguration.resourceType,
      apiVersion: NetworkSecurityPerimeterConfiguration.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, NetworkSecurityPerimeterConfiguration.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The ResourceAssociation Name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the Network Security Perimeter Configuration
   */
  get properties(): Expression<NetworkSecurityPerimeterConfigurationProperties> {
    return this.expr("properties") as any;
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The PrivateEndpointConnection name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the PrivateEndpointConnection.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * Properties of the PrivateEndpointConnection.
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.ServiceBus/namespaces/privateEndpointConnections"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/privateEndpointConnections" as const;
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
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
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
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The PrivateEndpointConnection name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the PrivateEndpointConnection.
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface QueueProps {
  /**
   * The queue name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Queue Properties
   */
  properties?: SbQueuePropertiesInput | undefined;
}

export interface ServiceBusQueueAuthorizationRuleProps {
  /**
   * The authorization rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * AuthorizationRule properties.
   */
  properties?: SbAuthorizationRulePropertiesInput | undefined;
}

/**
 * Description of a namespace authorization rule.
 */
export class ServiceBusQueueAuthorizationRule extends Resource<"Microsoft.ServiceBus/namespaces/queues/authorizationRules"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/queues/authorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    maxLength: 50,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbAuthorizationRulePropertiesShape),
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
      | (ServiceBusQueueAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/queues/authorizationRules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServiceBusQueueAuthorizationRule.resourceType,
      apiVersion: ServiceBusQueueAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: Queue,
    props?:
      | (ServiceBusQueueAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServiceBusQueueAuthorizationRule.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The authorization rule name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * AuthorizationRule properties.
   */
  get properties(): SbAuthorizationRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbAuthorizationRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Description of queue Resource.
 */
export class Queue extends Resource<"Microsoft.ServiceBus/namespaces/queues"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/queues" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "q",
    minLength: 1,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbQueuePropertiesShape),
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
    props?: (QueueProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/queues"> & Record<string, unknown> {
    return {
      ...props,
      type: Queue.resourceType,
      apiVersion: Queue.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?: (QueueProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Queue.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The queue name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Queue Properties
   */
  get properties(): SbQueuePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbQueuePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TopicProps {
  /**
   * The topic name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of topic resource.
   */
  properties?: SbTopicPropertiesInput | undefined;
}

export interface ServiceBusTopicAuthorizationRuleProps {
  /**
   * The authorization rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * AuthorizationRule properties.
   */
  properties?: SbAuthorizationRulePropertiesInput | undefined;
}

/**
 * Description of a namespace authorization rule.
 */
export class ServiceBusTopicAuthorizationRule extends Resource<"Microsoft.ServiceBus/namespaces/topics/authorizationRules"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/topics/authorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    maxLength: 50,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbAuthorizationRulePropertiesShape),
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
      | (ServiceBusTopicAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/topics/authorizationRules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServiceBusTopicAuthorizationRule.resourceType,
      apiVersion: ServiceBusTopicAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: Topic,
    props?:
      | (ServiceBusTopicAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServiceBusTopicAuthorizationRule.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The authorization rule name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * AuthorizationRule properties.
   */
  get properties(): SbAuthorizationRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbAuthorizationRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SubscriptionProps {
  /**
   * The subscription name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of subscriptions resource.
   */
  properties?: SbSubscriptionPropertiesInput | undefined;
}

export interface RuleProps {
  /**
   * The rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of Rule resource
   */
  properties?: RulepropertiesInput | undefined;
}

/**
 * Description of Rule Resource.
 */
export class Rule extends Resource<"Microsoft.ServiceBus/namespaces/topics/subscriptions/rules"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/topics/subscriptions/rules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
    minLength: 1,
    maxLength: 50,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => rulepropertiesShape),
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
    props?: (RuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/topics/subscriptions/rules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Rule.resourceType,
      apiVersion: Rule.apiVersion,
    };
  }

  constructor(
    context: Subscription,
    props?: (RuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Rule.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The rule name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of Rule resource
   */
  get properties(): RulepropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RulepropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Description of subscription resource.
 */
export class Subscription extends Resource<"Microsoft.ServiceBus/namespaces/topics/subscriptions"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/topics/subscriptions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    minLength: 1,
    maxLength: 50,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbSubscriptionPropertiesShape),
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
      (SubscriptionProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/topics/subscriptions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Subscription.resourceType,
      apiVersion: Subscription.apiVersion,
    };
  }

  constructor(
    context: Topic,
    props?:
      (SubscriptionProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Subscription.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The subscription name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of subscriptions resource.
   */
  get properties(): SbSubscriptionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbSubscriptionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Description of topic resource.
 */
export class Topic extends Resource<"Microsoft.ServiceBus/namespaces/topics"> {
  static resourceType = "Microsoft.ServiceBus/namespaces/topics" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    minLength: 1,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbTopicPropertiesShape),
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
    props?: (TopicProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces/topics"> & Record<string, unknown> {
    return {
      ...props,
      type: Topic.resourceType,
      apiVersion: Topic.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?: (TopicProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Topic.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The topic name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of topic resource.
   */
  get properties(): SbTopicPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbTopicPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Description of a namespace resource.
 */
export class Namespace extends Resource<"Microsoft.ServiceBus/namespaces"> {
  static resourceType = "Microsoft.ServiceBus/namespaces" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sb",
    minLength: 6,
    maxLength: 50,
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: { armPath: ["identity"], value: createDeferredShape(() => identityShape) },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sbNamespacePropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => sbSkuShape) },
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
    props?: (NamespaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ServiceBus/namespaces"> & Record<string, unknown> {
    return {
      ...props,
      type: Namespace.resourceType,
      apiVersion: Namespace.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (NamespaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Namespace.buildResourceProps(props), options);
  }

  /**
   * Properties of BYOK Identity description
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
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The namespace name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the namespace.
   */
  get properties(): SbNamespacePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SbNamespacePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Properties of SKU
   */
  get sku(): SbSkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SbSkuInput | undefined) {
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
