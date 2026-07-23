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

### Platform notes

Linux NVIDIA **GB10** systems (including **DGX Spark**) automatically use the CUDA 13.0
PyTorch wheels required by the GPU's `sm_121` architecture. RTX 50-series systems use
CUDA 12.8, while other supported NVIDIA, AMD, and CPU configurations retain their
platform-specific install paths.

If this launcher was installed before GB10 support was added, update it and click
**Install** once more. This replaces the incompatible CUDA 12.4 PyTorch packages while
preserving the downloaded app and its working files.

## Programmatic API

AIraoke exposes Gradio's generated API while **Start** is running. Use the URL shown by
Pinokio as `BASE_URL` (the port is assigned dynamically). The exact input/output schema
is available from the generated API description:

```bash
curl "$BASE_URL/gradio_api/openapi.json"
```

The main operations are `/process_transcription` and `/process_render`. Inspect the
generated schema after updates because their ordered component inputs follow the
current AIraoke UI.

### Python

```python
from gradio_client import Client, handle_file

client = Client("http://127.0.0.1:PORT")
client.view_api()

result = client.predict(
    handle_file("song.mp3"),  # audio
    None,                     # video
    "Artist",
    "Song",
    True,                     # use_gpu
    "large-v3",
    False,                    # use_llm_correction
    None,                     # llm_corrector_model
    False,                    # enable_beat_effects
    False,                    # use_input_video
    0,                        # lyrics_time_offset
    api_name="/process_transcription",
)
print(result)
```

### JavaScript

```javascript
import { Client, handle_file } from "@gradio/client";

const client = await Client.connect("http://127.0.0.1:PORT");
console.log(await client.view_api());

const result = await client.predict("/process_transcription", [
  handle_file("./song.mp3"),
  null,
  "Artist",
  "Song",
  true,
  "large-v3",
  false,
  null,
  false,
  false,
  0
]);
console.log(result.data);
```

### cURL

First upload the input file:

```bash
curl -X POST "$BASE_URL/gradio_api/upload" \
  -F "files=@song.mp3"
```

The response is an array containing the server-side upload path. Insert that value as
`UPLOADED_PATH`, then call the transcription endpoint using the named fields from the
generated OpenAPI schema:

```bash
curl -X POST "$BASE_URL/gradio_api/run/process_transcription" \
  -H "Content-Type: application/json" \
  -d '{
    "audio": {
      "path": "UPLOADED_PATH",
      "meta": {"_type": "gradio.FileData"}
    },
    "video": null,
    "param_2": "Artist",
    "param_3": "Song",
    "param_4": true,
    "param_5": "large-v3",
    "param_6": false,
    "param_7": null,
    "param_8": false,
    "param_9": false,
    "param_10": 0
  }'
```

## Troubleshooting

- **Install or start fails:** check the logs under `logs/api/` in the launcher folder (`install.js/latest`, `start.js/latest`)
- **Black video with no lyrics:** your FFmpeg lacks libass — re-run **Install**, which downloads a full FFmpeg build into `app/bin`
- **Vocal volume has no effect:** the first separation per song takes a few minutes (Demucs); check `app/gradio_ui/gradio_ui.log`
- **Transcription hangs or fails on Linux GB10 / DGX Spark:** the install predates GB10 support — click **Update**, then **Install** to switch to the CUDA 13.0 PyTorch wheels

## Credits

- [AIraoke](https://github.com/TheAwaken1/AIraoke) by TheAwakenOne, built on [Python-Lyric-Transcriber](https://github.com/nomadkaraoke/python-lyrics-transcriber), [Whisper](https://github.com/openai/whisper), and [Demucs](https://github.com/facebookresearch/demucs)

## License

MIT — see the [AIraoke repository](https://github.com/TheAwaken1/AIraoke) for details.
