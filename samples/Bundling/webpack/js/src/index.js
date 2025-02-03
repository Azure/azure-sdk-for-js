import { BlobServiceClient } from "@azure/storage-blob";

function getServiceSasUrl() {
  return document.getElementById("serviceSasUrl").value;
}

function showContainerList(containers) {
  const outputEl = document.getElementById("output");
  // empty previous output
  outputEl.textContent = "";
  for (const container of containers) {
    const containerDiv = document.createElement("div");
    containerDiv.textContent = container.name;
    outputEl.appendChild(containerDiv);
  }
}

async function listContainers() {
  const blobServiceClient = new BlobServiceClient(getServiceSasUrl());
  let iter = await blobServiceClient.listContainers();
  const containers = [];
  for await (const container of iter) {
    containers.push(container);
  }
  showContainerList(containers);
}

window.addEventListener("DOMContentLoaded", () => {
  const listContainersButton = document.getElementById("listContainers");
  listContainersButton.addEventListener("click", () => listContainers());
});
