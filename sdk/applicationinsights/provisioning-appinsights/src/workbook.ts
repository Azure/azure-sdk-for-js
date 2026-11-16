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
  createUnionShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type WorkbookProperties,
  type WorkbookPropertiesInput,
  workbookPropertiesShape,
  type WorkbookPropertiesView,
  type WorkbookResourceIdentity,
  type WorkbookResourceIdentityInput,
  workbookResourceIdentityShape,
  type WorkbookResourceIdentityView,
  type WorkbookSharedTypeKind,
} from "./types.js";

const API_VERSION = "2023-06-01";

export interface WorkbookProps {
  /**
   * Resource etag
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * Identity used for BYOS
   */
  identity?: WorkbookResourceIdentityInput | undefined;
  /**
   * The kind of workbook. Only valid value is shared.
   */
  kind?: ExpressionOrValue<WorkbookSharedTypeKind> | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the workbook resource. The value must be an UUID.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Metadata describing a workbook for an Azure resource.
   */
  properties?: WorkbookPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * A workbook definition.
 */
export class Revision extends Resource<"Microsoft.Insights/workbooks/revisions"> {
  static resourceType = "Microsoft.Insights/workbooks/revisions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => workbookResourceIdentityShape),
          readOnly: true,
        },
        kind: { armPath: ["kind"], value: createUnionShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => workbookPropertiesShape),
          readOnly: true,
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
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Insights/workbooks/revisions"> & Record<string, unknown> {
    return {
      ...props,
      type: Revision.resourceType,
      apiVersion: Revision.apiVersion,
    };
  }

  constructor(
    context: Workbook,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, Revision.buildResourceProps(props), options);
  }

  /**
   * Resource etag
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * Identity used for BYOS
   */
  get identity(): Expression<WorkbookResourceIdentity> {
    return this.expr("identity") as any;
  }

  /**
   * The kind of workbook. Only valid value is shared.
   */
  get kind(): Expression<WorkbookSharedTypeKind> {
    return this.expr("kind");
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the workbook resource. The value must be an UUID.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Metadata describing a workbook for an Azure resource.
   */
  get properties(): Expression<WorkbookProperties> {
    return this.expr("properties") as any;
  }

  /**
   * Resource tags.
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}

/**
 * A workbook definition.
 */
export class Workbook extends Resource<"Microsoft.Insights/workbooks"> {
  static resourceType = "Microsoft.Insights/workbooks" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "w",
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape() },
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => workbookResourceIdentityShape),
        },
        kind: { armPath: ["kind"], value: createUnionShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => workbookPropertiesShape),
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
    props?: (WorkbookProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/workbooks"> & Record<string, unknown> {
    return {
      ...props,
      type: Workbook.resourceType,
      apiVersion: Workbook.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (WorkbookProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Workbook.buildResourceProps(props), options);
  }

  /**
   * Resource etag
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }
  set etag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("etag", value);
  }

  /**
   * Identity used for BYOS
   */
  get identity(): WorkbookResourceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: WorkbookResourceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The kind of workbook. Only valid value is shared.
   */
  get kind(): Expression<WorkbookSharedTypeKind> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<WorkbookSharedTypeKind> | undefined) {
    this.setProperty("kind", value);
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
   * The name of the workbook resource. The value must be an UUID.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Metadata describing a workbook for an Azure resource.
   */
  get properties(): WorkbookPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WorkbookPropertiesInput | undefined) {
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
