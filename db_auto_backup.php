#! /usr/bin/php -q
<?php
	date_default_timezone_set("Asia/Shanghai");
	//faile_put_contents("/var/www/html/hkproduct/tmp1.txt", "hello world");
	$time = date("Ymdhis");
	exec("mysqldump -u root -p hkproduce --password='123456'  > /var/www/html/hkproduct/db_backup/backup_2.sql.{$time}"); 
?>
