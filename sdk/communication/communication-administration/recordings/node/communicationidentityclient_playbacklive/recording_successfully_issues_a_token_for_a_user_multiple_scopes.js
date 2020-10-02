let nock = require("nock");

module.exports.hash = "f30fde667c7b7a14ab32826e4d83a221";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat", "pstn"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-10-03T20:35:48.794693+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "nygWK7oHEUS33uYATlLrUQ.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "7bbd90e6-f924-4d0b-96e8-9e3160f29c82",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "22ms",
      "X-Azure-Ref",
      "0JY93XwAAAACYo5IK1secQIplC5yO1MOXWVZSMzBFREdFMDMwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 20:35:49 GMT"
    ]
  );
