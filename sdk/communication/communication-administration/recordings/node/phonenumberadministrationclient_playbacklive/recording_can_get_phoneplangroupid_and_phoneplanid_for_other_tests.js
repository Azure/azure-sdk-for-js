let nock = require("nock");

module.exports.hash = "964cd9f98a72cf71b476177a72fb3de5";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/countries/US/phoneplangroups")
  .query(true)
  .reply(
    200,
    {
      phonePlanGroups: [
        {
          phonePlanGroupId: "55bc1415-9fe6-42d7-9ed4-5ea28c6a17cf",
          phoneNumberType: "Geographic",
          localizedName: "Azure- User - Geographic",
          localizedDescription: "These are numbers used by Azure resources."
        },
        {
          phonePlanGroupId: "671ee064-662f-4c3b-82a9-af2ab200dd5c",
          phoneNumberType: "Geographic",
          localizedName: "Azure - Geographic",
          localizedDescription: "These are numbers used by Azure resources."
        },
        {
          phonePlanGroupId: "d47a0cdc-8dc1-4e82-a29b-39067f7fc317",
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
      "Xvx73sQiPUaXvKRZvpZ+6Q.0",
      "X-Processing-Time",
      "2601ms",
      "X-Azure-Ref",
      "02bl3XwAAAACmgBg18urrTrlesOYD2El4WVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 23:38:03 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get(
    "/administration/phonenumbers/countries/US/phoneplangroups/55bc1415-9fe6-42d7-9ed4-5ea28c6a17cf/phoneplans"
  )
  .query(true)
  .reply(
    200,
    {
      phonePlans: [
        {
          phonePlanId: "phone-plan-id-1",
          localizedName: "Outbound Only PSTN For User - Geographic",
          locationType: "Selection",
          areaCodes: [],
          capabilities: ["Azure", "OutboundCalling", "UserAssignment", "Geographic"],
          maximumSearchSize: 20
        },
        {
          phonePlanId: "b528a997-03bb-446e-af98-3d99877cf0ba",
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
      "G9ie2uHEEUaPxsjMmatnNQ.0",
      "X-Processing-Time",
      "354ms",
      "X-Azure-Ref",
      "027l3XwAAAAC34EuFKPJRRpo0GgiDplW5WVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 23:38:04 GMT"
    ]
  );
