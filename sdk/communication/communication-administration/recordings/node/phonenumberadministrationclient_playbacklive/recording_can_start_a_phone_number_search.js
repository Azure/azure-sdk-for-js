let nock = require("nock");

module.exports.hash = "279fc9f035f7f131443b1551746913fd";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches", {
    displayName: "LRO Test Search",
    description: "Test search for JS phone number admin SDK.",
    phonePlanIds: ["b528a997-03bb-446e-af98-3d99877cf0ba"],
    areaCode: "800",
    quantity: 1
  })
  .query(true)
  .reply(201, { searchId: "5e889ad9-7878-4ed4-9ddd-d1e4caa74f74" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "CwVqs9tUYEWV4svzLov1rA.0",
    "X-Processing-Time",
    "1402ms",
    "X-Azure-Ref",
    "03rl3XwAAAABprsfJZbPwQLYDNi58TEbiWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Fri, 02 Oct 2020 23:38:07 GMT"
  ]);
