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
    // Install FFmpeg with libass into app/bin (the conda ffmpeg on PATH lacks
    // the subtitles filter, which karaoke rendering requires)
    {
      "when": "{{platform === 'win32' && !exists('app/bin/ffmpeg.exe')}}",
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "curl -L -o ffmpeg.zip https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-n7.1-latest-win64-gpl-7.1.zip || echo Failed to download FFmpeg",
          "mkdir bin || echo bin directory already exists",
          "powershell -Command \"Expand-Archive -Path ffmpeg.zip -DestinationPath ffmpeg_temp -Force\" || echo Failed to extract FFmpeg",
          "echo Moving FFmpeg files including DLLs...",
          "move ffmpeg_temp\\ffmpeg-n7.1-latest-win64-gpl-7.1\\bin\\*.* bin\\ || echo Failed to move FFmpeg bin contents. Check if source directory exists and target is accessible.",
          "echo Verifying FFmpeg installation...",
          "bin\\ffmpeg.exe -version || echo FFmpeg version check failed. Ensure FFmpeg is correctly placed and executable.",
          "bin\\ffmpeg.exe -filters | findstr ass || echo FFmpeg libass support missing. Check FFmpeg build.",
          "echo Cleaning up...",
          "rmdir /s /q ffmpeg_temp || echo Failed to delete temporary directory ffmpeg_temp",
          "del ffmpeg.zip || echo Failed to delete ffmpeg.zip"
        ]
      }
    },
    {
      "when": "{{platform === 'darwin' && !exists('app/bin/ffmpeg')}}",
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "curl -L -o ffmpeg.tar.xz https://evermeet.cx/ffmpeg/getrelease || echo Failed to download FFmpeg",
          "mkdir bin || echo bin directory already exists",
          "mkdir ffmpeg_temp || echo ffmpeg_temp directory already exists",
          "tar -xJf ffmpeg.tar.xz -C ffmpeg_temp || echo Failed to extract FFmpeg",
          "mv ffmpeg_temp/ffmpeg bin/ || echo Failed to move FFmpeg binary.",
          "echo Verifying FFmpeg installation...",
          "bin/ffmpeg -version || echo FFmpeg version check failed. Ensure FFmpeg is correctly placed and executable.",
          "bin/ffmpeg -filters | grep ass || echo FFmpeg libass support missing. Check FFmpeg build.",
          "echo Cleaning up...",
          "rm -rf ffmpeg_temp || echo Failed to delete temporary directory ffmpeg_temp",
          "rm ffmpeg.tar.xz || echo Failed to delete ffmpeg.tar.xz"
        ]
      }
    },
    {
      "when": "{{platform === 'linux' && !exists('app/bin/ffmpeg')}}",
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": [
          "curl -L -o ffmpeg.tar.xz https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-{{arch === 'arm64' ? 'arm64' : 'amd64'}}-static.tar.xz || echo Failed to download FFmpeg",
          "mkdir bin || echo bin directory already exists",
          "mkdir ffmpeg_temp || echo ffmpeg_temp directory already exists",
          "tar -xJf ffmpeg.tar.xz -C ffmpeg_temp --strip-components=1 || echo Failed to extract FFmpeg",
          "mv ffmpeg_temp/ffmpeg bin/ || echo Failed to move FFmpeg binary.",
          "mv ffmpeg_temp/ffprobe bin/ || echo Failed to move ffprobe binary.",
          "echo Verifying FFmpeg installation...",
          "bin/ffmpeg -version || echo FFmpeg version check failed. Ensure FFmpeg is correctly placed and executable.",
          "bin/ffmpeg -filters | grep ass || echo FFmpeg libass support missing. Check FFmpeg build.",
          "echo Cleaning up...",
          "rm -rf ffmpeg_temp || echo Failed to delete temporary directory ffmpeg_temp",
          "rm ffmpeg.tar.xz || echo Failed to delete ffmpeg.tar.xz"
        ]
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