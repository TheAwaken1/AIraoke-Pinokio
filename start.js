module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        conda: {
          skip: true
        },
        venv: "env",
        path: "app",
        message: [
          "python -m gradio_ui --host 127.0.0.1 --port {{port}}"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
