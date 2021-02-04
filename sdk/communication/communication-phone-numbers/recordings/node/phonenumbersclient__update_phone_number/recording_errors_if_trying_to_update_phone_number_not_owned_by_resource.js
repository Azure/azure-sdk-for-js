let nock = require("nock");

module.exports.hash = "7d4697b3ca2f27301e8fd98e8e13ad06";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .patch("/phoneNumbers/%2B14155550100", { callbackUri: "https://endpoint" })
  .query(true)
  .reply(404, "", [
    "Request-Context",
    "appId=",
    "MS-CV",
    "gNpbrinHRUiM+lI/kIFv9w.0",
    "X-Processing-Time",
    "396ms",
    "X-Azure-Ref",
    "0FSIcYAAAAAAc+03by5j3QazWfeVjCU3yWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Thu, 04 Feb 2021 16:34:29 GMT",
    "Content-Length",
    "0"
  ]);
