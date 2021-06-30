"use strict";
const fs = require("fs");

// The "endpoint" shown in the portal and CLI for an Azure Event Grid includes the "/api/events"
// path parameter. We need to ensure that we don't add another "/api/events" suffix, but there
// is not a way to express this in swagger. So, we post process the generated client to ensure
// that the operation spec we build has the empty string for the path to append.
console.log("Updating ./scr/generate/generateClient.ts path entries");
let data = fs.readFileSync("./src/generated/generatedClient.ts", "utf8");
data = data.replace(new RegExp('path: "/api/events"', "g"), 'path: ""');
fs.writeFileSync("./src/generated/generatedClient.ts", data, "utf8");
console.log("Done Updating ./scr/generate/generateClient.ts path entries");
