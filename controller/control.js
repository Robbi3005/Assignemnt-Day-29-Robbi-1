const Store = require('../model/model')
const connection = require('../config/db');
const db = require('../config/db');

class Controller {

    static getAllStores(req, res) {

        console.log("All stores is called")

        db.query(Store.getAllStores(), (err, result) => {
            if (err) throw err;
            res.status(200)
            res.send(result)
        })

        // res.status(200).send(JSON.parse(connection.query(Store.getAllStores())));
    }

    static getStore(req, res) {

        const id = req.params.id

        db.query(Store.getStore(), id, (err, result) => {
            if (err) throw err;
            res.status(200)
            res.send(result)
        })

    }

    static addStore(req, res) {

        const data = req.body;

        const dataStore = [
            data.petId,
            data.quantity,
            data.shipDate,
            data.status,
            data.complete
        ];

        // let petId = data.petId;

        // if (petId == null) {
        //     res.status(400).json({ message: "petId is required" })
        //     return
        // }

        // db.query(Store.findId(), (err, result) => {

        //     if (err) throw err;

        //     let newR = JSON.stringify(result)
        //     console.log(newR)

        //     for (let i = 0; i < newR.length; i++) {

        //         for (let j = 0; j < newR[i].length; j++) {

        //             console.log(newR[i])

        //             if (newR[i] == petId) {
        //                 console.log("petId exists")
        //                 res.status(400).json({ message: "petId already exists" })
        //                 break;
        //             }
        //         }
        //     }

        // })

        db.query(Store.addStore(), dataStore, (err) => {

            if (err) throw err;

            res.status(201).json(req.body)
            console.log("adding new store");
        })
    }

    static updateStore(req, res) {

        const data = req.body;

        const dataStore = [          
            data.petId,
            data.quantity,
            data.shipDate,
            data.status,
            data.complete,
            req.params.id,
        ];

        db.query(Store.updateStore(), dataStore, (err) => {

            if (err) throw err;

            // if (data.id != id) {
            //     res.send({ message: "id not found" })
            //     return
            // }

            res.status(201).send(data)
        })
    }

    static deleteStore(req, res) {

        const id = req.params.id

        db.query(Store.deleteStore(), id, (err, result) => {

            if (err) throw err;

            res.status(200).send({ message: `store deleted : ${result.affectedRows} at id : ${id}` })
        })
    }
}

//-----------------------------------------------------------------------

module.exports = Controller;