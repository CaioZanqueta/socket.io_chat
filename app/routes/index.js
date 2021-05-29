module.exports = (application) => {
    application.get('/', (req,res) => application.app.controllers.IndexController.home(application, req, res))
}