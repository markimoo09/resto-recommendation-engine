"""Backend package for the Kilo demo FastAPI service.

This package intentionally stays tiny: it only exposes a health check and
a demo /foo endpoint returning foo/bar shaped objects so that we can wire
up OpenAPI -> TypeScript type generation and a typed client in the Expo app.
"""
