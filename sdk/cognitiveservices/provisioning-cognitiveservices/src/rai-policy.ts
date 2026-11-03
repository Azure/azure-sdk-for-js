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
  type RaiPolicyPropertiesInput,
  raiPolicyPropertiesShape,
  type RaiPolicyPropertiesView,
} from "./types.js";

const API_VERSION = "2026-07-01";

export interface RaiPolicyProps {
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
export class RaiPolicy extends Resource<"Microsoft.CognitiveServices/raiPolicy"> {
  static resourceType = "Microsoft.CognitiveServices/raiPolicy" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rp",
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
    props?: (RaiPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.CognitiveServices/raiPolicy"> & Record<string, unknown> {
    return {
      ...props,
      type: RaiPolicy.resourceType,
      apiVersion: RaiPolicy.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (RaiPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, RaiPolicy.buildResourceProps(props), options);
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
