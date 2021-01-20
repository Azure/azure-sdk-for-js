let nock = require("nock");

module.exports.hash = "94f2c2c93cfee83a172c03480cae9dba";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/countries")
  .query(true)
  .reply(
    200,
    {
      countries: [
        { localizedName: "Canada", countryCode: "CA" },
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
      "KSew2XXuJUmhVRXHsdoRjg.0",
      "X-Processing-Time",
      "810ms",
      "X-Azure-Ref",
      "0tIy4XwAAAABf7te5cDbfSKQtpjstPRjfWVZSMzBFREdFMDMxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:44 GMT"
    ]
  );
