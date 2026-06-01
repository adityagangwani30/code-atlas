from fastapi import FastAPI

app = FastAPI()

@app.get('/python/health')
def health():
    return {'ok': True}
