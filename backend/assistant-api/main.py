import os
import asyncio
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

app = FastAPI(title="Ask Satyam AI Assistant API", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://portfolio-sks-seven.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Knowledge Base Chunks (Satyam's background, LangGraph, .NET Microservices, RAG, Certifications)
KNOWLEDGE_CHUNKS = [
    {
        "id": "identity",
        "keywords": ["satyam", "who", "about", "engineer", "title", "role", "capgemini"],
        "content": "Satyam Kumar is a GenAI & Backend Engineer and Software Analyst at Capgemini (Bengaluru, India). He specializes in LangGraph multi-agent architectures, enterprise RAG systems, and high-performance .NET 8 microservices."
    },
    {
        "id": "langgraph_agents",
        "keywords": ["langgraph", "agent", "multi-agent", "orchestration", "copilot", "support", "state"],
        "content": "In multi-agent systems, Satyam engineered Support Copilot, a LangGraph-based support triage platform with persistent state memory, tool calling, and a deterministic critic verification loop that checks answers before user delivery."
    },
    {
        "id": "microservices",
        "keywords": ["microservice", "microservices", "dotnet", ".net", "c#", "rabbit", "rabbitmq", "redis", "yarp"],
        "content": "For backend systems, Satyam architected ConnectSphere, a full-stack platform with 8 distributed .NET 8 microservices deployed behind a YARP API Gateway with RabbitMQ event messaging and Redis feed caching."
    },
    {
        "id": "rag_chroma",
        "keywords": ["rag", "chroma", "chromadb", "embeddings", "semantic", "search", "retrieval", "rerank"],
        "content": "In enterprise RAG, Satyam builds low-latency semantic retrieval pipelines combining dense ChromaDB embeddings with BM25 keyword search and cross-encoder rerankers to stop hallucinations in banking policy documents."
    },
    {
        "id": "certifications",
        "keywords": ["certification", "certifications", "claude", "anthropic", "github", "microsoft", "cpi"],
        "content": "Satyam holds the Claude Certified Developer – Foundations certification from Anthropic and GitHub Certified: Agentic AI Developer from Microsoft. He completed his B.Tech in CSE at GLA University with a 7.96 CPI."
    }
]

class ChatMessage(BaseModel):
    role: str
    content: str = Field(..., max_length=500)

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=2, max_length=500)
    history: Optional[List[ChatMessage]] = []

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest, req: Request):
    user_query = request.message.strip()
    query_lower = user_query.lower()

    # Rate limiting & Guardrails: Check if query is related to Satyam's professional domain
    domain_terms = [
        "satyam", "langgraph", "agent", "rag", "microservice", ".net", "c#", "fastapi",
        "python", "angular", "capgemini", "project", "skill", "certif", "chroma",
        "rabbit", "redis", "experience", "education", "contact", "hire", "resume", "system", "architecture"
    ]
    is_domain = any(t in query_lower for t in domain_terms)

    async def stream_response():
        if not is_domain:
            refusal = "I am specifically configured to answer questions regarding Satyam Kumar's engineering background, multi-agent systems, RAG architectures, and microservices experience. Please ask a topic related to his professional work."
            for word in refusal.split(" "):
                yield f"data: {word} \n\n"
                await asyncio.sleep(0.04)
            return

        # Simple semantic keyword matching over local knowledge chunks
        matched_chunk = None
        for chunk in KNOWLEDGE_CHUNKS:
            if any(k in query_lower for k in chunk["keywords"]):
                matched_chunk = chunk
                break

        if not matched_chunk:
            matched_chunk = KNOWLEDGE_CHUNKS[0]

        reply = f"{matched_chunk['content']}\n\n[Source: {matched_chunk['id']}.content]"
        for word in reply.split(" "):
            yield f"data: {word} \n\n"
            await asyncio.sleep(0.035)

    return StreamingResponse(stream_response(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
