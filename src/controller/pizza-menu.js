const MenuData = require("../../dataBase/pizzaMenu/menu.json");
const MenuDataBackup = require("../../dataBase/pizzaMenu/backupMenu.json");
const fs = require("fs");

async function allMenuData (req, res, next) {
    try {
      const allData = MenuData
      res.send(allData)
    } catch (err) {
      console.log('--> Some Error Occur: ERR - ', err)
    }
}

async function populateMenuAgain (req, res, next) {
  try {
    const backup = MenuDataBackup
    fs.writeFileSync('./dataBase/pizzaMenu/menu.json', JSON.stringify(backup))

    res.status(200).send(backup)
  } catch (err) {
    console.log('--> Some Error Occur: ERR - ', err)
  }
}

async function deleteMenuData (req, res, next) {
  try {
    const allData = MenuData

    const itemId = req.body?.itemId
    const newMenuData = allData.filter((item) => {
      if (item.id !== itemId) {
        return item
      }
    })

    fs.writeFileSync('./dataBase/pizzaMenu/menu.json', JSON.stringify(newMenuData))

    res.status(200).send(newMenuData)
  } catch (err) {
    console.log('--> Some Error Occur: ERR - ', err)
  }
}

async function addMenuData (req, res, next) {
  try {
    let allData = MenuData

    const newItemId = Date.now()
    const newItem = [{
      id: newItemId,
      img: req.body?.img,
      name: req.body?.name,
      size: req.body?.size,
      preparationTime: req.body?.preparationTime,
      price: req.body?.price,
      description: req.body?.description
    }]

    const newMenuData = newItem.concat(allData)
    fs.writeFileSync('./dataBase/pizzaMenu/menu.json', JSON.stringify(newMenuData))

    res.status(200).send(newMenuData)
  } catch (err) {
    console.log('--> Some Error Occur: ERR - ', err)
  }
}

async function updateMenuData (req, res, next) {
  try {
    const allData = MenuData

    const itemId = req.body?.itemId
    const newMenuData = allData.filter((item) => {
      if (item.id === itemId) {
        item.img = req.body?.img,
        item.name = req.body?.name,
        item.size = req.body?.size,
        item.preparationTime = req.body?.preparationTime,
        item.price = req.body?.price,
        item.description = req.body?.description

        return item
      } 

      return item
    })

    fs.writeFileSync('./dataBase/pizzaMenu/menu.json', JSON.stringify(newMenuData))

    res.status(200).send(newMenuData)
  } catch (err) {
    console.log('--> Some Error Occur: ERR - ', err)
  }
}

module.exports = {
    allMenuData,
    populateMenuAgain,
    deleteMenuData,
    addMenuData,
    updateMenuData
}