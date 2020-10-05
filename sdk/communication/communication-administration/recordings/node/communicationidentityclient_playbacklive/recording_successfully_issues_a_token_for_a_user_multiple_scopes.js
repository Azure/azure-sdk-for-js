let nock = require("nock");

module.exports.hash = "f30fde667c7b7a14ab32826e4d83a221";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat", "pstn"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-10-06T11:24:09.0551068+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "7s8M3COwTEecqn0oiJEfRQ.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "27ms",
      "X-Azure-Ref",
      "0WQJ7XwAAAAAppZPbQL18TIb18yefacV6WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 05 Oct 2020 11:24:09 GMT"
    ]
  );
