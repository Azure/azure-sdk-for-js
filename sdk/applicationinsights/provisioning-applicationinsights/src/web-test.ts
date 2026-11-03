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
  createEnumShape,
  createFlatModelShape,
  createRecordShape,
  createStringShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type WebTestKind,
  type WebTestPropertiesInput,
  webTestPropertiesShape,
  type WebTestPropertiesView,
} from "./types.js";

const API_VERSION = "2022-06-15";

export interface WebTestProps {
  /**
   * The kind of WebTest that this web test watches. Choices are ping, multistep and standard.
   */
  kind?: ExpressionOrValue<WebTestKind> | undefined;
  /**
   * Resource location
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Application Insights WebTest resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Metadata describing a web test for an Azure resource.
   */
  properties?: WebTestPropertiesInput | undefined;
  /**
   * Resource tags
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Application Insights WebTest definition.
 */
export class WebTest extends Resource<"Microsoft.Insights/webtests"> {
  static resourceType = "Microsoft.Insights/webtests" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "w",
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createEnumShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => webTestPropertiesShape),
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
    props?: (WebTestProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/webtests"> & Record<string, unknown> {
    return {
      ...props,
      type: WebTest.resourceType,
      apiVersion: WebTest.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (WebTestProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, WebTest.buildResourceProps(props), options);
  }

  /**
   * The kind of WebTest that this web test watches. Choices are ping, multistep and standard.
   */
  get kind(): Expression<WebTestKind> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<WebTestKind> | undefined) {
    this.setProperty("kind", value);
  }

  /**
   * Resource location
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the Application Insights WebTest resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Metadata describing a web test for an Azure resource.
   */
  get properties(): WebTestPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WebTestPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
