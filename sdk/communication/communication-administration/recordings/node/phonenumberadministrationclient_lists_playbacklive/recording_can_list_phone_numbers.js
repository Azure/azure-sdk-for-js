let nock = require("nock");

module.exports.hash = "0dde52a1c1f5e4fdd7568981ca731f49";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: false })
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
          assignmentStatus: "Unknown",
          placeName: "Los Angeles, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: [
            "Azure",
            "InboundCalling",
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
          placeName: "Los Angeles, United States",
          activationState: "Activated"
        },
        {
          phoneNumber: "+18005551234",
          acquiredCapabilities: [
            "Azure",
            "InboundCalling",
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
          assignmentStatus: "Unknown",
          placeName: "Los Angeles, United States",
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
      "Jah4rWjrgUmQmikl1KvcEg.0",
      "X-Processing-Time",
      "536ms",
      "X-Azure-Ref",
      "0ZCl+XwAAAACpUG+EbdPfQothqnQjYRc3WVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 07 Oct 2020 20:47:32 GMT"
    ]
  );
