const db = require('../db')

const getAttendanceMonitoring = async () => {
    try {
        const res = await db('DailyUserEvents').select(
            'EventName',
            'Year',
            'Month',
            'DAY'
            ).count('*', { as: 'AcompPresenca'})
            .groupBy('EventName', 'Year', 'Month', 'DAY')
            .orderBy('Year', 'Month', 'DAY')

        return res ? res : null
    }
    catch(err) {
        console.log('ERRO:', err)
    }
}

const getUserPerformanceByGame = async () => {
    try {
        const res = await db('[MonthlyActivityResults]').select(
        'ModuleId',
	    ).avg({TotalScore: 'TotalScore'})
        .groupBy('ModuleId')
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
                'ModuleId',
                ).count('*', { as: 'NumberOfMoves'})
                .groupBy('ModuleId')
                .orderBy('NumberOfMoves', 'desc')
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)  
        }
    }

    //global

    const getScoreByGame = async (chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({Score: 'Score'})
                .where('ChapterId', chapter)
                .groupBy('ModuleId')
               
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getStudentPerformanceByGame = async (chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({TotalTime: 'TotalTime'})
                .where('ChapterId', chapter)
                .groupBy('ModuleId')

    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getErrorCountByGame = async (chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ProfileId',
                ).avg({TotalErrors: 'ErrorCount'})
                .where('ChapterId', chapter)
                .groupBy('ModuleId')
               
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    // Queries by student

    const getScoreByGameByStudent = async (profileId, chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({Score: 'Score'})
                .where({
                    'ProfileId': profileId,
                    'ChapterId': chapter
                })
                .groupBy('ModuleId')
                
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getStudentPerformanceByGameByStudent = async (profileId, chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({TotalTime: 'TotalTime'})
                .where({
                    'ProfileId': profileId,
                    'ChapterId': chapter
                })
                .groupBy('ModuleId')
                
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getErrorCountByGameByStudent = async (profileId, chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({TotalErrors: 'ErrorCount'})
                .where({
                    'ProfileId': profileId,
                    'ChapterId': chapter
                })
                .groupBy('ModuleId')
               
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    // Queries by pathology

    const getScoreByGameByPathology = async (pathology, chapter) => {
        try {
            const res = await db('ActivityResults')
                .select('ActivityResults.ModuleId')
                .avg({Score: 'Score'})
                .innerJoin('Profiles', 'ActivityResults.ProfileId', 'Profiles.Id')
                .where({
                    'Profiles.Pathology': pathology,
                    'ActivityResults.ChapterId': chapter
            })
                .groupBy('ActivityResults.ModuleId')
                
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getErrorCountByGameByPathology = async (pathology, chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({TotalErrors: 'ErrorCount'})
                .innerJoin('Profiles', 'ActivityResults.ProfileId', 'Profiles.Id')
                .where({
                    'Profiles.Pathology': pathology,
                    'ActivityResults.ChapterId': chapter
            })
                .groupBy('ModuleId')
               
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }


    const getStudentPerformanceByGameByPathology = async (pathology, chapter) => {
        try {
            const res = await db('ActivityResults').select(
                'ModuleId',
                ).avg({TotalTime: 'TotalTime'})
                .innerJoin('Profiles', 'ActivityResults.ProfileId', 'Profiles.Id')
                .where({
                    'Profiles.Pathology': pathology,
                    'ActivityResults.ChapterId': chapter
            })
                .groupBy('ModuleId')
               
    
            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getProfilesById = async (userId) => {
        try {
            const res = await db('UserProfileConnections').select(
                'Profiles.FirstName',
                'Profiles.LastName'
                )
                .innerJoin('Profiles', 'UserProfileConnections.ProfileId', 'Profiles.Id' )
                .where({
                    "UserProfileConnections.UserId": userId,
                    'IsRevoked': 0
                })
                

            return res ? res : null
        }
        catch(err) {
            console.log('ERRO:', err)
        }
    }

    const getPathology = async () => {
        try {
            const res = await db('Pathologies').select(
                'Description', 
            )
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

        async getScoreByGame(_, args) {
            const { chapter } = args
            const scoreByGame = await getScoreByGame(chapter);
            return scoreByGame
        },

        // Bar Chart
        async getStudentPerformanceByGame(_, args) {
            const { chapter } = args
            const studentPerformanceByGame = await getStudentPerformanceByGame(chapter);
            return studentPerformanceByGame
        },

        // Bar Chart
        async getErrorCountByGame(_, args) {
            const { chapter } = args
            const errorCountByGame = await getErrorCountByGame(chapter);
            return  errorCountByGame
        },

        // Bar Chart
        async getScoreByGameByStudent(_, args) {
            const { profileId, chapter } = args
            const scoreByGameByStudent = await getScoreByGameByStudent(profileId, chapter);
            return scoreByGameByStudent
        },

        // Bar Chart
        async getStudentPerformanceByGameByStudent(_, args) {
            const { profileId, chapter } = args
            const studentPerformanceByGameByStudent = await getStudentPerformanceByGameByStudent(profileId, chapter);
            return studentPerformanceByGameByStudent
        },

        // Bar Chart
        async getErrorCountByGameByStudent(_, args) {
            const { profileId, chapter } = args
            const errorCountByGameByStudent = await getErrorCountByGameByStudent(profileId, chapter);
            return  errorCountByGameByStudent
        },

        // Bar Chart
        async getScoreByGameByPathology(_, args) {
            const { pathology, chapter} = args
            const scoreByGameByPathology = await getScoreByGameByPathology(pathology, chapter);
            return scoreByGameByPathology
        },

         // Bar Chart
         async getErrorCountByGameByPathology(_, args) {
            const { pathology, chapter} = args
            const errorCountByGameByPathology = await getErrorCountByGameByPathology(pathology, chapter);
            return errorCountByGameByPathology
        },

        // Bar Chart
        async getStudentPerformanceByGameByPathology(_, args) {
            const { pathology, chapter} = args
            const studentPerformanceByGameByPathology = await getStudentPerformanceByGameByPathology(pathology, chapter);
            return studentPerformanceByGameByPathology
        },

        
        async getProfilesById(_, args) {
            const { userId } = args
            const profilesById = await getProfilesById(userId);
            return  profilesById
        },

        async getProfilesById(_, args) {
            const { userId } = args
            const profilesById = await getProfilesById(userId);
            return  profilesById
        },

        async getPathology(_, args) {
            const pathology = await getPathology();
            return  pathology
        },

    
    }
}