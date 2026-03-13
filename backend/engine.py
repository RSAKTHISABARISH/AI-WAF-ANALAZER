import random
import datetime
import asyncio
from typing import List, Dict, Any

PATHS = ['/api/v1/user', '/login', '/admin/panel', '/config/.env', '/auth/v2', '/wp-admin', '/etc/passwd', '/v3/data']

LOCATIONS = [
    {"city": "Sao Paulo", "country": "Brazil", "lat": -23.55, "lon": -46.63, "code": "BR"},
    {"city": "Moscow", "country": "Russia", "lat": 55.75, "lon": 37.61, "code": "RU"},
    {"city": "Beijing", "country": "China", "lat": 39.90, "lon": 116.40, "code": "CN"},
    {"city": "Kyiv", "country": "Ukraine", "lat": 50.45, "lon": 30.52, "code": "UA"},
    {"city": "New Delhi", "country": "India", "lat": 28.61, "lon": 77.20, "code": "IN"},
    {"city": "New York", "country": "USA", "lat": 40.71, "lon": -74.00, "code": "US"},
    {"city": "Berlin", "country": "Germany", "lat": 52.52, "lon": 13.40, "code": "DE"},
    {"city": "Cyber Hub", "country": "Anonymous Proxy", "lat": 0, "lon": 0, "code": "PROXY"}
]

class ThreatEngine:
    def __init__(self):
        self.total_scanned: int = 0
        self.threats_blocked: int = 0
        self.requests: List[Dict[str, Any]] = []
        self.rules: List[Dict[str, Any]] = [
            {"id": 1, "type": "STATIC", "name": "SQL_INJECT_V1", "severity": "CRITICAL"},
            {"id": 2, "type": "STATIC", "name": "XSS_FILTER_G1", "severity": "HIGH"},
            {"id": 3, "type": "ADAPTIVE", "name": "RATE_LIMIT_AUTO", "severity": "MEDIUM"},
        ]
        self.is_learning = True
        self.ip_metrics: Dict[str, Dict[str, Any]] = {}
        self.insights: List[str] = [
            "Neural Engine initialized. Monitoring traffic...",
            "System scanning for coordinated behavioral patterns."
        ]

    def generate_ip(self):
        return ".".join(map(str, (random.randint(0, 255) for _ in range(4))))

    def generate_request(self):
        is_malicious = random.random() < 0.15
        request_id = ''.join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=5))
        ip = self.generate_ip()
        location = random.choice(LOCATIONS)
        
        # Behavioral Logic
        if ip not in self.ip_metrics:
            self.ip_metrics[ip] = {"count": 0, "paths": set(), "malicious": 0}
        
        self.ip_metrics[ip]["count"] += 1
        path = random.choice(PATHS)
        self.ip_metrics[ip]["paths"].add(path)
        if is_malicious:
            self.ip_metrics[ip]["malicious"] += 1

        reputation = "CLEAN"
        if self.ip_metrics[ip]["count"] > 3: reputation = "SUSPECT"
        if self.ip_metrics[ip]["malicious"] > 1: reputation = "BOT"
        if self.ip_metrics[ip]["count"] > 10: 
            reputation = "COORD_DDOS"
            if len(self.insights) < 10 or random.random() > 0.9:
                self.insights.insert(0, f"DETECTED: Potential DDoS burst from {ip}")

        req = {
            "id": request_id,
            "time": datetime.datetime.now().strftime("%H:%M:%S"),
            "ip": ip,
            "path": path,
            "status": "BLOCKED" if is_malicious else "ALLOWED",
            "score": random.randint(75, 100) if is_malicious else random.randint(0, 20),
            "geo": location,
            "reputation": reputation
        }

        self.total_scanned += 1
        if is_malicious:
            self.threats_blocked += 1
            if self.is_learning and random.random() > 0.8 and len(self.rules) < 15:
                # Advanced pattern insight
                pattern_type = "SQLi" if "v1" in path or "admin" in path else "XSS"
                self.insights.insert(0, f"BLOCK: Coordinated {pattern_type} attack from {location['country']}")
                
                self.rules.insert(0, {
                    "id": int(datetime.datetime.now().timestamp()),
                    "type": "ADAPTIVE",
                    "name": f"BEHAVIOR_{location['code']}_{request_id}",
                    "severity": "HIGH"
                })

        self.requests.insert(0, req)
        self.requests = self.requests[:20]
        self.insights = self.insights[:8]
        return req

    def get_stats(self):
        efficiency = 100.0
        if self.total_scanned > 0:
            efficiency = round(((self.total_scanned - self.threats_blocked) / self.total_scanned) * 100, 1)
        
        status = "STABLE"
        if len(self.requests) > 0 and self.requests[0]["status"] == "BLOCKED":
            status = "ELEVATED"

        return {
            "total": self.total_scanned,
            "blocked": self.threats_blocked,
            "status": status,
            "efficiency": f"{efficiency}%"
        }

    def flush_db(self):
        self.rules = [
            {"id": 1, "type": "STATIC", "name": "SQL_INJECT_V1", "severity": "CRITICAL"},
            {"id": 2, "type": "STATIC", "name": "XSS_FILTER_G1", "severity": "HIGH"},
            {"id": 3, "type": "ADAPTIVE", "name": "RATE_LIMIT_AUTO", "severity": "MEDIUM"},
        ]

    def purge_logs(self):
        self.requests = []
        self.total_scanned = 0
        self.threats_blocked = 0

engine = ThreatEngine()
