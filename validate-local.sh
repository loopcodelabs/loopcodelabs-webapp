#!/bin/bash

# ==============================================================================
# LoopCodeLabs Local Environment Validation Script
# Verifies environment, database, build status, directory structures, and APIs.
# ==============================================================================

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

PASSED_COUNT=0
FAILED_COUNT=0
WARNING_COUNT=0

log_pass() {
    echo -e "  [${GREEN}PASS${NC}] $1"
    PASSED_COUNT=$((PASSED_COUNT+1))
}

log_fail() {
    echo -e "  [${RED}FAIL${NC}] $1"
    FAILED_COUNT=$((FAILED_COUNT+1))
}

log_warn() {
    echo -e "  [${YELLOW}WARN${NC}] $1"
    WARNING_COUNT=$((WARNING_COUNT+1))
}

echo -e "${CYAN}${BOLD}"
echo "======================================================================"
echo "         LOOPCODELABS ENVIRONMENT VALIDATION & DIAGNOSTICS"
echo "======================================================================"
echo -e "${NC}"

# 1. Tooling Verification
echo -e "${BOLD}1. Checking Tooling & Runtime Environment:${NC}"
if command -v node &>/dev/null; then log_pass "Node.js installed ($(node -v))"; else log_fail "Node.js not found"; fi
if command -v npm &>/dev/null || command -v bun &>/dev/null; then log_pass "Package Manager (npm/bun) detected"; else log_fail "Package Manager missing"; fi
if command -v git &>/dev/null; then log_pass "Git version control found"; else log_warn "Git binary not in PATH"; fi

# 2. Configuration & Secrets
echo -e "\n${BOLD}2. Checking Configuration & Secrets:${NC}"
if [ -f ".env" ]; then log_pass ".env configuration file exists"; else log_fail ".env file missing"; fi
if [ -f ".env.example" ]; then log_pass ".env.example exists"; else log_warn ".env.example missing"; fi
if grep -q "JWT_SECRET" .env 2>/dev/null; then log_pass "JWT_SECRET configured"; else log_fail "JWT_SECRET missing from .env"; fi

# 3. Directory Structures
echo -e "\n${BOLD}3. Checking File Storage & Directories:${NC}"
REQUIRED_DIRS=("uploads" "logs" "exports" "analytics" "temp" "cache" "reports" "images" "thumbnails" "backups")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        log_pass "Directory exists: $dir/"
    else
        log_fail "Directory missing: $dir/"
    fi
done

# 4. Data Stores & Schema Integrity
echo -e "\n${BOLD}4. Checking Data Stores & Schema Files:${NC}"
if [ -f "scripts/schema.sql" ]; then log_pass "MySQL Schema DDL script (scripts/schema.sql) exists"; else log_fail "scripts/schema.sql missing"; fi
if [ -f "scripts/seed.sql" ]; then log_pass "MySQL Seed data script (scripts/seed.sql) exists"; else log_fail "scripts/seed.sql missing"; fi
if [ -f "analytics_data.json" ]; then log_pass "Analytics Data Store (analytics_data.json) present"; else log_fail "analytics_data.json missing"; fi

# 5. Application Build Verification
echo -e "\n${BOLD}5. Checking Build Artifacts:${NC}"
if [ -f "dist/server.cjs" ]; then log_pass "Compiled backend server exists (dist/server.cjs)"; else log_warn "dist/server.cjs not built (Run 'npm run build')"; fi
if [ -f "dist/index.html" ]; then log_pass "Compiled frontend SPA exists (dist/index.html)"; else log_warn "dist/index.html not built (Run 'npm run build')"; fi

# 6. Service API Connectivity (If server running)
echo -e "\n${BOLD}6. Checking API Health Connectivity:${NC}"
if command -v curl &>/dev/null; then
    HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health 2>/dev/null || echo "000")
    if [ "$HEALTH_STATUS" = "200" ]; then
        log_pass "Dev Server is live & responding at http://localhost:3000/api/health (HTTP 200)"
    else
        log_warn "Dev Server not currently running on port 3000 (HTTP status: $HEALTH_STATUS). Run 'npm run dev' to start."
    fi
else
    log_warn "curl unavailable to perform live HTTP API ping"
fi

# Summary Report
echo -e "\n======================================================================"
echo -e "${BOLD}VALIDATION REPORT SUMMARY:${NC}"
echo -e "  • ${GREEN}Passed Checks:${NC}  $PASSED_COUNT"
echo -e "  • ${YELLOW}Warnings:${NC}       $WARNING_COUNT"
echo -e "  • ${RED}Failed Checks:${NC}  $FAILED_COUNT"
echo -e "======================================================================"

if [ $FAILED_COUNT -eq 0 ]; then
    echo -e "${GREEN}${BOLD}✓ ALL SYSTEM VALIDATIONS PASSED! Your local environment is healthy.${NC}\n"
    exit 0
else
    echo -e "${RED}${BOLD}✖ VALIDATION ISSUES DETECTED. Please inspect failed items above.${NC}\n"
    exit 1
fi
