-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para pos_bd
CREATE DATABASE IF NOT EXISTS `pos_bd` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `pos_bd`;

-- Volcando estructura para tabla pos_bd.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(60) COLLATE utf8_bin NOT NULL,
  `telefono` varchar(20) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Volcando datos para la tabla pos_bd.clientes: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`id`, `cliente`, `telefono`) VALUES
	(1, 'Luis Noe', '97432397'),
	(3, 'Juan Paguada', '98754352'),
	(5, 'Pancho Oseguera', '0978787'),
	(6, 'Pedro Lopez', '98754353');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando estructura para tabla pos_bd.dispositivos
CREATE TABLE IF NOT EXISTS `dispositivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dispositivo` varchar(50) COLLATE utf8_bin NOT NULL,
  `comercio` varchar(50) COLLATE utf8_bin NOT NULL,
  `inventario` varchar(50) COLLATE utf8_bin NOT NULL,
  `cliente` varchar(60) COLLATE utf8_bin NOT NULL,
  `modelo` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Volcando datos para la tabla pos_bd.dispositivos: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
INSERT INTO `dispositivos` (`id`, `dispositivo`, `comercio`, `inventario`, `cliente`, `modelo`) VALUES
	(2, '09756765676', 'Puma Roca', 'REGIS:309Q', '3', 'VX4520'),
	(3, '09756765676', 'Super Teinda la Masisa', '0968TGUHBJN', '1', 'VX620'),
	(4, '7764564', 'Motocross Tienda', '0898ty7u678', '3', 'VX765');
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;

-- Volcando estructura para tabla pos_bd.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `fullname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Volcando datos para la tabla pos_bd.users: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `fullname`) VALUES
	(1, 'Luis', '$2a$08$Q4ldTUjFxPTzxqIsIX7CnOGm8gTmHzmJQN0EEmDMvpQqCNSnLplca', 'Juan'),
	(2, 'Luis', '$2a$08$oTUr0887rbmfCJDztNNXB.fQ8K1gvqe9zHvIpydaELkhYPhip5c3C', ''),
	(3, 'Noe', '$2a$08$Z6bl1xVs1Sf5F85aPR37EuAWmz0CA.R1gfmLceFcYJitW9A3RIrpe', 'PANCHO'),
	(4, '1', '12345678', ''),
	(5, 'Luis', '$2a$08$bm914o5q..kUSyQWr3toU.juvhTue.EVPvZY5GstYH4Xbt4e4OTTi', ''),
	(6, 'admin', '$2a$08$ADXemSoSA5UV2gLQ5e6Uye.Roetsxsf9.V77TJ6rdd7Ly462t42h6', 'Luis Noe Rodriguez');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
