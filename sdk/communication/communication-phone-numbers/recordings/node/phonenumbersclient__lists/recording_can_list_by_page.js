let nock = require("nock");

module.exports.hash = "a4caf4a3d2b1414863d754880d2cdfda";

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
      "5WyI1vN6WkCIG/Y0BXK5YQ.0",
      "X-Processing-Time",
      "635ms",
      "X-Azure-Ref",
      "0IKEdYAAAAAB4uOMcedHJSKc+549p1aDhWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 05 Feb 2021 19:48:48 GMT"
    ]
  );
