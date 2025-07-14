let secretDisplay: HTMLSpanElement = document.getElementById("secret-display") as HTMLSpanElement;

let subscriptionKey: HTMLInputElement = document.getElementById(
  "subscription-key",
) as HTMLInputElement;

let azureApiName: HTMLInputElement = document.getElementById("api-name") as HTMLInputElement;

const getSecretFromServer = () => {
  secretDisplay.textContent = "";
  fetch("http://localhost:4000/api/secret")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((text) => {
      secretDisplay.textContent = text;
    })
    .catch((err) => {
      console.log("error fetching secret from the server", err);
    });
};

const getSecretFromApiManagement = () => {
  secretDisplay.textContent = "";
  const key = subscriptionKey.value;
  if (!key) {
    alert("Azure API Management subscription key missing.");
  } else {
    fetch(`https://${azureApiName.value}.azure-api.net/get-secret`, {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        secretDisplay.textContent = text;
      })
      .catch((err) => console.log("error fetching secret from Azure API Management", err));
  }
};

document.querySelector("#fetch-from-azure")?.addEventListener("click", getSecretFromApiManagement);
document.querySelector("#fetch-from-server")?.addEventListener("click", getSecretFromServer);
