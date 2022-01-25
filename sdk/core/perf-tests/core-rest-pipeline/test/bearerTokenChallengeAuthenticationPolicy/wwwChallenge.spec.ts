import { PerfTest } from "@azure/test-utils-perf";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  AuthorizeRequestOnChallengeOptions,
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  HttpClient,
  Pipeline,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { TextDecoder } from "util";

export interface TestChallenge {
  scope: string;
  claims: string;
}

let cachedChallenge: string | undefined;

/**
 * Converts a uint8Array to a string.
 */
export function uint8ArrayToString(ab: Uint8Array): string {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(ab);
}

/**
 * Encodes a string in base64 format.
 * @param value - The string to encode
 */
export function encodeString(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - The base64 string to decode
 */
export function decodeString(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}

// Converts:
//     Bearer a="b", c="d", Bearer d="e", f="g"
// Into:
//     [ { a: 'b', c: 'd' }, { d: 'e', f: 'g"' } ]
// Important:
//     Do not use this in production, as values might contain the strings we use to split things up.
function parseCAEChallenge(challenges: string): any[] {
  return challenges
    .split("Bearer ")
    .filter((x) => x)
    .map((challenge) =>
      `${challenge.trim()}, `
        .split('", ')
        .filter((x) => x)
        .map((keyValue) => (([key, value]) => ({ [key]: value }))(keyValue.trim().split('="')))
        .reduce((a, b) => ({ ...a, ...b }), {})
    );
}

async function authorizeRequestOnChallenge(
  options: AuthorizeRequestOnChallengeOptions
): Promise<boolean> {
  const { scopes, request, response, getAccessToken } = options;

  const challenge = response?.headers.get("WWW-Authenticate");
  if (!challenge) {
    throw new Error("Failed to retrieve challenge from response headers");
  }

  const challenges: TestChallenge[] = parseCAEChallenge(challenge) || [];

  const parsedChallenge = challenges.find((x) => x.claims);
  if (!parsedChallenge) {
    throw new Error("Missing claims");
  }
  if (cachedChallenge !== challenge) {
    cachedChallenge = challenge;
  }

  const accessToken = await getAccessToken(scopes, {
    // The architects haven't decided:
    // claims: uint8ArrayToString(Buffer.from(parsedChallenge.claims, "base64"))
  });

  if (!accessToken) {
    return false;
  }

  request.headers.set("Authorization", `Bearer ${accessToken}`);
  return true;
}

class MockRefreshAzureCredential implements TokenCredential {
  public authCount = 0;
  public scopesAndClaims: { scope: string | string[]; challengeClaims: string | undefined }[] = [];

  constructor(public getTokenResponse: AccessToken) {}

  public getToken(
    scope: string | string[],
    _options: GetTokenOptions
  ): Promise<AccessToken | null> {
    this.authCount++;
    this.scopesAndClaims.push({
      scope,
      // Architects haven't decided about the claims property
      challengeClaims: undefined, // options.claims
    });
    return Promise.resolve(this.getTokenResponse);
  }
}

export class BearerTokenAuthenticationPolicyChallengeTest extends PerfTest {
  options = {};

  constructor() {
    super();
  }

  static pipeline?: Pipeline;
  static testHttpsClient?: HttpClient;
  static request?: PipelineRequest;

  async globalSetup(): Promise<void> {
    const scope = "http://localhost/.default";
    const challengeClaims = JSON.stringify({
      access_token: { foo: "bar" },
    });

    const request = createPipelineRequest({ url: "https://example.com" });
    const responses: PipelineResponse[] = [
      {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Bearer scope="${scope}", claims="${encodeString(challengeClaims)}"`,
        }),
        request,
        status: 401,
      },
      {
        headers: createHttpHeaders(),
        request,
        status: 200,
      },
    ];

    const expiresOn = Date.now() + 5000;
    const getTokenResponse = { token: "mock-token", expiresOnTimestamp: expiresOn };
    const credential = new MockRefreshAzureCredential(getTokenResponse);

    const pipeline = createEmptyPipeline();

    const cachedToken: AccessToken | null = null;
    const bearerPolicy = bearerTokenAuthenticationPolicy({
      // Intentionally left empty, as it should be replaced by the challenge.
      scopes: [""],
      credential,
      challengeCallbacks: {
        async authorizeRequest({ request }) {
          if (cachedToken) {
            request.headers.set("Authorization", `Bearer ${cachedToken}`);
          }
        },
        authorizeRequestOnChallenge,
      },
    });

    pipeline.addPolicy(bearerPolicy);

    const finalSendRequestHeaders: (string | undefined)[] = [];

    let responsesCount = 0;

    BearerTokenAuthenticationPolicyChallengeTest.request = request;
    BearerTokenAuthenticationPolicyChallengeTest.pipeline = pipeline;
    BearerTokenAuthenticationPolicyChallengeTest.testHttpsClient = {
      sendRequest: async (req) => {
        finalSendRequestHeaders.push(req.headers.get("Authorization"));

        // First goes the error response, then the good response.
        const responsesIndex = responsesCount % 2 ? 1 : 0;

        const response = responses[responsesIndex];
        responsesCount++;
        response.request = req;
        return response;
      },
    };
  }

  async run(): Promise<void> {
    const { pipeline, testHttpsClient, request } = BearerTokenAuthenticationPolicyChallengeTest;
    await pipeline!.sendRequest(testHttpsClient!, request!);
  }
}
