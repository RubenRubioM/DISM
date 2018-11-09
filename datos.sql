-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.0.67-community-nt - MySQL Community Edition (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para dismruben
CREATE DATABASE IF NOT EXISTS `dismruben` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;
USE `dismruben`;

-- Volcando estructura para tabla dismruben.estaciones
CREATE TABLE IF NOT EXISTS `estaciones` (
  `latitud` varchar(50) default NULL,
  `provincia` varchar(50) default NULL,
  `altitud` varchar(50) default NULL,
  `indicativo` varchar(50) default NULL,
  `nombre` varchar(50) default NULL,
  `indsinop` varchar(50) default NULL,
  `longitud` varchar(50) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla dismruben.estaciones: 0 rows
DELETE FROM `estaciones`;
/*!40000 ALTER TABLE `estaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `estaciones` ENABLE KEYS */;

-- Volcando estructura para tabla dismruben.municipios
CREATE TABLE IF NOT EXISTS `municipios` (
  `latitud` varchar(50) default NULL,
  `id_old` varchar(50) default NULL,
  `url` varchar(50) default NULL,
  `latitud_dec` varchar(50) default NULL,
  `altitud` varchar(50) default NULL,
  `capital` varchar(50) default NULL,
  `num_hab` varchar(50) default NULL,
  `zona_comarcal` varchar(50) default NULL,
  `destacada` varchar(50) default NULL,
  `nombre` varchar(50) default NULL,
  `longitud_dec` varchar(50) default NULL,
  `id` varchar(50) default NULL,
  `longitud` varchar(50) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla dismruben.municipios: 0 rows
DELETE FROM `municipios`;
/*!40000 ALTER TABLE `municipios` DISABLE KEYS */;
/*!40000 ALTER TABLE `municipios` ENABLE KEYS */;

-- Volcando estructura para tabla dismruben.observaciones
CREATE TABLE IF NOT EXISTS `observaciones` (
  `idema` varchar(50) default NULL,
  `lon` varchar(50) default NULL,
  `fint` varchar(50) default NULL,
  `prec` varchar(50) default NULL,
  `alt` varchar(50) default NULL,
  `vmax` varchar(50) default NULL,
  `vv` varchar(50) default NULL,
  `dv` varchar(50) default NULL,
  `lat` varchar(50) default NULL,
  `dmax` varchar(50) default NULL,
  `ubi` varchar(50) default NULL,
  `hr` varchar(50) default NULL,
  `tamin` varchar(50) default NULL,
  `ta` varchar(50) default NULL,
  `tamax` varchar(50) default NULL,
  `tpr` varchar(50) default NULL,
  `rviento` varchar(50) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla dismruben.observaciones: 0 rows
DELETE FROM `observaciones`;
/*!40000 ALTER TABLE `observaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `observaciones` ENABLE KEYS */;

-- Volcando estructura para tabla dismruben.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `identificador` int(11) NOT NULL auto_increment,
  `nombre` varchar(45) default NULL,
  `apellidos` varchar(45) default NULL,
  `clave` varchar(10) default NULL,
  PRIMARY KEY  (`identificador`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla dismruben.usuarios: 2 rows
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`identificador`, `nombre`, `apellidos`, `clave`) VALUES
	(1, 'Hugo', 'S', '1'),
	(2, 'Estela', 'S', '2');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
