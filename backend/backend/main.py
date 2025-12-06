from typing import List

from fastapi import FastAPI
from pydantic import BaseModel


class FooRequest(BaseModel):
    """Demo request model: client sends a simple foo string."""

    foo: str


class FooResponse(BaseModel):
    """Demo response model: backend returns a bar string derived from foo."""

    bar: str


app = FastAPI(
    title="Kilo Backend",
    version="0.1.0",
    description=(
        "Minimal FastAPI app exposing a health check and a demo /foo endpoint "
        "so we can drive OpenAPI -> TypeScript type generation."
    ),
)


@app.get("/health", tags=["internal"])
async def health_check() -> dict[str, str]:
    """Simple health endpoint used for smoke checks."""

    return {"status": "ok"}


@app.post("/foo", response_model=List[FooResponse], tags=["demo"])
async def create_foo(payload: FooRequest) -> List[FooResponse]:
    """Echo endpoint returning a list of FooResponse objects.

    This is intentionally trivial: it just proves that the request/response
    shapes flow from Pydantic -> OpenAPI -> TypeScript in the frontend.
    """

    return [FooResponse(bar=f"echo:{payload.foo}")]
