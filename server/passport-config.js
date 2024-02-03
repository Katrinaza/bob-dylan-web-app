const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
  function(username, password, done) {
    // Replace this with your user fetching logic
    const user = getUserByUsername(username);
    
    if (!user) {
      return done(null, false, { message: 'No user with that username' });
    }
    
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  // Replace this with your logic to fetch user by ID
  return done(null, getUserById(id));
});
