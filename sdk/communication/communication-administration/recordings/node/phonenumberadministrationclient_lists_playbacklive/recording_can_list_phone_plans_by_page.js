let nock = require("nock");

module.exports.hash = "e6c8b5001d5937b0b611d20b03697c26";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/countries/US/phoneplangroups/sanitized/phoneplans")
  .query(true)
  .reply(
    200,
    {
      phonePlans: [
        {
          phonePlanId: "sanitized",
          localizedName: "Outbound Only PSTN For User - Geographic",
          locationType: "Selection",
          areaCodes: [],
          capabilities: ["Azure", "OutboundCalling", "UserAssignment", "Geographic"],
          maximumSearchSize: 20
        },
        {
          phonePlanId: "sanitized",
          localizedName: "Inbound Only PSTN For User - Geographic",
          locationType: "Selection",
          areaCodes: [],
          capabilities: ["Azure", "InboundCalling", "UserAssignment", "Geographic"],
          maximumSearchSize: 20
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
      "OL5BJ9awtk68bWSJh1XM2Q.0",
      "X-Processing-Time",
      "602ms",
      "X-Azure-Ref",
      "02KOZXwAAAABY04zkz80xQbvjRDQfTIAqWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:13 GMT"
    ]
  );
