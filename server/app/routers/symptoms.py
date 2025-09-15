

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY
import os
from openai import AzureOpenAI

router = APIRouter()

class SymptomInput(BaseModel):
	symptoms: list[str]


@router.post("/symptoms/check")
def check_symptoms(data: SymptomInput):
	deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o")
	api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview")
	client = AzureOpenAI(
		api_version=api_version,
		azure_endpoint=AZURE_OPENAI_ENDPOINT,
		api_key=AZURE_OPENAI_API_KEY,
	)

	# Simple RAG: local context for symptoms
	rag_contexts = {
		"headache": "Headaches can be caused by a variety of factors including stress, dehydration, infection, reading or neurological conditions. It can also be caused due to excessive perspiration. Common treatments include hydration, rest, and over-the-counter pain relief. Seek medical attention if headaches are severe, persistent, or accompanied by other symptoms such as vision changes or fever.",
		# Add more symptom contexts here
	}

	# Find relevant context for submitted symptoms
	context = ""
	for symptom in data.symptoms:
		if symptom.lower() in rag_contexts:
			context += f"\nSymptom: {symptom}\nContext: {rag_contexts[symptom.lower()]}\n"

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
