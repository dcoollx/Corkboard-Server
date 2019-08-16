# CORCKBOARD SERVER




## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

# Routes and endpoints

## get

>`/:noticeId/comments`- returns all comments for given notice

>`/corkboards` - returns all notices for given org -protected
## POST

>`/notices` = create new post with given org- requires `title`, `content`

>`/:noticeId/comments`- post a comments for given notice - requires `content` `posted_on`(notice id) and 
`created_by`(user id)

>`/organizations` create a new org -requires a `org_name` and a user id for `admin`

### Tech