import sinon from "sinon";
import { expect } from "@azure-tools/test-utils";
import child_process from "child_process";
import fs, { PathLike } from "fs";
import {
  getLanguageAndConfigInfoFromConfigurationFile,
  getLanguageAndConfigInfoFromDirectory,
  executeCommand,
  getFileReferenceForImport,
} from "../src/utils";
import { Languages } from "../src/constants";

describe("Utility functions", () => {
  let consoleErrorStub: any;
  let consoleLogStub: any;

  beforeEach(() => {
    sinon.restore();
    consoleErrorStub = sinon.stub(console, "error").callsFake(() => {});
    consoleLogStub = sinon.stub(console, "log").callsFake(() => {});
  });

  afterEach(() => {
    consoleErrorStub.restore();
    consoleLogStub.restore();
  });

  describe("executeCommand", () => {
    it("should return output of command", async () => {
      const command = "echo Hello World";
      sinon.stub(child_process, "exec").callsFake((_: string, callback: any): any => {
        callback(null, "Hello World", "");
      });

      const response = await executeCommand(command);
      expect(response).to.equal("Hello World");
    });

    it("should throw error if command fails", async () => {
      const command = "echo Hello World";
      sinon.stub(child_process, "exec").callsFake((_: string, callback: any): any => {
        callback(new Error("Command failed"), "", "");
      });

      await expect(executeCommand(command)).to.be.rejectedWith(Error);
    });
  });

  describe("getLanguageAndConfigInfoFromDirectory", () => {
    it("should fetch language and playwright config file from directory - typescript", () => {
      sinon.stub(fs, "existsSync").callsFake((fileName: PathLike) => {
        return fileName === "playwright.config.ts";
      });

      const response = getLanguageAndConfigInfoFromDirectory();
      expect(response.playwrightConfigFile).to.equal("playwright.config.ts");
      expect(response.projectLanguage).to.equal(Languages.TypeScript);
    });

    it("should fetch language and playwright config file from directory - javascript", () => {
      sinon.stub(fs, "existsSync").callsFake((fileName: PathLike) => {
        return fileName === "playwright.config.js";
      });

      const response = getLanguageAndConfigInfoFromDirectory();
      expect(response.playwrightConfigFile).to.equal("playwright.config.js");
      expect(response.projectLanguage).to.equal(Languages.JavaScript);
    });

    it("should throw error if no configuration file found in directory", () => {
      sinon.stub(fs, "existsSync").returns(false);
      expect(() => getLanguageAndConfigInfoFromDirectory()).to.throw();
    });
  });

  describe("getLanguageAndConfigInfoFromConfigurationFile", () => {
    it("should fetch language and playwright config file from configuration file passed by user - typescript", () => {
      const response = getLanguageAndConfigInfoFromConfigurationFile("playwright.config.ts");
      expect(response.playwrightConfigFile).to.equal("playwright.config.ts");
      expect(response.projectLanguage).to.equal(Languages.TypeScript);
    });

    it("should fetch language and playwright config file from configuration file passed by user - javascript", () => {
      const response = getLanguageAndConfigInfoFromConfigurationFile("playwright.config.js");
      expect(response.playwrightConfigFile).to.equal("playwright.config.js");
      expect(response.projectLanguage).to.equal(Languages.JavaScript);
    });

    it("should throw error if extension of configuration file passed by user is not supported", () => {
      expect(() =>
        getLanguageAndConfigInfoFromConfigurationFile("playwright.config.json"),
      ).to.throw();
    });

    it("should throw error if configuration file passed by user is empty", () => {
      expect(() => getLanguageAndConfigInfoFromConfigurationFile("")).to.throw();
    });
  });

  describe("getFileReferenceForImport", () => {
    it("should parse configuration file inputs and return node friendly file path reference", () => {
      expect(getFileReferenceForImport("playwright.config.ts")).to.equal("./playwright.config");
      expect(getFileReferenceForImport("./playwright.config.ts")).to.equal("./playwright.config");
      expect(getFileReferenceForImport("../playwright.config.ts")).to.equal("../playwright.config");
      expect(getFileReferenceForImport("./configs/playwright.config.ts")).to.equal(
        "./configs/playwright.config",
      );
      expect(getFileReferenceForImport("/absolute/path/to/playwright.config.ts")).to.equal(
        "/absolute/path/to/playwright.config",
      );
      expect(getFileReferenceForImport("nested/dir/playwright.config.ts")).to.equal(
        "./nested/dir/playwright.config",
      );
      expect(getFileReferenceForImport("another/config/file.js")).to.equal("./another/config/file");
      expect(getFileReferenceForImport(".hiddenfile.ts")).to.equal("./.hiddenfile");
      expect(getFileReferenceForImport("/.hiddenfile.ts")).to.equal("/.hiddenfile");
      expect(getFileReferenceForImport("folder.with.dots/playwright.config.ts")).to.equal(
        "./folder.with.dots/playwright.config",
      );
      expect(getFileReferenceForImport("./../parent/playwright.config.ts")).to.equal(
        "../parent/playwright.config",
      );
      expect(getFileReferenceForImport("../../parent/playwright.config.ts")).to.equal(
        "../../parent/playwright.config",
      );
    });
  });
});
