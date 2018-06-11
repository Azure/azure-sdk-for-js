// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A transformation that will be used to convert Operation method parameters into Operation request
 * parameters.
 */
export interface OperationParameterTransformation {
  /**
   * The path to the method parameter property that will provide the source value for this
   * transformation.
   */
  sourcePath: string[];

  /**
   * The path to the request parameter property that will be set with the value from the
   * sourcePath's property.
   */
  targetPath: string[];
}