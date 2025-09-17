import Users from '../Modules/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req, res) {

    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        phone: req.body.phone
    }

    const user = new Users(userData);

    user.save().then(() => {
        res.json(
            {
                massage: "User Registered Successfully..."
            }
        );
    }).catch(() => {
        res.json(
            {
                massage: "Failed to Registered User..."
            }
        );
    });
}


// Login User
export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne(
        {
            email: email
        }
    ).then((user) => {
        if (user === null) {
            res.status(404).json(
                {
                    massage: "User not Registered..."
                }
            );
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {

                const token = jwt.sign(
                    {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isBloked: user.isBlocked,
                        isEmailVeryfied: user.isEmailVeryfied,
                        image: user.image
                    },
                    "skyrec@adith"
                );

                res.json(
                    {
                        token: token,
                        massage: "Login Successfull..."
                    }
                );
            } else {
                res.status(403).json({ massage: "Password Incorrect..." });
            }
        }
    }).catch();
}

// Check Admin or User
export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }

    if (req.user.role == "admin") {
        return true;
    } else {
        return false;
    }
}