-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2020 at 12:50 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_keluarga_berencana`
--

-- --------------------------------------------------------

--
-- Table structure for table `list_kontrasepsi`
--

CREATE TABLE `list_kontrasepsi` (
  `Id_Kontrasepsi` int(11) NOT NULL,
  `Nama_Kontrasepsi` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_kontrasepsi`
--

INSERT INTO `list_kontrasepsi` (`Id_Kontrasepsi`, `Nama_Kontrasepsi`) VALUES
(1, 'kondom'),
(2, 'ui');

-- --------------------------------------------------------

--
-- Table structure for table `list_pemakai_kontrasepsi`
--

CREATE TABLE `list_pemakai_kontrasepsi` (
  `Id_List` int(11) NOT NULL,
  `Id_Propinsi` int(11) NOT NULL,
  `Id_Kontrasepsi` int(11) NOT NULL,
  `Jumlah_Pemakai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_pemakai_kontrasepsi`
--

INSERT INTO `list_pemakai_kontrasepsi` (`Id_List`, `Id_Propinsi`, `Id_Kontrasepsi`, `Jumlah_Pemakai`) VALUES
(1, 1, 2, 90);

-- --------------------------------------------------------

--
-- Table structure for table `list_propinsi`
--

CREATE TABLE `list_propinsi` (
  `Id_Propinsi` int(11) NOT NULL,
  `Nama_Propinsi` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_propinsi`
--

INSERT INTO `list_propinsi` (`Id_Propinsi`, `Nama_Propinsi`) VALUES
(1, 'bandung'),
(2, 'jakarta'),
(3, 'kuda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `list_kontrasepsi`
--
ALTER TABLE `list_kontrasepsi`
  ADD PRIMARY KEY (`Id_Kontrasepsi`);

--
-- Indexes for table `list_pemakai_kontrasepsi`
--
ALTER TABLE `list_pemakai_kontrasepsi`
  ADD PRIMARY KEY (`Id_List`),
  ADD KEY `kontrasepsi` (`Id_Kontrasepsi`),
  ADD KEY `propinsi` (`Id_Propinsi`);

--
-- Indexes for table `list_propinsi`
--
ALTER TABLE `list_propinsi`
  ADD PRIMARY KEY (`Id_Propinsi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list_kontrasepsi`
--
ALTER TABLE `list_kontrasepsi`
  MODIFY `Id_Kontrasepsi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `list_pemakai_kontrasepsi`
--
ALTER TABLE `list_pemakai_kontrasepsi`
  MODIFY `Id_List` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `list_propinsi`
--
ALTER TABLE `list_propinsi`
  MODIFY `Id_Propinsi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `list_pemakai_kontrasepsi`
--
ALTER TABLE `list_pemakai_kontrasepsi`
  ADD CONSTRAINT `kontrasepsi` FOREIGN KEY (`Id_Kontrasepsi`) REFERENCES `list_kontrasepsi` (`Id_Kontrasepsi`),
  ADD CONSTRAINT `propinsi` FOREIGN KEY (`Id_Propinsi`) REFERENCES `list_propinsi` (`Id_Propinsi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
