let nock = require("nock");

module.exports.hash = "d2e7fdcfc37a332a753053a99de8c41f";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/countries/US/phoneplangroups")
  .query(true)
  .reply(
    200,
    {
      phonePlanGroups: [
        {
          phonePlanGroupId: "sanitized",
          phoneNumberType: "Geographic",
          localizedName: "Azure- User - Geographic",
          localizedDescription: "These are numbers used by Azure resources."
        },
        {
          phonePlanGroupId: "sanitized",
          phoneNumberType: "Geographic",
          localizedName: "Azure - Geographic",
          localizedDescription: "These are numbers used by Azure resources."
        },
        {
          phonePlanGroupId: "sanitized",
          phoneNumberType: "TollFree",
          localizedName: "Azure - Toll Free",
          localizedDescription: "These are toll free numbers used by Azure resources."
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
      "yMC6KGGDJkCFlFNO7F5RhQ.0",
      "X-Processing-Time",
      "290ms",
      "X-Azure-Ref",
      "0t4y4XwAAAAA3sp8u1X2pT6qnQiSTnqrxWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:46 GMT"
    ]
  );

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
      "Os4IT7DkYki2NcygxQEXVg.0",
      "X-Processing-Time",
      "235ms",
      "X-Azure-Ref",
      "0t4y4XwAAAADRY3N+NwQ9S4wCaC7LP7zXWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:47 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .post("/administration/phonenumbers/countries/US/areacodes", {
    locationOptions: [
      { labelId: "state", optionsValue: "AL" },
      { labelId: "city", optionsValue: "NOAM-US-AL-BI" }
    ]
  })
  .query(true)
  .reply(200, { primaryAreaCodes: ["205"], secondaryAreaCodes: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "rhK9AGJ+k06jkG08Id9/MA.0",
    "X-Processing-Time",
    "206ms",
    "X-Azure-Ref",
    "0t4y4XwAAAACuj6SesvM4RKH9Ivgw0WgtWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Sat, 21 Nov 2020 03:42:47 GMT"
  ]);
