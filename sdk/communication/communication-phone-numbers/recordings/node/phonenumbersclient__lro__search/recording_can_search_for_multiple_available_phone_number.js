let nock = require("nock");

module.exports.hash = "7288d4aff527fb863c47742207f68f4b";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
  .post("/availablePhoneNumbers/countries/US/:search", {
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: { calling: "none", sms: "inbound+outbound" },
    quantity: 2
  })
  .query(true)
  .reply(
    500,
    {
      error: {
        code: "InternalError",
        message: "The server encountered an internal error.",
        innererror: {
          code: "BadRequest",
          message: "Maximum search size exceeded. Max size: 1, request size: 2"
        }
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
      "BVHkXmFJsEGxKV7ap967dg.0",
      "X-Processing-Time",
      "2403ms",
      "X-Azure-Ref",
      "05YxHYAAAAABsXHiQF4QYSL1D5XfPD8hMWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:57:43 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .post("/availablePhoneNumbers/countries/US/:search", {
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: { calling: "none", sms: "inbound+outbound" },
    quantity: 2
  })
  .query(true)
  .reply(
    500,
    {
      error: {
        code: "InternalError",
        message: "The server encountered an internal error.",
        innererror: {
          code: "BadRequest",
          message: "Maximum search size exceeded. Max size: 1, request size: 2"
        }
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
      "ERadX2J5VkqCmekbf6cRgQ.0",
      "X-Processing-Time",
      "1650ms",
      "X-Azure-Ref",
      "054xHYAAAAAAO21I0MUcgQ5pZHsaqlzPtWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:57:44 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: false })
  .post("/availablePhoneNumbers/countries/US/:search", {
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: { calling: "none", sms: "inbound+outbound" },
    quantity: 2
  })
  .query(true)
  .reply(
    500,
    {
      error: {
        code: "InternalError",
        message: "The server encountered an internal error.",
        innererror: {
          code: "BadRequest",
          message: "Maximum search size exceeded. Max size: 1, request size: 2"
        }
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
      "s2hTLZTfqUOX+k9UuKh3tg.0",
      "X-Processing-Time",
      "1609ms",
      "X-Azure-Ref",
      "0Co1HYAAAAAA5u/w8mwpkQpEBtPDwNduOWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Tue, 09 Mar 2021 14:58:19 GMT"
    ]
  );
