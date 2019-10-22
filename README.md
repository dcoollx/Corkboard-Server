# CORCKBOARD SERVER
This is the server for the [Corkboard](https://github.com/dcoollx/Corkboard-client) project.

## Tech/framework used

<b>Built with</b>
## Frontend
 - Reactjs
 - Markdown
 - Siema
## Backend
 - Node
 - Express
 - ShortId
 - Mocha
 

## Installation 
1. Install dependencies `npm i`
2. Rename `example.env` -> `.env` and populate with local development settings
3. Start the application `npm start` or start nodemon for the application `npm run dev`
4. Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
this will also attempt a remote migration using postgrator

## API Reference

### Routes and endpoints

#### get

>`/:noticeId/comments`- returns all comments for given notice

>`/corkboards` - returns all notices for given org -protected

> `/orgs?orgName=[query]` - checks if an org by that name already exists. Return 404 if one is not found

#### POST

>`/notices` = create new post with given org- requires `title`, `content`

>`/:noticeId/comments`- post a comments for given notice - requires `content` `posted_on`(notice id) and 
`created_by`(user id)

>`/organizations` create a new org -requires a `org_name` and a user id for `admin



## License

MIT © [David Queen Jr](https://github.com/dcoollx)