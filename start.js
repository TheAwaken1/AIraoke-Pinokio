module.exports = async (kernel) => {
  // const port = await kernel.port(); // This line is not used, port is hardcoded below
  return {
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          conda: { // Added for consistency from previous troubleshooting
            skip: true
          },
          venv: "env",
          env: { }, 
          path: "app",
          message: [
            // Using --no-gpu as per previous discussions for testing
            "python -m gradio_ui --host 0.0.0.0 --port 7861", 
          ],
          on: [{
            "event": "/http:\/\/[^\\s]+\\S*/", 
            "done": true
          }]
        }
      }, // Ensure this comma is present
      {
        method: "local.set",
        params: {
          // Explicitly setting URL to 127.0.0.1 for browser compatibility
          url: "http://127.0.0.1:7861" 
        }
      }, // Ensure this comma is present before the new log step
      {
        // Optional: Add a log to see what start.js *thinks* the URL is after setting it
        method: "log",
        params: {
          raw: "start.js has set local.url to: {{local.url}}"
        }
      }
      // No comma after the last item in the array
    ]
  }
};