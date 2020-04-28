const fs = require("fs");
const path = require("path");
const getFiles = require("recursive-readdir");
const { IndexGenerator } = require("./generateIndex");
const commonEntries = require("./support/step_definitions/common/common.json");

const generator = new IndexGenerator();
// use the shire root. This should be updated if the e2e tests are extracted
const rootDir = path.dirname(path.dirname(path.dirname(__dirname)));

getFiles(`${__dirname}/e2e/features`, function(err, files) {
  // `files` is an array of file paths
  generator.addCommonEntries(commonEntries);
  files.forEach((filePath) => {
    const source = fs.readFileSync(filePath).toString();
    generator.parseFeature(source);
    generator.parseFileIndex(source, filePath, rootDir);
  });
  const outputJson = {
    definitions: generator.definitions,
    fileIndex: generator.fileIndex,
  };
  fs.writeFileSync(
    `${__dirname}/feature-autocomplete.json`,
    JSON.stringify(outputJson, undefined, 2)
  );
  console.log("success");
});
