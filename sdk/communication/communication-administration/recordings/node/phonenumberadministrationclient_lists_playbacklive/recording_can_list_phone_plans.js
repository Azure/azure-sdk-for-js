let nock = require("nock");

module.exports.hash = "3cdc938169a6df415554f9d5e6aef39b";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
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
      "/Oq7aEkBT0+/O4drUfYgIQ.0",
      "X-Processing-Time",
      "322ms",
      "X-Azure-Ref",
      "0Zil+XwAAAACC1JPnxeZLT4lWoSlfRexhWVZSMzBFREdFMDQxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:34 GMT"
    ]
  );
