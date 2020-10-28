let nock = require("nock");

module.exports.hash = "eedc975deedee97de4ed28a5a0fa98a7";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/phonenumbers")
  .query(true)
  .reply(
    200,
    {
      phoneNumbers: [
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: [
            "Azure",
            "InboundCalling",
            "UserAssignment",
            "Geographic",
            "OutboundCalling"
          ],
          availableCapabilities: [
            "UserAssignment",
            "Geographic",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Birmingham, United States",
          activationState: "Activated"
        }
      ],
      nextLink: null
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "vOjx38nhiEiq/Had2uQR2Q.0",
      "X-Processing-Time",
      "396ms",
      "X-Azure-Ref",
      "04zl+XwAAAACSi8VRbQPURJ+3BQaRmovRWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 21:57:56 GMT"
    ]
  );
