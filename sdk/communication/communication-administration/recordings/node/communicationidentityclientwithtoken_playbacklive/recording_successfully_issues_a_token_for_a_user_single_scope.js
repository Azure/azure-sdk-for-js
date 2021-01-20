let nock = require("nock");

module.exports.hash = "af7c6cb9bdc93d68a7d9359ea157526a";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post(
    "/SomeTenantId/oauth2/v2.0/token",
    "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default"
  )
  .query(true)
  .reply(
    200,
    {
      token_type: "Bearer",
      expires_in: 3599,
      ext_expires_in: 3599,
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2IzYmYwOTZlLWNlMTItNGRhZC05MjAzLWVkNzBhOGIwOTljMS8iLCJpYXQiOjE2MDg1ODIxOTIsIm5iZiI6MTYwODU4MjE5MiwiZXhwIjoxNjA4NTg2MDkyLCJhaW8iOiJFMkpnWURqMCsxa1J3NlNhZ2dtT1FzWXNiNjIrQVFBPSIsImFwcGlkIjoiZjM3MzQyMGUtMTFiZC00NzRiLTk4MjItOWYzMTU1MzNhZjQzIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjNiZjA5NmUtY2UxMi00ZGFkLTkyMDMtZWQ3MGE4YjA5OWMxLyIsIm9pZCI6IjdkNmFjZWIyLTYyNDgtNGFiNC1hYTMzLWRhMjU1ODEwZGVhYyIsInJoIjoiMC5BQUFBYmdtX3N4TE9yVTJTQS0xd3FMQ1p3UTVDY19POUVVdEhtQ0tmTVZVenIwTjJBQUEuIiwic3ViIjoiN2Q2YWNlYjItNjI0OC00YWI0LWFhMzMtZGEyNTU4MTBkZWFjIiwidGlkIjoiYjNiZjA5NmUtY2UxMi00ZGFkLTkyMDMtZWQ3MGE4YjA5OWMxIiwidXRpIjoiU21Xc0FLazU0a2kzVm96Tnc2OGNBQSIsInZlciI6IjEuMCJ9.F46MEvo2_VDwBQ0z_u96AM9x4BISmXz-hHasAHGHL0JS2jTX4qT24CkCy0VMNRLFwTMjaXyrUUB8S1cg190Epm5xaCSrLphxhbHu5eUy3H8ZWtkRaTWsdeqzJ16qc7H9S_dWhALFwR7Y47ofKFZrrwUr0RMNAwgSzHzmQYqNfB8aiP184ikQgZ_59RGeaDt7gC2tIrtdhlcMrjs6VnuawvuyZ54-CUR5mT-Ke8Ju72zwQtdzQSxm9v8XmgfdxX5lEwN88zBhyuqXLXTD55ijNrtU-A1YnDA-Vq9RqAfR22fo5F8BRuQ1mN3iyMdQMyrt5WFLwFRJ-s0Y7iL0R0UjlA"
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
      "2.1.11328.13 - EST ProdSlices",
      "Set-Cookie",
      "fpc=AtRAjxDA_PNGk8IgAAZklDb3ZxdeAQAAAFz8ctcOAAAA; expires=Wed, 20-Jan-2021 20:28:12 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=ests; path=/; secure; samesite=none; httponly",
      "Date",
      "Mon, 21 Dec 2020 20:28:12 GMT",
      "Content-Length",
      "1325"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities")
  .query(true)
  .reply(200, { id: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "NQBZ+MnP30Kr1piaI9wTGA.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "352ms",
    "X-Azure-Ref",
    "0XQXhXwAAAACsqcU5c4vsQ4NpR+a8OpIFRVdSMzBFREdFMDYxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 21 Dec 2020 20:28:12 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-12-22T20:28:12.8449526+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "K8luOL9gOESaa1Uy4HCO8w.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "287ms",
      "X-Azure-Ref",
      "0XQXhXwAAAADVB+/PcTZUSY3XfyI3zwKjRVdSMzBFREdFMDYxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 21 Dec 2020 20:28:13 GMT"
    ]
  );
