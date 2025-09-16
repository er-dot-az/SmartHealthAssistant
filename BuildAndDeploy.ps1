# Build and push backend image
az acr build --registry smarthealthassistantacr --image backend:latest -f Dockerfile.backend .
# Build and push frontend image
az acr build --registry smarthealthassistantacr --image frontend:latest -f frontend/Dockerfile frontend/
# Deploy to AKS
kubectl apply -f k8s/
