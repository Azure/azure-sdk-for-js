import axios from "axios";

class UIManager {
  private secretDisplay: HTMLSpanElement;
  private subscriptionKey: HTMLInputElement;

  constructor() {
    this.secretDisplay = document.getElementById("secret-display") as HTMLSpanElement;
    if (!this.secretDisplay) {
      throw new Error("Can't find a <p> element with id secret-display.");
    }

    this.subscriptionKey = document.getElementById("subscription-key") as HTMLInputElement;
    if (!this.subscriptionKey) {
      throw new Error("Missing subscription key input.");
    }

    document.querySelector("#fetch-from-azure")?.addEventListener("click", () => {
      this.getSecretFromApiManagement();
    });
    document.querySelector("#fetch-from-server")?.addEventListener("click", () => {
      this.getSecretFromServer();
    });
  }

  getSecretFromServer() {
    this.secretDisplay.textContent = "";
    axios
      .get("http://localhost:4000/api/keyvault")
      .then(({ data }) => {
        this.secretDisplay.textContent = data.value;
      })
      .catch((err) => {
        console.log("error fetching secret from the server", err);
      });
  }

  getSecretFromApiManagement() {
    this.secretDisplay.textContent = "";
    const key = this.subscriptionKey.value;
    if (!key) {
      alert("Azure API Management subscription key missing.");
    } else {
      axios
        .get("https://malege-apim.azure-api.net/get-secret", {
          headers: {
            "Ocp-Apim-Subscription-Key": key
          }
        })
        .then(({ data }) => {
          this.secretDisplay.textContent = data.value;
        })
        .catch((err) => console.log("error fetching secret from Azure API Management", err));
    }
  }
}

new UIManager();
