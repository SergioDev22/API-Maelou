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
  `mdp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table maelou. alerte
DROP TABLE IF EXISTS `alerte`;
CREATE TABLE IF NOT EXISTS `alerte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `longitude` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `id_Utilisateur` int NOT NULL,
  `id_Type` int NOT NULL,
  `id_Status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Alerte_Utilisateur_FK` (`id_Utilisateur`),
  KEY `Alerte_Type0_FK` (`id_Type`),
  KEY `Alerte_Status1_FK` (`id_Status`),
  CONSTRAINT `Alerte_Status1_FK` FOREIGN KEY (`id_Status`) REFERENCES `status` (`id`),
  CONSTRAINT `Alerte_Type0_FK` FOREIGN KEY (`id_Type`) REFERENCES `type` (`id`),
  CONSTRAINT `Alerte_Utilisateur_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table maelou. checker
DROP TABLE IF EXISTS `checker`;
CREATE TABLE IF NOT EXISTS `checker` (
  `id` int NOT NULL,
  `id_Admin` int NOT NULL,
  PRIMARY KEY (`id`,`id_Admin`),
  KEY `checker_Admin0_FK` (`id_Admin`),
  CONSTRAINT `checker_Admin0_FK` FOREIGN KEY (`id_Admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `checker_Alerte_FK` FOREIGN KEY (`id`) REFERENCES `alerte` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table maelou. status
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de table maelou. type
DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
