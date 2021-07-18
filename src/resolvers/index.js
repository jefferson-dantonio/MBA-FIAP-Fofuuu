const db = require('../db')

const getAttendanceMonitoring = async () => {
    try {
        const res = await db('DailyUserEvents').select(
            'UserId',
            'EventName',
            'Year',
            'Month',
            'DAY'
            ).count('*', { as: 'AcompPresenca'})
            .groupBy('UserId', 'EventName', 'Year', 'Month', 'DAY')
            .orderBy('UserId', 'Year', 'Month', 'DAY')

        return res ? res : null
    }
    catch(err) {
        console.log('ERRO:', err)
    }
}

const getUserPerformanceByGame = async () => {
    try {
        const res = await db('[MonthlyActivityResults]').select(
        'UserId',
	    'ModuleId',
	    ).sum({TotalScore: 'TotalScore'})
        .groupBy('UserId', 'ModuleId')
        .orderBy('TotalScore', 'desc')

        return res ? res : null
    }
    catch(err) {
        console.log('ERRO:', err)
    }
}

const getNumberMovesByStudent = async () => {
        try {
            const res = await db('DailyActivityResults').select(
                'UserId',
                'ModuleId',
                ).count('*', { as: 'NumberOfMoves'})
                .groupBy('UserId', 'ModuleId')
                .orderBy('NumberOfMoves', 'desc')
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getHitsByGame = async () => {
        try {
            const res = await db('ActivityResults').select(
                'UserId',
                'ActivityId',
                ).sum({Hits: 'Score'})
                .groupBy('UserId', 'ActivityId')
                .orderBy('Hits', 'desc')
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getStudentPerformanceByGame = async () => {
        try {
            const res = await db('ActivityResults').select(
                'ProfileId',
                'ModuleId',
                ).sum({TotalTime: 'TotalTime'})
                .groupBy('ProfileId','ModuleId')
                .orderBy('ProfileId', 'desc')
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    // Queries by student

    const getScoreByGameByStudent = async (profileId) => {
        try {
            const res = await db('ActivityResults').select(
                'ProfileId',
                'ModuleId',
                ).sum({Score: 'Score'})
                .where('ProfileId', profileId)
                .groupBy('ProfileId', 'ModuleId')
                
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getStudentPerformanceByGameByStudent = async (profileId) => {
        try {
            const res = await db('ActivityResults').select(
                'ProfileId',
                'ModuleId',
                ).sum({TotalTime: 'TotalTime'})
                .where('ProfileId', profileId)
                .groupBy('ProfileId','ModuleId')
                .orderBy('ProfileId', 'desc')
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    


module.exports = {
    Query: {
        async getAttendanceMonitoring(_, args) {
            const attendanceMonitoring = await getAttendanceMonitoring();
            return attendanceMonitoring
        },
        async getUserPerformanceByGame(_, args) {
            const userPerformanceByGame = await getUserPerformanceByGame();
            return userPerformanceByGame
        },

        async getNumberMovesByStudent(_, args) {
            const numberMovesByStudent = await getNumberMovesByStudent();
            return numberMovesByStudent
        },

        async getHitsByGame(_, args) {
            const hitsByGame = await getHitsByGame();
            return hitsByGame
        },

        async getStudentPerformanceByGame(_, args) {
            const studentPerformanceByGame = await getStudentPerformanceByGame();
            return studentPerformanceByGame
        },

        // Bar Chart
        async getScoreByGameByStudent(_, args) {
            const { profileId } = args
            const scoreByGameByStudent = await getScoreByGameByStudent(profileId);
            return scoreByGameByStudent
        },

        async getStudentPerformanceByGameByStudent(_, args) {
            const { profileId } = args
            const studentPerformanceByGameByStudent = await getStudentPerformanceByGameByStudent(profileId);
            return studentPerformanceByGameByStudent
        },

    
    }
}