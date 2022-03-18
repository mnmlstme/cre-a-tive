import React from 'react'
import { Block } from './block.js'
import { Editor } from './editor.js'
import { Highlight } from './highlight.js'

import styles from './code.css'
import editorStyles from './editor.css'

export function CodeEditor(props) {
  const { block, doUpdate, doSave } = props
  const [type, attrs, code] = block
  const { index, mode, tag, lang } = attrs
  const minorMode = getMinorMode(lang)

  return (
    <Editor
      className={[styles[mode], editorStyles[mode]].join(' ')}
      modes={[minorMode]}
      onSave={doSave}
    >
      <CodeBlock
        tagName={tag}
        block={block}
        onChange={doUpdate && ((b) => doUpdate(index, b))}
      />
      <footer>
        <dl className={styles.specs}>
          <dt>Language</dt>
          <dd>{lang}</dd>
        </dl>
      </footer>
    </Editor>
  )
}

export function CodeBlock({ block, onChange }) {
  const [_, { lang }, code] = block
  return (
    <pre lang={lang} className={`language-${lang}`}>
      <Block
        className={styles.code}
        block={block}
        mode={languageMinorMode(lang)}
        onChange={onChange}
      />
      <Highlight code={code} language={lang} />
    </pre>
  )
}

function languageMinorMode(lang) {
  return `${lang}-code-mode`
}

export function getMinorMode(lang) {
  const minor = minorModes[lang] || { keymap: {}, bindings: [] }

  return {
    name: languageMinorMode(lang),
    description: `minor mode for ${lang} language code`,
    keymaps: [minor.keymap, major.keymap],
    bindings: minor.bindings.concat(major.bindings),
  }
}

const major = {
  keymap: {},
  bindings: [],
}

const minorModes = {}
