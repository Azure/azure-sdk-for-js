// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Compares challenges
 */
export function compareChallenges<TChallenge>(a: TChallenge, b: TChallenge): boolean {
  return a && b && JSON.stringify(a).toLowerCase() === JSON.stringify(b).toLowerCase();
}

/**
 * Helps keep a copy of any previous authentication challenges,
 * so that we can compare on any further request.
 */
export class ChallengeCache<TChallenge> {
  public challenge?: TChallenge;

  public setCachedChallenge(challenge: TChallenge): void {
    this.challenge = challenge;
  }

  /**
   * Checks that this AuthenticationChallenge is equal to another one given.
   * Only compares the scope.
   * @param other - The other KeyVaultAuthenticationChallenge
   */
  public equalTo(other: TChallenge | undefined): boolean {
    return other ? compareChallenges(this.challenge, other) : false;
  }
}
