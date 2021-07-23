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
                'ModuleId',
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

    const getScoreByGameByStudent = async (chapter, profileId) => {
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

    const getStudentPerformanceByGameByStudent = async (chapter, profileId) => {
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

    const getErrorCountByGameByStudent = async (chapter, profileId) => {
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

    const getScoreByGameByPathology = async (chapter, pathology) => {
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

    const getErrorCountByGameByPathology = async (chapter, pathology) => {
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


    const getStudentPerformanceByGameByPathology = async (chapter, pathology) => {
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


    const getChapter = async () => {
        try {
            const res = await db('Chapters').select(
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
        // Bar Chart
        async getScoreByGame(_, args) {
            const { chapter, profileId, pathology } = args;
            let scoreByGame = null;

            if(chapter){

                if(profileId){
                    scoreByGame = await getScoreByGameByStudent(chapter, profileId);
                    return scoreByGame;
                }
                if(pathology){
                    scoreByGame = await getScoreByGameByPathology(chapter, pathology);
                    return scoreByGame;
                }
                
                scoreByGame = await getScoreByGame(chapter);
            }

            return scoreByGame;
        },

        // Bar Chart
        async getStudentPerformanceByGame(_, args) {
            const { chapter, profileId, pathology } = args;
            let studentPerformanceByGame = null;

            if(chapter){

                if(profileId){
                    studentPerformanceByGame = await getStudentPerformanceByGameByStudent(chapter, profileId);
                    return studentPerformanceByGame;
                }
                if(pathology){
                    studentPerformanceByGame = await getStudentPerformanceByGameByPathology(chapter, pathology);
                    return studentPerformanceByGame;
                }
                studentPerformanceByGame = await getStudentPerformanceByGame(chapter);   
            }
            return studentPerformanceByGame;
        },


        // Bar Chart
        async getErrorCountByGame(_, args) {
            const { chapter, profileId, pathology } = args;
            let errorCountByGame = null; 

            if(chapter){
            if(profileId){
                errorCountByGame = await getErrorCountByGameByStudent(chapter, profileId);
                return  errorCountByGame;
            }
            else if(pathology){
                errorCountByGame = await getErrorCountByGameByPathology(chapter, pathology);
                return  errorCountByGame;
            }
            errorCountByGame = await getErrorCountByGame(chapter); 
           }
           
            return  errorCountByGame;
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

        async getChapter(_, args) {
            const chapter = await getChapter();
            return  chapter
        },

    
    }
}