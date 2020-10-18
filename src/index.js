import marked from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true
})

const module = function (sceneElement, modConfig, sceneConfig, projectConfig) {
  sceneConfig.blocks.forEach(block => {
    if (block.type === 'text' && !block.marked) {
      block.text = marked(block.text)
      block.marked = true
    }
  })
}

module.install = Presenta => {
  Presenta.addModule('markdown', module)
}

module.initBefore = true

export default module

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(module)
}
