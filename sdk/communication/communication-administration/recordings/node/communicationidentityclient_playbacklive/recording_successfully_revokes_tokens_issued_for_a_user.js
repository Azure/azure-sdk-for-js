let nock = require("nock");

module.exports.hash = "e10098ac22e2857510889e9c31a45559";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/identities/sanitized", { tokensValidFrom: "2020-10-10T00:00:00.000Z" })
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "3vO0LIsJykOYKvM+rv16Gg.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "64724808-35d4-45d0-ac0f-d5979d095d4c",
    "api-supported-versions",
    "2020-07-20-preview1, 2020-07-20-preview2",
    "X-Processing-Time",
    "725ms",
    "X-Azure-Ref",
    "0JY93XwAAAAA26475FYCxTKvMascV1GNBWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 20:35:50 GMT"
  ]);
