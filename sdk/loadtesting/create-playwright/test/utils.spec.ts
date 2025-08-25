// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import child_process from "node:child_process";
import fs, { PathLike } from "node:fs";
import {
  getLanguageAndConfigInfoFromConfigurationFile,
  getLanguageAndConfigInfoFromDirectory,
  executeCommand,
  getFileReferenceForImport,
} from "$internal/utils.js";
import { Languages } from "$internal/constants.js";

describe("Utility functions", () => {
  beforeEach(() => {
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("executeCommand", () => {
    it("should return output of command", async () => {
      const command = "echo Hello World";
      vi.spyOn(child_process, "exec").mockImplementation((_: string, callback: any): any => {
        callback(null, "Hello World", "");
      });

      const response = (await executeCommand(command)).trim();
      expect(response).to.equal("Hello World");
    });

    it("should throw error if command fails", async () => {
      const command = "echo Hello World";
      vi.spyOn(child_process, "exec").mockImplementation((_: string, callback: any): any => {
        callback(new Error("Command failed"), "", "");
      });

      expect(executeCommand(command)).rejects;
    });
  });

  describe("getLanguageAndConfigInfoFromDirectory", () => {
    it("should fetch language and playwright config file from directory - typescript", () => {
      vi.spyOn(fs, "existsSync").mockImplementation((fileName: PathLike) => {
        return fileName === "playwright.config.ts";
      });

      const response = getLanguageAndConfigInfoFromDirectory();
      expect(response.playwrightConfigFile).to.equal("playwright.config.ts");
      expect(response.projectLanguage).to.equal(Languages.TypeScript);
    });

    it("should fetch language and playwright config file from directory - javascript", () => {
      vi.spyOn(fs, "existsSync").mockImplementation((fileName: PathLike) => {
        return fileName === "playwright.config.js";
      });

      const response = getLanguageAndConfigInfoFromDirectory();
      expect(response.playwrightConfigFile).to.equal("playwright.config.js");
      expect(response.projectLanguage).to.equal(Languages.JavaScript);
    });

    it("should throw error if no configuration file found in directory", () => {
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
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
