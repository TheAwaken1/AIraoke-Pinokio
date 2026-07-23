# AIraoke-Pinokio

1-click [Pinokio](https://pinokio.computer) launcher for [AIraoke](https://github.com/TheAwaken1/AIraoke) — transform your songs into karaoke-style MP4 videos with AI-powered lyric transcription, right on your own machine.

<p align="center">
  <img src="icon.png" alt="AIraoke Logo" width="40%"/>
</p>

## What It Does

AIraoke takes an audio file, a video, or a YouTube link and turns it into a karaoke video: Whisper transcribes the lyrics with word-level timing, you review and edit them in a built-in editor, then FFmpeg renders a synced karaoke MP4 with your choice of background — bundled videos, your own custom video, or a music-reactive Audio Particles visualizer. Vocal volume is adjustable from full vocals down to a pure instrumental (via Demucs separation), with beat-synced effects, a countdown, and optional local-LLM lyric correction. Everything runs locally — no external APIs.

## Install & Use

1. Install [Pinokio](https://pinokio.computer)
2. Open this repo's URL in Pinokio's Discover page and click **Install** — it sets up Python 3.11, PyTorch (CUDA on NVIDIA, including 50-series), FFmpeg with libass, and all dependencies automatically
3. Click **Start**, then **Open Web UI**
4. Follow the guided flow: **Upload → Transcribe → Edit → Render**

### Launcher Menu

| Menu | What it does |
|------|--------------|
| **Start** | Launches the AIraoke web UI |
| **Update** | Pulls the latest launcher and app code |
| **Install** | (Re)installs dependencies — safe to re-run, completed steps are skipped |
| **Save Disk Space** | Deduplicates redundant library files |
| **Reset** | Reverts to a pre-install state |

## Requirements

- Windows, Linux, or macOS
- NVIDIA GPU recommended (CUDA acceleration for Whisper, Demucs, and NVENC video encoding); CPU works but is slower
- Roughly 10 GB of disk space for dependencies and models

## Programmatic API

The AIraoke UI is a Gradio app, so every action in the UI is callable programmatically while the app is running (default local URL shown in the launcher, e.g. `http://localhost:7861`).

### Python

```python
from gradio_client import Client, handle_file

client = Client("http://localhost:7861")
# List callable endpoints and their parameters
print(client.view_api())

# Example: transcribe an audio file (endpoint names come from view_api())
result = client.predict(
    handle_file("song.mp3"),  # audio file
    api_name="/process_transcription"
)
```

### JavaScript

```javascript
import { Client, handle_file } from "@gradio/client";

const client = await Client.connect("http://localhost:7861");
console.log(await client.view_api());

const result = await client.predict("/process_transcription", {
  audio: handle_file("song.mp3"),
});
```

### Curl

```bash
# Discover the API schema
curl http://localhost:7861/gradio_api/info

# Call an endpoint (two-step: POST returns an event id, then stream the result)
curl -X POST http://localhost:7861/gradio_api/call/process_transcription \
  -H "Content-Type: application/json" \
  -d '{"data": [{"path": "/path/to/song.mp3"}]}'
```

## Troubleshooting

- **Install or start fails:** check the logs under `logs/api/` in the launcher folder (`install.js/latest`, `start.js/latest`)
- **Black video with no lyrics:** your FFmpeg lacks libass — re-run **Install**, which downloads a full FFmpeg build into `app/bin`
- **Vocal volume has no effect:** the first separation per song takes a few minutes (Demucs); check `app/gradio_ui/gradio_ui.log`

## Credits

- [AIraoke](https://github.com/TheAwaken1/AIraoke) by TheAwakenOne, built on [Python-Lyric-Transcriber](https://github.com/nomadkaraoke/python-lyrics-transcriber), [Whisper](https://github.com/openai/whisper), and [Demucs](https://github.com/facebookresearch/demucs)

## License

MIT — see the [AIraoke repository](https://github.com/TheAwaken1/AIraoke) for details.
