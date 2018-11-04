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

-- Volcando datos para la tabla dism.estaciones: 2 rows
/*!40000 ALTER TABLE `estaciones` DISABLE KEYS */;
INSERT INTO `estaciones` (`latitud`, `provincia`, `altitud`, `indicativo`, `nombre`, `indsinop`, `longitud`) VALUES
	('431825N', 'A CORUÑA', '98', '1387E', 'A CORUÑA AEROPUERTO', '08002', '082219W'),
	('433123N', 'ASTURIAS', '26', '1207U', 'GIJÓN, CAMPUS', '08014', '053716W');
/*!40000 ALTER TABLE `estaciones` ENABLE KEYS */;

-- Volcando datos para la tabla dism.municipios: 2 rows
/*!40000 ALTER TABLE `municipios` DISABLE KEYS */;
INSERT INTO `municipios` (`latitud`, `id_old`, `url`, `latitud_dec`, `altitud`, `capital`, `num_hab`, `zona_comercal`, `destacada`, `nombre`, `longitud_dec`, `id`, `longitud`) VALUES
	('40º32\'54.450744"', '44004', 'ababuj-id44001', '40.54845854', '1372', 'Ababuj', '65', '624401', '0', 'Ababuj', '-0.80780117', 'id44001', '-0º48\'28.084212"'),
	('40º54\'58.824504"', '40004', 'Madrid-id40001', '40.91634014', '971', 'Madrid', '65281', '674001', '0', 'Madrid', '-0.90780117', 'id40001', '-0º70\'28.084212"');
/*!40000 ALTER TABLE `municipios` ENABLE KEYS */;

-- Volcando datos para la tabla dism.observaciones: 2 rows
/*!40000 ALTER TABLE `observaciones` DISABLE KEYS */;
INSERT INTO `observaciones` (`idema`, `lon`, `fint`, `prec`, `alt`, `vmax`, `vv`, `dv`, `lat`, `dmax`, `ubi`, `hr`, `tamin`, `ta`, `tamax`, `tpr`, `rviento`) VALUES
	('0002I', '0.871385', '2018-11-03T10:00:00', '0', '32', '13.4', '6.3', '311', ' 40.95806', '324', 'VANDELLÓS', '48', '12.6', '13.7', '13.7', '2.9', '250'),
	('1387E', '0.871385', '2018-11-03T10:00:00', '0', '32', '13.4', '6.3', '311', ' 40.95806', '324', 'A Coruña', '48', '12.6', '13.7', '13.7', '2.9', '250');
/*!40000 ALTER TABLE `observaciones` ENABLE KEYS */;

-- Volcando datos para la tabla dism.usuarios: 2 rows
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`identificador`, `nombre`, `apellidos`, `clave`) VALUES
	(1, 'Hugo', 'S', '1'),
	(2, 'Estela', 'S', '2');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
