BEGIN;
	
	TRUNCATE users RESTART IDENTITY CASCADE;
	INSERT INTO users (user_name, PASSWORD, isadmin)
		VALUES 
		('dcoollx','$2a$16$H6CLdnD1XwF3bLyc1Std3.tmXJk5.d7nB5p3w4OukKLEvisEfkt0a',TRUE),
		('dunder','$2a$16$H6CLdnD1XwF3bLyc1Std3.tmXJk5.d7nB5p3w4OukKLEvisEfkt0a',FALSE),
		('testuser3','$2a$16$ATRfgG0qThP8gRFBSDSzpejBPPrgPzoRh7lcg0i6r4DtQwPjwcetS',TRUE);
	INSERT INTO orgs (org_name,admin)
		VALUES
		('dunder-mifflin',3),
		('ItGuyz',1);
	INSERT INTO notices (title, CONTENT,created_by,org,level)
		VALUES 
		('Test Notice','this is a test for the notifcation system',1,1,1),
		('Test Notice 2', 'thisi is also a test',3,2,2);
	INSERT INTO comments (content ,created_by,posted_on)
		VALUES 
		('i Love this new notice system',1,1),
		('i hate this new notice system',2,1);
COMMIT;