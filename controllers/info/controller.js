const { InfoService } = require('./service')

module.exports.InfoController = {
  getApiInfo: (req, res) => {
    res.status(200).send(InfoService.showApiInfo())
    res.end()
  }
}
