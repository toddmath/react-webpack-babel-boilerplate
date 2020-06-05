import fs from 'fs'
import path from 'path'
import glob from 'glob'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

export const readFile = file =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (file, contents) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, contents, 'utf8', err => (err ? reject(err) : resolve()))
  })

export const renameFile = (source, target) =>
  new Promise((resolve, reject) => {
    fs.rename(source, target, err => (err ? reject(err) : resolve()))
  })

export const copyFile = (source, target) =>
  new Promise((resolve, reject) => {
    let cbCalled = false
    // const done = err => !cbCalled ? (cbCalled = true, err) ? reject(err) :
    // resolve()
    const done = err => {
      if (!cbCalled) {
        cbCalled = true
        err ? reject(err) : resolve()
      }
    }

    const streams = [fs.createReadStream(source), fs.createWriteStream(target)]
    streams.forEach(fn => fn.on('error', err => done(err)))
    const [rd, wr] = streams
    // const rd = fs.createReadStream(source)
    // rd.on('error', err => done(err))
    // const wr = fs.createWriteStream(target)
    // wr.on('error', err => done(err))
    // wr.on('close', err => done(err))
    rd.pipe(wr)
  })

export const readDir = (pattern, options) =>
  new Promise((resolve, reject) =>
    glob(pattern, options, (err, result) => (err ? reject(err) : resolve(result)))
  )

export const makeDir = name =>
  new Promise((resolve, reject) => {
    mkdirp(name, err => (err ? reject(err) : resolve()))
  })

const handlePaths = (dir, ...paths) => [...paths].map(p => path.resolve(p, dir))

export const moveDir = async (source, target) => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    nosort: true,
    dot: true,
  })
  await Promise.all(
    dirs.map(async dir => {
      const [from, to] = handlePaths(dir, source, target)
      await makeDir(path.dirname(to))
      await renameFile(from, to)
    })
  )
}

export const copyDir = async (source, target) => {
  const dirs = await readDir('**/*.*', {
    cwd: source,
    nosort: true,
    dot: true,
  })
  await Promise.all(
    dirs.map(async dir => {
      const [from, to] = handlePaths(dir, source, target)
      await makeDir(path.dirname(to))
      await copyFile(from, to)
    })
  )
}

export const cleanDir = (pattern, options) =>
  new Promise((resolve, reject) =>
    rimraf(pattern, { glob: options }, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  )

export default {
  readFile,
  writeFile,
  renameFile,
  copyFile,
  readDir,
  makeDir,
  copyDir,
  moveDir,
  cleanDir,
}
