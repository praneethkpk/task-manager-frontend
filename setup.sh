#!/bin/bash
# Task Manager Daily Setup Script
# Run this once to get everything running

echo "🔧 Setting up Task Manager..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start infrastructure (DB + optional)
echo "📦 Starting database..."
docker compose up -d db

# Wait for DB to be ready
echo "⏳ Waiting for database to be ready..."
for i in $(seq 1 30); do
    if docker exec $(docker compose ps -q db) pg_isready -U taskmanager -d taskmanager 2>/dev/null; then
        echo "✅ Database is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Database failed to start."
        exit 1
    fi
    sleep 1
done

# Backend setup
echo "🔧 Setting up backend..."
cd backend
if [ ! -f "target/taskmanager-0.0.1-SNAPSHOT.jar" ]; then
    echo "🔨 Building backend..."
    ./mvnw -B spring-boot:repackage -DskipTests
fi

# Frontend setup
echo "🔧 Setting up frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "To start the application:"
echo "  1. Start backend: cd task-manager/backend && ./mvnw spring-boot:run"
echo "  2. Start frontend: cd task-manager/frontend && npm run dev"
echo "  3. Or use Docker: docker compose up -d"
echo ""
echo "Then open: http://localhost:5173"
