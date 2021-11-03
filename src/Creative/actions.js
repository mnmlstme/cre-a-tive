const ChangeFile = 'ChangeFile'

export function changeFile(filepath) {
  return {
    type: ChangeFile,
    filepath,
  }
}

const ChangeScene = 'ChangeScene'

export function changeScene(number) {
  return {
    type: ChangeScene,
    number,
  }
}

const LoadProject = 'LoadProject'
const ProjectError = 'ProjectError'

export function loadProject(filepath) {
  return (dispatch) => {
    console.log('loadProject', filepath)
    import(`Workbooks/${filepath}/project.yaml`)
      .then((mod) => {
        console.log('Action: LoadProject ', JSON.stringify(mod.default))
        return dispatch({
          type: LoadProject,
          filepath,
          data: mod.default,
        })
      })
      .catch((error) => {
        console.log('Action: ProjectError ', error)
        return dispatch({
          type: ProjectError,
          filepath,
          error,
        })
      })
  }
}

const LoadWorkbook = 'LoadWorkbook'
const WorkbookError = 'WorkbookError'

export function loadWorkbook(filepath) {
  return (dispatch) => {
    console.log('loadModule', filepath)
    import(`Workbooks/${filepath}`)
      .then((mod) => {
        console.log('Action: LoadWorkbook ', JSON.stringify(mod.default))
        return dispatch({
          type: LoadWorkbook,
          filepath,
          data: mod.default,
        })
      })
      .catch((error) => {
        console.log('Action: WorkbookError ', error)
        return dispatch({
          type: WorkbookError,
          filepath,
          error,
        })
      })
  }
}

const LoadResource = 'LoadResource'
const ResourceError = 'ResourceError'

export function loadResource(filepath, loader, lang = 'js') {
  return (dispatch) => {
    console.log('loadResource', filepath, lang)

    loader(filepath)
      .then((mod) => {
        console.log('Action: LoadResource ', filepath, lang, mod)
        return dispatch({
          type: LoadResource,
          lang,
          data: mod,
        })
      })
      .catch((error) => {
        console.log('Action: LoadError ', error)
        return dispatch({
          type: ResourceError,
          lang,
          error,
        })
      })
  }
}

const UpdateScene = 'UpdateScene'

export function updateScene(scene, block, mode, text, lang = 'html') {
  debugger
  return {
    type: UpdateScene,
    scene,
    block,
    mode,
    lang,
    text,
  }
}

const SaveWorkbook = 'SaveWorkbook'

export function saveWorkbook() {
  return {
    type: SaveWorkbook,
  }
}

export default {
  ChangeFile,
  ChangeScene,
  LoadProject,
  ProjectError,
  LoadWorkbook,
  WorkbookError,
  LoadResource,
  ResourceError,
  UpdateScene,
  SaveWorkbook,
}
