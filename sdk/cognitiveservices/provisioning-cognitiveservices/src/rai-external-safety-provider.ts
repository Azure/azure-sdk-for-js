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
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type RaiExternalSafetyProviderSchemaPropertiesInput,
  raiExternalSafetyProviderSchemaPropertiesShape,
  type RaiExternalSafetyProviderSchemaPropertiesView,
} from "./types.js";

const API_VERSION = "2026-07-01";

export interface RaiExternalSafetyProviderProps {
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
export class RaiExternalSafetyProvider extends Resource<"Microsoft.CognitiveServices/raiExternalSafetyProviders"> {
  static resourceType = "Microsoft.CognitiveServices/raiExternalSafetyProviders" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "resp",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    scope: "global",
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
      | (RaiExternalSafetyProviderProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/raiExternalSafetyProviders"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RaiExternalSafetyProvider.resourceType,
      apiVersion: RaiExternalSafetyProvider.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      | (RaiExternalSafetyProviderProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiExternalSafetyProvider.buildResourceProps(props), options);
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
