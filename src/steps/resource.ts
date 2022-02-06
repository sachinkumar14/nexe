import { each } from '../util'
import * as globs from 'globby'
import { resolve } from 'path'
import { NexeCompiler } from '../compiler'

export default async function resource(compiler: NexeCompiler, next: () => Promise<any>) {
  const { cwd, resources } = compiler.options
  if (!resources.length) {
    return next()
  }
  const step = compiler.log.step('Bundling Resources...')
  let count = 0
  const testCommitChangeM = "Added 1 line in steps.ts"
  // workaround for https://github.com/sindresorhus/globby/issues/127
  // and https://github.com/mrmlnc/fast-glob#pattern-syntax
  const resourcesWithForwardSlashes = resources.map((r) => r.replace(/\\/g, '/'))

  await each(globs(resourcesWithForwardSlashes, { cwd, onlyFiles: true }), async (file) => {
    count++
    step.log(`Including file: ${file}`)
    await compiler.addResource(resolve(cwd, file))
  })
  step.log(`Included ${count} file(s)`)
  return next()
}
