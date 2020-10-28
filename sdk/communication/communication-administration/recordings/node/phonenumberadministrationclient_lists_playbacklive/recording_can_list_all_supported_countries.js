let nock = require("nock");

module.exports.hash = "727f847304cd474b2b38619b4ef65ae8";

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
      "yE05uaj1Uk60HGh0YvXkMw.0",
      "X-Processing-Time",
      "444ms",
      "X-Azure-Ref",
      "01qOZXwAAAADkMh40z6BVQrgu5NK1WMjnWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:10 GMT"
    ]
  );
