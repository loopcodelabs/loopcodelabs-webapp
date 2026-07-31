# Collaborative Development & Multi-Environment CI/CD Guide

Welcome to the development workflow guide. This document details how to collaborate effectively on your local machine using **VS Code**, how branches map to your environments (**Dev**, **Stage**, and **Prod**), and how the **GitHub Actions** CI/CD pipeline automates verification and deployments.

---

## 🚀 1. Local Machine Setup & Collaboration

To set up the project locally and begin collaborating with other developers:

### Prerequisites
- **Node.js** (v18.0.0 or higher) or **Bun** (v1.0 or higher)
- **VS Code** (Visual Studio Code)

### Setup Steps
1. **Clone the Repository** to your local machine:
   ```bash
   git clone <your-github-repo-url>
   cd <your-repo-folder>
   ```

2. **Run the Interactive Setup Script**:
   We have included an automated helper script (`setup-local.sh`) that installs dependencies and prepares environment files.
   ```bash
   # On macOS/Linux:
   chmod +x setup-local.sh
   ./setup-local.sh

   # On Windows (Git Bash):
   ./setup-local.sh
   ```

3. **Configure Environment Secrets**:
   Open the newly created `.env` file in VS Code and supply any necessary keys (like `GEMINI_API_KEY`).

4. **Start the Development Server**:
   ```bash
   npm run dev
   # Or using Bun:
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view your local dev instance.

---

## 👥 2. VS Code Real-Time Collaboration (Live Share)

To collaborate in real-time on your local machine without pushing code constantly:

1. **Install Live Share Extension**:
   Search for and install the **Live Share** Extension Pack by Microsoft in the VS Code Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).

2. **Start a Collaboration Session**:
   - Click the **Live Share** button in the VS Code Status Bar (or the Live Share panel in the left sidebar).
   - Sign in with your GitHub or Microsoft account.
   - Click **Start Collaboration Session**. This will copy a secure join link to your clipboard.

3. **Invite Collaborators**:
   - Send the link to other developers.
   - When they join, they can view/edit code, share terminals, and co-debug ports safely.

4. **Share Your Local Server**:
   If you have started the dev server on port `3000`, share it through Live Share so collaborators can view the live site inside their local browser or inside VS Code:
   - Go to the Live Share panel -> Click **Shared Servers** -> Add Port `3000`.

---

## 🗺️ 3. Branching & Three-Environment Architecture

We use a standard Git branching model where each environment corresponds to a persistent Git branch:

```
                      [Feature Branches (feature/*)]
                                 │   │
                                 ▼   ▼ (Merge PR to Dev)
┌────────────────────────────────────────────────────────────────────────┐
│  DEV BRANCH (dev)      ──► Auto-deploy to Dev Environment              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼ (Merge PR to Stage)
┌────────────────────────────────────────────────────────────────────────┐
│  STAGE BRANCH (stage)  ──► Auto-deploy to Staging Environment          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼ (Merge PR to Main)
┌────────────────────────────────────────────────────────────────────────┐
│  MAIN BRANCH (main)    ──► Auto-deploy to Production Environment       │
└────────────────────────────────────────────────────────────────────────┘
```

1. **`dev` branch**:
   - Used for integrating active developments.
   - Automatically deploys to your **Development environment**.
2. **`stage` branch**:
   - Used for pre-production quality assurance, client reviews, and staging.
   - Automatically deploys to your **Staging environment**.
3. **`main` branch**:
   - Holds the clean, tested, production-ready code.
   - Automatically deploys to your **Production environment**.

---

## 🛠️ 4. GitHub Actions CI/CD Pipeline Setup

Our pre-configured CI/CD workflow file is located at `.github/workflows/ci-cd.yml`. It performs the following steps automatically:
- Triggered on any **Push** or **Pull Request** targeting `dev`, `stage`, or `main`.
- **Validation Job**: Restores Cached Node Modules -> Runs Linter (`tsc --noEmit`) -> Runs Production Build (`npm run build`).
- **Deploy Jobs**: If the build succeeds and it's a push to `dev`, `stage`, or `main`, it targets the respective Deployment step.

### Step-by-Step GitHub Configuration

To make the environment deployment fully operational:

1. **Set Up Environments in GitHub**:
   - Go to your repository on GitHub.
   - Click **Settings** -> **Environments**.
   - Create three environments named exactly:
     - `dev`
     - `stage`
     - `prod`

2. **Add Environment Secrets**:
   Each environment can have its own dedicated secrets (e.g., separate database credentials or specific API keys):
   - In **Settings** -> **Environments** -> Click on `dev` -> Under **Environment secrets**, add `GEMINI_API_KEY`.
   - Repeat for `stage` and `prod` with their corresponding environment-specific values.

3. **Configure Deployment Actions in `.github/workflows/ci-cd.yml`**:
   The workflow contains deployment job placeholders for `deploy_dev`, `deploy_stage`, and `deploy_prod`. Customize these steps with your chosen cloud or server provider's action (such as GCP Cloud Run, AWS ECS/S3, Vercel, or Heroku):
   - **Example for Google Cloud Run deployment**:
     ```yaml
     uses: google-github-actions/deploy-cloudrun@v2
     with:
       service: react-fullstack-${{ env.ENV_NAME }}
       region: us-central1
     ```

---

## ⚙️ 5. Managing Different Environments Locally

To run the local server mirroring a specific environment's configurations:
- **Default (Local Dev)**: `npm run dev` loads the standard `.env` variables.
- **Specifying Environment Config**:
  To force load specific settings (e.g. staging values) on your local machine, run with custom environment prefixes:
  ```bash
  # Example to run with staging context
  NODE_ENV=staging npm run dev
  ```
