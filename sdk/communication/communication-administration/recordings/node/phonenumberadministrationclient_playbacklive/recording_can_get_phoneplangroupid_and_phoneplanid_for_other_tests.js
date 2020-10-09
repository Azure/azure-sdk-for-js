let nock = require("nock");

module.exports.hash = "1a4ba6af0469e1a931c49a965aadd8cd";

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
      "3vx9b8g4b0OqOnJKX4ozlg.0",
      "X-Processing-Time",
      "574ms",
      "X-Azure-Ref",
      "0YAJ7XwAAAADx7ubmJawrT6lgonp+HaakWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 05 Oct 2020 11:24:17 GMT"
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
      "11tk5qm1CU66iBONzurrPg.0",
      "X-Processing-Time",
      "316ms",
      "X-Azure-Ref",
      "0YQJ7XwAAAADplBhPT9YaS7uuM+vcWgzFWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Mon, 05 Oct 2020 11:24:17 GMT"
    ]
  );
