let nock = require("nock");

module.exports.hash = "1c880cc35f2f3b240445a35a012e7bab";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/identities/sanitized/token", { scopes: ["chat"] })
  .query(true)
  .reply(
    200,
    { id: "sanitized", token: "sanitized", expiresOn: "2020-10-08T20:47:29.889596+00:00" },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "LyW5Y3Mu+UqhrqUOU3hKnA.0",
      "Strict-Transport-Security",
      "max-age=2592000",
      "x-ms-client-request-id",
      "sanitized",
      "api-supported-versions",
      "2020-07-20-preview1, 2020-07-20-preview2",
      "X-Processing-Time",
      "113ms",
      "X-Azure-Ref",
      "0Yil+XwAAAABTdE+YuwWHQIo6cdobLiL4WVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:30 GMT"
    ]
  );
