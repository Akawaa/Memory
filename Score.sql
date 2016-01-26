-- phpMyAdmin SQL Dump
-- version 4.4.13.1
-- http://www.phpmyadmin.net
--
-- Client :  berenicepobcaly.mysql.db
-- Généré le :  Mar 26 Janvier 2016 à 13:15
-- Version du serveur :  5.5.46-0+deb7u1-log
-- Version de PHP :  5.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `berenicepobcaly`
--

-- --------------------------------------------------------

--
-- Structure de la table `Score`
--

CREATE TABLE IF NOT EXISTS `Score` (
  `id` int(11) NOT NULL,
  `rang` int(20) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `coup` int(10) NOT NULL,
  `temps` varchar(20) NOT NULL,
  `niveau` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Score`
--

INSERT INTO `Score` (`id`, `rang`, `nom`, `coup`, `temps`, `niveau`) VALUES
(1, 1, 'Null', 20, '99:99:999', 9),
(2, 2, 'Null', 20, '99:99:999', 9),
(3, 3, 'Null', 20, '99:99:999', 9),
(4, 1, 'Null', 20, '99:99:999', 16),
(5, 2, 'Null', 20, '99:99:999', 16),
(6, 3, 'Null', 15, '99:99:999', 16),
(7, 1, 'Null', 20, '99:99:999', 25),
(8, 2, 'Null', 20, '99:99:999', 25),
(9, 3, 'Null', 20, '99:99:999', 25);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Score`
--
ALTER TABLE `Score`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
