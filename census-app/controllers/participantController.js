const { Participant, Work, Home } = require('../models/Participant');

const validateParticipantData = (data) => {
    const errors = [];
    
    // Email validation
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
    }

    // Date validation
    if (!data.dob || !/^\d{4}-\d{2}-\d{2}$/.test(data.dob)) {
        errors.push('Invalid date format (YYYY-MM-DD)');
    }

    // Required fields validation
    const requiredFields = [
        'firstname', 'lastname',
        'companyname', 'salary', 'currency',
        'country', 'city'
    ];

    requiredFields.forEach(field => {
        if (!data[field]) errors.push(`${field} is required`);
    });

    return errors;
};

const participantController = {
    async addParticipant(req, res) {
        try {
            const validationErrors = validateParticipantData(req.body);
            if (validationErrors.length > 0) {
                return res.status(400).json({ errors: validationErrors });
            }

            const participant = await Participant.create({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.dob
            });

            await Work.create({
                ParticipantEmail: participant.email,
                companyname: req.body.companyname,
                salary: req.body.salary,
                currency: req.body.currency
            });

            await Home.create({
                ParticipantEmail: participant.email,
                country: req.body.country,
                city: req.body.city
            });

            res.status(201).json({ message: 'Participant added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllParticipants(req, res) {
        try {
            const participants = await Participant.findAll({
                include: [Work, Home]
            });
            res.json({ participants });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllParticipantDetails(req, res) {
        try {
            const participants = await Participant.findAll({
                attributes: ['firstname', 'lastname', 'email']
            });
            res.json({ participants });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getParticipantDetails(req, res) {
        try {
            const participant = await Participant.findByPk(req.params.email, {
                attributes: ['firstname', 'lastname', 'dob']
            });
            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }
            res.json({ participant });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getParticipantWork(req, res) {
        try {
            const work = await Work.findOne({
                where: { ParticipantEmail: req.params.email },
                attributes: ['companyname', 'salary', 'currency']
            });
            if (!work) {
                return res.status(404).json({ error: 'Work details not found' });
            }
            res.json({ work });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getParticipantHome(req, res) {
        try {
            const home = await Home.findOne({
                where: { ParticipantEmail: req.params.email },
                attributes: ['country', 'city']
            });
            if (!home) {
                return res.status(404).json({ error: 'Home details not found' });
            }
            res.json({ home });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteParticipant(req, res) {
        try {
            const result = await Participant.destroy({
                where: { email: req.params.email }
            });
            if (!result) {
                return res.status(404).json({ error: 'Participant not found' });
            }
            res.json({ message: 'Participant deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateParticipant(req, res) {
        try {
            const validationErrors = validateParticipantData(req.body);
            if (validationErrors.length > 0) {
                return res.status(400).json({ errors: validationErrors });
            }

            const participant = await Participant.findByPk(req.params.email);
            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            await participant.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.dob
            });

            await Work.update({
                companyname: req.body.companyname,
                salary: req.body.salary,
                currency: req.body.currency
            }, {
                where: { ParticipantEmail: req.params.email }
            });

            await Home.update({
                country: req.body.country,
                city: req.body.city
            }, {
                where: { ParticipantEmail: req.params.email }
            });

            res.json({ message: 'Participant updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = participantController;
