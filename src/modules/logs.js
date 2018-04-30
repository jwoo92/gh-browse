import chalk from 'chalk'

const searchTermGreen = chalk.green('<search-term>')
const nameBold = chalk.blue.bold('gh-browse')

export const help = `
${chalk.blue.bold('Usage:')}

  gh-browse ${searchTermGreen} [options]

${chalk.blue.bold('Options:')}

  -h, --help                               output usage information
  -v, --version                            output the version number
  --info                                   print search information
  --type                                   change search type ${chalk.dim(
    '(code, commits, issues, topics, wikis, users)',
  )}

  only ${searchTermGreen} is required.

${chalk.blue.bold('Examples:')}

  gh-browse ${searchTermGreen} --type=users     your search type will be set to 'users'
`

export const specifySearchTerm = `
Please specify the search term:
  ${nameBold} ${searchTermGreen}

For example:
  ${nameBold} ${chalk.green('gh-browse')}

Run ${chalk.blue.bold('gh-browse --help')} ${chalk.reset('to see all options.')}`

export const info = (searchVal, url) => `
search term:   ${chalk.green.bold(searchVal)}
${chalk.reset('search URL')}:    ${chalk.blue.bold(url)}`
