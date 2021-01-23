// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";
import { CAEChallengeEither, parseCAEChallenges } from "../src/CAE";

interface TestChallenge {
  name: string;
  headerValue: string;
  parsedChallenge: CAEChallengeEither;
}

const testChallenges: TestChallenge[] = [
  {
    name: "CAE - insufficient claims",
    headerValue:
      'Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOiB7ImZvbyI6ICJiYXIifX0="',
    parsedChallenge: {
      authorization_uri: "https://login.microsoftonline.com/common/oauth2/authorize",
      client_id: "00000003-0000-0000-c000-000000000000",
      error: "insufficient_claims",
      claims: "eyJhY2Nlc3NfdG9rZW4iOiB7ImZvbyI6ICJiYXIifX0=",
      realm: ""
    }
  },
  {
    name: "CAE - sessions revoked",
    headerValue:
      'Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token", error_description="User session has been revoked", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="',
    parsedChallenge: {
      authorization_uri: "https://login.windows-ppe.net/",
      error: "invalid_token",
      error_description: "User session has been revoked",
      claims:
        "eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="
    }
  },
  {
    name: "CAE - IP policy",
    headerValue:
      'Bearer authorization_uri="https://login.windows.net/", error="invalid_token", error_description="Tenant IP Policy validate failed.", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNjEwNTYzMDA2In0sInhtc19ycF9pcGFkZHIiOnsidmFsdWUiOiIxLjIuMy40In19fQ"',
    parsedChallenge: {
      authorization_uri: "https://login.windows.net/",
      error: "invalid_token",
      error_description: "Tenant IP Policy validate failed.",
      claims:
        "eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNjEwNTYzMDA2In0sInhtc19ycF9pcGFkZHIiOnsidmFsdWUiOiIxLjIuMy40In19fQ"
    }
  },
  {
    name: "Key Vault with scope only",
    headerValue:
      'Bearer authorization="https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47", scope="https://vault.azure.net"',
    parsedChallenge: {
      authorization: "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47",
      scope: "https://vault.azure.net"
    }
  },
  {
    name: "Key Vault with resource only",
    headerValue:
      'Bearer authorization="https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47", resource="https://vault.azure.net"',
    parsedChallenge: {
      authorization: "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47",
      resource: "https://vault.azure.net"
    }
  },
  {
    name: "ARM",
    headerValue:
      'Bearer authorization_uri="https://login.windows.net/", error="invalid_token", error_description="The authentication failed because of missing \'Authorization\' header."',
    parsedChallenge: {
      authorization_uri: "https://login.windows.net/",
      error: "invalid_token",
      error_description: "The authentication failed because of missing 'Authorization' header."
    }
  }
];

type Map = (a: any[]) => any[];

// All permutations of a given array.
// prettier-ignore
const permutations: Map = (a) =>
  a.length === 1 ? a :
    a.reduce((r, v, i) =>
      r.concat(
        permutations(a.slice(0, i).concat(a.slice(i + 1)))
          .map((x: any[]) => x.length ? x.concat(v) : [x, v])
      ),
      []
    );

// Array into series of segments. [1,2,3] => [[1,2,3], [2,3], [3]]
const tails: Map = (a) => a.reduce((r, _v, i) => r.concat([a.slice(i)]), []);

// Removing duplicate properties in arrays.
const unique: Map = (a) =>
  a
    .map((JSON.stringify as any) as Map)
    .reduce((r, v) => (r.find((x) => x === v) ? r : r.concat(v)), [])
    .map((JSON.parse as any) as Map);

// Generates all the permutations of an array, then keeps all the unique tails of each permutation.
const permutationsAndTails: Map = (a) =>
  unique(permutations(a).reduce((r: any[], v: any[]) => r.concat(tails(v)), []));

describe.only("CAE", () => {
  describe("CAE test utilities", () => {
    it("permutationsAndTails", () => {
      const array = [1, 2, 3];
      // prettier-ignore
      permutationsAndTails(array).should.deep.equal([
        [3, 2, 1], [2, 1], [1],
        [2, 3, 1], [3, 1],
        [3, 1, 2], [1, 2], [2],
        [1, 3, 2], [3, 2],
        [2, 1, 3], [1, 3], [3],
        [1, 2, 3], [2, 3]
      ]);
    });
  });

  describe("parseCAEChallenges", () => {
    it("All possible groups of some examples of known challenges", () => {
      const testChallenge = (headerValue: string, parsedChallenges: CAEChallengeEither[]): void => {
        const parsed = parseCAEChallenges(headerValue);
        parsed.should.deep.equal(parsedChallenges);
      };

      const joinHeaders = (challenges: TestChallenge[]): string =>
        challenges.map((ch) => ch.headerValue).join(", ");
      const joinParsed = (challenges: TestChallenge[]): CAEChallengeEither[] =>
        challenges.map((ch) => ch.parsedChallenge);

      const targets: TestChallenge[][] = permutationsAndTails(testChallenges);

      for (const challenges of targets) {
        testChallenge(joinHeaders(challenges), joinParsed(challenges));
      }
    });
  });
});
