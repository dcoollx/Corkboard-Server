BEGIN;
	
	TRUNCATE users RESTART IDENTITY CASCADE;
	INSERT INTO orgs (org_name,code,admin)
		VALUES
		('Thinkful','aRdJUaFa',null);
    INSERT INTO users (user_name,display_name, PASSWORD, isadmin,team,user_position,org)
		VALUES 
		('dcoollx','David','$2a$10$tZgSFwouoo5wbdjjcEnGsuJvqjLdSAKtrxYVE7..7C7t.romxVYVK',TRUE,null,4,1);
    UPDATE orgs 
      SET admin = 1 WHERE id=1;
	INSERT INTO notices (title, CONTENT,created_by,org,level)
		VALUES 
		('Test Notice','this is a test for the notifcation system',1,1,1);
	INSERT INTO comments (content ,created_by,posted_on)
		VALUES 
		('i Love this new notice system',1,1);
COMMIT;