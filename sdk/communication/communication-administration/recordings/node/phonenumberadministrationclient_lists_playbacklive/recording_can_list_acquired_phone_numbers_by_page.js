let nock = require("nock");

module.exports.hash = "db631fcf6b1e070c0eae578414049854";

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
        }
      ],
      nextLink:
        "https://23.100.38.234/administration/phonenumbers/phonenumbers?locale=en-US&skip=5&take=5&api-version=2020-07-20-preview1"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "PviIRWgjAUW9pebXnQ/4JQ.0",
      "X-Processing-Time",
      "643ms",
      "X-Azure-Ref",
      "01KOZXwAAAADGXOkv0pkZSYIFiv8B4WeQWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:08 GMT"
    ]
  );

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
        }
      ],
      nextLink:
        "https://23.100.38.234/administration/phonenumbers/phonenumbers?locale=en-US&skip=10&take=5&api-version=2020-07-20-preview1"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "RTZ9PDA0uUefrxqFJ+IOtQ.0",
      "X-Processing-Time",
      "411ms",
      "X-Azure-Ref",
      "01aOZXwAAAAAGVhljfuhhQqt/J2rjhEeAWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:08 GMT"
    ]
  );

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
      nextLink:
        "https://23.100.38.234/administration/phonenumbers/phonenumbers?locale=en-US&skip=15&take=5&api-version=2020-07-20-preview1"
    },
    [
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json; charset=utf-8",
      "MS-CV",
      "9vV3amUDekqBFaMp/ol6yA.0",
      "X-Processing-Time",
      "309ms",
      "X-Azure-Ref",
      "01aOZXwAAAADVVHAdx9vLTKv7KEnpdslZWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
      "Date",
      "Wed, 28 Oct 2020 17:01:09 GMT"
    ]
  );

nock("https://endpoint", { encodedQueryParams: true })
  .get("/administration/phonenumbers/phonenumbers")
  .query(true)
  .reply(200, { phoneNumbers: [], nextLink: null }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "S8W7iqd/C02laPzOXi+8RA.0",
    "X-Processing-Time",
    "305ms",
    "X-Azure-Ref",
    "01aOZXwAAAAAY7ALEvS7DTbe2chPW0LNcWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=",
    "Date",
    "Wed, 28 Oct 2020 17:01:09 GMT"
  ]);
