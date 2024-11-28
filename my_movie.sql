-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'my_movie'
-- 我的影片
-- ---

DROP TABLE IF EXISTS `my_movie`;

CREATE TABLE `my_movie` (
  `movie_id` INTEGER(10) NOT NULL AUTO_INCREMENT DEFAULT NULL COMMENT '影片id',
  `index_cd` VARCHAR(20) NULL DEFAULT NULL COMMENT '索引编码',
  `code` VARCHAR(20) NULL DEFAULT NULL COMMENT '识别编码',
  `thumbnail_url` VARCHAR(200) NULL DEFAULT NULL COMMENT '缩略图路径',
  `movie_name` VARCHAR(300) NULL DEFAULT NULL COMMENT '片名',
  `actor` VARCHAR(50) NULL DEFAULT NULL COMMENT '演员',
  `cover_img_url` VARCHAR(200) NULL DEFAULT NULL COMMENT '封面图路径',
  `release_date` DATETIME NULL DEFAULT NULL COMMENT '发布日期',
  `score` INT(4) NULL DEFAULT NULL COMMENT '评分',
  `duration` INT(10) NULL DEFAULT NULL COMMENT '片长(分钟)',
  `director` VARCHAR(50) NULL DEFAULT NULL COMMENT '导演',
  `maker` VARCHAR(50) NULL DEFAULT NULL COMMENT '制作商',
  `publisher` VARCHAR(50) NULL DEFAULT NULL COMMENT '发行商',
  `add_time` DATETIME NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`movie_id`)
) COMMENT '我的影片';

-- ---
-- Table 'my_seen'
-- 我看过影片
-- ---

DROP TABLE IF EXISTS `my_seen`;

CREATE TABLE `my_seen` (
  `seen_id` INT(10) NULL AUTO_INCREMENT DEFAULT NULL COMMENT '看过id',
  `index_cd` VARCHAR(20) NOT NULL DEFAULT 'NULL' COMMENT '索引编码',
  `add_time` DATETIME NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`seen_id`)
) COMMENT '我看过影片';

-- ---
-- Table 'my_browse'
-- 我浏览过(网页)
-- ---

DROP TABLE IF EXISTS `my_browse`;

CREATE TABLE `my_browse` (
  `browse_id` INT(10) NULL AUTO_INCREMENT DEFAULT NULL COMMENT '浏览id',
  `index_cd` VARCHAR(20) NOT NULL DEFAULT 'NULL' COMMENT '索引编码',
  `add_time` DATETIME NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`browse_id`)
) COMMENT '我浏览过(网页)';

-- ---
-- Table 'my_want'
-- 我想要的
-- ---

DROP TABLE IF EXISTS `my_want`;

CREATE TABLE `my_want` (
  `want_id` INT(10) NULL AUTO_INCREMENT DEFAULT NULL COMMENT '想要id',
  `index_cd` VARCHAR(20) NOT NULL DEFAULT 'NULL' COMMENT '索引编码',
  `add_time` DATETIME NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`want_id`)
) COMMENT '我想要的';

-- ---
-- Table 'my_have'
-- 我已拥有
-- ---

DROP TABLE IF EXISTS `my_have`;

CREATE TABLE `my_have` (
  `have_id` INT(10) NULL AUTO_INCREMENT DEFAULT NULL COMMENT '拥有id',
  `index_cd` VARCHAR(20) NOT NULL DEFAULT 'NULL' COMMENT '索引编码',
  `add_time` DATETIME NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`have_id`)
) COMMENT '我已拥有';

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `my_movie` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `my_seen` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `my_browse` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `my_want` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `my_have` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `my_movie` (`movie_id`,`index_cd`,`code`,`thumbnail_url`,`movie_name`,`actor`,`cover_img_url`,`release_date`,`score`,`duration`,`director`,`maker`,`publisher`,`add_time`) VALUES
-- ('','','','','','','','','','','','','','');
-- INSERT INTO `my_seen` (`seen_id`,`index_cd`,`add_time`) VALUES
-- ('','','');
-- INSERT INTO `my_browse` (`browse_id`,`index_cd`,`add_time`) VALUES
-- ('','','');
-- INSERT INTO `my_want` (`want_id`,`index_cd`,`add_time`) VALUES
-- ('','','');
-- INSERT INTO `my_have` (`have_id`,`index_cd`,`add_time`) VALUES
-- ('','','');
