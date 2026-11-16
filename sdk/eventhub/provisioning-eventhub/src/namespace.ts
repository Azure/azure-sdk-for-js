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
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
  type SingletonExistingResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type ApplicationGroupPropertiesInput,
  applicationGroupPropertiesShape,
  type ApplicationGroupPropertiesView,
  type ArmDisasterRecoveryPropertiesInput,
  armDisasterRecoveryPropertiesShape,
  type ArmDisasterRecoveryPropertiesView,
  type AuthorizationRuleProperties,
  type AuthorizationRulePropertiesInput,
  authorizationRulePropertiesShape,
  type AuthorizationRulePropertiesView,
  type ConsumerGroupPropertiesInput,
  consumerGroupPropertiesShape,
  type ConsumerGroupPropertiesView,
  type EhNamespacePropertiesInput,
  ehNamespacePropertiesShape,
  type EhNamespacePropertiesView,
  type EventhubPropertiesInput,
  eventhubPropertiesShape,
  type EventhubPropertiesView,
  type IdentityInput,
  identityShape,
  type IdentityView,
  type NetworkRuleSetPropertiesInput,
  networkRuleSetPropertiesShape,
  type NetworkRuleSetPropertiesView,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type SchemaGroupPropertiesInput,
  schemaGroupPropertiesShape,
  type SchemaGroupPropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
} from "./types.js";

const API_VERSION = "2026-01-01";

export interface NamespaceProps {
  /**
   * Properties of BYOK Identity description
   */
  identity?: IdentityInput | undefined;
  /**
   * Resource location.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The Namespace name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Namespace properties supplied for create namespace operation.
   */
  properties?: EhNamespacePropertiesInput | undefined;
  /**
   * Properties of sku resource
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ApplicationGroupProps {
  /**
   * The Application Group name
   */
  name?: ExpressionOrValue<string> | undefined;
  properties?: ApplicationGroupPropertiesInput | undefined;
}

/**
 * The Application Group object
 */
