

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import GPT41_ENDPOINT,GPT41_API_KEY
import os
from openai import AzureOpenAI

router = APIRouter()

class SymptomInput(BaseModel):
	symptoms: list[str]
	context: str = None  # Optional RAG context from frontend


@router.post("/symptoms/check")
def check_symptoms(data: SymptomInput):
	deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4.1")
	api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2025-01-01-preview")
	client = AzureOpenAI(
		api_version=api_version,
		azure_endpoint=GPT41_ENDPOINT,
		api_key=GPT41_API_KEY
	)

	# Logging: print received symptoms
	print(f"Received symptoms: {data.symptoms}")
	print(f"Received context: {data.context}")
	context = data.context if data.context else ""

	# Compose user message from symptoms
	user_message = f"Patient reports the following symptoms: {', '.join(data.symptoms)}. What are the possible diagnoses and recommendations?"

	# Add RAG context to system prompt if available
	if context:
		system_prompt = (
			"You are a helpful healthcare assistant. ONLY use the provided context below for your answer. Do NOT use any other information or external knowledge. "
			"Explicitly reference or quote the context in your answer."
			f"\n\nHere is some relevant medical context:\n{context}"
		)
	else:
		system_prompt = "You are a helpful healthcare assistant. Provide possible diagnoses and recommendations based on the symptoms provided."

	print("System Prompt:", system_prompt)
	try:
		response = client.chat.completions.create(
			messages=[
				{
					"role": "system",
					"content": system_prompt,
				},
				{
					"role": "user",
					"content": user_message,
				}
			],
			max_tokens=4096,
			temperature=1.0,
			top_p=1.0,
			model=deployment
		)
		return {"response": response.choices[0].message.content}
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
