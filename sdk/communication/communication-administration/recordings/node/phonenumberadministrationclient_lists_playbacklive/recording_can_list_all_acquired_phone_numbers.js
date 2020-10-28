let nock = require("nock");

module.exports.hash = "0dde52a1c1f5e4fdd7568981ca731f49";

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
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundCalling", "TollFree"],
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
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundCalling", "TollFree"],
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
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "TollFree", "InboundA2PSms"],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
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
            "TollFree",
            "OutboundCalling"
          ],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
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
            "OutboundA2PSms",
            "TollFree",
            "InboundA2PSms",
            "OutboundCalling"
          ],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundCalling", "TollFree"],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundA2PSms", "TollFree"],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundCalling", "TollFree"],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundCalling", "TollFree"],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: ["Azure", "ThirdPartyAppAssignment", "OutboundCalling", "TollFree"],
          availableCapabilities: [
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
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
            "ConferenceAssignment",
            "TollFree",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling",
            "InboundA2PSms",
            "OutboundA2PSms"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Toll-Free, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: ["Azure", "OutboundCalling", "UserAssignment", "Geographic"],
          availableCapabilities: [
            "UserAssignment",
            "Geographic",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Camden, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: [
            "Azure",
            "OutboundCalling",
            "ThirdPartyAppAssignment",
            "Geographic"
          ],
          availableCapabilities: [
            "ConferenceAssignment",
            "Geographic",
            "FirstPartyAppAssignment",
            "ThirdPartyAppAssignment",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Grand Junction, United States",
          activationState: "Activated"
        },
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
            "Geographic",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Grand Junction, United States",
          activationState: "Activated"
        },
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
            "Geographic",
            "Azure",
            "Office365",
            "InboundCalling",
            "OutboundCalling"
          ],
          assignmentStatus: "Unassigned",
          placeName: "Grand Junction, United States",
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
      "WDzQRMM+hES5wAOuIlsLPA.0",
      "X-Processing-Time",
      "626ms",
      "X-Azure-Ref",
      "006OZXwAAAAALNs1mETw2SZZ/a9r1ByPsWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:07 GMT"
    ]
  );
