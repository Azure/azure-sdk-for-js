let nock = require("nock");

module.exports.hash = "b215bcd90bdd084f766ac66a6f993a7b";

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
      "j8jYd11a7E6z2biRbegLMQ.0",
      "X-Processing-Time",
      "837ms",
      "X-Azure-Ref",
      "0j3Z2XwAAAAD3j+f8e528QJINRwEotCflWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Fri, 02 Oct 2020 00:38:39 GMT"
    ]
  );
