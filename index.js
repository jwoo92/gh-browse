#!/usr/bin/env node

const chalk = require("chalk");
const opn = require("opn");
const pjson = require("./package.json");

// ==================================================
// SETUP
// ==================================================

const args = process.argv;
const searchVal = process.argv
  .slice(2)
  .filter(k => k.slice(0, 1) !== "-")
  .join(" ");
const searchTerm = searchVal.replace(" ", "-");
const searchTermStr = encodeURIComponent(searchTerm);
const url = `https://github.com/search?q=${searchTermStr}`;
const searchTermGreen = chalk.green("<search-term>");
const nameBold = chalk.blue.bold("gh-browse");

const help = `
Usage: gh-browse ${searchTermGreen} [options]

Options:

--info                                   print search info
-h, --help                               output usage informat
-v, --version                            output the version number
Only ${searchTermGreen} is required.
`;

const specifySearchTerm = `
Please specify the search term:
  ${nameBold} ${searchTermGreen}

For example:
  ${nameBold} ${chalk.green("gh-browse")}

Run ${chalk.blue.bold("gh-browse --help")} ${chalk.reset(
  "to see all options."
)}`;

const info = `
search term:   ${chalk.blue.bold(searchVal)}
${chalk.reset("search URL")}:    ${chalk.blue.bold(url)}`;

// ==================================================
// HANDLERS
// ==================================================

const handleCheckVersion = () => {
  console.log(pjson.version);
};

const handleDisplayHelp = () => {
  console.log(help);
};

const handleSearchTermNotFound = () => {
  console.log(specifySearchTerm);
};

const handleDisplayInfo = () => {
  console.log(info);
};

// ==================================================
// HELPERS
// ==================================================

const filterArgs = filter =>
  args.filter(k => k.indexOf(filter) !== -1).length > 0;

// ==================================================
// INIT
// ==================================================

const ghSearch = () => {
  if (filterArgs("-h")) {
    return handleDisplayHelp();
  }

  if (filterArgs("-v")) {
    return handleCheckVersion();
  }

  if (!searchTerm.length) {
    return handleSearchTermNotFound();
  }

  if (filterArgs("--info")) {
    handleDisplayInfo();
  }

  opn(url);
};

ghSearch();
