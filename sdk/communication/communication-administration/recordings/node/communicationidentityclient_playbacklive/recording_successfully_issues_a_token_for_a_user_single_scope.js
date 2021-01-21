let nock = require("nock");

module.exports.hash = "c6f3ddd7c26e3db3fdb740807d8806c6";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/:issueAccessToken", { scopes: ["chat"] })
  .query(true)
  .reply(200, { token: "sanitized", expiresOn: "2021-01-22T20:17:30.0481704+00:00" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "10R9kZzcWUOBD+kRuAq4Lg.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "289ms",
    "X-Azure-Ref",
    "0WuEJYAAAAAAW5X+4jx4JQblAkbrO7KJjV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:17:31 GMT"
  ]);
