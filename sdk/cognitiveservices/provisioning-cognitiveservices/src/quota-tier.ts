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
  createStringShape,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type QuotaTierPropertiesInput,
  quotaTierPropertiesShape,
  type QuotaTierPropertiesView,
} from "./types.js";

const API_VERSION = "2026-07-01";

export interface QuotaTierProps {
  /**
   * Default parameter. Leave the value as default.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of quota tier resource.
   */
  properties?: QuotaTierPropertiesInput | undefined;
}

/**
 * The quota tier information for the subscription
 */
export class QuotaTier extends Resource<"Microsoft.CognitiveServices/quotaTiers"> {
  static resourceType = "Microsoft.CognitiveServices/quotaTiers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "qt",
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => quotaTierPropertiesShape),
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
    props?: (QuotaTierProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/quotaTiers"> & Record<string, unknown> {
    return {
      ...props,
      type: QuotaTier.resourceType,
      apiVersion: QuotaTier.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (QuotaTierProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, QuotaTier.buildResourceProps(props), options);
  }

  /**
   * Default parameter. Leave the value as default.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of quota tier resource.
   */
  get properties(): QuotaTierPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: QuotaTierPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}
