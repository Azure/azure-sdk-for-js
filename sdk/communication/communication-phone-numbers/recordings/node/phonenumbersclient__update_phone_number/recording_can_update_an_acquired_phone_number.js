let nock = require("nock");

module.exports.hash = "3c9612c89387a02f157ca1903100a382";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/phoneNumbers/%2B14155550100", { callbackUri: "https://endpoint" })
  .query(true)
  .reply(
    200,
    {
      id: "14155550100",
      phoneNumber: "+14155550100",
      countryCode: "US",
      phoneNumberType: "TollFree",
      capabilities: { calling: "none", sms: "outbound" },
      assignmentType: "Application",
      callbackUri: "https://endpoint",
      applicationId: null
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "bwfhFCSfkkqSitgQaGGGPA.0",
      "X-Processing-Time",
      "1156ms",
      "X-Azure-Ref",
      "0FCIcYAAAAAAgkR4P3Pj3T5t/ZaX/BZAKWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Thu, 04 Feb 2021 16:34:29 GMT"
    ]
  );
