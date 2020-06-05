import chalk from 'chalk'

// export const chalkError = chalk.red
// export const chalkSuccess = chalk.green
// export const chalkWarning = chalk.yellow
// export const chalkProcessing = chalk.blue

export const log = {
  error: str => console.log(chalk.red(str)),
  success: str => console.log(chalk.green(str)),
  warning: str => console.log(chalk.yellow(str)),
  processing: str => console.log(chalk.blue(str)),
}
