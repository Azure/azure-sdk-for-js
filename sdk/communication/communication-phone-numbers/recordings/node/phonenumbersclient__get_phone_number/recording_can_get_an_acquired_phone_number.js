let nock = require("nock");

module.exports.hash = "2f252739ba3fe5de05eb23b395a8274c";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/phoneNumbers/%2B14155550100")
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
      callbackUri: null,
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
      "ujJCpOe1y0KDYkJXFPRb9w.0",
      "X-Processing-Time",
      "1055ms",
      "X-Azure-Ref",
      "0EiIcYAAAAABOgcfi+PGJS4ljrDidtL9zWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Thu, 04 Feb 2021 16:34:27 GMT"
    ]
  );
