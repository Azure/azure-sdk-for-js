let nock = require("nock");

module.exports.hash = "9dd33ec2e77fd9180afab05fd984c02d";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e/cancel")
  .query(true)
  .reply(202, "", [
    "MS-CV",
    "d9f1WpydmEi302PJDNFO6A.0",
    "X-Processing-Time",
    "1039ms",
    "X-Azure-Ref",
    "0KUl3XwAAAAD58Le5cbJJSLnipVrBJxSLWVZSMzBFREdFMDQwNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
    "Date",
    "Fri, 02 Oct 2020 15:37:14 GMT",
    "Content-Length",
    "0"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Cancelling",
      phoneNumbers: ["+15550000003"],
      reservationExpiryDate: "2020-10-02T15:53:10.1237516+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "8wuSg+Jf8UGgPGix1X3xDw.0",
      "X-Processing-Time",
      "682ms",
      "X-Azure-Ref",
      "0Kkl3XwAAAABlJWuRRerXTrNUtvZ8v3SNWVZSMzBFREdFMDQwNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:14 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Cancelling",
      phoneNumbers: ["+15550000003"],
      reservationExpiryDate: "2020-10-02T15:53:10.1237516+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "1evmGfC3n0CoH/cNYXwxYQ.0",
      "X-Processing-Time",
      "657ms",
      "X-Azure-Ref",
      "0K0l3XwAAAABswgl2+z+qT7JTOVJXfEDqWVZSMzBFREdFMDQwNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:15 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Cancelling",
      phoneNumbers: ["+15550000003"],
      reservationExpiryDate: "2020-10-02T15:53:10.1237516+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "J9mTtbMlH0GCA3DdZYKdXw.0",
      "X-Processing-Time",
      "728ms",
      "X-Azure-Ref",
      "0Lkl3XwAAAAD5dmNmXUw5SrUa+twYToUgWVZSMzBFREdFMDQwNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:18 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/ff8a6a7d-b811-4b16-81e6-767bd8ff395e")
  .query(true)
  .reply(
    200,
    {
      searchId: "ff8a6a7d-b811-4b16-81e6-767bd8ff395e",
      displayName: "LRO Test Search",
      createdAt: "2020-10-02T15:37:05.8863424+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["phone-plan-id-1"],
      areaCode: "555",
      quantity: 1,
      locationOptions: [],
      status: "Cancelled",
      phoneNumbers: ["+15550000003"],
      reservationExpiryDate: "2020-10-02T15:53:10.1237516+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "Uf5qTyxSYkS7sV7dE1VLiA.0",
      "X-Processing-Time",
      "676ms",
      "X-Azure-Ref",
      "0MEl3XwAAAACEvB7G80qKQLm+ivktgANAWVZSMzBFREdFMDQwNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=",
      "Date",
      "Fri, 02 Oct 2020 15:37:20 GMT"
    ]
  );
