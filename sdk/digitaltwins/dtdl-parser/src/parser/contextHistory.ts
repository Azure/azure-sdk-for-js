// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { VersionedContext } from "./internal";

export class ContextHistory {
  private _versionedContexts: VersionedContext[];
  private _availableVersions: string;

  constructor(versionedContexts: VersionedContext[]) {
    this._versionedContexts = versionedContexts;
    this._availableVersions = versionedContexts
      .map((vc) => vc.majorVersion)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort()
      .join(", ");
  }

  get availableVersions() {
    return this._availableVersions;
  }

  public getTerm(uriString: string): string | undefined {
    for (const versionedContext of this._versionedContexts) {
      const term = versionedContext.getTerm(uriString);
      if (term !== undefined) {
        return term;
      }
    }

    return undefined;
  }

  public isTermInContext(term: string): boolean {
    return this._versionedContexts.some((vc) => vc.isTermInContext(term));
  }

  public isIdentifierInContext(uriString: string): boolean {
    return this._versionedContexts.some((vc) => vc.isIdentifierInContext(uriString));
  }

  public getMatchingContext(
    majorVersion: number,
    minorVersion: number
  ): VersionedContext | undefined {
    let bestMatchContext: VersionedContext | undefined;

    for (const versionedContext of this._versionedContexts) {
      if (
        versionedContext.majorVersion === majorVersion &&
        versionedContext.minorVersion <= minorVersion &&
        (bestMatchContext === undefined ||
          versionedContext.minorVersion > bestMatchContext.minorVersion)
      ) {
        bestMatchContext = versionedContext;
      }
    }

    if (bestMatchContext === undefined) {
      return undefined;
    } else {
      return bestMatchContext;
    }
  }
}
