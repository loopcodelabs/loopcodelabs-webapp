-- LoopCodeLabs Seed Data Script
-- Populates loopcodelabs_dev with realistic production-like sample data

USE `loopcodelabs_dev`;

-- 1. Insert Roles & Permissions
INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'Super Admin', 'Full system control and configuration access'),
(2, 'Admin', 'Administrative access to analytics, content, and leads'),
(3, 'Editor', 'Can manage website content, services, portfolio, and blogs'),
(4, 'Viewer', 'Read-only access to analytics and dashboards')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 2. Insert Core Users
INSERT INTO `users` (`uuid`, `email`, `password_hash`, `full_name`, `role_id`, `avatar_url`) VALUES
('usr-admin-001', 'admin@loopcodelabs.com', '$2b$10$e8N83Z08XgH.VnF2b5kZ0e7k0Lq1g3s.E9K7g8s9F0g1', 'Chief Administrator', 1, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
('usr-admin-002', 'techlead@loopcodelabs.com', '$2b$10$e8N83Z08XgH.VnF2b5kZ0e7k0Lq1g3s.E9K7g8s9F0g1', 'Technical Director', 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('usr-admin-003', 'analytics@loopcodelabs.com', '$2b$10$e8N83Z08XgH.VnF2b5kZ0e7k0Lq1g3s.E9K7g8s9F0g1', 'Analytics Specialist', 2, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
('usr-admin-004', 'editor@loopcodelabs.com', '$2b$10$e8N83Z08XgH.VnF2b5kZ0e7k0Lq1g3s.E9K7g8s9F0g1', 'Content Editor', 3, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
('usr-admin-005', 'demo@loopcodelabs.com', '$2b$10$e8N83Z08XgH.VnF2b5kZ0e7k0Lq1g3s.E9K7g8s9F0g1', 'Demo User', 4, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`);

-- 3. Insert Website Services
INSERT INTO `services` (`id`, `title`, `slug`, `description`, `icon`, `features_json`, `order_index`) VALUES
('srv-001', 'Enterprise AI Integration', 'enterprise-ai-integration', 'Deploy custom Large Language Models, RAG pipelines, and automated intelligence across your organization.', 'Bot', '["Custom LLM Fine-Tuning", "Retrieval Augmented Generation", "Semantic Vector Search", "Private Cloud Deployment"]', 1),
('srv-002', 'Full-Stack Web Engineering', 'full-stack-web-engineering', 'High-performance cloud-native web applications built with React, TypeScript, Express, and microservices.', 'Code', '["Vite + React 19 Frontend", "Express / Node.js Backend API", "Cloud SQL & Firestore Integration", "Sub-100ms API Response"]', 2),
('srv-003', 'Mobile Application Development', 'mobile-application-development', 'Cross-platform iOS and Android apps with native feel, offline persistence, and instant sync.', 'Smartphone', '["React Native & Flutter", "Real-Time Push Notifications", "Offline SQLite Storage", "Biometric Security"]', 3),
('srv-004', 'Cloud Infrastructure & DevOps', 'cloud-infrastructure-devops', 'Scalable Cloud Run & GCP architecture with automated CI/CD pipelines and 99.99% uptime guarantee.', 'Cloud', '["Google Cloud Platform", "Kubernetes & Docker Containers", "Terraform Infrastructure", "24/7 Monitoring & Alerting"]', 4)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 4. Insert Portfolio Projects
INSERT INTO `portfolio` (`id`, `title`, `category`, `image_url`, `description`, `tech_stack_json`, `live_url`) VALUES
('port-001', 'FinTech Analytics Engine', 'Enterprise App', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', 'Real-time financial analytics dashboard handling 1M+ transactions daily.', '["React", "TypeScript", "Express", "PostgreSQL", "Tailwind CSS"]', 'https://example.com/fintech'),
('port-002', 'HealthTech Patient Portal', 'Healthcare', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', 'HIPAA-compliant telehealth application with AI diagnostics support.', '["React", "Node.js", "Firebase", "WebRTC"]', 'https://example.com/healthtech'),
('port-003', 'AI Customer Intelligence Hub', 'AI & Machine Learning', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', 'Autonomous agent platform for enterprise customer sentiment analysis.', '["Gemini API", "Express", "Tailwind CSS", "Recharts"]', 'https://example.com/ai-hub')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 5. Insert Website Settings
INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('site_title', 'LoopCodeLabs - Premium AI & Engineering Studio'),
('support_phone', '+919876543210'),
('support_email', 'contact@loopcodelabs.com'),
('whatsapp_number', '+919876543210'),
('whatsapp_default_message', 'Hello LoopCodeLabs! I am interested in building a custom solution.'),
('analytics_enabled', 'true'),
('gdpr_consent_required', 'true')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- 6. Insert Feature Flags
INSERT INTO `feature_flags` (`key_name`, `is_enabled`, `description`) VALUES
('enable_whatsapp_widget', 1, 'Toggle floating WhatsApp chat drawer'),
('enable_ai_agent_modal', 1, 'Toggle AI strategy consultation assistant'),
('enable_live_analytics', 1, 'Enable visitor tracking telemetry'),
('enable_cookie_banner', 1, 'GDPR/DPDP compliance banner')
ON DUPLICATE KEY UPDATE `is_enabled` = VALUES(`is_enabled`);

-- 7. Insert Sample Visitors & Analytics
INSERT INTO `visitors` (`visitor_id`, `ip_address`, `country`, `city`, `browser`, `device_type`, `os`, `landing_page`, `current_url`, `total_sessions`) VALUES
('vst-101', '49.207.210.14', 'India', 'Hyderabad', 'Chrome', 'Desktop', 'Windows', '/', '#services', 12),
('vst-102', '103.21.125.80', 'India', 'Bengaluru', 'Safari', 'Mobile', 'iOS', '/', '#contact', 4),
('vst-103', '182.73.18.2', 'India', 'Mumbai', 'Firefox', 'Desktop', 'macOS', '#pricing', '#pricing', 8),
('vst-104', '74.125.210.1', 'United States', 'San Francisco', 'Chrome', 'Desktop', 'macOS', '#ai-agents', '#ai-agents', 15),
('vst-105', '185.220.101.5', 'United Kingdom', 'London', 'Edge', 'Desktop', 'Windows', '/', '#portfolio', 3)
ON DUPLICATE KEY UPDATE `total_sessions` = VALUES(`total_sessions`);

-- 8. Insert Sample Enquiries & Leads
INSERT INTO `leads` (`id`, `visitor_id`, `session_id`, `name`, `email`, `phone`, `company`, `requirements`, `status`) VALUES
('lead-001', 'vst-101', 'ses-101', 'Rahul Sharma', 'rahul@techstart.in', '+91 9812345678', 'TechStart Innovations', 'Need custom LLM fine-tuning and automated customer onboarding workflow.', 'New'),
('lead-002', 'vst-102', 'ses-102', 'Priya Patel', 'priya@healthplus.org', '+91 9723456789', 'HealthPlus Care', 'Full-stack React + Express web platform for patient appointment scheduling.', 'Contacted'),
('lead-003', 'vst-104', 'ses-104', 'John Miller', 'john@siliconai.io', '+1 415 555 0199', 'Silicon AI Inc', 'Cloud infrastructure optimization & backend microservices development.', 'Qualified')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

-- 9. Daily Analytics Summary Seed
INSERT INTO `analytics_summary_daily` (`summary_date`, `total_visitors`, `total_sessions`, `total_pageviews`, `total_leads`, `avg_duration_sec`, `bounce_rate_pct`) VALUES
(CURRENT_DATE(), 142, 185, 620, 8, 245, 24.50),
(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), 128, 160, 540, 6, 210, 26.10),
(DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), 155, 195, 710, 11, 280, 22.00)
ON DUPLICATE KEY UPDATE `total_visitors` = VALUES(`total_visitors`);
