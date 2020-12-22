let nock = require("nock");

module.exports.hash = "fd962706f04666033b74b57c93441245";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches", {
    displayName: "LRO Test Search",
    description: "Test search for JS phone number admin SDK.",
    phonePlanIds: ["sanitized", "sanitized"],
    areaCode: "205",
    quantity: 1
  })
  .query(true)
  .reply(201, { searchId: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "o2XBBB2PiEi9uSMb/K9AsA.0",
    "X-Processing-Time",
    "775ms",
    "X-Azure-Ref",
    "0gaK4XwAAAAAFPkOwYJgBQpd6HSbNNL12WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 05:15:46 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T05:15:46.1416374+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Pending",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "h/3ijJ45DUGzkjzbPp7hWQ.0",
      "X-Processing-Time",
      "268ms",
      "X-Azure-Ref",
      "0gqK4XwAAAAAy2K//ODdzS7/lkadoN/NQWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 05:15:46 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T05:15:46.1416374+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Pending",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "xm7fsn7nck2+wu/mXQLfTA.0",
      "X-Processing-Time",
      "274ms",
      "X-Azure-Ref",
      "0g6K4XwAAAACfID0eYTG2QK/Gi+QVp716WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 05:15:46 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T05:15:46.1416374+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Pending",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "N+zwXcf5AU2TyA/yx/Cjkg.0",
      "X-Processing-Time",
      "262ms",
      "X-Azure-Ref",
      "0haK4XwAAAACTOn8kxFsTSLBbwxCZ8iAJWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 05:15:49 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T05:15:46.1416374+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "InProgress",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "PKVdnunn8EOIxZ8i3MQRjw.0",
      "X-Processing-Time",
      "270ms",
      "X-Azure-Ref",
      "0h6K4XwAAAABywSTvgo6NSrpujwHF9vH4WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 05:15:51 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-11-21T05:15:46.1416374+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Reserved",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T05:31:51.713592+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "EVTvCki14EOuvmOYaPWvCA.0",
      "X-Processing-Time",
      "296ms",
      "X-Azure-Ref",
      "0iqK4XwAAAAC6/SK05+VjS6xTZuX3RE0kWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 05:15:53 GMT"
    ]
  );
