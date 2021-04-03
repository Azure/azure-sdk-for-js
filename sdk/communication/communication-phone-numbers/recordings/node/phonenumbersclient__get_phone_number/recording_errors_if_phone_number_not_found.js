let nock = require("nock");

module.exports.hash = "5f7c2a2433fec32d874eb8fd4b06d264";

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
      "xxr8nR1fuUO9GZ5bLCdHUw.0",
      "X-Processing-Time",
      "294ms",
      "X-Azure-Ref",
      "0Iu5HYAAAAABBXiifUp0XTKQ4JiaEPHyNWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 21:52:35 GMT"
    ]
  );
