import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    //console.log("GET /api/department called");
    try {
        const departments = await Department.find()
        return res.status(200).json({ success: true, departments })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const addDept = async (req, res) => {
    try {
        const { dept_name, description } = req.body;
        const newDepartment = new Department({
            dept_name,
            description
        })
        await newDepartment.save()
        return res.status(200).json({ success: true, department: newDepartment })
    } catch (error) {
        return res.status(500).json({ success: false, error: "add department server error" })
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id })
        return res.status(200).json({ success: true, department })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dept_name, description } = req.body;
        const updateDep = await Department.findByIdAndUpdate({ _id: id }, { dept_name, description });
        res.status(200).json({ success: true, updateDep });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedep = await Department.findById({ _id: id })
        await deletedep.deleteOne()
        return res.status(200).json({ success: true, deletedep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "delete department server error" })
    }
}

export { addDept, getDepartments, getDepartment, updateDepartment, deleteDepartment }