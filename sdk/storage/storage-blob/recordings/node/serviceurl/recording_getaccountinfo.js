let nock = require('nock');

module.exports.testInfo = {}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"restype":"account","comp":"properties"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50ad28f2-f01e-0046-269f-ff43ce000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-sku-name',
  'Standard_LRS',
  'x-ms-account-kind',
  'StorageV2',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-sku-name,x-ms-account-kind,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 21:57:52 GMT',
  'Connection',
  'close' ]);

