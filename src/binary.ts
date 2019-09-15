import 'source-map-support/register'

import * as yargs from 'yargs'
import { main } from './ExtractGQL'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkgJson = require('../package.json')

const usage = `
  Usage: persistgraphql input_file [output_file]`

const { argv } = yargs
  .usage(usage)
  .help('help')
  .alias('help', 'h')
  .version('version', pkgJson.version)
  .alias('version', 'V')
  .example('persistgraphql src output.json', 'Use like this')
  .options({
    add_typename: {
      description: 'Using the add-typename query transformer.',
      requiresArg: false,
      required: false,
    },
    js: {
      description: "Parse gql inside code (default extension is `js`. -e 'ts' to parse ts file)",
      requiresArg: false,
      required: false,
    },
    extension: {
      alias: 'e',
      description: 'The extension of input filename',
      requiresArg: true,
      required: true,
    },
    // "gql.pq": "persistgraphql src src/__generated__/persistgraphql.json",
    // "gql.pq.ts": "persistgraphql src src/__generated__/persistgraphql.json --js --extension=ts --add_typename",
  })
  .default('extension', 'js')

preCheck()

main(argv)

function preCheck(): void {
  const args = argv._
  if (args.length < 1) {
    yargs.showHelp()
    process.exit(1)
  }
}
