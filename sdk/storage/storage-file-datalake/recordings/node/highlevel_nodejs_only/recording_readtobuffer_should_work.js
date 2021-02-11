let nock = require('nock');

module.exports.hash = "708814308fd7762b8181156cc53af1e7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240368901020","file":"file158368240371509721"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240368901020')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6CD8867"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3079-601e-0014-7160-f586fa000000',
  'x-ms-client-request-id',
  '26578a81-e66c-44f6-9b4b-2821d54e17a3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
