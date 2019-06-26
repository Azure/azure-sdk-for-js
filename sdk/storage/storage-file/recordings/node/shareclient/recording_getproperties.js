let nock = require('nock');

module.exports.testInfo = {"share":"share156150558718700400"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150558718700400')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:07 GMT',
  'ETag',
  '"0x8D6F9C57A3FF3BD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '400bd549-e01a-0085-76ae-2b2d44000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:33:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156150558718700400')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:33:07 GMT',
  'ETag',
  '"0x8D6F9C57A3FF3BD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa8d2821-601a-00b6-7cae-2b7469000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:33:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150558718700400')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9e117e0-801a-0016-68ae-2bbb0f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:33:07 GMT',
  'Connection',
  'close' ]);