export class ApplicationGroup extends Resource<"Microsoft.EventHub/namespaces/applicationGroups"> {
  static resourceType = "Microsoft.EventHub/namespaces/applicationGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ag",
    minLength: 1,
    maxLength: 256,
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
          value: createDeferredShape(() => applicationGroupPropertiesShape),
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
      (ApplicationGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces/applicationGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: ApplicationGroup.resourceType,
      apiVersion: ApplicationGroup.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      (ApplicationGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ApplicationGroup.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The Application Group name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  get properties(): ApplicationGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ApplicationGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface NamespaceAuthorizationRuleProps {
  /**
   * The authorization rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties supplied to create or update AuthorizationRule
   */
  properties?: AuthorizationRulePropertiesInput | undefined;
}

/**
 * Single item in a List or Get AuthorizationRule operation
 */
export class NamespaceAuthorizationRule extends Resource<"Microsoft.EventHub/namespaces/authorizationRules"> {
  static resourceType = "Microsoft.EventHub/namespaces/authorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => authorizationRulePropertiesShape),
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
      | (NamespaceAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces/authorizationRules"> & Record<string, unknown> {
    return {
      ...props,
      type: NamespaceAuthorizationRule.resourceType,
      apiVersion: NamespaceAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      | (NamespaceAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, NamespaceAuthorizationRule.buildResourceProps(props), options);
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
   * Properties supplied to create or update AuthorizationRule
   */
  get properties(): AuthorizationRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AuthorizationRulePropertiesInput | undefined) {
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
 * Single item in a List or Get AuthorizationRule operation
 */
export class DisasterRecoveryConfigAuthorizationRule extends Resource<"Microsoft.EventHub/namespaces/disasterRecoveryConfigs/authorizationRules"> {
  static resourceType =
    "Microsoft.EventHub/namespaces/disasterRecoveryConfigs/authorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => authorizationRulePropertiesShape),
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
  ): ResourceProps<"Microsoft.EventHub/namespaces/disasterRecoveryConfigs/authorizationRules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DisasterRecoveryConfigAuthorizationRule.resourceType,
      apiVersion: DisasterRecoveryConfigAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: ArmDisasterRecovery,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, DisasterRecoveryConfigAuthorizationRule.buildResourceProps(props), options);
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
   * Properties supplied to create or update AuthorizationRule
   */
  get properties(): Expression<AuthorizationRuleProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * Single item in List or Get Alias(Disaster Recovery configuration) operation
 */
export class ArmDisasterRecovery extends Resource<"Microsoft.EventHub/namespaces/disasterRecoveryConfigs"> {
  static resourceType = "Microsoft.EventHub/namespaces/disasterRecoveryConfigs" as const;
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
  ): ResourceProps<"Microsoft.EventHub/namespaces/disasterRecoveryConfigs"> &
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

export interface EventhubProps {
  /**
   * The Event Hub name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties supplied to the Create Or Update Event Hub operation.
   */
  properties?: EventhubPropertiesInput | undefined;
}

export interface EventhubAuthorizationRuleProps {
  /**
   * The authorization rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties supplied to create or update AuthorizationRule
   */
  properties?: AuthorizationRulePropertiesInput | undefined;
}

/**
 * Single item in a List or Get AuthorizationRule operation
 */
export class EventhubAuthorizationRule extends Resource<"Microsoft.EventHub/namespaces/eventhubs/authorizationRules"> {
  static resourceType = "Microsoft.EventHub/namespaces/eventhubs/authorizationRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ar",
    minLength: 1,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => authorizationRulePropertiesShape),
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
      | (EventhubAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces/eventhubs/authorizationRules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: EventhubAuthorizationRule.resourceType,
      apiVersion: EventhubAuthorizationRule.apiVersion,
    };
  }

  constructor(
    context: Eventhub,
    props?:
      | (EventhubAuthorizationRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, EventhubAuthorizationRule.buildResourceProps(props), options);
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
   * Properties supplied to create or update AuthorizationRule
   */
  get properties(): AuthorizationRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AuthorizationRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ConsumerGroupProps {
  /**
   * The consumer group name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Single item in List or Get Consumer group operation
   */
  properties?: ConsumerGroupPropertiesInput | undefined;
}

/**
 * Single item in List or Get Consumer group operation
 */
export class ConsumerGroup extends Resource<"Microsoft.EventHub/namespaces/eventhubs/consumergroups"> {
  static resourceType = "Microsoft.EventHub/namespaces/eventhubs/consumergroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
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
          value: createDeferredShape(() => consumerGroupPropertiesShape),
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
      (ConsumerGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces/eventhubs/consumergroups"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ConsumerGroup.resourceType,
      apiVersion: ConsumerGroup.apiVersion,
    };
  }

  constructor(
    context: Eventhub,
    props?:
      (ConsumerGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ConsumerGroup.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The consumer group name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Single item in List or Get Consumer group operation
   */
  get properties(): ConsumerGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ConsumerGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Single item in List or Get Event Hub operation
 */
export class Eventhub extends Resource<"Microsoft.EventHub/namespaces/eventhubs"> {
  static resourceType = "Microsoft.EventHub/namespaces/eventhubs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "e",
    minLength: 1,
    maxLength: 256,
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
          value: createDeferredShape(() => eventhubPropertiesShape),
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
    props?: (EventhubProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces/eventhubs"> & Record<string, unknown> {
    return {
      ...props,
      type: Eventhub.resourceType,
      apiVersion: Eventhub.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?: (EventhubProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Eventhub.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The Event Hub name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties supplied to the Create Or Update Event Hub operation.
   */
  get properties(): EventhubPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: EventhubPropertiesInput | undefined) {
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
 * Description of topic resource.
 */
export class NetworkRuleSet extends Resource<"Microsoft.EventHub/namespaces/networkRuleSets"> {
  static resourceType = "Microsoft.EventHub/namespaces/networkRuleSets" as const;
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
  ): ResourceProps<"Microsoft.EventHub/namespaces/networkRuleSets"> & Record<string, unknown> {
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
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.EventHub/namespaces/networkSecurityPerimeterConfigurations"> {
  static resourceType =
    "Microsoft.EventHub/namespaces/networkSecurityPerimeterConfigurations" as const;
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
  ): ResourceProps<"Microsoft.EventHub/namespaces/networkSecurityPerimeterConfigurations"> &
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
export class PrivateEndpointConnection extends Resource<"Microsoft.EventHub/namespaces/privateEndpointConnections"> {
  static resourceType = "Microsoft.EventHub/namespaces/privateEndpointConnections" as const;
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
  ): ResourceProps<"Microsoft.EventHub/namespaces/privateEndpointConnections"> &
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

export interface SchemaGroupProps {
  /**
   * The Schema Group name
   */
  name?: ExpressionOrValue<string> | undefined;
  properties?: SchemaGroupPropertiesInput | undefined;
}

/**
 * Single item in List or Get Schema Group operation
 */
export class SchemaGroup extends Resource<"Microsoft.EventHub/namespaces/schemagroups"> {
  static resourceType = "Microsoft.EventHub/namespaces/schemagroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    minLength: 1,
    maxLength: 256,
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
          value: createDeferredShape(() => schemaGroupPropertiesShape),
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
      (SchemaGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces/schemagroups"> & Record<string, unknown> {
    return {
      ...props,
      type: SchemaGroup.resourceType,
      apiVersion: SchemaGroup.apiVersion,
    };
  }

  constructor(
    context: Namespace,
    props?:
      (SchemaGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SchemaGroup.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The Schema Group name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  get properties(): SchemaGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SchemaGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Single Namespace item in List or Get Operation
 */
export class Namespace extends Resource<"Microsoft.EventHub/namespaces"> {
  static resourceType = "Microsoft.EventHub/namespaces" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "evhns",
    minLength: 6,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z][a-zA-Z0-9-]{6,50}[a-zA-Z0-9]$",
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
          value: createDeferredShape(() => ehNamespacePropertiesShape),
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
    props?: (NamespaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.EventHub/namespaces"> & Record<string, unknown> {
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
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * The Namespace name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Namespace properties supplied for create namespace operation.
   */
  get properties(): EhNamespacePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: EhNamespacePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Properties of sku resource
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
