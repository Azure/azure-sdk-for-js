let nock = require("nock");

module.exports.hash = "adb2deb4a6bd41676e1bba523a0f29ec";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches", {
    displayName: "LRO Test Search",
    description: "Test search for JS phone number admin SDK.",
    phonePlanIds: ["sanitized"],
    areaCode: "800",
    quantity: 1
  })
  .query(true)
  .reply(201, { searchId: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "jUqg0zB9YEuElNZCvo4MnA.0",
    "X-Processing-Time",
    "1560ms",
    "X-Azure-Ref",
    "0YgJ7XwAAAACMuosAtoA/Qp5dKSethnztWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Mon, 05 Oct 2020 11:24:20 GMT"
  ]);
