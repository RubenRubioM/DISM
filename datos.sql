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


-- Volcando estructura de base de datos para dism
CREATE DATABASE IF NOT EXISTS `dism` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dism`;

-- Volcando estructura para tabla dism.estaciones
CREATE TABLE IF NOT EXISTS `estaciones` (
  `latitud` varchar(50) default NULL,
  `provincia` varchar(50) default NULL,
  `altitud` varchar(50) default NULL,
  `indicativo` varchar(50) default NULL,
  `nombre` varchar(50) default NULL,
  `indsinop` varchar(50) default NULL,
  `longitud` varchar(50) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla dism.municipios
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

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla dism.observaciones
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

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla dism.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `identificador` int(11) NOT NULL auto_increment,
  `nombre` varchar(45) default NULL,
  `apellidos` varchar(45) default NULL,
  `clave` varchar(10) default NULL,
  PRIMARY KEY  (`identificador`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
