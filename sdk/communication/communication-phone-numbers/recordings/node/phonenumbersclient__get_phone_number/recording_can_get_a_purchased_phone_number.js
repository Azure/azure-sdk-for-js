let nock = require("nock");

module.exports.hash = "9ca4089d35d382b151431c8e40ece80b";

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
      capabilities: { calling: "none", sms: "inbound" },
      assignmentType: "Application",
      purchaseDate: "2021-02-10T17:52:41.818335+00:00",
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
      "MgGxgRicPEOkJZnl6n5C7Q.0",
      "X-Processing-Time",
      "1447ms",
      "X-Azure-Ref",
      "0Ie5HYAAAAADxOjGtd4UBSaWtmMdcn6zOWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 21:52:34 GMT"
    ]
  );
