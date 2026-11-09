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
  type AccountProperties,
  accountPropertiesShape,
  type Identity,
  identityShape,
  type Sku,
  skuShape,
} from "./types.js";

const API_VERSION = "2026-07-01";

/**
 * Cognitive Services account is an Azure resource representing the provisioned account, it's type, location and SKU.
 */
export class CognitiveServicesDeletedAccount extends Resource<"Microsoft.CognitiveServices/locations/resourceGroups/deletedAccounts"> {
  static resourceType =
    "Microsoft.CognitiveServices/locations/resourceGroups/deletedAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "da",
    minLength: 2,
    maxLength: 64,
    pattern: {
      regex: "^[a-zA-Z0-9][a-zA-Z0-9_.-]*$",
    },
    nameSegments: 3,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => identityShape),
          readOnly: true,
        },
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => accountPropertiesShape),
          readOnly: true,
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape), readOnly: true },
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
  ): ResourceProps<"Microsoft.CognitiveServices/locations/resourceGroups/deletedAccounts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CognitiveServicesDeletedAccount.resourceType,
      apiVersion: CognitiveServicesDeletedAccount.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, CognitiveServicesDeletedAccount.buildResourceProps(props), options);
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
  get identity(): Expression<Identity> {
    return this.expr("identity") as any;
  }

  /**
   * The kind (type) of cognitive service account.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
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
  get properties(): Expression<AccountProperties> {
    return this.expr("properties") as any;
  }

  /**
   * The resource model definition representing SKU
   */
  get sku(): Expression<Sku> {
    return this.expr("sku") as any;
  }

  /**
   * Resource tags.
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}
