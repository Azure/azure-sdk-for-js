let nock = require("nock");

module.exports.hash = "c446e1d89cbc81f3f996599c90011619";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches/sanitized/cancel")
  .query(true)
  .reply(202, "", [
    "MS-CV",
    "k78U0wJbiEy3Hguc1zMAjg.0",
    "X-Processing-Time",
    "663ms",
    "X-Azure-Ref",
    "0iqK4XwAAAABs9hStN6HDRI1rLacbSHa1WVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 05:15:54 GMT",
    "Content-Length",
    "0"
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
      status: "Cancelling",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-11-21T05:31:51.713592+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "cCCTTdWiskqp12sL3Pqb7w.0",
      "X-Processing-Time",
      "526ms",
      "X-Azure-Ref",
      "0i6K4XwAAAAC4NFumhE5RQahTvXh2NoPtWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 05:15:55 GMT"
    ]
  );
