let nock = require("nock");

module.exports.hash = "e8997f13e4f73ef31dcb45c3b33d453d";

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
    "RyZDHb9sfE+0RIYj6p52aQ.0",
    "X-Processing-Time",
    "1293ms",
    "X-Azure-Ref",
    "0Dzl+XwAAAAB4EmrVUdZAS64XzS8LK3hgWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 21:54:24 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/searches/sanitized")
  .query(true)
  .reply(
    200,
    {
      searchId: "sanitized",
      displayName: "LRO Test Search",
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
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
      "QKZntRnHNEyc0OhV2Wrxtw.0",
      "X-Processing-Time",
      "267ms",
      "X-Azure-Ref",
      "0EDl+XwAAAADAm8mi58tKT4Q0Rb0VO5yrWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:25 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
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
      "JVxePNuNXUiTDTjW5IydQA.0",
      "X-Processing-Time",
      "309ms",
      "X-Azure-Ref",
      "0ETl+XwAAAACmVMZjvn0PTJgaN8oyhlBcWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:25 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
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
      "9lwUImPVvEaYTZpm7g0biQ.0",
      "X-Processing-Time",
      "450ms",
      "X-Azure-Ref",
      "0Ezl+XwAAAADGbA0cA7UPSYUtGt9dUCKzWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:27 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
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
      "x9ncE2jCjU6dl70g5RTHNw.0",
      "X-Processing-Time",
      "295ms",
      "X-Azure-Ref",
      "0Fjl+XwAAAABM8juYvtpHTrw9wt+AES1SWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:30 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
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
      "VPjQjJekl0SunOkS7y+xjQ.0",
      "X-Processing-Time",
      "273ms",
      "X-Azure-Ref",
      "0GDl+XwAAAAC+Bl08i7QHSJrfGFCzqnJ0WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:32 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
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
      "XVEDwrSKx0GDtwGa97QkdQ.0",
      "X-Processing-Time",
      "296ms",
      "X-Azure-Ref",
      "0Gjl+XwAAAABoCGVkNVl8RJd00EoFT8x9WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:34 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Reserved",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ubXVUp5AlECKQMsG8OHV8A.0",
      "X-Processing-Time",
      "274ms",
      "X-Azure-Ref",
      "0HDl+XwAAAABu9uK5i2PHT6dIK07k5zeFWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:36 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/searches/sanitized/purchase")
  .query(true)
  .reply(202, "", [
    "MS-CV",
    "f4Bub1joEEauppmVObqE6A.0",
    "X-Processing-Time",
    "876ms",
    "X-Azure-Ref",
    "0HTl+XwAAAACDbyOSPlGTT4xkvSB+o6BRWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 21:54:37 GMT",
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "miHu+dxBNEWU0Zc2IY7P6w.0",
      "X-Processing-Time",
      "264ms",
      "X-Azure-Ref",
      "0Hjl+XwAAAABFih883l8tSa221ACeKHyvWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:37 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "RnlOx084yE2HYU0wbdCj8Q.0",
      "X-Processing-Time",
      "266ms",
      "X-Azure-Ref",
      "0Hjl+XwAAAAAFBoYjGffTT4sMQrgRAFK4WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:38 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "cQ6AHuNvUkW6PjKJbeekUg.0",
      "X-Processing-Time",
      "263ms",
      "X-Azure-Ref",
      "0IDl+XwAAAAA8MRg64oHYTZLJUsugx7mPWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:40 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "PeNZl8PaMEmCrKQJfPscHQ.0",
      "X-Processing-Time",
      "404ms",
      "X-Azure-Ref",
      "0Izl+XwAAAAB7SE4zD1UmT7YE8NjRlPvtWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:42 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "EbrNt+OM40u8TBeDmRwtWw.0",
      "X-Processing-Time",
      "684ms",
      "X-Azure-Ref",
      "0JTl+XwAAAAD7hEG44L2jRojL/JH3EHDkWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:45 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "vctZ9aVhmkuOtN2OKNrVLQ.0",
      "X-Processing-Time",
      "298ms",
      "X-Azure-Ref",
      "0KDl+XwAAAAClkyjvtf5GT6pXoe4+mznRWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:47 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "1utHr8TumkCJAJ+scYZdyA.0",
      "X-Processing-Time",
      "266ms",
      "X-Azure-Ref",
      "0Kjl+XwAAAADQZ6xEvGklRIJ7e/y2lC9dWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:49 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "W5+sEwylukKZ5GFgpJD2AQ.0",
      "X-Processing-Time",
      "324ms",
      "X-Azure-Ref",
      "0LDl+XwAAAABkKQt7fUC4QofsWZ+TJTVFWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:52 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "Sw8vr3kXFEyQxOA/lbnE4A.0",
      "X-Processing-Time",
      "580ms",
      "X-Azure-Ref",
      "0Lzl+XwAAAABXfqZKMawaTKOtbIIEUrgQWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:54 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "DXORuspEoU21k/PRf9JXjA.0",
      "X-Processing-Time",
      "318ms",
      "X-Azure-Ref",
      "0MTl+XwAAAABmwEiPLU1PS6nvu8KZrK3mWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:54:58 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "ZC2GjrW5IU6kEUxnc1cZPA.0",
      "X-Processing-Time",
      "280ms",
      "X-Azure-Ref",
      "0NDl+XwAAAABZcyRrfrVtS4hAOuWQqiuMWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:00 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "O2dCh3NSdUuHIpe7dmuILw.0",
      "X-Processing-Time",
      "432ms",
      "X-Azure-Ref",
      "0Njl+XwAAAADDgWk2cpXCTqDgkqszrHv3WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:02 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Completing",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "lrlXKWofPk6z8RSQLfP1MA.0",
      "X-Processing-Time",
      "338ms",
      "X-Azure-Ref",
      "0OTl+XwAAAAAy1nAW5Ch8T4B3nH/ZvDbKWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:05 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "PrrJbUYeKEiZRaiZnYpWvg.0",
      "X-Processing-Time",
      "275ms",
      "X-Azure-Ref",
      "0Ozl+XwAAAABlON3OmXSVSojNjQOeftZXWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:07 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "zYufa2LCfkGG1r2A3JiSqQ.0",
      "X-Processing-Time",
      "286ms",
      "X-Azure-Ref",
      "0PTl+XwAAAACFVqlGnDKnTZs6n1C+YchbWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:09 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "oLEyrkr/iki2N8HrgGiHMg.0",
      "X-Processing-Time",
      "363ms",
      "X-Azure-Ref",
      "0Pzl+XwAAAABfAs/wFmgBQ7xW04zsME/BWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:12 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "xaD8+JJ+lk+tG6dZzQVrww.0",
      "X-Processing-Time",
      "285ms",
      "X-Azure-Ref",
      "0Qjl+XwAAAAAbLju2/p1aQ5p4vv+CnmK0WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:14 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "zsHtpjLJ6kODGcsmxcaFvw.0",
      "X-Processing-Time",
      "360ms",
      "X-Azure-Ref",
      "0RDl+XwAAAAAdO/C4r3nRTqMrLH/OL9KaWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:16 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "PurchasePending",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "u1fLWDAatk+MRtUpdfEDdg.0",
      "X-Processing-Time",
      "274ms",
      "X-Azure-Ref",
      "0Rzl+XwAAAAAAEKGRN0JERIuV/Z8DmgMaWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:18 GMT"
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
      createdAt: "2020-10-07T21:54:24.2892469+00:00",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: ["sanitized", "sanitized"],
      areaCode: "205",
      quantity: 1,
      locationOptions: [],
      status: "Success",
      phoneNumbers: ["+18005551234"],
      reservationExpiryDate: "2020-10-07T22:10:35.7019339+00:00"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "icMGtb6dQE6iBGMaqlL0EA.0",
      "X-Processing-Time",
      "274ms",
      "X-Azure-Ref",
      "0STl+XwAAAADn4C4c+qRbQ5Fz38rhJPTsWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:55:21 GMT"
    ]
  );
