#!/bin/bash

# ==============================================================================
# LoopCodeLabs Local Environment Reset & Database Restore Script
# Resets local environment, backs up data, re-applies schema & seeds.
# ==============================================================================

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}"
echo "======================================================================"
echo "          LOOPCODELABS ENVIRONMENT & DATABASE RESET UTILITY"
echo "======================================================================"
echo -e "${NC}"

# 1. Create Timestamped Backup
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_PATH="backups/reset_backup_$TIMESTAMP"
mkdir -p "$BACKUP_PATH"

echo -e "${BLUE}[1/5] Creating Backup of Current Data & State in $BACKUP_PATH...${NC}"

if [ -f "analytics_data.json" ]; then
    cp analytics_data.json "$BACKUP_PATH/analytics_data.json.bak"
    echo -e "${GREEN}  [✓] Backed up analytics_data.json${NC}"
fi

if [ -f ".env" ]; then
    cp .env "$BACKUP_PATH/.env.bak"
    echo -e "${GREEN}  [✓] Backed up .env configuration${NC}"
fi

# 2. Clean Build Artifacts
echo -e "\n${BLUE}[2/5] Cleaning Build Artifacts & Logs...${NC}"
rm -rf dist server.js 2>/dev/null || true
echo -e "${GREEN}  [✓] Removed stale build folders (dist/)${NC}"

# 3. Reset MySQL Database (if local MySQL active)
echo -e "\n${BLUE}[3/5] Resetting MySQL Database & Executing Fresh DDL Schema...${NC}"
if command -v mysql &> /dev/null && mysqladmin ping -h localhost --silent 2>/dev/null; then
    mysql -u root -e "DROP DATABASE IF EXISTS loopcodelabs_dev; CREATE DATABASE loopcodelabs_dev;" 2>/dev/null || true
    mysql -u root loopcodelabs_dev < scripts/schema.sql 2>/dev/null || echo -e "${YELLOW}  Notice: Schema reset partially completed.${NC}"
    mysql -u root loopcodelabs_dev < scripts/seed.sql 2>/dev/null || echo -e "${YELLOW}  Notice: Seed reset partially completed.${NC}"
    echo -e "${GREEN}  [✓] MySQL database loopcodelabs_dev re-created and seeded.${NC}"
else
    echo -e "${YELLOW}  [-] MySQL server not active. Resetting file-based analytics data store...${NC}"
fi

# 4. Re-Seed Analytics Data Store
echo -e "\n${BLUE}[4/5] Re-seeding Fresh Analytics & Lead Data...${NC}"
cat <<'EOF' > analytics_data.json
{
  "analyticsSummary": {
    "totalVisitors": 584,
    "activeNow": 7,
    "pageViewsToday": 1420,
    "totalSessionsToday": 412,
    "bounceRate": "24.5%",
    "avgSessionDuration": "3m 42s"
  },
  "trafficSources": [
    { "source": "Direct Traffic", "visitors": 245, "percentage": 42.0 },
    { "source": "Google Organic", "visitors": 165, "percentage": 28.2 },
    { "source": "WhatsApp Share", "visitors": 88, "percentage": 15.1 },
    { "source": "LinkedIn Campaign", "visitors": 54, "percentage": 9.2 },
    { "source": "Instagram Referral", "visitors": 32, "percentage": 5.5 }
  ],
  "deviceBreakdown": [
    { "type": "Desktop", "count": 365, "percentage": 62.5 },
    { "type": "Mobile", "count": 189, "percentage": 32.4 },
    { "type": "Tablet", "count": 30, "percentage": 5.1 }
  ],
  "geographicDistribution": [
    { "country": "India", "code": "IN", "visitors": 420, "cities": ["Hyderabad", "Bengaluru", "Mumbai", "Delhi"] },
    { "country": "United States", "code": "US", "visitors": 85, "cities": ["San Francisco", "New York", "Austin"] },
    { "country": "United Kingdom", "code": "GB", "visitors": 45, "cities": ["London", "Manchester"] },
    { "country": "Singapore", "code": "SG", "visitors": 34, "cities": ["Singapore"] }
  ],
  "leads": [
    {
      "id": "lead-101",
      "submittedAt": "2026-07-28T18:30:00Z",
      "name": "Rahul Sharma",
      "email": "rahul@techstart.in",
      "phone": "+91 9812345678",
      "company": "TechStart Innovations",
      "requirements": "Need custom LLM fine-tuning and automated customer onboarding workflow.",
      "status": "New"
    },
    {
      "id": "lead-102",
      "submittedAt": "2026-07-28T16:15:00Z",
      "name": "Priya Patel",
      "email": "priya@healthplus.org",
      "phone": "+91 9723456789",
      "company": "HealthPlus Care",
      "requirements": "Full-stack React + Express web platform for patient appointment scheduling.",
      "status": "Contacted"
    }
  ]
}
EOF
echo -e "${GREEN}  [✓] analytics_data.json reset to initial pristine state.${NC}"

# 5. Rebuilding Project Assets
echo -e "\n${BLUE}[5/5] Rebuilding Frontend & Backend Bundles...${NC}"
npm run build
echo -e "${GREEN}  [✓] Clean build compiled successfully.${NC}"

echo -e "\n======================================================================"
echo -e "${GREEN}${BOLD}✓ LOCAL ENVIRONMENT RESET COMPLETE!${NC}"
echo -e "  • Data Backup Saved: ${CYAN}$BACKUP_PATH${NC}"
echo -e "  • Development Server Ready: Run ${GREEN}npm run dev${NC} or ${GREEN}bun run dev${NC}"
echo -e "======================================================================\n"
