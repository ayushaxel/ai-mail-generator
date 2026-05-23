import express from "express"
import generateEmail from "../services/aiService.js"
import Email from "../models/email.js"
import protect from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/generate",protect,async(req,res)=>{
    try{
        const { purpose, keyPoints, tone } = req.body

    if (!purpose || !keyPoints || keyPoints.length === 0) {
      return res.status(400).json({ message: "Purpose and Key Points are required" })
    }
    const { subject, body } = await generateEmail({ purpose, keyPoints, tone })
    const savedEmail = await Email.create({
      user: req.user._id,
      purpose,
      keyPoints,
      tone,
      subject,
      body
    })
    return res.json({ success: true, email: savedEmail })

    }catch(error){
       return  res.status(500).json({ message: error.message })
    }
})

//get history
router.get('/history', protect, async (req, res) => {
  try {
    const emails = await Email.find({ user: req.user._id }).sort({ createdAt: -1 })
     return res.json({ success: true, emails });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router


