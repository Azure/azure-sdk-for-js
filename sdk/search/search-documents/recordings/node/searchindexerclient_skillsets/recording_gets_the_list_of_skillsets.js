let nock = require('nock');

module.exports.hash = "2e6a34916f081d81a9c04a248096cd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6f968f4d16556aef38f1e7dcf02a6461704f5f7fd68e7ddc1d3837b4f9f9e9e3ed97dfa60ef60e7f7fd88da2fb30535ff6871bd9dfd605de793b29a6c1b78dbbbd4609637d3ba58b545b5a476aff5abd4ff78f491bce177db5eaf00f7c7bf28a675d554e7ed585e1dbfa1518e4f976dd15ebfcaa7d5c5b2000cfe9200293a3fdeeb79b92ecbd1478e4a778930eb45be6ca9e1346bf38baa2e7260f0d1cbbc6ee88dd1473fb1ceb81bfaf5cbfa225b163fc818d6e8a3af5e3da77f4f1759813e9f570440be784a90de1484c2f7d1fd79b62edbe7d9f2629d5de427d50c98e568b62896c562bd7859e7d3a2c19b8a5eb19c96eb59fe86c65ee64dc3a364acccd7ab354d12a8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba631f8adcd08cff685f9b85a95f9471e2e9547f85ef3f04befad5267a4f786fbe297306aca3f97f9ebbcbe2ca68ed46f97d55599cf2ef2d76d55d39bf269be9cd6d7cc50bf577e2d1fa25765d998a4ec1def7ffaf4decd92b2470d027efd91a4fc485200eae78da4dc3b79787cf2f06649b9470d027efd91a4fc485200eae78da4ec1fef3c397870b3a4ec5383805f7f24293f921480fa792329f73f7dfaecf416ded77d6a10f0eb8f24e547920250b79614c7da9da6ee8b9f7d9ebff7e0f4c9e9c3077b0f1e3eb991e7e9eb80ef7ec4f13fe27880ba35c787eabfd33cfcf21be3fcefff92ff07464d0357f0120000"], [ 'Cache-Control',
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
  '92193dd8-d4bd-46d1-9ae6-9d6969362492',
  'elapsed-time',
  '117',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:41 GMT',
  'Content-Length',
  '734' ]);
