let nock = require("nock");

module.exports.hash = "f63d5b73847b3e4f0f6918377ea031ec";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/phoneNumbers/%2B14155550100")
  .query(true)
  .reply(
    404,
    {
      error: {
        code: "PhoneNumberNotFound",
        message: "The specified phone number +14155550100 cannot be found.",
        target: "phonenumber"
      }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json",
      "Request-Context",
      "appId=",
      "MS-CV",
      "VauCwrMGRk6AYyHFzO73cw.0",
      "X-Processing-Time",
      "320ms",
      "X-Azure-Ref",
      "0EyIcYAAAAACiFtyb8LnkToWVoImWSFzNWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Thu, 04 Feb 2021 16:34:27 GMT"
    ]
  );
