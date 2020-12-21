import marked from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true
})

const controller = function (routerElement, router, ctrlConfig, projectConfig) {}

const markdowns = []

const addMarkdown = ob => {
  const exists = markdowns.find(d => d.type === ob.type)
  if (!exists) markdowns.push(ob)
}

controller.install = Presenta => {
  Presenta.addController('markdown', controller)
  Presenta.io.addMarkdown = addMarkdown
}

controller.run = config => {
  config.scenes.forEach(s => {
    s.blocks.forEach(b => {
      const blk = markdowns.find(d => d.type === b.type)
      if (blk) {
        b[blk.field] = marked(b[blk.field])
      }
    })
  })
}

export default controller

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(controller)
}
