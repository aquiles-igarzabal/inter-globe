const { Router } = require("express");
const {getCountryInfo} = require('../controllers/controllers')
const countryRouter = Router()


countryRouter.get('/countries', async (req, res) => {
  const nameQuery = req.query.name
  try {
    const allCountries = await getCountryInfo()
    if (nameQuery){
      let matchName= nameQuery.length === 1? allCountries.filter( el => el.name[0].toLowerCase() === nameQuery.toLowerCase().replace(/ /g, ""))
      :allCountries.filter(c => c.name.toLowerCase().replace(/ /g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(nameQuery.toLowerCase().replace(/ /g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
      matchName.length? res.status(200).send(matchName) : res.status(404).send("The country was not found") 
    }else { 
      res.status(200).send(allCountries)
    }
  }catch (error) {
    res.status(404).send("There is no countries with this name")
  }      
})

countryRouter.get('/country', async (req, res) => {
  const continentQuery = req.query.continent
  try {
    const allCountries = await getCountryInfo()
    if (continentQuery){ 
      let matchCont= continentQuery === 'America' ? allCountries.filter(c => c.continents.includes('America'))
      :allCountries.filter(c => c.continents.includes(continentQuery))
      matchCont.length? res.status(200).send(matchCont) : res.status(404).send('Error') 
    }else { 
      res.status(200).send(allCountries)
    }
  }catch (error) {
    res.status(404).send(error)
  }      
})

countryRouter.get('/countries', async (req, res) => {
  try{
  let allCountries = await getCountryInfo()
  res.status(200).send(allCountries)
  }catch(error){
    res.status(404).send(error)
  }
})

countryRouter.get('/countries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const allCountries = await getCountryInfo();
    if (!id) {
      res.status(404).send("Please enter a valid country name")
    } else {
      const country = allCountries.find(c=> c.id.toString() === id);
      res.status(200).send(country)
    }
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = countryRouter