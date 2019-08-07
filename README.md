#CORCKBOARD SERVER



##Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
(if you use Githubs `use template button`, skip this step)
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

#Routes and endpoints
##get
>`/:noticeId/comments`- returns all comments for given notice
>`/:orgId/corkboard` - returns all notices for given org
##POST
>`/:orgId/notices` = create new post with given org- requires `title`, `content`
>`/:noticeId/comments`- post a comments for given notice - requires `content` `posted_on`(notice id) and `created_by`(user id)
>`/organizations` create a new org -requires a `org_name` and a user id for `admin`