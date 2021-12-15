// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface CosmosException {
  [key: string]: any;
}
/// <summary>
///  Contains the cosmos diagnostic information for the current request to Azure Cosmos DB service.
export namespace CosmosDiagnostics {
  export declare var CosmosException: [CosmosException];
  export class diagnostics extends Error {
    /// <summary>
    /// This represent the end to end elapsed time of the request.
    /// If the request is still in progress it will return the current
    /// elapsed time since the start of the request.
    /// </summary>
    /// <returns>The clients end to end elapsed time of the request.</returns>
    public get getClientElapsedTime(): String {
      return "";
    }
    /// <summary>
    /// Gets the list of all regions that were contacted for a request
    /// <summary>
    /// <returns>The list of tuples containing the Region name and the URI</returns>
    public get getContactedRegions(): String {
      return "";
    }
    public set exception(exception: CosmosException) {
      CosmosException.push(exception);
    }
    public get toString(): String {
      return CosmosException.toString();
    }

    /// <summary>
    /// Gets the list of all regions that were contacted for a request
    /// </summary>
    /// <returns>The list of tuples containing the Region name and the URI</returns>
    //public get contactedRegions() {}
  }
}
