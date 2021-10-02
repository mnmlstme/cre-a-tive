import React from 'react'
import Kr from 'kram'
const path = require('path')

export class Render extends React.Component {
  constructor(props) {
    super(props)
    this.node = React.createRef()
  }

  render() {
    return <div ref={this.node} />
  }

  componentDidMount() {
    const { workbook, doLoadResource } = this.props
    const { modules } = workbook

    console.log('Rendering Workbook', workbook)

    modules.forEach(({ language, load }) => doLoadResource(load, language))
  }

  componentDidUpdate(prevProps) {
    const { workbook, resources } = this.props
    const { modules, init } = workbook
    const mountpoint = this.node.current

    if (resources !== prevProps.resources) {
      modules.forEach(({ language, bind }) => {
        const r = resources.get(language)

        if (r.isLoaded) {
          console.log(`Mounting ${language} resource`, r.module)

          bind(r.module, mountpoint, init)
        }
      })
    }
  }
}