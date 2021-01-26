import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.AZURE_API_NAME) {
  throw new Error("Missing AZURE_API_NAME in the local .env file");
}

let secretDisplay: HTMLSpanElement = document.getElementById("secret-display") as HTMLSpanElement;

let subscriptionKey: HTMLInputElement = document.getElementById(
  "subscription-key"
) as HTMLInputElement;

const getSecretFromServer = () => {
  secretDisplay.textContent = "";
  axios
    .get("http://localhost:4000/api/secret")
    .then(({ data }) => {
      secretDisplay.textContent = data.value;
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
    axios
      .get(`https://${process.env.AZURE_API_NAME}.azure-api.net/get-secret`, {
        headers: {
          "Ocp-Apim-Subscription-Key": key
        }
      })
      .then(({ data }) => {
        secretDisplay.textContent = data.value;
      })
      .catch((err) => console.log("error fetching secret from Azure API Management", err));
  }
};

document.querySelector("#fetch-from-azure")?.addEventListener("click", getSecretFromApiManagement);
document.querySelector("#fetch-from-server")?.addEventListener("click", getSecretFromServer);
