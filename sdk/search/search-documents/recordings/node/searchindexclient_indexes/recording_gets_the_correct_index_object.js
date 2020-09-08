let nock = require('nock');

module.exports.hash = "cc1acbf2239e92fcab93e3ae02e49bca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0ff61fde3f39d9fff4c1eeeee9bddff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f37d7cb6a79bdf8225b6144dfff25233ba8ec2a6faa45becc9be6797e9997341c6f884fab35902100dc4d80993f444170e308e56f6f80f2018f4f21feac0c709637d3ba58b545b5a47178638b4e9f20e50f4d71db38366de30d4e3ff9218caecd8ab2a15178233ba916ab327ff7069f10563d462679f1de38a9ca329f823e5b7859c87287be17dc643c32629f2ef2c97b92455afc2c51c5a7cbbc98cdf2e577f3e262ded25074a818dfd9b2bdb7471f491f8296e2e20f4f3f0ac6a79f6d1aa07ef2b33542fa285056fcf1e823faacf992599c3ed057d71717a4e6f29a3e4113035aff6cabb7f9b2e8fcfd8cc7af9f106deae0837c39adafb993df0ba3d36e8a45516635f4f123abe895da3ffe4531adaba63a6fc7c73f58d7f9f8350f7afce48bbdfbafdd7b44ad5d036e22bffc925ff2ff00bf5c4db635060000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8495CC46711E3"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '021f16ff-ae8a-447a-9008-d9badcd012eb',
  'elapsed-time',
  '35',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:10:07 GMT',
  'Content-Length',
  '662' ]);
