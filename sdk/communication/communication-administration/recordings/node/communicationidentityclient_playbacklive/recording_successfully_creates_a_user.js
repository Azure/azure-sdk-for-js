let nock = require('nock');

module.exports.hash = "c114910037975ecd99c548006650f0e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities')
  .query(true)
  .reply(201, { identity: { id: "sanitized" } }, [
    "Transfer-Encoding",
    "chunked",
    "Content-Type",
    "application/json; charset=utf-8",
    "MS-CV",
    "sFLnVHTDiE69hSEswDBOXw.0",
    "Strict-Transport-Security",
    "max-age=2592000",
    "x-ms-client-request-id",
    "sanitized",
    "api-supported-versions",
    "2020-07-20-preview2, 2021-03-07",
    "X-Processing-Time",
    "18ms",
    "X-Azure-Ref",
    "0WuEJYAAAAACPXeTpLbHUSZ01mpNXCP+GV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx",
    "Date",
    "Thu, 21 Jan 2021 20:17:30 GMT"
  ]);
