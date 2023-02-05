import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.find({
      $and: [{ username }, { password }],
    })
    if (user.length === 0)
      return res.status(404).json({ msg: 'User not found!' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

export const logout = async (req, res) => {
  try {
    // delete req.user.token
    console.log('hi')
    console.log(req.user)

    res.status(200).json({ msg: 'User logged out' })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}
