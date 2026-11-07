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
  type LogAnalyticsQueryPackPropertiesInput,
  logAnalyticsQueryPackPropertiesShape,
  type LogAnalyticsQueryPackPropertiesView,
  type LogAnalyticsQueryPackQueryPropertiesInput,
  logAnalyticsQueryPackQueryPropertiesShape,
  type LogAnalyticsQueryPackQueryPropertiesView,
} from "./types.js";

const API_VERSION = "2026-03-01";

export interface QueryPackProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Log Analytics QueryPack resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties that define a Log Analytics QueryPack resource.
   */
  properties: LogAnalyticsQueryPackPropertiesInput;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface QueryProps {
  /**
   * The id of a specific query defined in the Log Analytics QueryPack
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties that define an Log Analytics QueryPack-Query resource.
   */
  properties?: LogAnalyticsQueryPackQueryPropertiesInput | undefined;
}

/**
 * A Log Analytics QueryPack-Query definition.
 */
export class Query extends Resource<"Microsoft.OperationalInsights/queryPacks/queries"> {
  static resourceType = "Microsoft.OperationalInsights/queryPacks/queries" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "q",
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
          value: createDeferredShape(() => logAnalyticsQueryPackQueryPropertiesShape),
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
    props?: (QueryProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/queryPacks/queries"> & Record<string, unknown> {
    return {
      ...props,
      type: Query.resourceType,
      apiVersion: Query.apiVersion,
    };
  }

  constructor(
    context: QueryPack,
    props?: (QueryProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Query.buildResourceProps(props), options);
  }

  /**
   * The id of a specific query defined in the Log Analytics QueryPack
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties that define an Log Analytics QueryPack-Query resource.
   */
  get properties(): LogAnalyticsQueryPackQueryPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LogAnalyticsQueryPackQueryPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Log Analytics QueryPack definition.
 */
export class QueryPack extends Resource<"Microsoft.OperationalInsights/queryPacks"> {
  static resourceType = "Microsoft.OperationalInsights/queryPacks" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "qp",
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => logAnalyticsQueryPackPropertiesShape),
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
    props?: (QueryPackProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/queryPacks"> & Record<string, unknown> {
    return {
      ...props,
      type: QueryPack.resourceType,
      apiVersion: QueryPack.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: (QueryPackProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, QueryPack.buildResourceProps(props), options);
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
   * The name of the Log Analytics QueryPack resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties that define a Log Analytics QueryPack resource.
   */
  get properties(): LogAnalyticsQueryPackPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LogAnalyticsQueryPackPropertiesInput) {
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
