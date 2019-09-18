CREATE DATABASE `estate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `estate`;

CREATE TABLE `estates` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` int(11) NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bedroom` int(11) NOT NULL,
  `bathroom` int(11) NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dpe` int(11) NOT NULL,
  `ges` int(11) NOT NULL,
  `location` tinyint(1) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `estates` VALUES
(6, 'Teste vente maison', 'teste rue de maison', 500, 'ville fictif de teste', '37200', 12, 2, 'Charge comprise', 250, 75, 0, 2525250);

CREATE TABLE `flats` (
  `id` int(11) NOT NULL,
  `floor` int(11) NOT NULL,
  `doorTag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estateId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `houses` (
  `id` int(11) NOT NULL,
  `basement` tinyint(1) NOT NULL,
  `garage` tinyint(1) NOT NULL,
  `garden` tinyint(1) NOT NULL,
  `estateId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `houses` VALUES
(6, 1, 1, 1, 6);


ALTER TABLE `estates`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `flats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estateId` (`estateId`);

ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estateId` (`estateId`);

ALTER TABLE `estates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE `flats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `flats`
  ADD CONSTRAINT `flats_ibfk_1` FOREIGN KEY (`estateId`) REFERENCES `estates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `houses`
  ADD CONSTRAINT `houses_ibfk_1` FOREIGN KEY (`estateId`) REFERENCES `estates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
