const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

/* @route   GET api/profile/me - "api/profile/me" is the endpoint. This is
   protected route */
// @desc    Get current user's profile
/* @access  Private - because we're getting the profile by the user.id 
   that's in the token. */
router.get(
  '/me',
  auth,
  async (req, res) => { /* mongoose returns a promise so we'll use async-await */
    try {
      const profile = await Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar']); /* property of user pertains to the user field (property) in the Profile model file. This user is the "ObjectId" of the user. We're setting it to the req.user.id which comes in with the token. With populate() we're adding fields of name and avatar to the user. */
      if (!profile) {
        /* Status of 400 is a Bad Request Error */
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error'); /* Status of 500 is an Internal Server Error
      */
    }
  }
);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  // Validation
  [auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty()
    ]
  ],
  // Callback
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull out all the needed fields
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id; /* it already knows that by the token sent */
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      /* split() method turns a string into an array. it takes a delimiter which is a comma in our case. we'll get [ 'HTML', 'CSS', 'PHP', 'Ruby' ] */
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    /* if we don't initialize "profileFields.social" as an empty object, then we would get an error like "can't find 'youtube' of undefined. " */
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      // Look for a profile by the user
      /* that user field is an ObjectId. req.user.id comes from the token. */
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        /* if it's found, we're gonna update it */
        profile = await Profile
          .findOneAndUpdate({ user: req.user.id },
            { $set: profileFields },
            { new: true });

        return res.json(profile);
      }

      // Create
      /* if profile isn't found it, then we're gonna create it. */
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get(
  '/',
  async (req, res) => {
    try {
      const profiles = await Profile.find()
                        .populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get(
  '/user/:user_id', 
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.params.user_id })
                        .populate('user', ['name', 'avatar']);

      if (!profile) {
        return res.status(400)
        .json({ msg: 'Profile not found' });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400)
        .json({ msg: 'Profile not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete(
  '/', 
  auth, 
  async (req, res) => {
    try {
      // @todo - remove user's posts

      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience', 
  [ auth, 
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      title, 
      company, 
      location, 
      from, 
      to, 
      current, 
      description } = req.body;

      // New Experience
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }

      // Dealing with MongoDB
      try {
        // get the profile by user ID
        const profile = await Profile.findOne({ user: req.user.id });

        /* unshift() adds items to the array like push() method. the difference is that unshift() adds items to the beginning of the array. and push() adds items to the end of the array*/
        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }
);

// @route   DELETE api/profile/experience/:exp_id - "exp_id" is a placeholder.
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  auth,
  async (req, res) => {
    try {
      // get the profile of the logged in user by user ID
      const profile = await Profile.findOne({ user: req.user.id });

      /* Get remove index (of an experience array).
         Get the correct experience to remove. */
      const removeIndex = profile.experience.map(item => item.id)
                          .indexOf(req.params.exp_id);
      /* With splice() we can take out something. 
         We take out index we need. */
      profile.experience.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;