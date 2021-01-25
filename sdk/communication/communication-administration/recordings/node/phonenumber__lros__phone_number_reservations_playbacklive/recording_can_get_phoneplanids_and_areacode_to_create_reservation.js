let nock = require("nock");

module.exports.hash = "94e44043049458bd9e485a4c3758bf1a";

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
      "FSb7lv2Pu0KPRgP7ScoQ/w.0",
      "X-Processing-Time",
      "236ms",
      "X-Azure-Ref",
      "0aCl+XwAAAABd+v5BUu6lRYEJlneLlSC/WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:35 GMT"
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
      "f5okYymJZkmgVWvWq5W9Eg.0",
      "X-Processing-Time",
      "232ms",
      "X-Azure-Ref",
      "0aCl+XwAAAADlXGGqIxPzTYtU6NpOJveXWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:36 GMT"
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
    "3WDKECbGYkiNBYypoexhHA.0",
    "X-Processing-Time",
    "193ms",
    "X-Azure-Ref",
    "0aCl+XwAAAABo5g9yVvrBTq9FDCPDiDqAWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 07 Oct 2020 20:47:36 GMT"
  ]);
