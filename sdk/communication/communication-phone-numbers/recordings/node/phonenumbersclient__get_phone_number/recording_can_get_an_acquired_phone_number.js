let nock = require("nock");

module.exports.hash = "2f252739ba3fe5de05eb23b395a8274c";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/%2B14155550100")
  .query(true)
  .reply(
    200,
    {
      id: "14155550100",
      phoneNumber: "+14155550100",
      countryCode: "US",
      phoneNumberType: "TollFree",
      capabilities: { calling: "inbound+outbound", sms: "none" },
      assignmentType: "Application",
      purchaseDate: "2020-09-18T15:03:19.5370985+00:00",
      cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "Request-Context",
      "appId=",
      "MS-CV",
      "oBVSQXkXAEOJUOv4/lx/ag.0",
      "X-Processing-Time",
      "1264ms",
      "X-Azure-Ref",
      "0MYhHYAAAAAD1/dct4az1QKr3CQc5EbgnWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:37:37 GMT"
    ]
  );
