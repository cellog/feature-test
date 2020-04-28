function extractFeatures(line) {
  const feature = line.match(/^Feature:\s*(.+)$/);
  if (!feature) {
    return "";
  }
  return feature[1];
}

function extractScenarios(line) {
  const scenario = line.match(/^ {2}Scenario(?: Outline)?:\s*(.+)$/);
  if (!scenario) {
    return "";
  }
  return scenario[1];
}

function extractGivens(line) {
  const givens = line.match(/^ {4}(?:Given|And|But) (.+)$/);
  if (!givens) {
    return "";
  }
  return givens[1];
}

function extractWhens(line) {
  const whens = line.match(/^ {4}(?:When|And|But) (.+)$/);
  if (!whens) {
    return "";
  }
  return whens[1];
}

function extractThens(line) {
  const thens = line.match(/^ {4}(?:Then|And|But) (.+)$/);
  if (!thens) {
    return "";
  }
  return thens[1];
}

class IndexGenerator {
  constructor() {
    this.dupes = {};
    this.definitions = {
      Features: [],
      Givens: [],
      Whens: [],
      Thens: [],
      Scenarios: [],
    };
    // link step definitions/features to the files they reside in
    this.fileIndex = {};
  }

  parseFileIndex(feature, filePath, rootDir) {
    const relativePath = filePath.replace(rootDir + "/", "");
    const dupes = {};
    const filterLine = (line) => {
      const match = line.match(
        /^(?:Feature:| {2}Scenario(?: Outline):| {4}(?:Given|When|Then|And|But))\s*(.+)$/
      );
      if (!match) {
        return "";
      }
      return match[1];
    };
    const lines = feature
      .split("\n")
      .filter((line) => {
        if (dupes[line]) {
          return false;
        }
        dupes[line] = true;
        return true;
      })
      .filter(filterLine);

    lines.forEach((line) => {
      this.fileIndex[filterLine(line)] = this.fileIndex[filterLine(line)]
        ? this.fileIndex[filterLine(line)]
        : [];
      // record this file as containing this feature
      this.fileIndex[filterLine(line)].push(relativePath);
    });
  }

  addCommonEntries(entries) {
    entries.Givens.forEach((entry) => {
      // guaranteed to have no dupes here
      this.dupes[entry] = true;
      this.definitions.Givens.push(entry);
    });
    entries.Whens.forEach((entry) => {
      // guaranteed to have no dupes here
      this.dupes[entry] = true;
      this.definitions.Whens.push(entry);
    });
    entries.Thens.forEach((entry) => {
      // guaranteed to have no dupes here
      this.dupes[entry] = true;
      this.definitions.Thens.push(entry);
    });
  }

  parseFeature(feature) {
    const lines = feature.split("\n").filter((line) => {
      if (this.dupes[line]) {
        return false;
      }
      this.dupes[line] = true;
      return true;
    });

    this.definitions.Features.push(
      ...lines.filter(extractFeatures).map(extractFeatures)
    );
    this.definitions.Scenarios.push(
      ...lines.filter(extractScenarios).map(extractScenarios)
    );
    this.definitions.Givens.push(
      ...lines.filter(extractGivens).map(extractGivens)
    );
    this.definitions.Whens.push(
      ...lines.filter(extractWhens).map(extractWhens)
    );
    this.definitions.Thens.push(
      ...lines.filter(extractThens).map(extractThens)
    );
  }
}

module.exports = { IndexGenerator };
