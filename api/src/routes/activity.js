const { Router } = require("express");
const {Country, Activity} = require('../db')
const activityRouter = Router()
const {getCountryInfo} = require('../controllers/controllers')

activityRouter.post('/activity', async (req, res) =>{
  try {
    const { name, difficulty, duration, season, includedCountries } = req.body;
    const activityCreated = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      includedCountries
    });
    const dbCountries = await Country.findAll({
      where: {
        id: includedCountries,
      },
    });
    const result = await activityCreated.addCountry(dbCountries);
    return res.status(200).send({ result, message: 'Activity Created' });
  } catch (e) {
    console.log(e)
    return res.status(400).send({ message: 'Creation Failed' });
  }
})

activityRouter.get('/activity', async (req, res) => {
  try {
    const activities = await Activity.findAll();
    return res.status(200).send(activities);
  } catch (e) {
    return res.status(400).send(e);
  }
});


module.exports = activityRouter