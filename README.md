# gh-browse

[![npm](https://img.shields.io/npm/v/gh-browse.svg)](https://www.npmjs.com/package/gh-browse)
[![npm](https://img.shields.io/npm/dt/gh-browse.svg)](https://www.npmjs.com/package/gh-browse)

A lazy man's way to open up a search query on GitHub using the CLI

## Installation and Usage

Prerequisites: [Node.js](https://nodejs.org/en/) (>=8.11.1), npm version 3+.

### Global Installation

#### yarn

```
yarn global add gh-browse
```

#### npm

```
npm i -g gh-browse
```

## Usage

```
gh-browse <search-term> [options]
```

## Options

```
-h, --help                               output usage information
-v, --version                            output the version number
--info                                   print search information
--type                                   change search type (code, commits, issues, topics, wikis, users)

only <search-term> is required.
```

## Examples

```
gh-browse <search-term> --type=users     your search type will be set to users
```
