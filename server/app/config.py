import os

# Symptoms router config
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "https://azureaiservices766909842264.openai.azure.com/")
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY", "")

# Imaging router config
IMAGING_ENDPOINT_NAME = os.getenv("IMAGING_ENDPOINT_NAME", "https://debashishsghosh-project-wrpbp.eastus.inference.ml.azure.com/score")

# BioDictionary router config
BIOGPT_URL = os.getenv("BIOGPT_URL", "https://debashishsghosh-project-ntjmy.eastus.inference.ml.azure.com/score")
BIOGPT_API_KEY = os.getenv("BIOGPT_API_KEY", "")
