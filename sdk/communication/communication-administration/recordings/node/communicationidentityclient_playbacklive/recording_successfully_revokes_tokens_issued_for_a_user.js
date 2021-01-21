let nock = require("nock");

module.exports.hash = "91da5c774930c99e1394770f0f7c5842";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/:revokeAccessTokens")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "KJAASrhXnUyvIG6SOjGlFQ.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "645ms",
    "X-Azure-Ref",
    "0W+EJYAAAAAC5xPMAGBwBRbatPRn5S9LiV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:17:31 GMT"
  ]);
