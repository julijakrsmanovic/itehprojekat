/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.11-MariaDB : Database - network
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`network` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `network`;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) NOT NULL,
  PRIMARY KEY (`id`,`postId`),
  KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`),
  CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `comment` */

insert  into `comment`(`id`,`content`,`userId`,`postId`) values 
(2,'34g5hbtvr3f',10,3),
(3,'afsgf',9,4),
(4,'jejaf',11,3),
(5,'safdsg',11,4),
(6,'sgdhg',11,3);

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId1` int(11) NOT NULL,
  `userId2` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `senderId` int(11) NOT NULL,
  PRIMARY KEY (`id`,`userId1`,`userId2`),
  KEY `FK_f11d43db5b51f4f0ad27ef4889f` (`userId2`,`userId1`),
  KEY `FK_bc096b4e18b1f9508197cd98066` (`senderId`),
  CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f11d43db5b51f4f0ad27ef4889f` FOREIGN KEY (`userId2`, `userId1`) REFERENCES `relationship` (`userId2`, `userId1`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `message` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1632166392575,'createUsers1632166392575'),
(2,1632166525275,'createPosts1632166525275'),
(3,1632166616554,'createComments1632166616554'),
(4,1632166759487,'createRelationships1632166759487'),
(5,1632166984448,'createMessages1632166984448'),
(6,1632167131497,'addSenderAndContentToMessage1632167131497'),
(7,1632168040237,'addAcceptedToRelationship1632168040237'),
(8,1632169183725,'addStatusToRelationship1632169183725');

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5c1cf55c308037b5aca1038a131` (`userId`),
  CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `post` */

insert  into `post`(`id`,`image`,`content`,`userId`) values 
(3,'uploads/7eeea036-0133-472c-b30a-505fddec1a61-gallery1.jpg','afsghgafsghdggfa',10),
(4,'uploads/7eeea036-0133-472c-b30a-505fddec1a61-gallery1.jpg','gdhgafsghdgcagreth faeg shdt',11),
(5,'uploads/4878b411-3ce0-4f68-bb7b-a775ec280723-gallery4.jpg','afsgfsfasgrh',11);

/*Table structure for table `relationship` */

DROP TABLE IF EXISTS `relationship`;

CREATE TABLE `relationship` (
  `userId1` int(11) NOT NULL,
  `userId2` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`userId1`,`userId2`),
  KEY `FK_45061168a5bd514acf035bfb75f` (`userId2`),
  CONSTRAINT `FK_45061168a5bd514acf035bfb75f` FOREIGN KEY (`userId2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_fc5b08020ee1e5323d262121e9b` FOREIGN KEY (`userId1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `relationship` */

insert  into `relationship`(`userId1`,`userId2`,`status`) values 
(7,11,'accepted'),
(11,8,'accepted'),
(11,9,'accepted'),
(11,10,'accepted');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`email`,`isAdmin`,`password`,`image`) values 
(7,'a','a','a',1,'/1rBkZBCSx2I+UGe+UmuVriRDJwWOeh13xo7L6alJlo=','uploads/blob'),
(8,'Lazar','Milosavljevic','lazar.milosavljevic97@gmail.com',0,'/1rBkZBCSx2I+UGe+UmuVriRDJwWOeh13xo7L6alJlo=','uploads/7eeea036-0133-472c-b30a-505fddec1a61-gallery1.jpg'),
(9,'Lazar','Milosavljevic','lazar.milosavljevic97@gmail.com',0,'/1rBkZBCSx2I+UGe+UmuVriRDJwWOeh13xo7L6alJlo=','uploads/3a1a035a-7697-439a-959b-0bb876f41968-blob'),
(10,'fadsg','afdsg','afgds',0,'/1rBkZBCSx2I+UGe+UmuVriRDJwWOeh13xo7L6alJlo=','uploads/506cfd0a-d479-4384-8001-90787586515b-blob'),
(11,'Julija','Krsmanovic','j@gmail.com',0,'/1rBkZBCSx2I+UGe+UmuVriRDJwWOeh13xo7L6alJlo=','uploads/4e0f8a7d-1291-468f-94c0-02512cb9e013-blob');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
