let nock = require('nock');

module.exports.hash = "4a6aa78ff3e608a0c86d94e8211ad5bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/:issueAccessToken", { scopes: ["chat", "voip"] })
  .query(true)
  .reply(200, { token: "sanitized", expiresOn: "2021-01-22T20:17:30.1353667+00:00" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "FcCTQ857p0Kmt16FfR/9cw.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "26ms",
    "X-Azure-Ref",
    "0W+EJYAAAAADqzza+TSriRrm7vmstTyXWV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:17:31 GMT"
  ]);
