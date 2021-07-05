const db = require('../db')
const { 
    getAttendanceMonitoringQuery,
    getUserPerformanceByGameQuery,
} = require('./queries')

const getAttendanceMonitoring = async () => {
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
        const res = await db.raw(getUserPerformanceByGameQuery)
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