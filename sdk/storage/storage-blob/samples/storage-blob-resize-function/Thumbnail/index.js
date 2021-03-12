const Jimp = require('jimp');
const stream = require('stream');
const {
    BlockBlobClient
} = require("@azure/storage-blob");

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const containerName = process.env.BLOB_CONTAINER_NAME;
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobName = process.env.OUT_BLOB_NAME;

module.exports = async function (context, eventGridEvent, inputBlob){
    const widthInPixels = 100;
    Jimp.read(inputBlob).then((thumbnail) => {

        thumbnail.resize(widthInPixels, Jimp.AUTO);

        thumbnail.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {

            const readStream = stream.PassThrough();
            readStream.end(buffer);

            const blobClient = new BlockBlobClient(connectionString, containerName, blobName);
            
            try {
                await blobClient.uploadStream(readStream,
                    uploadOptions.bufferSize,
                    uploadOptions.maxBuffers,
                    { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
            } catch (err) {
                context.log(err.message);
            }
        });
    });
};