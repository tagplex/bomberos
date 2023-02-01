-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-09-2022 a las 16:28:13
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `t_muestra`
--
CREATE DATABASE IF NOT EXISTS `t_muestra` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `t_muestra`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--
-- Creación: 11-09-2022 a las 14:24:03
-- Última actualización: 11-09-2022 a las 14:25:14
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `run` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `maiden_name` varchar(100) NOT NULL,
  `date_birth` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `patients`:
--

--
-- Truncar tablas antes de insertar `patients`
--

TRUNCATE TABLE `patients`;
--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`id`, `run`, `first_name`, `last_name`, `maiden_name`, `date_birth`, `created_at`, `updated_at`) VALUES
(1, '17812996-1', 'Kevin', 'Palma', 'Contreras', '1992-06-27', '2022-09-11 16:24:09', '2022-09-11 16:24:09'),
(2, '16055281-6', 'Daniela', 'Ramirez', 'Santander', '1985-03-18', '2022-09-11 16:24:09', '2022-09-11 16:24:09'),
(3, '21543930-5', 'Benjamin', 'Palma', 'Contreras', '2004-04-04', '2022-09-11 16:24:54', '2022-09-11 16:24:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `results`
--
-- Creación: 11-09-2022 a las 14:23:39
-- Última actualización: 11-09-2022 a las 14:23:39
--

DROP TABLE IF EXISTS `results`;
CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `id_patient` int(11) NOT NULL,
  `date` date NOT NULL,
  `file` varchar(100) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 1,
  `id_user` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `results`:
--   `id_user`
--       `users` -> `id`
--   `id_patient`
--       `patients` -> `id`
--

--
-- Truncar tablas antes de insertar `results`
--

TRUNCATE TABLE `results`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--
-- Creación: 11-09-2022 a las 13:53:41
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id_rol` int(11) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `role`:
--

--
-- Truncar tablas antes de insertar `role`
--

TRUNCATE TABLE `role`;
--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id_rol`, `role`) VALUES
(1, 'administrador'),
(2, 'funcionario'),
(3, 'visualizador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
-- Creación: 11-09-2022 a las 14:17:45
-- Última actualización: 11-09-2022 a las 14:19:16
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONES PARA LA TABLA `users`:
--   `id_rol`
--       `role` -> `id_rol`
--

--
-- Truncar tablas antes de insertar `users`
--

TRUNCATE TABLE `users`;
--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `id_rol`, `state`, `created_at`, `updated_at`) VALUES
(1, 'Kevin', 'Palma', 'kevinp274@gmail.com', '123456', 1, 0, '2022-09-11 16:18:21', '2022-09-11 16:18:21'),
(2, 'Daniela', 'Ramirez', 'matronacesfamquemchi@gmail.com', '123456', 1, 0, '2022-09-11 16:18:56', '2022-09-11 16:18:56');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_patient` (`id_patient`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`id_patient`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `role` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
