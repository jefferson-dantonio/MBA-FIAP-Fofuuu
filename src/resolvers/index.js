const db = require('../db')
const { 
    getAttendanceMonitoringQuery,
} = require('./queries')

const getAttendanceMonitoring = async (userId) => {
    try {
        const res = await db.raw(getAttendanceMonitoringQuery)

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