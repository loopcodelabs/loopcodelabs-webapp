-- LoopCodeLabs Database Schema Definition (MySQL 8.0+)
-- Database: loopcodelabs_dev

-- CREATE DATABASE IF NOT EXISTS `loopcodelabs_dev` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `loopcodelabs_dev`;

-- 1. Roles & Permissions Table
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(64) NOT NULL UNIQUE,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role_id` INT DEFAULT 2,
  `avatar_url` VARCHAR(255),
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Visitors Table
CREATE TABLE IF NOT EXISTS `visitors` (
  `visitor_id` VARCHAR(64) PRIMARY KEY,
  `first_visit` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_activity` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip_address` VARCHAR(45) NOT NULL,
  `country` VARCHAR(100) DEFAULT 'India',
  `state` VARCHAR(100) DEFAULT 'Telangana',
  `city` VARCHAR(100) DEFAULT 'Hyderabad',
  `time_zone` VARCHAR(50) DEFAULT 'Asia/Kolkata',
  `browser` VARCHAR(50) DEFAULT 'Chrome',
  `browser_version` VARCHAR(20) DEFAULT '126.0',
  `device_type` ENUM('Desktop', 'Mobile', 'Tablet') DEFAULT 'Desktop',
  `os` VARCHAR(50) DEFAULT 'Windows',
  `screen_resolution` VARCHAR(20) DEFAULT '1920x1080',
  `language` VARCHAR(20) DEFAULT 'en-US',
  `initial_referrer` VARCHAR(255) DEFAULT 'Direct',
  `utm_source` VARCHAR(100) NULL,
  `utm_medium` VARCHAR(100) NULL,
  `utm_campaign` VARCHAR(100) NULL,
  `landing_page` VARCHAR(255) DEFAULT '/',
  `current_url` VARCHAR(255) DEFAULT '/',
  `exit_page` VARCHAR(255) DEFAULT '/',
  `total_sessions` INT DEFAULT 1,
  INDEX `idx_visitors_last_act` (`last_activity`),
  INDEX `idx_visitors_country` (`country`),
  INDEX `idx_visitors_device` (`device_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Visitor Sessions Table
