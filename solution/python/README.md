# Starting code for the guard scheduling application

Starting code for running a flask server and pytest for testing.

## Requirements:

We will be creating a virtual env and installing some dependancies needed to run this project in it. You'll need an installation of python and pip on your system.

If you don't have these, please follow this guide: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/

## Run Server:

These are written for someone running on unix/macOS, but you can reference the docs in the URL above for the windows commands.

1. cd to the `solution/python/code` directory.
2. Run `python3 -m venv venv` to create a virtual environment named env
3. Run `. venv/bin/activate`
4. Run `pip install -e .` 
5. Run `python app/server.py`
6. Navagate to http://127.0.0.1:5000/hello in your browser, and ensure you see "Hello World" displayed. If so you're good to go! If not please review these steps and send an email to me at alex@belfrysoftware.com to help!


## Tests:

1. Run `pip install '.[test]'`
2. Run `pytest`