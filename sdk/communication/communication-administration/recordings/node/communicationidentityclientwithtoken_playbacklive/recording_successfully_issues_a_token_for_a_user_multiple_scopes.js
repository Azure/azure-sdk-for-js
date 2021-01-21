let nock = require("nock");

module.exports.hash = "0441531d19c5ab9860067f15f510ddc1";

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
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJodHRwczovL2NvbW11bmljYXRpb24uYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2IzYmYwOTZlLWNlMTItNGRhZC05MjAzLWVkNzBhOGIwOTljMS8iLCJpYXQiOjE2MDg1ODIxOTQsIm5iZiI6MTYwODU4MjE5NCwiZXhwIjoxNjA4NTg2MDk0LCJhaW8iOiJFMkpnWVBnYndsVmlISHczZU52aEp1NkhGMVQwQUE9PSIsImFwcGlkIjoiZjM3MzQyMGUtMTFiZC00NzRiLTk4MjItOWYzMTU1MzNhZjQzIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjNiZjA5NmUtY2UxMi00ZGFkLTkyMDMtZWQ3MGE4YjA5OWMxLyIsIm9pZCI6IjdkNmFjZWIyLTYyNDgtNGFiNC1hYTMzLWRhMjU1ODEwZGVhYyIsInJoIjoiMC5BQUFBYmdtX3N4TE9yVTJTQS0xd3FMQ1p3UTVDY19POUVVdEhtQ0tmTVZVenIwTjJBQUEuIiwic3ViIjoiN2Q2YWNlYjItNjI0OC00YWI0LWFhMzMtZGEyNTU4MTBkZWFjIiwidGlkIjoiYjNiZjA5NmUtY2UxMi00ZGFkLTkyMDMtZWQ3MGE4YjA5OWMxIiwidXRpIjoiS3EtamlkOGxOVUdkMk1nNDJiUVlBQSIsInZlciI6IjEuMCJ9.t_LoTlE2eoayhdRCE8MxAAybmIzGlCuAzuVI9raLyfv5Sq8nk8_5JvP20wR4QcxZKGx1xaiRmS63vKuh8iJy4CPDxbQ2DQYeQ7G6po-XsF8_pUKNLwUTs9QrwpCMb1847jkCf5vKci_iAg8IuK1-79Dz_LR1OWglNgTWexzqTbVTsx-HBzq_Lpf7UvxadBEh9k7AXtgESEUkO3fakxEvJO5BWXvVEGGNGug-Q5YCP5dHzQFjtDhtDcbwVMllAZU2FwfbQ7n0YVg4oIwo8Lj3BUhiIN897KZiLxFG_UaoYp5-FEJy7BKCJoiONkKCipZR--6CRYERuZ3cxuum69rJvQ"
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
      "fpc=ArfpERbVoHRBizrQ1sfKyGX3ZxdeAQAAAF38ctcOAAAA; expires=Wed, 20-Jan-2021 20:28:14 GMT; path=/; secure; HttpOnly; SameSite=None",
      "Set-Cookie",
      "x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly",
      "Set-Cookie",
      "stsservicecookie=ests; path=/; secure; samesite=none; httponly",
      "Date",
      "Mon, 21 Dec 2020 20:28:13 GMT",
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
    "F//8oN+qAU6OCUZfpUCJag.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "357ms",
    "X-Azure-Ref",
    "0XgXhXwAAAABec5/iW5l5SblJgIQheeTrRVdSMzBFREdFMDYxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 21 Dec 2020 20:28:14 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat", "pstn"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-12-22T20:28:14.0876313+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "75/9zD7vCke7F+DMNRP/aA.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "275ms",
      "X-Azure-Ref",
      "0XgXhXwAAAAAWDj7kN70PRrsn2GtE6GQMRVdSMzBFREdFMDYxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 21 Dec 2020 20:28:14 GMT"
    ]
  );
