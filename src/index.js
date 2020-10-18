import marked from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true
})

const controller = function (routerElement, router, ctrlConfig, projectConfig) {

}

controller.install = Presenta => {
  Presenta.addModule('markdown', controller)
}

controller.init = config => {
  config.scenes.forEach(s => {
    s.blocks.forEach(b => {
      if (b.type === 'text') {
        b.text = marked(b.text)
      }
    })
  })
}

export default controller

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(controller)
}
