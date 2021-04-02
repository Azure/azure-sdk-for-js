let nock = require("nock");

module.exports.hash = "aedb306f8b207ace647b71fce293ba76";

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
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny8iLCJpYXQiOjE2MTEyNjIzNjQsIm5iZiI6MTYxMTI2MjM2NCwiZXhwIjoxNjExMzQ5MDY0LCJhaW8iOiJFMkpnWURnUWt1cG91TWorOHlXbjEwZFhSUDFZQ2dBPSIsImFwcGlkIjoiNmM4MTgxYzctOTFhNi00ZTJlLTg0ODAtZDU0MDIxYWM0YzRiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsIm9pZCI6IjNlMGM3MTRmLTk3YWMtNGQ2My1hZWFmLTE0YmFhNWUwNjRjYiIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSOGVCZ1d5bWtTNU9oSURWUUNHc1RFc2FBQUEuIiwic3ViIjoiM2UwYzcxNGYtOTdhYy00ZDYzLWFlYWYtMTRiYWE1ZTA2NGNiIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidXRpIjoiTjBKZ1dWclpWa1diTnRVbHlHeEhBQSIsInZlciI6IjEuMCJ9.dhiqSaZCTqiMKehO-QcGLg0sx7KTI4U6fPvUsNT_z5T7L3dLyxbHkI4pAZDSX8iJ7jSdiR_400D0vaoGIqGiWl_quQRwv3hsrpu3aCmyjPgu_c6Nr5BZbmAAj7pGBUi20nkJOEFROBmWtfNja20SbvDs4-8psy6TiMYwDmTaEnCljACIN2zp88uH6JZ1atXLOVCGWBdWcouqmGFWfy5bQKqG9K77Ff5MTj-NYU4dCM0mr2Shb34eOla0f_6FoxLGvJHCja1ZgYJYOvcjX0CSxnwBjh4PWe5wAqhDCfvruSu28WEycMsGyobvllxpBaNhSpKFCGWUCHBIKMQI5KHxVg"
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
      "2.1.11419.13 - SCUS ProdSlices",
      "Set-Cookie",
      "fpc=Als6EcbA-MhChtTVqw6cUoRWyo4SAQAAAMjhm9cOAAAA; expires=Sat, 20-Feb-2021 20:57:44 GMT; path=/; secure; HttpOnly; SameSite=None",
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
    "0es/Sq8wF0iEnxKIRQkv6w.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "213ms",
    "X-Azure-Ref",
    "0yOoJYAAAAAATCHaXNXC4RJncsdzEr3NhV1NURURHRTA4MjEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:57:44 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/:issueAccessToken", { scopes: ["chat"] })
  .query(true)
  .reply(200, { token: "sanitized", expiresOn: "2021-01-22T20:57:44.1854858+00:00" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "Q7lsVPlt20OUgp5kYqRlyQ.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "279ms",
    "X-Azure-Ref",
    "0yOoJYAAAAABZA22O5iLWR52OkBmGLsOqV1NURURHRTA4MjEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:57:44 GMT"
  ]);
