let nock = require("nock");

module.exports.hash = "2bcda95b564d260d9797df09c1814117";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/countries")
  .query(true)
  .reply(
    200,
    {
      countries: [
        { localizedName: "Australia", countryCode: "AU" },
        { localizedName: "Japan", countryCode: "JP" },
        { localizedName: "United States", countryCode: "US" }
      ],
      nextLink: null
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "Hq2h9aEzI0S2YvOzi0XsPQ.0",
      "X-Processing-Time",
      "759ms",
      "X-Azure-Ref",
      "0kHZ2XwAAAAAWqERdFKX7Q6To8dyPssQzWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 00:38:40 GMT"
    ]
  );
