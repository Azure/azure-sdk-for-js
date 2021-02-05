let nock = require("nock");

module.exports.hash = "bcced9616f14b1f2d86877f4d7fe0c3d";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/phoneNumbers")
  .query(true)
  .reply(
    200,
    {
      phoneNumbers: [
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "Geographic",
          capabilities: { calling: "outbound", sms: "none" },
          assignmentType: "User",
          callbackUri: null,
          applicationId: null
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "Geographic",
          capabilities: { calling: "outbound", sms: "none" },
          assignmentType: "User",
          callbackUri: null,
          applicationId: null
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "inbound+outbound", sms: "inbound+outbound" },
          assignmentType: "Application",
          callbackUri: null,
          applicationId: null
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "none", sms: "inbound+outbound" },
          assignmentType: "Application",
          callbackUri: null,
          applicationId: null
        }
      ]
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "SVN2WOAHkUmNF+eqIXqj7Q.0",
      "X-Processing-Time",
      "1125ms",
      "X-Azure-Ref",
      "0HqEdYAAAAACu3pJu9sYRQrgce1J5ZedDWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 05 Feb 2021 19:48:47 GMT"
    ]
  );
