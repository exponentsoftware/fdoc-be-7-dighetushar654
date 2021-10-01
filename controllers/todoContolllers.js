const db = require("../models");
const Todo = db.Todo;

// Create and Save a new Todo
exports.create = async (req, res) => {
    try {
        // validate first title
        if (!req.body.todotitle) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }
        
        //create todo
        const todo = {
            todotitle: req.body.todotitle,
            status: req.body.status,
            category: req.body.category,
            user_id: req.body.user_id
        };

        // save todo in database now
        const newtodo = await Todo.create(todo);
        res.status(200).json(newtodo);
        

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Todos."
          });
    }
};

// Get all Todos from the database.
exports.findAll = async (req, res) => {
    try {
        const filters = req.query;
        let data = await Todo.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        const filteredCategory = data.filter(category => {
            let isValid = true;
            for (key in filters) {
                // console.log(key, category[key], filters[key]);
                isValid = isValid && category[key] == filters[key];
            }
            return isValid;
        })
        res.send(filteredCategory);

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the Todos."
          });
    }
  
};

// Find By Id
exports.findOne = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Todo.findByPk(id);
        res.status(200).json(data);

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the Todo."
          });
    }
  
};

// Update a Todo by the id
exports.update = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const {todotitle, status, category} = req.body;

        const data = await Todo.update(
            { todotitle: todotitle, status: status, category: category },
            { where: { id: todo_id }
          });
        //   console.log(data);
        if( data==1 ) {
            res.status(200).send("Todo has been updated.");
        } else {
            res.status(500).send("Some Error Occur when updating")
        }

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating the Todo."
          });
    }
  
};

// Delete a Todo using id
exports.delete = async (req, res) => {
    try {
        const todo_id = req.params.id;
        const data = await Todo.destroy(
            {where: {id: todo_id}}
        );
        if( data==1 ) {
            res.status(200).send("Todo has been Deleted.");
        } else {
            res.status(500).send("Some Error Occur")
        }

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while deleteting the Todo."
          });
    }
  
};