CREATE TABLE IF NOT EXISTS `visitor_sessions` (
  `session_id` VARCHAR(64) PRIMARY KEY,
  `visitor_id` VARCHAR(64) NOT NULL,
  `start_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_active_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` DATETIME NULL,
  `duration_seconds` INT DEFAULT 0,
  `pages_visited` INT DEFAULT 1,
  `landing_page` VARCHAR(255) DEFAULT '/',
  `exit_page` VARCHAR(255) DEFAULT '/',
  `traffic_source` ENUM('Organic Search', 'Direct', 'Social Media', 'Referral', 'Paid Campaign') DEFAULT 'Direct',
  `referrer` VARCHAR(255) DEFAULT 'Direct',
  `device` VARCHAR(50) DEFAULT 'Desktop',
  `browser` VARCHAR(50) DEFAULT 'Chrome',
  `country` VARCHAR(100) DEFAULT 'India',
  `city` VARCHAR(100) DEFAULT 'Hyderabad',
  `bounce` TINYINT(1) DEFAULT 1,
  CONSTRAINT `fk_sessions_visitor` FOREIGN KEY (`visitor_id`) REFERENCES `visitors` (`visitor_id`) ON DELETE CASCADE,
  INDEX `idx_sessions_start` (`start_time`),
  INDEX `idx_sessions_source` (`traffic_source`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Page Views Table
CREATE TABLE IF NOT EXISTS `page_views` (
  `id` VARCHAR(64) PRIMARY KEY,
  `session_id` VARCHAR(64) NOT NULL,
  `visitor_id` VARCHAR(64) NOT NULL,
  `page_title` VARCHAR(255) NOT NULL,
  `url_path` VARCHAR(255) NOT NULL,
  `entry_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `exit_time` DATETIME NULL,
  `time_spent_seconds` INT DEFAULT 0,
  `scroll_percentage` INT DEFAULT 0,
  `clicks_count` INT DEFAULT 0,
  CONSTRAINT `fk_pv_session` FOREIGN KEY (`session_id`) REFERENCES `visitor_sessions` (`session_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pv_visitor` FOREIGN KEY (`visitor_id`) REFERENCES `visitors` (`visitor_id`) ON DELETE CASCADE,
  INDEX `idx_pv_path` (`url_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Events & Event Types Table
CREATE TABLE IF NOT EXISTS `event_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `category` VARCHAR(50) DEFAULT 'CTA',
  `description` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `events` (
  `id` VARCHAR(64) PRIMARY KEY,
  `event_name` VARCHAR(100) NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `url_path` VARCHAR(255) NOT NULL,
  `page_title` VARCHAR(255) NOT NULL,
  `visitor_id` VARCHAR(64) NOT NULL,
  `session_id` VARCHAR(64) NOT NULL,
  `metadata_json` JSON NULL,
  CONSTRAINT `fk_events_visitor` FOREIGN KEY (`visitor_id`) REFERENCES `visitors` (`visitor_id`) ON DELETE CASCADE,
  INDEX `idx_events_name` (`event_name`),
  INDEX `idx_events_time` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Click Heatmap Points Table
CREATE TABLE IF NOT EXISTS `click_events` (
  `id` VARCHAR(64) PRIMARY KEY,
  `url_path` VARCHAR(255) NOT NULL,
  `element_tag` VARCHAR(50) DEFAULT 'BUTTON',
  `element_text` VARCHAR(100) DEFAULT '',
  `x_ratio` DECIMAL(5, 4) NOT NULL,
  `y_ratio` DECIMAL(5, 4) NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_click_url` (`url_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Core Web Vitals & Performance Logs
CREATE TABLE IF NOT EXISTS `performance_logs` (
  `id` VARCHAR(64) PRIMARY KEY,
  `page_url` VARCHAR(255) NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `page_load_time_ms` INT DEFAULT 0,
  `fcp_ms` INT DEFAULT 0,
  `lcp_ms` INT DEFAULT 0,
  `ttfb_ms` INT DEFAULT 0,
  INDEX `idx_perf_url` (`page_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Contact Enquiries & Leads Table
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(64) PRIMARY KEY,
  `visitor_id` VARCHAR(64) NOT NULL,
  `session_id` VARCHAR(64) NOT NULL,
  `submitted_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `company` VARCHAR(100) NULL,
  `requirements` TEXT NULL,
  `status` ENUM('New', 'Contacted', 'Qualified', 'Converted', 'Closed') DEFAULT 'New',
  INDEX `idx_leads_email` (`email`),
  INDEX `idx_leads_submitted` (`submitted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Visitor Lead Mapping Table
CREATE TABLE IF NOT EXISTS `visitor_lead_mapping` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `visitor_id` VARCHAR(64) NOT NULL,
  `lead_id` VARCHAR(64) NOT NULL,
  `mapped_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_vlm_visitor` FOREIGN KEY (`visitor_id`) REFERENCES `visitors` (`visitor_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vlm_lead` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Daily Analytics Summary Table
CREATE TABLE IF NOT EXISTS `analytics_summary_daily` (
  `summary_date` DATE PRIMARY KEY,
  `total_visitors` INT DEFAULT 0,
  `total_sessions` INT DEFAULT 0,
  `total_pageviews` INT DEFAULT 0,
  `total_leads` INT DEFAULT 0,
  `avg_duration_sec` INT DEFAULT 0,
  `bounce_rate_pct` DECIMAL(5, 2) DEFAULT 0.00,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Website Content Tables: Services, Portfolio, FAQ, Blogs, Settings
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'Code',
  `features_json` JSON NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `order_index` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `portfolio` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `tech_stack_json` JSON NULL,
  `live_url` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `faq` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `question` VARCHAR(255) NOT NULL,
  `answer` TEXT NOT NULL,
  `category` VARCHAR(50) DEFAULT 'General',
  `order_index` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `feature_flags` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `is_enabled` TINYINT(1) DEFAULT 1,
  `description` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `website_settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` TEXT NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Analytical Summary View
CREATE OR REPLACE VIEW `v_live_visitors_summary` AS
SELECT 
  v.visitor_id,
  v.country,
  v.city,
  v.device_type,
  v.browser,
  v.current_url,
  v.last_activity
FROM `visitors` v
WHERE v.last_activity >= NOW() - INTERVAL 5 MINUTE;
