  
import "./polyfill.worker";
import { BlobClient } from "@azure/storage-blob";

const blob = new BlobClient(process.env.AZURE_BLOB_URI!);

blob
  .download()
  .then((resp) => resp.blobBody)
  .then((body) => body!.text())
  .then((text) => console.log(text))
  .catch((err) => console.error(err));
