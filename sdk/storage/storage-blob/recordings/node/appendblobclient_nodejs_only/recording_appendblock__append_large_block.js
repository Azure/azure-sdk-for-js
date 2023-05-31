let nock = require('nock');

module.exports.hash = "8b3a805bcc5fcfdc4c6cf030745bb876";

module.exports.testInfo = {"uniqueName":{"container":"container168325374579008539","blob":"blob168325374720703652"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container168325374579008539')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 May 2023 02:29:07 GMT',
  'ETag',
  '"0x8DB4D1080700EDA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18d40362-b01e-0011-21f9-7e5005000000',
  'x-ms-client-request-id',
  '2a0aeed1-5120-4b1d-aaa1-662ff35026df',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Fri, 05 May 2023 02:29:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container168325374579008539')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18d40591-b01e-0011-25f9-7e5005000000',
  'x-ms-client-request-id',
  'a7945692-5078-49f2-aee6-f89f6fcc6bd2',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Fri, 05 May 2023 02:29:06 GMT'
]);
