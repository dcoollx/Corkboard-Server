CREATE TYPE lvl AS ENUM ('global','deparment','team');
ALTER TABLE notices
  ADD COLUMN level lvl; 