-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour maelou
DROP DATABASE IF EXISTS `maelou`;
CREATE DATABASE IF NOT EXISTS `maelou` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `maelou`;

-- Listage de la structure de table maelou. admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `grade` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `poste` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nom_utilisateur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isSuper` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Listage de la structure de table maelou. alerte
DROP TABLE IF EXISTS `alerte`;
CREATE TABLE IF NOT EXISTS `alerte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_post` datetime DEFAULT CURRENT_TIMESTAMP,
  `longitude` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cloture` tinyint NOT NULL DEFAULT '0',
  `date_cloture` datetime DEFAULT NULL,
  `id_Utilisateur` int NOT NULL,
  `id_Type` int NOT NULL DEFAULT '1',
  `id_Status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `Alerte_Utilisateur_FK` (`id_Utilisateur`),
  KEY `Alerte_Type0_FK` (`id_Type`),
  KEY `Alerte_Status1_FK` (`id_Status`),
  CONSTRAINT `Alerte_Status1_FK` FOREIGN KEY (`id_Status`) REFERENCES `status` (`id`),
  CONSTRAINT `Alerte_Type0_FK` FOREIGN KEY (`id_Type`) REFERENCES `type` (`id`),
  CONSTRAINT `Alerte_Utilisateur_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Listage de la structure de table maelou. checker
DROP TABLE IF EXISTS `checker`;
CREATE TABLE IF NOT EXISTS `checker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_action` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_Alerte` int NOT NULL,
  `id_Admin` int NOT NULL,
  `action` enum('SETSTATUS','SETFINISH') COLLATE utf8mb4_general_ci NOT NULL,
  `value` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `checker_Admin0_FK` (`id_Admin`),
  KEY `FK_checker_status` (`value`),
  KEY `FK_cheker_alerte` (`id_Alerte`) USING BTREE,
  CONSTRAINT `checker_Admin0_FK` FOREIGN KEY (`id_Admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `checker_Alerte_FK` FOREIGN KEY (`id_Alerte`) REFERENCES `alerte` (`id`),
  CONSTRAINT `FK_checker_status` FOREIGN KEY (`value`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- Listage de la structure de table maelou. status
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table maelou.status : ~5 rows (environ)
INSERT INTO `status` (`id`, `nom`) VALUES
	(1, 'NOUVEAU'),
	(2, 'PRISE'),
	(3, 'EN PROGRES'),
	(4, 'EN ATTENTE'),
	(5, 'TERMINE');

-- Listage de la structure de table maelou. type
DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- Listage de la structure de table maelou. utilisateur
DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `cin` varchar(14) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facebook` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nom_utilisateur` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pdcUrl` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
