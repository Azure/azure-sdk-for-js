let nock = require("nock");

module.exports.hash = "1c880cc35f2f3b240445a35a012e7bab";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/:issueAccessToken", { scopes: ["chat"] })
  .query(true)
  .reply(200, { token: "sanitized", expiresOn: "2021-01-20T15:39:14.7360153+00:00" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "Moedc5KSB0eBtdD2heqKCA.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "49ms",
    "X-Azure-Ref",
    "0I/0GYAAAAADymHbD3JAIRauSg01WvZYWWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Tue, 19 Jan 2021 15:39:15 GMT"
  ]);
