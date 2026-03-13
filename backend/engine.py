import random
import datetime
import asyncio
from typing import List, Dict, Any

PATHS = ['/api/v1/user', '/login', '/admin/panel', '/config/.env', '/auth/v2', '/wp-admin', '/etc/passwd', '/v3/data']

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

    def generate_ip(self):
        return ".".join(map(str, (random.randint(0, 255) for _ in range(4))))

    def generate_request(self):
        is_malicious = random.random() < 0.15
        request_id = ''.join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=5))
        
        req = {
            "id": request_id,
            "time": datetime.datetime.now().strftime("%H:%M:%S"),
            "ip": self.generate_ip(),
            "path": random.choice(PATHS),
            "status": "BLOCKED" if is_malicious else "ALLOWED",
            "score": random.randint(75, 100) if is_malicious else random.randint(0, 20)
        }

        self.total_scanned += 1
        if is_malicious:
            self.threats_blocked += 1
            if self.is_learning and random.random() > 0.8 and len(self.rules) < 15:
                self.rules.insert(0, {
                    "id": int(datetime.datetime.now().timestamp()),
                    "type": "ADAPTIVE",
                    "name": f"SIG_{request_id}",
                    "severity": "HIGH"
                })

        self.requests.insert(0, req)
        self.requests = self.requests[:20]
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
