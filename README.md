# Open Stata

## What is Open Stata?

Open Stata is an in-browser open-source replication of the basic functionality of the statistical software Stata.

## Architecture

**Frontend** 
- UI Syling: CSS and Material-UI
- Frontend structure: React
- Frontend state management: Redux
- Stata transpiler: Nearley
- API calls: Axios
- Authentication/user data: Mongo, JWT

**Backend**
- Platform: Flask, Gunicorn
- Econometrics and statistics: scipy, pandas, numpy, econtools, scikitlearn, etc.
- Database: PyMongo
- Persistent file storage (stretch goal): s3

## Setup

To get backend running, [Flask startup]. Hosted on Heroku.

## Deployment

Frontend: Surge

Backend: Heroku

## Authors


| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" alt="Jared Cole" src="https://ca.slack-edge.com/EQ19QMD6Z-W010PHYJ09K-4da5de6cc77e-512">  [Jared Cole](https://github.com/jcole13) |  <img width="1604" alt="Arjun Srinivasan" src="https://avatars1.githubusercontent.com/u/45978377?s=460&u=2a9922baf91b1020c1ae653413de2f99226cce38&v=4"> [Arjun Srinivasan](https://github.com/arjunsrini) |<img width="1604" alt="Jeff Liu" src="https://avatars2.githubusercontent.com/u/28827171?s=400&u=be3d4e6655e44e616ffa29eef48d8d1128b2285a&v=4"> [Jeff Liu](https://github.com/jeffzyliu) |
|<img width="1604" alt="Jack Keane" src="https://avatars3.githubusercontent.com/u/52009851?s=400&u=e4daa8d5c175fd03493a5cd514da98d3db318929&v=4"> [Jack Keane](https://github.com/jakeane) |  <img width="1604" alt="Val Werner" src="https://ca.slack-edge.com/EQ19QMD6Z-W01102CDBFG-d3a314d4505e-512"> [Val Werner](https://github.com/valrw) |<img width="1604" alt="Chris Sykes" src="https://ca.slack-edge.com/EQ19QMD6Z-W015TJB797Y-f381f18a5fb7-512"> [Chris Sykes](https://github.com/chriscsykes) |


## Acknowledgments

Tim Tregubov and the CS52 Teaching team!
