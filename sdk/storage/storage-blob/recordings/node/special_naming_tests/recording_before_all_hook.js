let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156711955086607213"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156711955086607213')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:59:11 GMT',
  'ETag',
  '"0x8D72CD48158D76E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35a7962b-d01e-0027-78bd-5ee0d8000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 22:59:10 GMT',
  'Connection',
  'close' ]);

