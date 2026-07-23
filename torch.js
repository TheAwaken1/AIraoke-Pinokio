module.exports = {
  run: [
    // nvidia 50 series
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128"
        ]
      },
      "next": null
    },
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118"
        ]
      },
      "next": null
    },
    // windows amd
    {
      "when": "{{platform === 'win32' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch-directml torchaudio torchvision numpy==1.26.4"
      },
      "next": null
    },
    // windows cpu
    {
      "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio numpy==1.26.4"
      },
      "next": null
    },
    // mac
    {
      "when": "{{platform === 'darwin'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio"
      },
      "next": null
    },
    // linux nvidia 50 series
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          'uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128',
          "{{args && args.sageattention ? 'uv pip install git+https://github.com/thu-ml/SageAttention.git' : ''}}"
        ]
      },
      "next": null
    },
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu124",
          "{{args && args.sageattention ? 'uv pip install git+https://github.com/thu-ml/SageAttention.git' : ''}}"
        ]
      },
      "next": null
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.2.4"
      },
      "next": null
    },
    // linux cpu
    {
      "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !=='nvidia')}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu"
      },
      "next": null
    }
  ]
}
