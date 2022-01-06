import React from 'react'
import styles from './document.css'
import { CodeEditor, ProseEditor } from './editor'

export function Document({ workbook, doUpdate, doSave }) {
  console.log('Document:', workbook.toObject())
  const scenes = workbook.get('scenes')

  return (
    <ol>
      {scenes.map((scn, i) => {
        return (
          <li key={i} className={styles.doc}>
            {scn.blocks
              .map((blk, j) => Object.assign(blk, { index: j }))
              .sort(performLast)
              .map(({ index, mode, lang, text }) => {
                const Editor = mode === 'discuss' ? ProseEditor : CodeEditor

                return (
                  <Editor
                    key={index}
                    className={styles[mode]}
                    lang={lang}
                    content={text}
                    onChange={(s, lang) => doUpdate(index, mode, s, lang)}
                    onSave={doSave}
                  />
                )
              })}
          </li>
        )
      })}
    </ol>
  )
}

function performLast(a, b) {
  return a.mode === b.mode || (b.mode !== 'eval' && a.mode !== 'eval')
    ? a > b
    : a.mode === 'eval'
    ? 1
    : -1
}
