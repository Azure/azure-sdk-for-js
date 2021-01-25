let nock = require("nock");

module.exports.hash = "80adfe50a0d8343d806a34bdf77ada6b";

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
    "Xd5BYTSO5kanzA5/Z7HNQg.0",
    "X-Processing-Time",
    "6015ms",
    "X-Azure-Ref",
    "0aCl+XwAAAAB6evibvRtHTJ5aUE+G0ZvPWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:42 GMT"
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
      status: "Pending",
      phoneNumbers: []
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ydM7QAzjmEK7VwRKUSa+pQ.0",
      "X-Processing-Time",
      "270ms",
      "X-Azure-Ref",
      "0bil+XwAAAAApqsllfkNzTaic/hIJpzhWWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:42 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
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
      "8oGgTXKCxU6OK9buyrPwlA.0",
      "X-Processing-Time",
      "347ms",
      "X-Azure-Ref",
      "0byl+XwAAAAD7A2L6U68+R4ORaguH6aLkWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:43 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
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
      "iK5yTCX0YE+d1wuxLa/ZrQ.0",
      "X-Processing-Time",
      "269ms",
      "X-Azure-Ref",
      "0cSl+XwAAAABkx/kxw9PLRIXx2XDkHjn+WVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:45 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
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
      "FdpjzsyBOkubhYxja6uJnw.0",
      "X-Processing-Time",
      "280ms",
      "X-Azure-Ref",
      "0cyl+XwAAAACOhSclmCvFR5zLoV+kg4ZBWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:47 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
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
      "hvST1uXLLEC6GRPOkmruhg.0",
      "X-Processing-Time",
      "267ms",
      "X-Azure-Ref",
      "0dil+XwAAAACMIlqUx/buTLHw+dI3VLm/WVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:50 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
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
      "DNuNe7iM50muy2zuHobQWQ.0",
      "X-Processing-Time",
      "262ms",
      "X-Azure-Ref",
      "0eCl+XwAAAABggRyTMNfqQ5F7/t4q4J73WVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:52 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
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
      "vpBqHPeSrEKu1Loc0YJT4A.0",
      "X-Processing-Time",
      "265ms",
      "X-Azure-Ref",
      "0eil+XwAAAABrEwIqQiyFQ7owTiXYSf+FWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:54 GMT"
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
      createdAt: "2020-10-07T20:47:42.3582285+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Reserved",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T21:03:55.3836376+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "C7Fe7P1kZ0CGkRmIUKffcQ.0",
      "X-Processing-Time",
      "266ms",
      "X-Azure-Ref",
      "0fSl+XwAAAABzAq+PszQEQYBHSiy7Bb1zWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:56 GMT"
    ]
  );
