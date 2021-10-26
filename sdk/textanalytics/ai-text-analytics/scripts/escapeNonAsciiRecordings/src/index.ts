
import * as fs from "fs";
import * as path from "path";
import { isBinaryFile } from "isbinaryfile";

function padWithLeadingZeros(text: string): string {
    return new Array(5 - text.length).join("0") + text;
}

function unicodeCharEscape(charCode: number): string {
    return `\\u${padWithLeadingZeros(charCode.toString(16))}`;
}

function unicodeEscape(text: string): string {
    return text.split("")
        .map(function (char) {
            var charCode = char.charCodeAt(0);
            return charCode > 127 ? unicodeCharEscape(charCode) : char;
        })
        .join("");
}

function updateRecording(recording: string): string {
  const parsedRecording: { recordings: { requestBody: string, response: string }[] } = JSON.parse(recording);
  parsedRecording.recordings.map((recording) => {
    recording.requestBody = unicodeEscape(recording.requestBody);
    recording.response = unicodeEscape(recording.response);
  })
  return JSON.stringify(parsedRecording, null, " ");
}

function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
  const currentDirPath = path.join(__dirname, dirPath);
  const files = fs.readdirSync(currentDirPath)

  files.forEach(function(file) {
    console.log(path.join(__dirname, dirPath, path.sep, file))
    if (fs.statSync(path.join(__dirname, dirPath, path.sep, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + path.sep + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(currentDirPath, path.sep, file))
    }
  })

  return arrayOfFiles
}

function getRecordingsList(): string[] {
    return getAllFiles("../../../recordings/browsers", []);
}

async function main() {
    for (const filePath of getRecordingsList()) {
        if (await isBinaryFile(filePath)) {
          const fileContent = fs.readFileSync(filePath);
          const contentString = typeof fileContent === "string" ? fileContent : fileContent.toString();
          const updatedRecording = updateRecording(contentString);
          fs.writeFileSync(filePath, updatedRecording);
        }
    }
}

main()