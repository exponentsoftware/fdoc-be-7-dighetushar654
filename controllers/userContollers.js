const db = require("../models");
const User = db.User;
const Todo = db.Todo;

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        // validate first name
        if (!req.body.Username) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }
        
        //create todo
        const user = {
            Username: req.body.Username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role: req.body.role
        };

        // save todo in database now
        const newuser = await User.create(user);
        res.status(200).json(newuser);
        

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
    }
};

// Get all Users from the database.
exports.findAll = async (req, res) => {
    try {
        const filters = req.query;
        let data = await User.findAll({
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
              err.message || "Some error occurred while getting the Users."
          });
    }
  
};

// Find By Id
exports.findOne = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByPk(id);
        res.status(200).json(data);

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the User."
          });
    }
  
};

// Update a User by the id
exports.update = async (req, res) => {
    try {
        const user_id = req.params.id;
        const {Username, phone, password} = req.body;

        const data = await User.update(
            { Username: Username, phone: phone, password: password },
            { where: { id: user_id }
          });
        //   console.log(data);
        if( data==1 ) {
            res.status(200).send("User has been updated.");
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

// Delete a User using id
exports.delete = async (req, res) => {
    try {
        const user_id = req.params.id;
        const data = await User.destroy(
            {where: {id: user_id}}
        );
        if( data==1 ) {
            res.status(200).send("User has been Deleted.");
        } else {
            res.status(500).send("Some Error Occur")
        }

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while deleteting the User."
          });
    }
  
};

exports.oneToMany = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await User.findAll({
            attributes: ['Username', 'email'],
            include: [{
                model: Todo,
                as: "todos",
                attributes:['todotitle','status','category']
            }],
            where: {id:id}
        })
        res.status(200).json(data);

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the User."
          });
    }
}

exports.belongsTo = async (req, res) => {
    try {
        let data = await Todo.findAll({
            attributes: ['todotitle', 'status','category'],
            include: [{
                model: User,
                as: "users",
                attributes:['Username','email']
            }],
        })
        res.status(200).json(data);

    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the User."
          });
    }
}
