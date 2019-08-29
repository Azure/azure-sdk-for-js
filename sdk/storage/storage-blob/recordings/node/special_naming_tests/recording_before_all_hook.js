let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156585819285600712"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156585819285600712')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:32:34 GMT',
  'ETag',
  '"0x8D7215B1F59F018"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d1b6cd7-201e-00de-1943-536e3f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:32:34 GMT',
  'Connection',
  'close'
]);

