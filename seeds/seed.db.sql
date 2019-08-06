BEGIN;
	
	TRUNCATE users RESTART IDENTITY CASCADE;
	INSERT INTO users (user_name, PASSWORD, isadmin)
		VALUES 
		('dccoollx','password',TRUE),
		('dunder','password',FALSE),
		('testuser3','notpassword',TRUE);
	INSERT INTO orgs (org_name,admin)
		VALUES
		('dunder-mifflin',3),
		('ItGuyz',1);
	INSERT INTO notices (title, CONTENT,created_by,org)
		VALUES 
		('Test Notice','this is a test for the notifcation system',1,1),
		('Test Notice 2', 'thisi is also a test',3,2);
	INSERT INTO COMMENTS (CONTENT ,created_by,posted_on)
		VALUES 
		('i Love this new notice system',1,1),
		('i hate this new notice system',2,1);
COMMIT;