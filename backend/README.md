Backend
=======

This backend uses **uv** for dependency management (no manual `pip install` needed).

Prereqs
-------
- Python 3.14+ available (see `pyproject.toml`).
- uv installed: `curl -LsSf https://astral.sh/uv/install.sh | sh` (or `pip install uv`).

Setup
-----
```bash
cd backend
uv sync
```
`uv sync` reads `pyproject.toml` + `uv.lock` and installs into `.venv`.

Run the API
-----------
```bash
cd backend
uv run uvicorn main:app --reload
```

Add dependencies
----------------
- Runtime deps: `uv add <package>` (optionally pin: `uv add <package>==x.y.z`).
- Dev/test deps: `uv add --dev <package>`.

uv updates `pyproject.toml` and `uv.lock`; share those files in commits. Team members just run `uv sync` after pulling.

Export requirements (only if needed)
------------------------------------
For legacy tooling:
```bash
cd backend
uv export --locked --format requirements-txt --output requirements.txt
```
Add `--no-dev` to exclude dev deps.
