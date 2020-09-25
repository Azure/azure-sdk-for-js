let nock = require('nock');

module.exports.hash = "2b638efb699efc1d59733400a0ea0bfc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9c1a7bb7b4f1e3e7b72fa74efe0f8f7fd88da2fb30535ff6871bd9dfd605de7db0edaf62e7d7d5ed58b0ca8355559d3dffa75439f7cb52cda7c96be6e33427794067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf3dd63029a2fa7f5f5aa2daae5ef955f7ff468b92ecb5f32da388093fbcf9e9d7c7ad300f6e8eb9fb3017cff97fc3f21bc62aae1010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6bddc81f-5581-4708-9448-0750db8a18c2',
  'elapsed-time',
  '27',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:18:49 GMT',
  'Content-Length',
  '357' ]);
