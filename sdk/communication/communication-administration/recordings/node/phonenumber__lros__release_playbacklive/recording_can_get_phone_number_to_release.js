let nock = require("nock");

module.exports.hash = "d12b9869904001520b971b5ffc5b2a7a";

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
            "InboundCalling",
            "UserAssignment",
            "Geographic",
            "OutboundCalling"
          ],
          availableCapabilities: [
            "UserAssignment",
            "InboundCalling",
            "OutboundCalling",
            "Geographic",
            "Office365",
            "Azure"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Birmingham, United States",
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
      "OBnzY6dkB0WXFkoDrdF7Qw.0",
      "X-Processing-Time",
      "472ms",
      "X-Azure-Ref",
      "03Iy4XwAAAACc6+B1uvi9SprOAMNMSvUVWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Sat, 21 Nov 2020 03:43:24 GMT"
    ]
  );
