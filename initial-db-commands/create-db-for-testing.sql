-- init.sql

-- Create DFEC_test if it doesn't exist
CREATE DATABASE IF NOT EXISTS `DFEC_test`;

-- Create test user
CREATE USER IF NOT EXISTS 'test_user'@'%' IDENTIFIED BY 'test_password';

-- Grant all privileges on DFEC_test to test_user
GRANT ALL PRIVILEGES ON `DFEC_test`.* TO 'test_user'@'%';

-- Apply the changes (flush privileges)
FLUSH PRIVILEGES;
