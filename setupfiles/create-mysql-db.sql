CREATE DATABASE IF NOT EXISTS peoples_river_stories CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE peoples_river_stories;

CREATE TABLE IF NOT EXISTS `moderators` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `moments` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `short_id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` text COLLATE utf8mb4_unicode_ci,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `short_id` (`short_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `votes` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `moment_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moderator_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_status` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `moment_id` (`moment_id`),
  KEY `moderator_id` (`moderator_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moments` (`id`),
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`moderator_id`) REFERENCES `moderators` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
