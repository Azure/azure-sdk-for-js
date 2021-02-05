let nock = require("nock");

module.exports.hash = "e3162b0b9e59bc00e6532615e106380b";

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
      "BmDdZ4yeC02KqLro8f0TaQ.0",
      "X-Processing-Time",
      "639ms",
      "X-Azure-Ref",
      "0H6EdYAAAAACypZUuAPCFQJxuAlKG7qNaWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 05 Feb 2021 19:48:47 GMT"
    ]
  );
