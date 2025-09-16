# Required imports
from fastapi import APIRouter, UploadFile, File, Form
import base64
import json
import os
from app.config import IMAGING_ENDPOINT
from urllib.parse import urlparse
from azure.identity import DefaultAzureCredential
import urllib.request
import urllib.error
# from fastapi import APIRouter, UploadFile, File, Form
# import base64, json, os
# from urllib.parse import urlparse
# from azure.ai.ml import MLClient
# from azure.identity import DefaultAzureCredential
# from azure.core.exceptions import ResourceNotFoundError
# import urllib.request, urllib.error

router = APIRouter()
def normalize_endpoint_name(name_or_url: str) -> str:
	try:
		parsed = urlparse(name_or_url)
		if parsed.scheme and parsed.netloc:
			host = parsed.netloc
			endpoint_candidate = host.split(".")[0]
	except Exception:
		pass
	return name_or_url
def is_url(value: str) -> bool:
	try:
		p = urlparse(value)
		return bool(p.scheme and p.netloc)
	except Exception:
		return False
def invoke_via_http(scoring_url: str, payload: dict, credential, deployment_name: str) -> str:
	headers = {"Content-Type": "application/json"}
	key = ""
	if key:
		headers["Authorization"] = f"Bearer {key}"
	else:
		token = credential.get_token("https://ml.azure.com/.default").token
		headers["Authorization"] = f"Bearer {token}"
	if deployment_name:
		headers["azureml-model-deployment"] = deployment_name
	data_bytes = json.dumps(payload).encode("utf-8")
	req = urllib.request.Request(scoring_url, data=data_bytes, headers=headers, method="POST")
	try:
		with urllib.request.urlopen(req) as resp:
			return resp.read().decode("utf-8", errors="ignore")
	except urllib.error.HTTPError as http_err:
		body = http_err.read().decode("utf-8", errors="ignore") if hasattr(http_err, "read") else ""
		raise RuntimeError(f"HTTP scoring failed: {http_err.code} {http_err.reason}\n{body}") from http_err
	except urllib.error.URLError as url_err:
		raise RuntimeError(f"Failed to reach scoring URL: {url_err.reason}") from url_err

@router.post("/imaging/analyze")
async def analyze_image(
	frontal_image: UploadFile = File(...),
	lateral_image: UploadFile = File(...),
	indication: str = Form(...),
	technique: str = Form(...),
	comparison: str = Form(...)
) -> dict:
	credential = DefaultAzureCredential()
	endpoint_name = IMAGING_ENDPOINT
	deployment_name = "cxrreportgen-9"
	normalized_endpoint_name = normalize_endpoint_name(endpoint_name)
	input_data = {
	"frontal_image": base64.encodebytes(await frontal_image.read()).decode("utf-8"),
	"lateral_image": base64.encodebytes(await lateral_image.read()).decode("utf-8"),
	"indication": indication,
		"technique": technique,
		"comparison": comparison,
	}
	data = {
		"input_data": {
			"columns": list(input_data.keys()),
			"index": [0],
			"data": [list(input_data.values())],
		}
	}
	try:
		response_text = invoke_via_http(endpoint_name, data, credential, deployment_name)
		print("Azure ML response:", response_text)
		return {"result": response_text}
	except Exception as ex:
		return {"error": str(ex)}
# from fastapi import APIRouter, UploadFile, File, Form
# import base64, json, os
# from urllib.parse import urlparse
# from azure.ai.ml import MLClient
# from azure.identity import DefaultAzureCredential
# from azure.core.exceptions import ResourceNotFoundError
# import urllib.request, urllib.error
#
# router = APIRouter()
#
# def normalize_endpoint_name(name_or_url: str) -> str:
#     try:
#         parsed = urlparse(name_or_url)
#         if parsed.scheme and parsed.netloc:
#             host = parsed.netloc
#             endpoint_candidate = host.split(".")[0]
#             return endpoint_candidate
#     except Exception:
#         pass
#     return name_or_url
#
# def is_url(value: str) -> bool:
#     try:
#         p = urlparse(value)
#         return bool(p.scheme and p.netloc)
#     except Exception:
#         return False
#
# def invoke_via_http(scoring_url: str, payload: dict, credential, deployment_name: str) -> str:
#     headers = {"Content-Type": "application/json"}
#     key = os.getenv("AZURE_ML_ENDPOINT_KEY") or os.getenv("AML_ENDPOINT_KEY")
#     if key:
#         headers["Authorization"] = f"Bearer {key}"
#     else:
#         token = credential.get_token("https://ml.azure.com/.default").token
#         headers["Authorization"] = f"Bearer {token}"
#     if deployment_name:
#         headers["azureml-model-deployment"] = deployment_name
#     data_bytes = json.dumps(payload).encode("utf-8")
#     req = urllib.request.Request(scoring_url, data=data_bytes, headers=headers, method="POST")
#     try:
#         with urllib.request.urlopen(req) as resp:
#             return resp.read().decode("utf-8", errors="ignore")
#     except urllib.error.HTTPError as http_err:
#         body = http_err.read().decode("utf-8", errors="ignore") if hasattr(http_err, "read") else ""
#         raise RuntimeError(f"HTTP scoring failed: {http_err.code} {http_err.reason}\n{body}") from http_err
#     except urllib.error.URLError as url_err:
#         raise RuntimeError(f"Failed to reach scoring URL: {url_err.reason}") from url_err
#
# @router.post("/imaging/analyze")
# async def analyze_image(
#     frontal_image: UploadFile = File(...),
#     lateral_image: UploadFile = File(...),
#     indication: str = Form(...),
#     technique: str = Form(...),
#     comparison: str = Form(...)
# ):
#     credential = DefaultAzureCredential()
#     endpoint_name = "https://debashishsghosh-project-infov.eastus.inference.ml.azure.com/score"
#     deployment_name = "cxrreportgen-9"
#     normalized_endpoint_name = normalize_endpoint_name(endpoint_name)
#     input_data = {
#         "frontal_image": base64.encodebytes(await frontal_image.read()).decode("utf-8"),
#         "lateral_image": base64.encodebytes(await lateral_image.read()).decode("utf-8"),
#         "indication": indication,
#         "technique": technique,
#         "comparison": comparison,
#     }
#     data = {
#         "input_data": {
#             "columns": list(input_data.keys()),
#             "index": [0],
#             "data": [list(input_data.values())],
#         }
#     }
#     try:
#         response_text = invoke_via_http(endpoint_name, data, credential, deployment_name)
#         return {"result": response_text}
#     except Exception as ex:
#         return {"error": str(ex)}

# from fastapi import APIRouter, UploadFile, File
#
# router = APIRouter()
#
# @router.post("/imaging/analyze")
# async def analyze_image(file: UploadFile = File(...)):
#	# Dummy logic for image analysis
#	return {"image_result": "No abnormality detected"}
