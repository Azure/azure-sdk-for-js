let nock = require("nock");

module.exports.hash = "5f3b4220446ac81ca7796c4e29d977c5";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://endpoint", { encodedQueryParams: true })
  .delete("/identities/sanitized")
  .query(true)
  .reply(204, "", [
    "MS-CV",
    "HHCDHFV8yEySqM6/Ua+73w.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "178ms",
    "X-Azure-Ref",
    "0W+EJYAAAAAB89UA1+UkvQoORF0b/3woTV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:17:32 GMT"
  ]);
