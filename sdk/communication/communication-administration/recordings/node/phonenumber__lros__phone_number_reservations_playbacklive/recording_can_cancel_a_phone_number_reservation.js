let nock = require("nock");

module.exports.hash = "f543a2ea0f5e2f732cbec44eb78eb96f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches/sanitized/cancel")
  .query(true)
  .reply(202, "", [
    "MS-CV",
    "y5rWhJKH4UqIoVFS0Wy3NA.0",
    "X-Processing-Time",
    "626ms",
    "X-Azure-Ref",
    "0fSl+XwAAAABDd//JSRTySLVTmkFA8CA4WVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:57 GMT",
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Cancelling",
      phoneNumbers: ["+12052067871"],
      reservationExpiryDate: "2020-10-07T21:03:55.3836376+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "+h/66RYvuEiJkoOn5BrwIg.0",
      "X-Processing-Time",
      "346ms",
      "X-Azure-Ref",
      "0fil+XwAAAAAQNk6QdCiwS42lOpayhq8fWVZSMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:57 GMT"
    ]
  );
