from fastapi import APIRouter

router = APIRouter()

@router.post('/python/items')
def create_item():
    return {'created': True}
