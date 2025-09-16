from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import urllib.request
import json
import os
from app.config import BIOGPT_URL, BIOGPT_API_KEY

router = APIRouter()


class BioDictionaryInput(BaseModel):
    inputs: str  # e.g., "COVID-19 is"
    min_length: int = None
    max_length: int = None
    num_beams: int = None

@router.post("/biodictionary/lookup")
def lookup_biodictionary(input_data: BioDictionaryInput):
    data = { "inputs": input_data.inputs }
    parameters = {}
    if input_data.min_length is not None:
        parameters["min_length"] = input_data.min_length
    if input_data.max_length is not None:
        parameters["max_length"] = input_data.max_length
    if input_data.num_beams is not None:
        parameters["num_beams"] = input_data.num_beams
    # Removed seed parameter: not supported by remote API
    parameters["early_stopping"] = True
    if parameters:
        data["parameters"] = parameters
    body = str.encode(json.dumps(data))

    url = BIOGPT_URL
    api_key = BIOGPT_API_KEY
    if not api_key:
        raise HTTPException(status_code=401, detail="API key is missing")

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + api_key
    }

    req = urllib.request.Request(url, body, headers)
    try:
        response = urllib.request.urlopen(req)
        result = response.read().decode("utf-8")
        return {"result": result}
    except urllib.error.HTTPError as error:
        error_detail = error.read().decode("utf8", 'ignore')
        raise HTTPException(status_code=error.code, detail=error_detail)
