let nock = require("nock");

module.exports.hash = "a75cee172b29b5a9e7c333d196eb128a";

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
          phonePlanId: "01432411-5169-4665-b13e-3fa56c10e1d1",
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
      "yPp3dTu7B0qekeP2KDubEQ.0",
      "X-Processing-Time",
      "299ms",
      "X-Azure-Ref",
      "0kXZ2XwAAAABiWNft0xUVQp7XJXsmvxeeWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 00:38:41 GMT"
    ]
  );
