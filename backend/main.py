from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from engine import engine

app = FastAPI(title="AI-WAF Advanced Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/stats")
async def get_stats():
    return engine.get_stats()

@app.get("/logs")
async def get_logs():
    return engine.requests

@app.get("/rules")
async def get_rules():
    return engine.rules

@app.post("/toggle-learning")
async def toggle_learning(active: bool):
    engine.is_learning = active
    return {"status": "success", "is_learning": engine.is_learning}

@app.post("/flush")
async def flush_db():
    engine.flush_db()
    return {"status": "success"}

@app.post("/purge")
async def purge_logs():
    engine.purge_logs()
    return {"status": "success"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Generate new request simulation data
            new_request = engine.generate_request()
            stats = engine.get_stats()
            
            # Broadcast to connected client
            await websocket.send_json({
                "type": "TRAFFIC_UPDATE",
                "request": new_request,
                "stats": stats,
                "rules": engine.rules,
                "insights": engine.insights
            })
            
            await asyncio.sleep(2)  # Simulate 2s interval
    except WebSocketDisconnect:
        print("Client disconnected")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
