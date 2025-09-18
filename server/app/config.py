from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
import os

KEY_VAULT_URL = os.getenv("KEY_VAULT_URL")  # Set this in your environment

credential = DefaultAzureCredential()
client = SecretClient(vault_url=KEY_VAULT_URL, credential=credential)

def get_secret(secret_name):
	return client.get_secret(secret_name).value

# Fetch secrets from Azure Key Vault
BIOGPT_API_KEY = get_secret("BIOGPT-API-KEY")
BIOGPT_URL = get_secret("BIOGPT-ENDPOINT")
GPT41_API_KEY = get_secret("GPT41-API-KEY")
GPT41_ENDPOINT = get_secret("GPT41-ENDPOINT")

# Imaging API config
IMAGING_ENDPOINT_URL = get_secret("IMAGING-ENDPOINT")
IMAGING_API_KEY = get_secret("IMAGING-API-KEY")
