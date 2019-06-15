let nock = require('nock');

module.exports.testInfo = {"now":"2019-05-24T23:02:55.377Z","tmr":"2019-05-24T23:02:55.381Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"sco","spr":"https%2Chttp","st":"2019-05-24T22%3A57%3A55Z","se":"2019-05-25T23%3A02%3A55Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"AnST5HJE3cjppcEuT55v2g%2BCrK04JZOyDrrd0RkOeAo%3D","restype":"account","comp":"properties"})
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f6c3df23-201e-0022-2c84-12f36e000000',
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
  'Fri, 24 May 2019 23:02:54 GMT',
  'Connection',
  'close' ]);

