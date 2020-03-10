let nock = require('nock');

module.exports.hash = "ce5539c49e9003bd102c711f8caa783f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240443100932","file":"file158368240445602460"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240443100932')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'ETag',
  '"0x8D7C377E73E8AB2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3239-601e-0014-0a60-f586fa000000',
  'x-ms-client-request-id',
  '7c85c474-d310-4a17-963c-100616b9497d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:44 GMT'
]);
