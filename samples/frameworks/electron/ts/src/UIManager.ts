/**
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  Class that handles UI updates for the app.
 */
export class UIManager {
  // Select DOM elements to work with
  private signInButton: HTMLElement;
  private signOutButton: HTMLElement;
  private cardDiv: HTMLElement;
  private messageDiv: HTMLElement;

  constructor() {
    this.signInButton = document.getElementById("sign-in");
    this.signOutButton = document.getElementById("sign-out");
    this.cardDiv = document.getElementById("card-div");
    this.messageDiv = document.getElementById("message-div");
  }

  public showLoggedIn() {
    this.cardDiv.style.display = "initial";
    this.signInButton.style.display = "none";
    this.signOutButton.style.display = "initial";
  }

  public showLoggedOut() {
    this.cardDiv.style.display = "none";
    this.signInButton.style.display = "initial";
    this.signOutButton.style.display = "none";
  }

  public showBlobContents(contents: string) {
    this.showMessage(`Blob service: ${contents}`);
  }

  public showServicebusMessage(contents: string) {
    this.showMessage(`ServiceBus service: ${contents}`);
  }

  private showMessage(contents: string) {
    this.messageDiv.style.display = "initial";
    this.messageDiv.innerHTML = contents;
  }
}
