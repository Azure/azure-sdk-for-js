let nock = require('nock');

module.exports.testInfo = {"container":"container157142411683400423"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157142411683400423')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 18 Oct 2019 18:41:57 GMT',
  'ETag',
  '"0x8D753FADA9874B1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f1bd159-801e-00c3-68e3-85e157000000',
  'x-ms-client-request-id',
  '444dae1c-d79e-4b26-892f-90cfffcbd6c4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 18 Oct 2019 18:41:56 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157142411683400423')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11f32087-801e-0055-61e3-85e886000000',
  'x-ms-client-request-id',
  '78da089d-c8c9-4565-a8ac-79cd8ddf47cc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 18 Oct 2019 18:41:56 GMT',
  'Connection',
  'close' ]);

