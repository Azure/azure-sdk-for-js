let nock = require("nock");

module.exports.hash = "3c9612c89387a02f157ca1903100a382";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/phoneNumbers/%2B14155550100", { callbackUri: "https://endpoint" })
  .query(true)
  .reply(
    200,
    {
      id: "18332159176",
      phoneNumber: "+14155550100",
      countryCode: "US",
      phoneNumberType: "TollFree",
      capabilities: { calling: "inbound+outbound", sms: "outbound" },
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
      "p7ZbqSzjb0iq1Ftpg4Wc7A.0",
      "X-Processing-Time",
      "1100ms",
      "X-Azure-Ref",
      "0K/4aYAAAAADrVFGlNnK6SLvmo1vpLvzAWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 03 Feb 2021 19:49:00 GMT"
    ]
  );
