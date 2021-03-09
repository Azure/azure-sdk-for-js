let nock = require("nock");

module.exports.hash = "f63d5b73847b3e4f0f6918377ea031ec";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .get("/phoneNumbers/%2B14155550100")
  .query(true)
  .reply(
    404,
    {
      error: {
        code: "PhoneNumberNotFound",
        message: "The specified phone number +14155550100 cannot be found.",
        target: "phonenumber"
      }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json",
      "Request-Context",
      "appId=",
      "MS-CV",
      "ADnt1zD8s0e5qtlO+V0PLw.0",
      "X-Processing-Time",
      "321ms",
      "X-Azure-Ref",
      "0MohHYAAAAACgT05VCF1OSZzNRQGY1i9PWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:37:38 GMT"
    ]
  );
