let nock = require("nock");

module.exports.hash = "e96a3b7844be3e24fcea1b314a74af26";

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
      "RgEXMa10okSLs+ILUBkCiw.0",
      "X-Processing-Time",
      "369ms",
      "X-Azure-Ref",
      "0qI93XwAAAAAdNTUeFNgsQ4aT1cc5Gh75WVZSMzBFREdFMDQyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 20:37:59 GMT"
    ]
  );
