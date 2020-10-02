let nock = require("nock");

module.exports.hash = "3cdc938169a6df415554f9d5e6aef39b";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

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
      "xkkQdOuyk0+lGF7KZb6uKQ.0",
      "X-Processing-Time",
      "782ms",
      "X-Azure-Ref",
      "0qI93XwAAAACbxmsJxUTQQYCqwFVpCdAWWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 20:38:00 GMT"
    ]
  );
