let nock = require("nock");

module.exports.hash = "95d4fe335e315e75dac78e9070647d6a";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post(
    "/SomeTenantId/oauth2/v2.0/token",
    "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default"
  )
  .reply(
    200,
    {
      token_type: "Bearer",
      expires_in: 86399,
      ext_expires_in: 86399,
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTEyNjIzNjUsIm5iZiI6MTYxMTI2MjM2NSwiZXhwIjoxNjExMzQ5MDY1LCJhaW8iOiJFMkpnWUZpNmFPN2Z3ek1jYTM2dHVDUEJYVkVpRFFBPSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiRFVLSWpaQjl5RWV4d1hkTTNZaDVBQSIsInZlciI6IjEuMCJ9.JFGFdPsTMELbqaBARXr3rjOTRbLxZYqNBp2wsp4mBPXFf8O5ufzrsyVpeWEiHH0iJovO9WmzTw7sRPpi13pDdwNKmhzvBP6E8xj97xqP1qZomCkrkcA2AtaljTrQNAFHlmBMVKO1M991dIgohzj2q1P3hq7rMdrEzyliSGisEOS_ZwfsjsdM4H1dOj0SKpparzYjlxGGJmQXq2x7iaWtR8QjWALw89vLLFRcclU_g7GKyjaX4dKglw5ZrAXI0sL11h7p0mD7g8jrROVBHMNvcwTDKGhiLd_JE4x3lUZbTK28lY-iMy3WEAl8zit7LI-LgANxlsoUlJBBgtzhW9ZZ_g"
    },
    [
      "Cache-Control",
      "no-store, no-cache",
      "Pragma",
      "no-cache",
      "Content-Type",
      "application/json; charset=utf-8",
      "Expires",
      "-1",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options",
      "nosniff",
      "P3P",
      'CP="DSP CUR OTPi IND OTRi ONL FIN"',
      "x-ms-request-id",
      "sanitized",
      "x-ms-ests-server",
      "2.1.11419.13 - WUS2 ProdSlices",
      "Set-Cookie",
      "fpc=Als6EcbA-MhChtTVqw6cUoRWyo4SAgAAAMjhm9cOAAAA; expires=Sat, 20-Feb-2021 20:57:45 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=estsfd; path=/; secure; samesite=none; httponly",
      "Date",
      "Thu, 21 Jan 2021 20:57:44 GMT",
      "Content-Length",
      "1327"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities")
  .query(true)
  .reply(201, { identity: { id: "sanitized" } }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "V4TLz8KrFEeylfMNcYQ+VA.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "168ms",
    "X-Azure-Ref",
    "0yeoJYAAAAACzSdMcCjsUSq72sh5fe2s2V1NURURHRTA4MjEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:57:45 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/:issueAccessToken", { scopes: ["chat", "voip"] })
  .query(true)
  .reply(200, { token: "sanitized", expiresOn: "2021-01-22T20:57:44.6176611+00:00" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "gpfTcujLuUKCwZjdhAkYeQ.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "27ms",
    "X-Azure-Ref",
    "0yeoJYAAAAAABE3T5bcgNTKrj+ZEgsWi3V1NURURHRTA4MjEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:57:45 GMT"
  ]);
