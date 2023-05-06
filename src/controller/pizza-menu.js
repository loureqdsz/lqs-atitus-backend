const MenuData = require("../../dataBase/pizzaMenu/menu.json")

async function allMenuData (req, res, next) {
    try {
      const allData = MenuData  
      res.send(allData)
    } catch (err) {
      console.log('--> Some Error Occur: ERR - ', err)
    }
}

module.exports = {
    allMenuData
}