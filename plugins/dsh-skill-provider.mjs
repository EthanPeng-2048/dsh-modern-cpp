/**
 * dsh-modern-cpp skill provider — registers the modern-cpp skill into the
 * running DSH skill registry via ctx.skills.register().
 *
 * Reads skills from ../skills/ relative to this plugin file.
 * Zero-dependency pure ESM (node builtins only).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'dsh-modern-cpp-skill'
/** The skill registry service (provided by @deepseek-ai/dsh-skill). */
export const inject = ['skills']

const DEFAULT_SKILLS_DIR = fileURLToPath(new URL('../skills', import.meta.url))

const SKILL_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Parse the YAML-ish frontmatter block (--- delimited) of a skill file.
 * @param {string} text - raw skill file content.
 * @returns {{ frontmatter: Record<string, string>, body: string }}
 */
function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if (!match) return { frontmatter: {}, body: text.trimStart() }
  const frontmatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line)
    if (kv) frontmatter[kv[1]] = kv[2].trim()
  }
  return { frontmatter, body: match[2].trimStart() }
}

export function apply(ctx, config = {}) {
  const enabled = config.enabled ?? true
  if (!enabled) return

  const skillsDir = config.skillsDir ?? DEFAULT_SKILLS_DIR

  let files
  try {
    files = readdirSync(skillsDir)
      .filter((f) => f.endsWith('.md'))
      .sort()
  } catch (error) {
    ctx.logger?.warn?.(`dsh-modern-cpp-skill: cannot read skills dir ${skillsDir}: ${String(error)}`)
    return
  }

  let registered = 0
  for (const file of files) {
    const fullPath = join(skillsDir, file)
    let raw
    try {
      raw = readFileSync(fullPath, 'utf8')
    } catch (error) {
      ctx.logger?.warn?.(`dsh-modern-cpp-skill: skip ${file} — read failed: ${String(error)}`)
      continue
    }
    const { frontmatter, body } = parseFrontmatter(raw)
    const skillName = frontmatter.name
    if (!skillName || !SKILL_NAME_RE.test(skillName)) {
      ctx.logger?.warn?.(`dsh-modern-cpp-skill: skip ${file} — invalid kebab-case name in frontmatter`)
      continue
    }
    const description = frontmatter.description
    if (!description) {
      ctx.logger?.warn?.(`dsh-modern-cpp-skill: skip ${file} — missing description in frontmatter`)
      continue
    }
    const registration = {
      name: skillName,
      description,
      ...(frontmatter.whenToUse ? { whenToUse: frontmatter.whenToUse } : {}),
      content: body,
      source: 'bundled',
      path: fullPath,
    }
    ctx.effect(() => ctx.skills.register(registration))
    registered += 1
    ctx.logger?.info?.(`dsh-modern-cpp-skill: registered ${skillName} (${file})`)
  }
  ctx.logger?.info?.(`dsh-modern-cpp-skill: loaded (${registered}/${files.length} skills registered)`)
}
