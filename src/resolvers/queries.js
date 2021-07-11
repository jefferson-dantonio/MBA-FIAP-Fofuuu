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



module.exports = {
    getAttendanceMonitoringQuery,
}