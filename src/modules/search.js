import opn from 'opn'
import pjson from '../../package.json'
import { help, specifySearchTerm, info } from './logs'

// ==================================================
// SETUP
// ==================================================

const state = {
  args: process.argv.slice(2),
  searchVal: null,
  searchTerm: null,
  searchTermStr: null,
  url: null,
  executions: [],
  flags: [],
  display: {
    help: {
      term: '-h',
      executionOrder: 1,
      return: true,
      handler: () => handleDisplayHelp(),
    },
    version: {
      term: '-v',
      executionOrder: 2,
      return: true,
      handler: () => handleCheckVersion(),
    },
    info: {
      term: '--info',
      executionOrder: 3,
      return: false,
      handler: () => handleDisplayInfo(),
    },
  },
  types: ['code', 'commits', 'issues', 'topics', 'wikis', 'users'],
}

// ==================================================
// HANDLERS
// ==================================================

const handleCheckVersion = () => {
  console.log(pjson.version) // eslint-disable-line
}

const handleDisplayHelp = () => {
  console.log(help) // eslint-disable-line
}

const handleSearchTermNotFound = () => {
  if (!state.searchTerm.length || !state.args.length) {
    console.log(specifySearchTerm) // eslint-disable-line
  }
}

const handleDisplayInfo = () =>
  !state.searchVal.length ? false : console.log(info(state.searchVal, state.url)) // eslint-disable-line

const handleCommandExecutions = () => {
  const { executions } = state

  executions.forEach((k) => k.handler())
  return executions.length ? executions.slice(-1)[0].return : false
}

// ==================================================
// HELPERS
// ==================================================

const cleanSearchVal = () =>
  state.args
    .filter((k) => {
      if (k.indexOf('--') !== -1) {
        state.flags.push(k)
      }

      return k.slice(0, 1) !== '-'
    })
    .join(' ')
    .replace(/[^a-zA-Z\s]/g, '')
    .trim()

// ==================================================
// INITIALIZERS
// ==================================================

const setSearchProps = () => {
  const searchVal = cleanSearchVal()

  state.searchVal = searchVal
  state.searchTerm = searchVal.replace('-', '')
  state.searchTermStr = encodeURIComponent(state.searchTerm)
  state.url = `https://github.com/search?q=${state.searchTermStr}`
}

const setFlags = () => {
  let returned = false

  state.flags.forEach((k) => {
    Object.keys(state.display).forEach((j) => {
      if (returned) return
      const flag = state.display[j]

      if (k.indexOf(flag.term) !== -1) {
        state.executions.push(flag)
        returned = flag.return
      }
    })
  })
}

const setFilterTypes = () => {
  const type =
    state.flags.map(
      (k) =>
        k.indexOf('type=') === -1
          ? false
          : state.types.filter(
              (j) => j.indexOf(k.match(/type=[^\s]+/g)[0].split('=')[1]) !== -1,
            )[0],
    )[0] || null

  return type ? (state.url += `&type=${type}`) : false
}

// ==================================================
// INIT
// ==================================================

const ghSearch = () => {
  setSearchProps()
  setFlags()
  setFilterTypes()

  const isReturned = handleCommandExecutions()

  if (!isReturned && !state.searchVal.length) {
    handleSearchTermNotFound()
  }

  if (isReturned || !state.searchVal.length) {
    return null
  }

  opn(state.url)
  process.exit()
}

export default ghSearch
