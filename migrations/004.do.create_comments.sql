CREATE TABLE comments(
  id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  content text NOT NULL,
  created_by int REFERENCES users(id) ON DELETE CASCADE,
  org int REFERENCES orgs(id) ON DELETE CASCADE,
  posted_on int REFERENCES notices(id),
  created_on TIMESTAMPTZ DEFAULT now()
);