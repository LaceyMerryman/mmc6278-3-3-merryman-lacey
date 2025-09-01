require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
const { getCityInfo, getJobs } = require('./util')

// TODO: Statically serve the public folder
app.use(express.static(path.join(__dirname, 'public')))

// TODO: declare the GET route /api/city/:city
app.get('/api/city/:city', async (req, res) => {
  try {
    const city = req.params.city

    const cityInfo = await getCityInfo(city)
    const jobs = await getJobs(city)

    if (!cityInfo && (!jobs || jobs.length === 0)) {
      return res.status(404).json({ error: 'No city info or jobs found' })
    }

    res.json({ cityInfo, jobs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = app
