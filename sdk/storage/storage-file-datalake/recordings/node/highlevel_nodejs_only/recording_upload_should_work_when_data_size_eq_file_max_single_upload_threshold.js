let nock = require('nock');

module.exports.hash = "cf4cd5b8dd69849f55961292ed3822e7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158376948467906601","file":"file158376948534208745"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158376948467906601')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Mar 2020 15:58:05 GMT',
  'ETag',
  '"0x8D7C442A77E3DEA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3be83531-001e-0087-032b-f610b1000000',
  'x-ms-client-request-id',
  '72ce277a-7149-473d-b7ad-04c77bfd2a4d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 15:58:05 GMT'
]);
