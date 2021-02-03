let nock = require("nock");

module.exports.hash = "d4ca4f01f37363d7de7cedfed77d38be";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities", { createTokenWithScopes: ["voip"] })
  .query(true)
  .reply(
    201,
    {
      identity: { id: "sanitized" },
      accessToken: { token: "sanitized", expiresOn: "2021-01-22T20:17:29.6695166+00:00" }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ADsXjA95H06IjgOM3Gu31w.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-07-20-preview2, 2021-03-07",
      "X-Processing-Time",
      "353ms",
      "X-Azure-Ref",
      "0WuEJYAAAAAB3y9xPzdu5Qr2XYu7KwQDZV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
      "Date",
      "Thu, 21 Jan 2021 20:17:30 GMT"
    ]
  );
