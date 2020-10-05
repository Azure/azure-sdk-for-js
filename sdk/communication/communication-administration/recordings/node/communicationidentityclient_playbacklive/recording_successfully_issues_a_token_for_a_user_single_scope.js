let nock = require("nock");

module.exports.hash = "1c880cc35f2f3b240445a35a012e7bab";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-10-06T11:24:08.9389962+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "/roQfp84i0KcvGGMdn+pLw.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "30ms",
      "X-Azure-Ref",
      "0WQJ7XwAAAAB5UyEqtKEpRY4HQnMmDarNWVZSMzBFREdFMDQxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 05 Oct 2020 11:24:09 GMT"
    ]
  );
