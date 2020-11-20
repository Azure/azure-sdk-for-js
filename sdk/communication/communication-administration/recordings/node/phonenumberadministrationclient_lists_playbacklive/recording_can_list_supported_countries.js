let nock = require("nock");

module.exports.hash = "63210f723fc2dda20fd80ea70727d02f";

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
      "ShzCBK46mkeS1wWflDDpfg.0",
      "X-Processing-Time",
      "400ms",
      "X-Azure-Ref",
      "0ZSl+XwAAAADJexyonDyOQqfbsLPQ1iLVWVZSMzBFREdFMDMxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:32 GMT"
    ]
  );
