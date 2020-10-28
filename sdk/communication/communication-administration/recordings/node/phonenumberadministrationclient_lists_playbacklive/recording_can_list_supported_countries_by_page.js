let nock = require("nock");

module.exports.hash = "f4ecaed5b491c12f4d4e1ed9b6e882a6";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/countries")
  .query(true)
  .reply(
    200,
    { countries: [{ localizedName: "United States", countryCode: "US" }], nextLink: null },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "gCG/YzxGtki237qptmbkzw.0",
      "X-Processing-Time",
      "409ms",
      "X-Azure-Ref",
      "01qOZXwAAAADfxo3W4TFITJtHIpSxCkWsWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:10 GMT"
    ]
  );
