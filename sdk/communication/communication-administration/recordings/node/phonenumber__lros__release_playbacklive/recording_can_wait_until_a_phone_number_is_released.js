let nock = require("nock");

module.exports.hash = "171f4c6130b5a8d0cf96358460b6143d";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/releases", { phoneNumbers: ["+18005551234"] })
  .query(true)
  .reply(200, { releaseId: "sanitized" }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "0IdYiiXvbkqN5YHknMz0uQ.0",
    "X-Processing-Time",
    "583ms",
    "X-Azure-Ref",
    "03Yy4XwAAAABAs2HNTlRbQbo4t8NCCG0MWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:43:24 GMT"
  ]);

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "47sN3nlzpkamdc9SY4cFcg.0",
      "X-Processing-Time",
      "182ms",
      "X-Azure-Ref",
      "03Yy4XwAAAABK4XLSR2qpTrTZzP8qfRMCWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:25 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "Pending",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "8+5cOWfBdEW3UDA8Xi6pbg.0",
      "X-Processing-Time",
      "249ms",
      "X-Azure-Ref",
      "03Yy4XwAAAAAmyCw8jwrBR7vsTrobYLYwWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:25 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "F5HCVMIvB0eOFY8hiKRY/w.0",
      "X-Processing-Time",
      "191ms",
      "X-Azure-Ref",
      "04Iy4XwAAAACp79Q0DmgIQ6CmdRed+a7AWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:27 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "I7uGAz1Lek+slomn9ttIrQ.0",
      "X-Processing-Time",
      "260ms",
      "X-Azure-Ref",
      "04oy4XwAAAAAeaPc7gm7IS7LTk10UypT9WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:29 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "TX+Xm/VnpUSlFYRTdAigoA.0",
      "X-Processing-Time",
      "194ms",
      "X-Azure-Ref",
      "05Iy4XwAAAACx3zgj2PUIQo3K7vcFbe+OWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:33 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Pending" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "llpjEMXnKEOTvmm/FxaRDA.0",
      "X-Processing-Time",
      "198ms",
      "X-Azure-Ref",
      "054y4XwAAAADSyouKTOpvQI/rf+b+R6WUWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:35 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "TJqNBkvWEEKOy5o5qEQFgQ.0",
      "X-Processing-Time",
      "184ms",
      "X-Azure-Ref",
      "06Yy4XwAAAABf49bdyOePQqGQSCeLh+ywWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:37 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "iKmilSNuMkSbKDjp4iE0xQ.0",
      "X-Processing-Time",
      "188ms",
      "X-Azure-Ref",
      "064y4XwAAAAB8iDTliK9iToPM1ixYq7I0WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:39 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "RuDo2PCvFUmCMNkm9SxBtw.0",
      "X-Processing-Time",
      "185ms",
      "X-Azure-Ref",
      "07Yy4XwAAAACPD/HuYzdVRI/rgHNBGqMrWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:41 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "InProgress",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "InProgress" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "CLXLFagGAEqPj2OjLJXuMA.0",
      "X-Processing-Time",
      "186ms",
      "X-Azure-Ref",
      "08Iy4XwAAAACqPZd2rb7dSZJUG2OsgM66WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:44 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/releases/sanitized")
  .query(true)
  .reply(
    200,
    {
      releaseId: "sanitized",
      createdAt: "2020-11-21T03:43:25.2451855+00:00",
      status: "Complete",
      phoneNumberReleaseStatusDetails: { "+18005551234": { status: "Success" } }
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "DQz9Cczv0keII8ToEuxRFQ.0",
      "X-Processing-Time",
      "282ms",
      "X-Azure-Ref",
      "08oy4XwAAAADRvB9mR8azQ6iLpiXb72yKWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:46 GMT"
    ]
  );
