let nock = require("nock");

module.exports.hash = "fc8d69159152e9bd1e763ce59403eb7e";

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
            "ThirdPartyAppAssignment",
            "InboundA2PSms",
            "OutboundA2PSms",
            "TollFree"
          ],
          availableCapabilities: [
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "ThirdPartyAppAssignment",
            "ConferenceAssignment",
            "FirstPartyAppAssignment",
            "TollFree",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: [
            "Azure",
            "ThirdPartyAppAssignment",
            "InboundA2PSms",
            "OutboundA2PSms",
            "TollFree"
          ],
          availableCapabilities: [
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "ThirdPartyAppAssignment",
            "ConferenceAssignment",
            "FirstPartyAppAssignment",
            "TollFree",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
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
      "Kq1C/GkUaEOTwL9mjIVRGw.0",
      "X-Processing-Time",
      "748ms",
      "X-Azure-Ref",
      "0s4y4XwAAAACJOIWpxe/yTKqHbP+3J3RfWVZSMzBFREdFMDQxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:42:43 GMT"
    ]
  );
