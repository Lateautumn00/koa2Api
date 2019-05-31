/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : servicenode

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-05-30 16:38:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ser_jwt_user
-- ----------------------------
DROP TABLE IF EXISTS `ser_jwt_user`;
CREATE TABLE `ser_jwt_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appKey` varchar(30) DEFAULT NULL COMMENT '账号',
  `secret` varchar(32) DEFAULT NULL COMMENT '密钥',
  `description` varchar(255) DEFAULT NULL COMMENT '说明',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1正常0禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `appkey` (`appKey`),
  KEY `status` (`status`),
  KEY `app_sec` (`appKey`,`secret`,`status`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
