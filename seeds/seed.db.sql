BEGIN;
	
	TRUNCATE users RESTART IDENTITY CASCADE;
	INSERT INTO users (user_name,first_name, last_name, PASSWORD, isadmin,reports_to,user_position,org)
		VALUES 
		('dcoollx','David','Queen','$2a$10$tZgSFwouoo5wbdjjcEnGsuJvqjLdSAKtrxYVE7..7C7t.romxVYVK',TRUE,null,4,1),
		('dunder','Dunder','Mifflin','$2a$10$IeniB5mrYhlqeZ1/DZEfreKnfeO10JVDCryYHYusJRpE2KWrW9K8G',FALSE,1,1,2),
		('testuser3','Test','User','$2a$10$B79SEBS/I6RUufn0gYmmjeXcGB80VUSYdfelSDqzn/v/6AYZyu9pu',TRUE,null,3,3);
	INSERT INTO orgs (org_name,admin,part_of)
		VALUES
		('dunder-mifflin',3,null),
		('ItGuyz',1,null),
    ('dunder-mifflin West',3,1);
	INSERT INTO notices (title, CONTENT,created_by,org,level)
		VALUES 
		('Test Notice','this is a test for the notifcation system',1,1,1),
		('Test Notice 2', 'thisi is also a test',3,2,2);
	INSERT INTO comments (content ,created_by,posted_on)
		VALUES 
		('i Love this new notice system',1,1),
		('i hate this new notice system',2,1);
COMMIT;