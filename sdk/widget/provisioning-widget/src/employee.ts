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
  type EmployeePropertiesInput,
  employeePropertiesShape,
  type EmployeePropertiesView,
} from "./types.js";

const API_VERSION = "2021-11-01";

export interface EmployeeProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Employee
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The resource-specific properties for this resource.
   */
  properties?: EmployeePropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Employee resource
 */
export class Employee extends Resource<"Microsoft.Widget/employees"> {
  static resourceType = "Microsoft.Widget/employees" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "e",
    minLength: 1,
    maxLength: 24,
    validCharacters: {
      uppercase: true,
      hyphens: false,
      underscores: false,
      periods: false,
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
          value: createDeferredShape(() => employeePropertiesShape),
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
    props?: (EmployeeProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Widget/employees"> & Record<string, unknown> {
    return {
      ...props,
      type: Employee.resourceType,
      apiVersion: Employee.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (EmployeeProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Employee.buildResourceProps(props), options);
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
   * The name of the Employee
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The resource-specific properties for this resource.
   */
  get properties(): EmployeePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: EmployeePropertiesInput | undefined) {
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
