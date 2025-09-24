// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OpenApiToolDefinition,
  OpenApiFunctionDefinition,
  OpenApiAuthDetailsUnion,
  ToolResources,
} from "../index.js";
import { logger } from "../logger.js";

/**
 * A tool that retrieves information using OpenAPI specs.
 * Initialized with an initial API definition (name, description, spec, auth),
 * this class also supports adding and removing additional API definitions dynamically.
 */
export class OpenApiTool {
  private _defaultAuth: OpenApiAuthDetailsUnion;
  private _definitions: OpenApiToolDefinition[];

  /**
   * Constructor initializes the tool with a primary API definition.
   *
   * @param name - The name of the API.
   * @param description - The API description.
   * @param spec - The API specification.
   * @param auth - Authentication details for the API.
   * @param defaultParameters - List of OpenAPI spec parameters that will use user-provided defaults.
   */
  constructor(openApiFunctionDefinition: OpenApiFunctionDefinition) {
    const defaultParams = openApiFunctionDefinition.defaultParams ?? [];
    this._defaultAuth = openApiFunctionDefinition.auth;
    const openapi = OpenApiTool.createDefinition({
      ...openApiFunctionDefinition,
      defaultParams,
    });
    this._definitions = [openapi];
  }

  /**
   * Get the list of all API definitions for the tool.
   */
  public get definitions(): OpenApiToolDefinition[] {
    return [...this._definitions];
  }

  /**
   * Creates a new API definition.
   * @param openapi - OpenApi function definition
   * @returns The created API definition
   */
  public static createDefinition(openapi: OpenApiFunctionDefinition): OpenApiToolDefinition {
    return {
      type: "openapi",
      openapi,
    };
  }

  /**
   * Adds a new API definition dynamically.
   * Throws if a definition with the same name already exists.
   */
  public addDefinition(openApiFunctionDefinition: OpenApiFunctionDefinition): void {
    if (this._definitions.some((d) => d.openapi.name === openApiFunctionDefinition.name)) {
      throw new Error(
        `Definition '${openApiFunctionDefinition.name}' already exists and cannot be added again.`,
      );
    }

    const defaultParams = openApiFunctionDefinition.defaultParams ?? [];
    const authToUse = openApiFunctionDefinition.auth ?? this._defaultAuth;

    this._definitions.push(
      OpenApiTool.createDefinition({
        ...openApiFunctionDefinition,
        defaultParams,
        auth: authToUse,
      }),
    );
  }

  /**
   * Removes an API definition based on its name.
   * Throws if the definition does not exist.
   */
  removeDefinition(name: string): void {
    const index = this._definitions.findIndex((d) => d.openapi.name === name);
    if (index !== -1) {
      this._definitions.splice(index, 1);
      logger.info(
        "Definition '%s' removed. Total definitions: %d.",
        name,
        this._definitions.length,
      );
      return;
    }
    throw new Error(`Definition with the name '${name}' does not exist.`);
  }

  /**
   * Get the tool resources for the agent.
   * OpenApiTool doesn't have specific resources so an empty object is returned.
   */
  get resources(): ToolResources {
    return {};
  }
}
