let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-30T22:41:07.271Z","tmr":"2019-04-30T22:41:07.272Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"sco","spr":"https%2Chttp","st":"2019-04-30T22%3A36%3A07Z","se":"2019-05-01T22%3A41%3A07Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"GoGj%2FCoYLBL8siIHX2xVXjuRgSVznCNrhEZE3hImd3M%3D","restype":"account","comp":"properties"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59d8d4e3-f01e-008a-0da5-ff277b000000',
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
  'Tue, 30 Apr 2019 22:41:07 GMT',
  'Connection',
  'close' ]);

