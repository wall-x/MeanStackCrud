const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let {Employee} = require('../models/employee');

// http://localhost:3000/employees/
router.get('/', (req,res) => {
    Employee.find((err, docs) => {
        if(!err) {
            res.send(docs);
        }
        else {
            console.log('Error retrieving Employee model: ' +
                JSON.stringify(err, undefined, 2));
        }
    });
})


router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Records found for id: ' +
            req.params.id);

    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else {
            console.log('Error in retrieving Employee: ' +
                JSON.stringify(err, undefined, 2));
        }
    });
});


router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else{
            console.log('Error in Employee save: ' +
                JSON.stringify(err, undefined, 2));
        }
    })
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with this id: ' +
            req.params,id);

    let emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id,
        {$set: emp},
        {new: true}, // this should return with the updated data, not old
        (err, doc) => {
            if(!err){
                res.send(doc);
            }
            else{
                console.log('Error in Employee Update: ' +
                    JSON.stringify(err, undefined, 2));
            }
        });
});


router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with this id: ' + req.params.id);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else{
            console.log('Error in Employee Delete: ' +
                JSON.stringify(err, undefined, 2));
        }
    });
})


module.exports = router;
