import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'
import path from 'path'

const addLeave = async (req, res) => {

    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body
        const employee = await Employee.findOne({ userId })

        const newLeave = new Leave({
            employeeId: employee._id, leaveType, startDate, endDate, reason
        })

        await newLeave.save()
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, error: "leave add server error" })
    }
}

const getLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id })
        const leaves = await Leave.find({ employeeId: employee._id })
        return res.status(200).json({ success: true, leaves })
    } catch (error) {
        return res.status(500).json({ success: false, error: "leave add server error" })
    }

}

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [{
                path: 'department',
                select: 'dept_name'
            },
            {
                path: 'userId',
                select: 'name'

            }]
        })
        return res.status(200).json({ success: true, leaves })
    } catch (error) {
        return res.status(500).json({ success: false, error: "leave add server error" })
    }

}

export { addLeave, getLeave, getLeaves }