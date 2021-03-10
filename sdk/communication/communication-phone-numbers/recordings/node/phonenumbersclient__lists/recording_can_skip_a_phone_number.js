let nock = require("nock");

module.exports.hash = "de1f59a4a7a60e26adec8f6f7d1e8fb6";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
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
          phoneNumberType: "TollFree",
          capabilities: { calling: "none", sms: "inbound+outbound" },
          assignmentType: "Application",
          purchaseDate: "2021-02-10T17:51:13.4876763+00:00",
          cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
        },
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
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "none", sms: "inbound+outbound" },
          assignmentType: "Application",
          purchaseDate: "2021-02-10T18:01:46.4199999+00:00",
          cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "none", sms: "inbound+outbound" },
          assignmentType: "Application",
          purchaseDate: "2021-03-09T15:01:55.0949003+00:00",
          cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "none", sms: "inbound+outbound" },
          assignmentType: "Application",
          purchaseDate: "2021-03-09T15:03:04.7513808+00:00",
          cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "inbound", sms: "inbound+outbound" },
          assignmentType: "Application",
          purchaseDate: "2000-01-01T00:00:00+00:00",
          cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
        },
        {
          id: "14155550100",
          phoneNumber: "+14155550100",
          countryCode: "US",
          phoneNumberType: "TollFree",
          capabilities: { calling: "inbound+outbound", sms: "none" },
          assignmentType: "Application",
          purchaseDate: "2020-09-18T15:03:19.5370985+00:00",
          cost: { amount: 2, currencyCode: "USD", billingFrequency: "Monthly" }
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
      "R/rrya90l0GsDlmP/rvtXQ.0",
      "X-Processing-Time",
      "3689ms",
      "X-Azure-Ref",
      "0J+5HYAAAAABM+VOrNHMNQLJjDjStAfRCWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 21:52:42 GMT"
    ]
  );
