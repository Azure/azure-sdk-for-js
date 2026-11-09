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
import { type RaiContentFilterProperties, raiContentFilterPropertiesShape } from "./types.js";

const API_VERSION = "2026-07-01";

/**
 * Azure OpenAI Content Filter.
 */
export class RaiContentFilter extends Resource<"Microsoft.CognitiveServices/locations/raiContentFilters"> {
  static resourceType = "Microsoft.CognitiveServices/locations/raiContentFilters" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rcf",
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    nameSegments: 2,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => raiContentFilterPropertiesShape),
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
  ): ResourceProps<"Microsoft.CognitiveServices/locations/raiContentFilters"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RaiContentFilter.resourceType,
      apiVersion: RaiContentFilter.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RaiContentFilter.buildResourceProps(props), options);
  }

  /**
   * The name of the RAI Content Filter.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Azure OpenAI Content Filter Properties.
   */
  get properties(): Expression<RaiContentFilterProperties> {
    return this.expr("properties") as any;
  }
}
