const axios = require ('axios')
const {Country, Activity} = require('../db')

const getCountryInfo = async () => {
  const dbCountries = await Country.findAll({
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duration', 'season'],
      through: { attributes: [] },
    },
  });
  if (!dbCountries.length) {
    console.log('Creo paises')
    const allInfo = await axios.get('https://restcountries.com/v3/all')
    await Country.bulkCreate(allInfo.data.map( el => {
    return {
      id: el.cca3,
      name: el.translations.spa.common? el.translations.spa.common : el.name.common,
      image: el.flags[0],
      continents: el.continents[0],
      capital: el.capital? el.capital[0] : 'No tiene',
      subregion: el.subregion,
      area: el.area,
      population: el.population,
      borders: el.borders? el.borders : []
    } 
    })
    )
    return dbCountries
  }else {
    console.log('Tengo paises')
    return dbCountries
}
}

module.exports = {getCountryInfo}