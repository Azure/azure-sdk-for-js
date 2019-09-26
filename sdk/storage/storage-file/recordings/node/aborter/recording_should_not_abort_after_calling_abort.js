let nock = require('nock');

module.exports.testInfo = {"share":"share156775313954106458"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775313954106458')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:00 GMT',
  'ETag',
  '"0x8D73297B1E28E83"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c7a2d6d-701a-007d-6080-6486a0000000',
  'x-ms-client-request-id',
  '9a67463d-fa3b-4810-a9b9-852268f8613a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:58:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775313954106458')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd2c1781c-401a-0082-7880-64b63d000000',
  'x-ms-client-request-id',
  '16017420-9023-49df-b6c1-b89a74347052',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:58:59 GMT',
  'Connection',
  'close' ]);

