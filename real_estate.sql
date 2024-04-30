-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2024 at 11:05 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `real_estate`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `imageID` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `propertyID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`imageID`, `filename`, `filepath`, `propertyID`) VALUES
(33, 'images-1714509304793.png', 'images-1714509304793.png', 34),
(34, 'images-1714509304793.png', 'images-1714509304794.png', 34),
(35, 'images-1714509304798.png', 'images-1714509304798.png', 34),
(36, 'images-1714510086146.png', 'images-1714510086146.png', 35),
(37, 'images-1714510086149.png', 'images-1714510086149.png', 35),
(38, 'images-1714510086150.png', 'images-1714510086150.png', 35),
(39, 'images-1714510188829.png', 'images-1714510188829.png', 36),
(40, 'images-1714510188834.png', 'images-1714510188834.png', 36),
(41, 'images-1714510188839.png', 'images-1714510188839.png', 36),
(42, 'images-1714510251039.png', 'images-1714510251039.png', 37),
(43, 'images-1714510251041.png', 'images-1714510251041.png', 37),
(44, 'images-1714510251043.png', 'images-1714510251043.png', 37);

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `propertyID` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `lon` decimal(10,7) DEFAULT NULL,
  `lat` decimal(10,7) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `floor` varchar(30) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `rentPrice` int(11) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`propertyID`, `address`, `lon`, `lat`, `userID`, `description`, `floor`, `price`, `rentPrice`, `confirmed`, `image`) VALUES
(34, 'Solomou 57 Omonia', 23.7284226, 37.9872268, 9, 'An apartment located on the third floor of an apartment building at 57 Solomou Street, in a central location of Athens - in the Omonia area. The apartment covers an area of 80 sqm, including: an entrance area, living room and dining area, kitchen in a separate room, bedroom with an exit to the balcony, bathroom, storage room and a frontal balcony. There is a possibility to create another bedroom. The building has an active (shared) elevator. The apartment is located very close to schools, superm', 'Apartment', 130000, 1625, 1, 'profilePicture-1714509304791.png'),
(35, 'Koukaki  Makrygianni Athens', 23.7296183, 37.9688452, 9, 'Centrally positioned in the heart of Koukaki, this recently renovated 2-bedroom, 1-bathroom apartment emanates modern charm and comfort. Featuring a stylish parquet floor throughout, the residence is meticulously designed with contemporary furnishings and well-equipped amenities. The elevated ground floor location ensures both convenience and security, providing effortless access to the dynamic neighborhood', 'Apartment', 178000, 0, 1, 'profilePicture-1714510086144.png'),
(36, 'Kolonaki Athens', 23.7408135, 37.9769749, 9, 'The living area is situated in front and consists of a rather open space combining entrance and guests\' wardrobe, central island with high stools facing the corner kitchen fully equipped and to the front window a TV space and square wooden coffee table with sofa and armchairs.\r\nThe beautiful spacious full bathroom lies in between with shower tub. ', 'Apartment', 250000, 2000, 1, 'profilePicture-1714510188826.png'),
(37, 'Exarchia Neapoli', 23.7395109, 37.9852539, 9, 'We present to you a new property in the heart of Exarcheia. The house expands on 3 levels , a semibasement 110sqm, first floor 110sqm and second floor 103 , plus a terrace in a total of 323sqm. Entering the property, the stair leads us to the lower level where it consists of 2 rooms in the facade, 2 rooms on the back plus storage and a toilet. The first floor consists of 2 rooms with a balcony facing the facade , 2 rooms on the back, a small kitchenette plus a bathroom, while the upper floor has', 'House', 620000, 0, 1, 'profilePicture-1714510251039.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `mobile` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `password`, `role`, `mobile`) VALUES
(9, 'John Doe', 'johndoe@gmail.com', 'john123', NULL, 97678657);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`imageID`),
  ADD KEY `propertyID` (`propertyID`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`propertyID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `imageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `propertyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`propertyID`) REFERENCES `properties` (`propertyID`);

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
