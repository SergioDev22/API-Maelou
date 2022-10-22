
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
CREATE DATABASE IF NOT EXISTS `maelou` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `maelou`;

-- Listage de la structure de table maelou. Admin
DROP TABLE IF EXISTS `Admin`;
CREATE TABLE IF NOT EXISTS `Admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `grade` varchar(50) NOT NULL,
  `poste` varchar(50) NOT NULL,
  `nom_utilisateur` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `isSuper` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;



-- Listage de la structure de table maelou. Alerte
DROP TABLE IF EXISTS `Alerte`;
CREATE TABLE IF NOT EXISTS `Alerte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_post` datetime DEFAULT current_timestamp(),
  `longitude` varchar(50) NOT NULL,
  `latitude` varchar(50) NOT NULL,
  `cloture` tinyint(4) NOT NULL DEFAULT 0,
  `date_cloture` datetime DEFAULT NULL,
  `id_Utilisateur` int(11) NOT NULL,
  `id_Type` int(11) NOT NULL,
  `id_Status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `Alerte_Status1_FK` (`id_Status`),
  KEY `Alerte_Type0_FK` (`id_Type`),
  KEY `Alerte_Utilisateur_FK` (`id_Utilisateur`),
  CONSTRAINT `Alerte_Status1_FK` FOREIGN KEY (`id_Status`) REFERENCES `Status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Alerte_Type0_FK` FOREIGN KEY (`id_Type`) REFERENCES `Type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Alerte_Utilisateur_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `Utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;



-- Listage de la structure de table maelou. Checker
DROP TABLE IF EXISTS `Checker`;
CREATE TABLE IF NOT EXISTS `Checker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_action` datetime NOT NULL DEFAULT current_timestamp(),
  `id_Alerte` int(11) NOT NULL,
  `id_Admin` int(11) NOT NULL,
  `action` enum('SETSTATUS','SETFINISH') NOT NULL,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_cheker_alerte` (`id_Alerte`) USING BTREE,
  KEY `checker_Admin0_FK` (`id_Admin`),
  KEY `FK_checker_status` (`value`),
  CONSTRAINT `FK_checker_status` FOREIGN KEY (`value`) REFERENCES `Status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checker_Admin0_FK` FOREIGN KEY (`id_Admin`) REFERENCES `Admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checker_Alerte_FK` FOREIGN KEY (`id_Alerte`) REFERENCES `Alerte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;



-- Listage de la structure de table maelou. Status
DROP TABLE IF EXISTS `Status`;
CREATE TABLE IF NOT EXISTS `Status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table maelou.Status : ~5 rows (environ)
INSERT INTO `Status` (`id`, `nom`) VALUES
	(1, 'NOUVEAU'),
	(2, 'PRISE'),
	(3, 'EN PROGRES'),
	(4, 'EN ATTENTE'),
	(5, 'TERMINE');

-- Listage de la structure de table maelou. Type
DROP TABLE IF EXISTS `Type`;
CREATE TABLE IF NOT EXISTS `Type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table maelou.Type : ~2 rows (environ)
INSERT INTO `Type` (`id`, `nom`, `description`) VALUES
	(1, 'SOS', 'Description SOS'),
	(2, 'AIDE', 'Besion d\'aide');

-- Listage de la structure de table maelou. Utilisateur
DROP TABLE IF EXISTS `Utilisateur`;
CREATE TABLE IF NOT EXISTS `Utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `cin` varchar(14) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) NOT NULL,
  `numero_telephone` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `pdcUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
