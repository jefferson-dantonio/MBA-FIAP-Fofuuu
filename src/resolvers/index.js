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

module.exports = {
    Query: {
        async getAttendanceMonitoring(_, args) {
            const attendanceMonitoring = await getAttendanceMonitoring();
            return attendanceMonitoring
        },
        async getUserPerformanceByGame(_, args) {
            const userPerformanceByGame = await getUserPerformanceByGame();
            return userPerformanceByGame
        }
    }
}