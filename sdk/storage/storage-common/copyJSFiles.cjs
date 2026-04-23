fs=require('fs')
fs.cpSync('./src/crc64.js', './dist/commonjs/crc64.js');
fs.cpSync('./src/crc64_glue.js', './dist/commonjs/crc64_glue.js');
fs.cpSync('./src/crc64.js', './dist/browser/crc64.js');
fs.cpSync('./src/crc64_glue.js', './dist/browser/crc64_glue.js');
fs.cpSync('./src/crc64.js', './dist/esm/crc64.js');
fs.cpSync('./src/crc64_glue.js', './dist/esm/crc64_glue.js');
fs.cpSync('./src/crc64.js', './dist/react-native/crc64.js');
fs.cpSync('./src/crc64_glue.js', './dist/react-native/crc64_glue.js');
