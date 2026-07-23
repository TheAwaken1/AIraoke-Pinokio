module.exports = {
  "requires": {
    "bundle": "ai"
  },
  "run": [
    {
      "when": "{{!exists('app')}}",
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/TheAwaken1/AIraoke.git app",
      }
    },
    {
      "method": "script.start",
      "params": {
        "uri": "torch.js",
        "params": {
          "venv_python": "3.11",
          "venv": "env",
          "path": "app"
        }
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "python -m ensurepip --upgrade"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "python -m pip install --upgrade pip uv \"setuptools<82\" wheel"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "uv pip install -e ."
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "uv pip install -r requirements.txt"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "uv pip install toml"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "pip install demucs"
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "pip install typing_extensions --no-cache-dir --force-reinstall"
      }
    },
    // Unset TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "set TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD="
      }
    },
      // Install spacy
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "uv pip install spacy"
        ]
      }
    },
    // Install gradio, devicetorch, and openai-whisper
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "uv pip install gradio==5.29.1 devicetorch",
          "pip install openai-whisper",
          "uv pip install uvicorn",
          "python -m pip install -U --pre yt-dlp[default]"
        ]
      }
    },
    // Download spacy model
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "python -m spacy download en_core_web_sm",
          "pip install typing_extensions"
        ]
      }
    },
    // Notify installation complete
    {
      "method": "notify",
      "params": {
        "html": "Installation complete! Click the 'start' tab to launch the app."
      }
    }
  ]
}