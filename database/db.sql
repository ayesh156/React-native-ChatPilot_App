-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for chatpilot
CREATE DATABASE IF NOT EXISTS `chatpilot` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chatpilot`;

-- Dumping structure for table chatpilot.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_from_id` int NOT NULL,
  `user_to_id` int NOT NULL,
  `message` text NOT NULL,
  `date_time` datetime NOT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_user1_idx` (`user_from_id`),
  KEY `fk_chat_user2_idx` (`user_to_id`),
  KEY `fk_chat_status1_idx` (`status_id`),
  CONSTRAINT `fk_chat_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `fk_chat_user1` FOREIGN KEY (`user_from_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_chat_user2` FOREIGN KEY (`user_to_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chatpilot.chat: ~32 rows (approximately)
INSERT INTO `chat` (`id`, `user_from_id`, `user_to_id`, `message`, `date_time`, `status_id`) VALUES
	(2, 3, 2, 'Hi', '2023-02-13 20:51:51', 2),
	(3, 2, 3, 'Hello', '2023-02-13 21:03:45', 2),
	(4, 2, 3, 'Thank You', '2023-02-13 21:32:12', 2),
	(5, 2, 1, 'How are you', '2023-02-17 23:26:27', 2),
	(6, 2, 1, 'Hello', '2023-02-23 19:15:59', 2),
	(7, 2, 1, 'Bye', '2023-02-28 18:31:34', 2),
	(8, 2, 1, 'Bye', '2023-02-28 18:31:34', 2),
	(9, 2, 1, 'Bye', '2023-02-28 18:32:19', 2),
	(10, 2, 1, 'Bye', '2023-02-28 18:32:43', 2),
	(11, 2, 1, 'Niyamai', '2023-03-04 17:11:11', 2),
	(12, 1, 2, 'Why', '2023-03-04 17:13:05', 2),
	(13, 2, 3, 'Hi', '2023-03-04 17:17:54', 2),
	(14, 2, 3, 'Hi', '2023-03-04 17:17:57', 2),
	(15, 3, 3, 'why', '2023-03-04 17:18:24', 2),
	(16, 3, 3, 'How are you?', '2023-03-04 17:25:22', 2),
	(17, 3, 3, 'React chat', '2023-03-04 17:26:55', 2),
	(18, 3, 3, 'React chat', '2023-03-04 17:27:00', 2),
	(19, 2, 3, 'React chat', '2023-03-04 17:27:06', 2),
	(20, 4, 2, 'Hi', '2023-03-04 18:24:07', 2),
	(21, 4, 2, 'Who are you?', '2023-03-04 18:24:32', 2),
	(22, 4, 1, 'Hi Sahan', '2023-03-04 19:05:11', 2),
	(24, 2, 1, 'Hi How are you?', '2023-03-12 19:48:11', 2),
	(25, 2, 1, 'Hi How are you?', '2023-03-12 19:48:18', 2),
	(26, 2, 1, 'Hey', '2023-03-12 19:51:09', 2),
	(27, 1, 2, 'Thisara', '2023-03-13 19:24:12', 2),
	(28, 2, 4, 'Hi', '2023-03-14 15:35:27', 2),
	(29, 2, 4, 'Hello', '2023-03-18 04:59:10', 1),
	(30, 2, 4, 'Good Morning', '2023-03-19 07:18:49', 1),
	(31, 2, 4, 'Hi Thisara', '2023-03-19 16:54:49', 1),
	(32, 5, 4, 'Hi Thisara', '2023-03-19 17:49:33', 2),
	(33, 4, 5, 'Hi Ayesh', '2023-03-19 17:53:03', 2),
	(34, 5, 3, 'Hi Eshara', '2023-03-19 18:13:05', 1);

-- Dumping structure for table chatpilot.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chatpilot.status: ~2 rows (approximately)
INSERT INTO `status` (`id`, `name`) VALUES
	(1, 'Sent'),
	(2, 'Seen');

-- Dumping structure for table chatpilot.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mobile` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `profile_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table chatpilot.user: ~5 rows (approximately)
INSERT INTO `user` (`id`, `mobile`, `name`, `password`, `profile_url`) VALUES
	(1, '0771112223', 'Chamika Sachindu', '123', 'uploads/0771112223.png'),
	(2, '0717897890', 'Sandeepa Deshan', '456', 'uploads/0717897890.png'),
	(3, '0768232123', 'Eshara Ranaveera', '789', 'uploads/0768232123.png'),
	(4, '0741852963', 'Thisara Lakshan', '963', 'uploads/0741852963.png'),
	(5, '0712345678', 'Ayesh Chathuranga', 'Ayesh123', 'uploads/0712345678.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
