let nock = require("nock");

module.exports.hash = "1c880cc35f2f3b240445a35a012e7bab";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-09-18T17:57:45.3830734+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "f94y+F9y70yOnKIRo9ewAA.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "76b35c64-7a2c-4876-81a0-0396f8f65f32",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "70ms",
      "X-Azure-Ref",
      "0mqNjXwAAAAD+AWsEKavdTbytYp800w86WVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Thu, 17 Sep 2020 17:57:46 GMT"
    ]
  );
