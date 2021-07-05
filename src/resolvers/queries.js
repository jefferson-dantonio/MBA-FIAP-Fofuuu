const getAttendanceMonitoringQuery = `
SELECT TOP (10)
	UserId,
	EventName,
	Year,
	Month,
	DAY,
	count(*) as 'AcompPresenca'
FROM DailyUserEvents
group by UserId, EventName, Year, Month, DAY
order by 1, 3, 4, 5
`

const getUserPerformanceByGameQuery = `
select TOP (10)
	UserId,
	ModuleId,
	sum(TotalScore) TotalScore
from [MonthlyActivityResults]
group by UserId, ModuleId--, Year, Month
order by TotalScore desc
`

module.exports = {
    getAttendanceMonitoringQuery,
    getUserPerformanceByGameQuery
}