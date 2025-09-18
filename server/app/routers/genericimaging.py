
from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
import base64, json, urllib.request
from app.config import IMAGING_ENDPOINT_URL, IMAGING_API_KEY

router = APIRouter()

endpoint_url = IMAGING_ENDPOINT_URL
api_key = IMAGING_API_KEY
deployment_name = "medimageinsight-10"

@router.post("/genericImaging/analyse")
async def analyse_generic_imaging(
    image: UploadFile = File(...),
    disease_labels: str = Form(...)
):
    # disease_labels is a JSON stringified array from frontend
    try:
        labels = json.loads(disease_labels)
        if not isinstance(labels, list):
            raise ValueError
    except Exception:
        raise HTTPException(status_code=400, detail="disease_labels must be a JSON array")

    # Read and encode image
    image_bytes = await image.read()
    encoded_image = base64.b64encode(image_bytes).decode("utf-8")

    # Prepare request body
    data_entries = [[encoded_image, label] for label in labels]
    request_body = {
        "input_data": {
            "columns": ["image", "text"],
            "index": list(range(len(labels))),
            "data": data_entries
        },
        "params": {
            "image_standardization_jpeg_compression_ratio": 75,
            "image_standardization_image_size": 512,
            "get_scaling_factor": True
        }
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
        "azureml-model-deployment": deployment_name
    }

    req = urllib.request.Request(
        endpoint_url,
        data=json.dumps(request_body).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as response:
            response_body = response.read().decode("utf-8")
            status_code = response.getcode()
    except urllib.error.HTTPError as e:
        status_code = e.code
        response_body = e.read().decode("utf-8")

    if status_code == 200:
        results = json.loads(response_body)
        # Compute similarity scores
        scores = []
        max_score = float('-inf')
        max_label = None
        for i, item in enumerate(results):
            image_vector = item["image_features"][0]
            text_vector = item["text_features"]
            dot_product = sum(a * b for a, b in zip(image_vector, text_vector))
            image_norm = sum(a * a for a in image_vector) ** 0.5
            text_norm = sum(b * b for b in text_vector) ** 0.5
            similarity = dot_product / (image_norm * text_norm)
            scores.append({"label": labels[i], "similarity": similarity})
            if similarity > max_score:
                max_score = similarity
                max_label = labels[i]
        return JSONResponse(content={
            "scores": scores,
            "max_label": max_label,
            "max_score": max_score
        })
    else:
        raise HTTPException(status_code=status_code, detail=response_body)

 