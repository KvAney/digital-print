# Use a lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy everything in current context into the container
COPY . .
COPY ./config /app/Backend/config

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose backend port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
