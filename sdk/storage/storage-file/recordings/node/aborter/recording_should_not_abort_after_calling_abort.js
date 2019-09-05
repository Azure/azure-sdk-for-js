let nock = require('nock');

module.exports.testInfo = {"share":"share156767533667307681"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767533667307681')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:17 GMT',
  'ETag',
  '"0x8D731E28BA9DF63"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b015fe93-701a-0110-05cb-63cce6000000',
  'x-ms-client-request-id',
  'd5aba190-f745-4013-8915-a7af0de34c38',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767533667307681')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2b3d3f0-101a-0019-40cb-637738000000',
  'x-ms-client-request-id',
  'b5a79fe2-af6e-487f-8bc5-85349f747faa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:17 GMT',
  'Connection',
  'close' ]);

