let nock = require('nock');

module.exports.hash = "3edf16f4226b0b4c1d2e0c8389c50cc9";

module.exports.testInfo = {"uniqueName":{"container":"container159860513521807002"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159860513521807002')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 28 Aug 2020 08:58:56 GMT',
  'ETag',
  '"0x8D84B3098A0E0EC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f066ba6f-f01e-004f-7019-7d3cf4000000',
  'x-ms-client-request-id',
  '522f2e25-b26a-45f8-b221-6748a53cd78a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 28 Aug 2020 08:58:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159860513521807002')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f066ba91-f01e-004f-0b19-7d3cf4000000',
  'x-ms-client-request-id',
  'b496f61e-f775-4703-93a9-4cb81cbd3a27',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 28 Aug 2020 08:58:56 GMT'
]);
